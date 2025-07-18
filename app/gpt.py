from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
import os
from gpt import ask_gpt  # ✅ Import it

app = FastAPI()

class Query(BaseModel):
    query: str

@app.post("/ask")
async def ask_gpt_api(query: Query):
    answer = ask_gpt(query.query)
    return {"response": answer}

# Load your OpenAI API Key
from dotenv import load_dotenv
load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")

# Optional: Debug print
print("GPT.py key loaded:", openai_api_key[:5], "..." if openai_api_key else "KEY NOT FOUND")

# Initialize the Chat Model
llm = ChatOpenAI(openai_api_key=openai_api_key)

def ask_gpt(query: str) -> str:
    try:
        response = llm([HumanMessage(content=query)])
        return response.content
    except Exception as e:
        return f"Error: {e}"
