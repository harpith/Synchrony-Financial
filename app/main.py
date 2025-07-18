from fastapi import FastAPI, Request
from pydantic import BaseModel
import openai
import os

openai.api_key = "YOUR_OPENAI_API_KEY"  # Replace with your actual OpenAI API key

app = FastAPI()

class QueryRequest(BaseModel):
    query: str

@app.post("/ask")
def ask_gpt(data: QueryRequest):
    user_question = data.query

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_question}
        ]
    )

    return {"response": response["choices"][0]["message"]["content"]}
