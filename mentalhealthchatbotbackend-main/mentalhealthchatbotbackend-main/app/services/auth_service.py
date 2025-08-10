from fastapi import HTTPException, status, Depends
from app.models.schemas import RegisterRequest, LoginRequest, TokenResponse
from typing import Dict
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
from app.config.config import settings
import re
from fastapi.security import OAuth2PasswordBearer

MONGO_URI = settings.MONGO_URI
client = AsyncIOMotorClient(MONGO_URI)
db = client["mentalhealth"]
users_collection = db["users"]

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_password_hash(password):
    """
    Hashes a plain password using bcrypt.

    Args:
        password (str): The plain password to hash.

    Returns:
        str: The hashed password.
    """
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    """
    Verifies a plain password against a hashed password.

    Args:
        plain_password (str): The plain password to verify.
        hashed_password (str): The hashed password to compare.

    Returns:
        bool: True if the password matches, False otherwise.
    """
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    """
    Creates a JWT access token.

    Args:
        data (dict): The data to encode in the token.
        expires_delta (timedelta, optional): Token expiration time.

    Returns:
        str: The encoded JWT token.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def register_user(data: RegisterRequest):
    """
    Registers a new user in the database.

    Args:
        data (RegisterRequest): The registration data.

    Raises:
        HTTPException: If the email is already registered.

    Returns:
        TokenResponse: The access token for the registered user.
    """
    existing = await users_collection.find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Password validation
    password = data.password
    if len(password) < 10:
        raise HTTPException(status_code=400, detail="Password must be at least 10 characters long")
    if not re.search(r"[A-Za-z]", password) or not re.search(r"\d", password):
        raise HTTPException(status_code=400, detail="Password must contain both letters and numbers")
    
    user_doc = {
        "email": data.email,
        "password": get_password_hash(data.password),
        "age": data.age,
        "blood_type": data.blood_type
    }
    await users_collection.insert_one(user_doc)
    access_token = create_access_token({"sub": data.email})
    return TokenResponse(access_token=access_token)

async def login_user(data: LoginRequest):
    """
    Authenticates a user and returns an access token.

    Args:
        data (LoginRequest): The login data.

    Raises:
        HTTPException: If credentials are invalid.

    Returns:
        TokenResponse: The access token for the authenticated user.
    """
    user = await users_collection.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token({"sub": data.email})
    return TokenResponse(access_token=access_token)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Retrieves the current user based on the provided JWT token.

    Args:
        token (str): The JWT token.

    Raises:
        HTTPException: If the token is invalid or user not found.

    Returns:
        dict: The user document from the database.
    """
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await users_collection.find_one({"email": email})
        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
