from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from typing import List, Optional
import json
from datetime import datetime

app = FastAPI(title="Intelligent Grid Management System",
             description="API for predictive maintenance and monitoring of power grid components",
             version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class GridData(BaseModel):
    voltage: float
    current: float
    temperature: float
    load: float
    timestamp: Optional[datetime] = None

class PredictionResponse(BaseModel):
    failure_probability: float
    recommended_action: str
    confidence_score: float

# In-memory storage for demo purposes (replace with MongoDB in production)
grid_data_history = []

@app.get("/")
async def root():
    return {"message": "Welcome to Intelligent Grid Management System API"}

@app.post("/api/predict", response_model=PredictionResponse)
async def predict_failure(data: GridData):
    """
    Predict potential grid failure based on current sensor readings
    """
    # TODO: Implement ML model prediction
    # For now, return mock prediction
    failure_prob = 0.15 if data.temperature > 80 or data.voltage < 215 else 0.05
    
    return PredictionResponse(
        failure_probability=failure_prob,
        recommended_action="Monitor closely" if failure_prob > 0.1 else "No action required",
        confidence_score=0.85
    )

@app.get("/api/history", response_model=List[GridData])
async def get_history():
    """
    Get historical grid data
    """
    return grid_data_history

@app.post("/api/data")
async def add_data(data: GridData):
    """
    Add new grid sensor data
    """
    if not data.timestamp:
        data.timestamp = datetime.now()
    grid_data_history.append(data)
    return {"message": "Data added successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 