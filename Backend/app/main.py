from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.farmers import router as farmers_router
from app.routes.health import router as health_router
from app.routes.crops import router as crops_router


app = FastAPI(
    title="AgriConnect API",
    description="AI-powered agricultural marketplace backend",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health_router, prefix="/api")
app.include_router(crops_router, prefix="/api")
app.include_router(farmers_router, prefix="/api")


@app.get("/")
def root():
    return {
        "message": "AgriConnect Backend is running"
    }