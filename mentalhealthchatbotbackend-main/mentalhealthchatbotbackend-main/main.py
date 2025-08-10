from fastapi import FastAPI
from app.api import auth, checkup, doclist
from app.api import chatbot 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["x-correlation-id"]
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(checkup.router, prefix="/checkup", tags=["checkup"])
app.include_router(doclist.router, prefix="/doclist", tags=["doclist"])
app.include_router(chatbot.router, prefix="/chatbot", tags=["chatbot"]) 

if __name__ == "__main__":
    main()
