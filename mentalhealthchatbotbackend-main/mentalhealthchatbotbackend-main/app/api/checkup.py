from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import CheckupRequest, CheckupResponse
from app.services import checkup_service
from app.services.auth_service import get_current_user

router = APIRouter()

@router.post("/", response_model=CheckupResponse)
def perform_checkup(data: CheckupRequest, user=Depends(get_current_user)):
    try:
        return checkup_service.process_checkup(data, user)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception:
        raise HTTPException(status_code=500, detail="Internal server error")