import time
import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import uvicorn
import httpx
import requests
from typing import Optional


class SpringRequest(BaseModel):
    message: str

class ChatRequest(BaseModel):
    message: str
    system_prompt: str
    temperature: float
    top_p: float
    max_tokens: int = 2048

app = FastAPI()

# Конфигурация Spring API
SPRING_API_URL = os.getenv("SPRING_API_URL", "http://localhost:8080")

# Конфигурация OpenAI
API_KEY = os.getenv("OPENAI_API_KEY", "sk-gjJaNA4AavPDqX_rna840Q")
BASE_URL = os.getenv("OPENAI_BASE_URL", "https://llm.t1v.scibox.tech/v1")

client = OpenAI(api_key=API_KEY, base_url=BASE_URL, http_client=httpx.Client())

def send_response_to_spring(response_text: str, conversation_id: Optional[str] = None):
    """Отправить ответ обратно в Spring API без токена"""
    try:
        headers = {"Content-Type": "text/plain"}

        # Если нужно передать conversation_id, добавляем в заголовки
        if conversation_id:
            headers["X-Conversation-Id"] = conversation_id

        spring_response = requests.post(
            f"{SPRING_API_URL}/messages/response",
            data=response_text,
            headers=headers,
            timeout=30
        )
        spring_response.raise_for_status()

        return True

    except requests.exceptions.RequestException:
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
        return f"Ошибка LLM: {str(e)}"

@app.get("/")
async def root():
    return {
        "message": "Spring-LLM Integration Service (No Auth)",
        "endpoints": {
            "process_message": "/process-message (POST)",
            "health": "/health (GET)",
            "chat": "/chat (POST)"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/process-message")
async def process_message_from_spring(request: SpringRequest):
    """Основной endpoint для получения сообщения от Spring и отправки ответа"""
    try:
        # Получаем сообщение от Spring API (уже распарсено в объект SpringRequest)
        message = request.message
        
        # Если произошла ошибка при получении сообщения
        if "Ошибка" in message:
            return {"error": message}
        
        # Настройки для LLM
        system_prompt = "Вы - полезный AI ассистент. Отвечайте вежливо и информативно."
        temperature = 0.7
        top_p = 0.9
        max_tokens = 1024
        
        # Вызываем LLM
        llm_response = call_llm(
            message,
            system_prompt,
            temperature,
            top_p,
            max_tokens
        )
        
        # Отправляем ответ обратно в Spring
        send_response_to_spring(llm_response)
        
        # Возвращаем ответ для отладки
        return {
            "response": llm_response,
        }
        
    except Exception as e:
        error_msg = f"Ошибка обработки: {str(e)}"
        return {"error": error_msg}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """Прямой endpoint для тестирования"""
    try:
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

        return {"response": resp.choices[0].message.content}

    except Exception as e:
        return {"error": f"Error: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)