from langchain_community.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
import os
from dotenv import load_dotenv

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")
if openai_api_key:
    print("GPT.py key loaded:", openai_api_key[:5], "...")
else:
    print("GPT.py key NOT FOUND in .env")

llm = ChatOpenAI(openai_api_key=openai_api_key)

def ask_gpt(query: str) -> str:
    try:
        # Mocked response for testing UI / API
        return f"Mocked response for: {query}"
        
        # Uncomment when your key is active:
        response = llm([HumanMessage(content=query)])
        return response.content
    except Exception as e:
        return f"Error: {e}"
