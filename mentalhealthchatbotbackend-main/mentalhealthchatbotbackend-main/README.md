# Mental Health Backend - FastAPI + Langchain + Gemini

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

## API Endpoints

- `POST /auth/register` - Register a new user (email, password, age, blood type)
- `POST /auth/login` - Login and get JWT token
- `POST /checkup/` - Submit questions, get score and response (requires auth)
- `GET /doclist/` - Get list of doctors (requires auth)

## Notes
- Replace in-memory stores and stubs with production-ready DB and Gemini integration.
- Modular structure for easy extension.
