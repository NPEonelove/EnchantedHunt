import time
import json
from openai import OpenAI
import os

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

def save_json_to_file(json_data: str, folder_path: str = "responses", filename: str = None) -> str:
    os.makedirs(folder_path, exist_ok=True)
    
    if not filename.endswith('.json'):
        filename += '.json'
    
    file_path = os.path.join(folder_path, filename)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(json_data)
    
    return file_path


API_KEY = "sk-gjJaNA4AavPDqX_rna840Q"
BASE_URL = "https://llm.t1v.scibox.tech/v1"

client = OpenAI(api_key=API_KEY, base_url=BASE_URL)

start_time = time.time()
resp = client.chat.completions.create(
    model="Qwen2.5-72B-Instruct-AWQ",
    messages=[
        {"role": "system", "content": "Ты в роли аналитика резюме"},
        {"role": "user", "content": "Почему собака как кошка и не курица"},
    ],
    temperature=0.7,
    top_p=0.9,
    max_tokens=256,
)

end_time = time.time()

json_response = wrap_response_in_json(
    resp.choices[0].message.content,
    end_time - start_time,
    "Qwen2.5-72B-Instruct-AWQ"
)

saved_file_path = save_json_to_file(json_data = json_response, 
                                    folder_path = "ai/json_dumps", 
                                    filename = "response_test.json")
