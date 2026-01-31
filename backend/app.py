from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

# Create FastAPI app
app = FastAPI()

# Enable CORS so frontend can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML model
model = joblib.load("model.pkl")

# Health check route
@app.get("/")
def home():
    return {"status": "API Running"}

# Prediction route
@app.post("/predict")
async def predict(data: dict):
    try:
        # Convert input JSON to DataFrame
        df = pd.DataFrame([data])

        # Make prediction
        prediction = model.predict(df)

        # Return result
        return {"prediction": prediction.tolist()}

    except Exception as e:
        return {"error": str(e)}
