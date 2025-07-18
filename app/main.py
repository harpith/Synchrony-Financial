from fastapi import FastAPI
from pydantic import BaseModel
from gpt import ask_gpt  # ✅ importing from gpt.py

app = FastAPI()

class Query(BaseModel):
    query: str

@app.post("/ask")
async def ask_gpt_api(query: Query):
    answer = ask_gpt(query.query)
    return {"response": answer}
