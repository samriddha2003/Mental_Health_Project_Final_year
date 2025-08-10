import os
from dotenv import load_dotenv

# Load .env file if present
load_dotenv()

class Settings:
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "AIzaSyAfZnYWB_lVD4Wu0tf-NaKudS4SboYIbMo")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))
    MONGO_URI: str = os.getenv(
        "MONGO_URI",
        "mongodb+srv://khamruiasok:ayushkhamrui@cluster0.dc8z5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    SECRET_KEY: str = os.getenv("SECRET_KEY", "final-project-one-stop-solution-for-all-mental-health-needs")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    # Add more config variables as needed

settings = Settings()