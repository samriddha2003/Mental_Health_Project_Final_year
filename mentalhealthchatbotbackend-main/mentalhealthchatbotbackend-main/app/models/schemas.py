from pydantic import BaseModel, EmailStr, constr, validator
from typing import Optional, List, Literal

class RegisterRequest(BaseModel):
    email: EmailStr
    password: constr(min_length=8)
    age: int
    blood_type: constr(min_length=1, max_length=10)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class CheckupRequest(BaseModel):
    questions: list[str]

class CheckupResponse(BaseModel):
    score: float
    response: str

class Doctor(BaseModel):
    id: str
    name: str
    department: str
    specialty: str
    experience: int

class DocListResponse(BaseModel):
    doctors: list[Doctor]

class ChatRequest(BaseModel):
    prompt: str

class ChatResponse(BaseModel):
    response: str

class QuestionItem(BaseModel):
    currentQuestion: str
    optionSelected: int

    @validator("optionSelected")
    def validate_score(cls, v):
        if not (1 <= v <= 5):
            raise ValueError("optionSelected must be between 1 and 5")
        return v

class CheckupRequest(BaseModel):
    questions: List[QuestionItem]

class CheckupResponse(BaseModel):
    score: str
    level: Literal["depressed", "anxious", "high stress", "confident"]
    recommendation: str
    analysis: str
