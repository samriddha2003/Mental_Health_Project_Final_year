from app.models.schemas import DocListResponse, Doctor
from app.config.config import settings
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = settings.MONGO_URI
client = AsyncIOMotorClient(MONGO_URI)
db = client["doctors"]  # Updated database name
doctors_collection = db["mentalhealth"]  # Updated collection name

async def get_doctor_list():
    """
    Fetches the list of doctors from the MongoDB 'mentalhalth' collection.
    Returns:
        DocListResponse: List of doctors.
    """
    doctors_cursor = doctors_collection.find({})
    doctors = []
    async for doc in doctors_cursor:
        doctors.append(
            Doctor(
                id=str(doc.get("_id")),
                name=doc.get("name"),
                specialty=doc.get("specialization"),
                department=doc.get("department"),
                experience=doc.get("experience"),
            )
        )
    return DocListResponse(doctors=doctors)
