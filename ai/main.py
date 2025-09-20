import time
import os
from datetime import datetime
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import uvicorn
import httpx
import requests
from typing import Optional


class SpringRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    user_id: Optional[str] = None

class ChatRequest(BaseModel):
    message: str
    system_prompt: str
    temperature: float
    top_p: float
    max_tokens: int = 2048

app = FastAPI()

# Конфигурация Spring API
SPRING_API_URL = os.getenv("SPRING_API_URL", "http://localhost:8080/api")
SPRING_AUTH_TOKEN = os.getenv("SPRING_AUTH_TOKEN", "")

# Конфигурация OpenAI
API_KEY = os.getenv("OPENAI_API_KEY", "sk-gjJaNA4AavPDqX_rna840Q")
BASE_URL = os.getenv("OPENAI_BASE_URL", "https://llm.t1v.scibox.tech/v1")

client = OpenAI(api_key=API_KEY, base_url=BASE_URL, http_client=httpx.Client())

def get_spring_message() -> SpringRequest:
    """Получить сообщение от Spring API"""
    try:
        headers = {}
        if SPRING_AUTH_TOKEN:
            headers["Authorization"] = f"Bearer {SPRING_AUTH_TOKEN}"
        
        response = requests.get(
            f"{SPRING_API_URL}/messages/next",
            headers=headers,
            timeout=30
        )
        response.raise_for_status()
        
        data = response.json()
        return SpringRequest(**data)
        
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Spring API error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing Spring response: {str(e)}")

def send_response_to_spring(response_text: str, conversation_id: Optional[str] = None):
    """Отправить ответ обратно в Spring API в виде простой строки"""
    try:
        headers = {
            "Content-Type": "text/plain"
        }
        if SPRING_AUTH_TOKEN:
            headers["Authorization"] = f"Bearer {SPRING_AUTH_TOKEN}"
        
        # Если нужно передать conversation_id, можно добавить в заголовки или параметры
        if conversation_id:
            headers["X-Conversation-Id"] = conversation_id
        
        spring_response = requests.post(
            f"{SPRING_API_URL}/messages/response",
            data=response_text,  # Используем data вместо json для отправки plain text
            headers=headers,
            timeout=30
        )
        spring_response.raise_for_status()
        
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"Failed to send response to Spring: {str(e)}")
        return False

def call_llm(message: str, system_prompt: str, temperature: float, top_p: float, max_tokens: int) -> str:
    """Вызов LLM для генерации ответа"""
    try:
        resp = client.chat.completions.create(
            model="Qwen2.5-72B-Instruct-AWQ",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message},
            ],
            temperature=temperature,
            top_p=top_p,
            max_tokens=max_tokens,
        )
        return resp.choices[0].message.content
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM error: {str(e)}")

@app.get("/")
async def root():
    return {
        "message": "Spring-LLM Integration Service",
        "endpoints": {
            "process_message": "/process-message (GET)",
            "health": "/health (GET)",
            "chat": "/chat (POST)"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/process-message")
async def process_message_from_spring():
    """Основной endpoint для получения сообщения от Spring и отправки ответа в виде строки"""
    try:
        # Получаем сообщение от Spring API
        spring_request = get_spring_message()
        
        # Настройки для LLM (можно вынести в конфигурацию)
        system_prompt = "Вы - полезный AI ассистент. Отвечайте вежливо и информативно."
        temperature = 0.7
        top_p = 0.9
        max_tokens = 1024
        
        start_time = time.time()
        
        # Вызываем LLM
        llm_response = call_llm(
            spring_request.message,
            system_prompt,
            temperature,
            top_p,
            max_tokens
        )
        
        end_time = time.time()
        processing_time = end_time - start_time
        
        # Отправляем простую строку обратно в Spring
        send_success = send_response_to_spring(llm_response, spring_request.conversation_id)
        
        # Возвращаем простой текст вместо JSON
        return llm_response
        
    except HTTPException as e:
        # В случае ошибки тоже возвращаем простой текст
        return f"Error: {e.detail}"
    except Exception as e:
        return f"Error: {str(e)}"

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """Прямой endpoint для тестирования (возвращает строку)"""
    try:
        start_time = time.time()
        
        resp = client.chat.completions.create(
            model="Qwen2.5-72B-Instruct-AWQ",
            messages=[
                {"role": "system", "content": request.system_prompt},
                {"role": "user", "content": request.message},
            ],
            temperature=request.temperature,
            top_p=request.top_p,
            max_tokens=request.max_tokens,
        )

        end_time = time.time()
        response_content = resp.choices[0].message.content

        # Возвращаем простую строку
        return response_content

    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)