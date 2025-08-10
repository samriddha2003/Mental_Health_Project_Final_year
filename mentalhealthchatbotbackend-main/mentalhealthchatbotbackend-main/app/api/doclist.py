from fastapi import APIRouter, Depends
from app.models.schemas import DocListResponse
from app.services import doc_service
from app.services.auth_service import get_current_user

router = APIRouter()

@router.get("/", response_model=DocListResponse)
async def get_doctors(user=Depends(get_current_user)):
    return await doc_service.get_doctor_list()
