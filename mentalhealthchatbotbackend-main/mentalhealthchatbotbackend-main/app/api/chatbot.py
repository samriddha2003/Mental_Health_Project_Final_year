"""
Chatbot API endpoints for user interaction.

This module defines the FastAPI routes for chatbot communication, including:
- Sending a prompt to the chatbot (`/chat`)
- Resetting the chatbot's conversation history (`/chat/reset`)

Routes:
    POST /chat: Send a prompt to the chatbot and receive a response.
    POST /chat/reset: Reset the chatbot's conversation history.

Dependencies:
    - FastAPI
    - app.models.schemas: ChatRequest, ChatResponse
    - app.services.chatbot_service: gemini_chatbot
"""

from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse
from app.services.chatbot_service import gemini_chatbot

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    """
    Send a prompt to the chatbot and receive a response.

    Args:
        request (ChatRequest): The user's chat prompt.

    Returns:
        ChatResponse: The chatbot's response.
    """
    response_text = gemini_chatbot.chat(request.prompt)
    return ChatResponse(response=response_text)

@router.post("/chat/reset")
def reset_chat():
    """
    Reset the chatbot's conversation history.

    Returns:
        dict: A message indicating the chat history has been reset.
    """
    gemini_chatbot.reset()
    return {"message": "Chat history reset."}