from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = FastAPI(title="GitGrade API", description="AI-Powered GitHub Repository Analyzer")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for hackathon/dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "GitGrade API is running", "status": "ok"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

from services.analyzer import AnalyzerService
from pydantic import BaseModel

class AnalyzeRequest(BaseModel):
    url: str

@app.post("/analyze")
async def analyze_repo(request: AnalyzeRequest):
    service = AnalyzerService()
    result = await service.analyze_repository(request.url)
    return result

