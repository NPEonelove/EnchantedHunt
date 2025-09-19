import time
import json
import os
from datetime import datetime
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import uvicorn


class ChatRequest(BaseModel):
    message: str
    system_prompt: str = "Ты в роли аналитика резюме"
    temperature: float = 0.7
    top_p: float = 0.9
    max_tokens: int = 256

class ChatResponse(BaseModel):
    success: bool
    response: str
    processing_time: float
    model: str
    timestamp: str
    file_path: str = None
    error: str = None

app = FastAPI()

# Функции-утилиты
def wrap_response_in_json(response_content: str, processing_time: float, model: str) -> str:
    response_data = {
        "response": response_content,
        "metadata": {
            "model": model,
            "processing_time_seconds": round(processing_time, 3),
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }
    }
    
    return json.dumps(response_data, ensure_ascii=False)

def save_json_to_file(json_data: str, folder_path: str = "ai/json_dumps", filename: str = None) -> str:
    os.makedirs(folder_path, exist_ok=True)
    
    if filename is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")[:-3]
        filename = f"response_{timestamp}.json"
    
    if not filename.endswith('.json'):
        filename += '.json'
    
    file_path = os.path.join(folder_path, filename)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(json_data)
    
    return file_path


API_KEY = "sk-gjJaNA4AavPDqX_rna840Q"
BASE_URL = "https://llm.t1v.scibox.tech/v1"

client = OpenAI(api_key=API_KEY, base_url=BASE_URL)

@app.get("/")
async def root():
    return {
        "message": "Shiza",
        "endpoints": {
            "chat": "/chat (POST)",
            "health": "/health (GET)"
        }
    }



@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
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
        processing_time = end_time - start_time
        response_content = resp.choices[0].message.content

        json_response = wrap_response_in_json(
            response_content,
            processing_time,
            "Qwen2.5-72B-Instruct-AWQ"
        )
        
        file_path = save_json_to_file(json_response)

        return ChatResponse(
            success=True,
            response=response_content,
            processing_time=round(processing_time, 3),
            model="Qwen2.5-72B-Instruct-AWQ",
            timestamp=datetime.now().isoformat(),
            file_path=file_path
        )

    except Exception as e:
        return ChatResponse(
            success=False,
            response="",
            processing_time=0,
            model="Qwen2.5-72B-Instruct-AWQ",
            timestamp=datetime.now().isoformat(),
            error=str(e)
        )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)