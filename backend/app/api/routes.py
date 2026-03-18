from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


@router.post("/api/v1/chat", response_model=ChatResponse)
def chat(payload: ChatRequest):
    clean_message = payload.message.strip()
    if not clean_message:
        return ChatResponse(reply="Please send a non-empty message.")

    return ChatResponse(reply=f"Echo: {clean_message}")
