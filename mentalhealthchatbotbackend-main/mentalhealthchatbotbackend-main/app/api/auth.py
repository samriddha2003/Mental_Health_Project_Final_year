"""
Authentication API endpoints for user registration and login.

This module defines the FastAPI routes for user authentication, including:
- User registration (`/register`)
- User login (`/login`)

Routes:
    POST /register: Register a new user and return an authentication token.
    POST /login: Authenticate an existing user and return an authentication token.

Dependencies:
    - FastAPI
    - app.models.schemas: RegisterRequest, LoginRequest, TokenResponse
    - app.services.auth_service
"""

from fastapi import APIRouter, HTTPException, status, Depends
from app.models.schemas import RegisterRequest, LoginRequest, TokenResponse
from app.services import auth_service

router = APIRouter()

@router.post("/register", response_model=TokenResponse)
async def register(data: RegisterRequest):
    """Register a new user and return an authentication token."""
    return await auth_service.register_user(data)

@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest):
    """Authenticate a user and return an authentication token."""
    return await auth_service.login_user(data)
