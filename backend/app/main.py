from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.upload import router as upload_router
from app.api.search import router as search_router
from app.api.images import router as images_router
from app.api.download import router as download_router
from fastapi.staticfiles import StaticFiles
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
DATASETS_DIR = BASE_DIR / "datasets"
DATASETS_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI(
    title="VisionVault AI",
    description="AI-powered image intelligence platform",
    version="1.0.0"
)

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount(
    "/datasets",
    StaticFiles(directory=DATASETS_DIR),
    name="datasets"
)
app.include_router(
    upload_router,
    prefix="/api"
)
app.include_router(
    search_router,
    prefix="/api"
)
app.include_router(
    images_router,
    prefix="/api"
)
app.include_router(
    download_router,
    prefix="/api"
)
@app.get("/")
async def root():
    return {
        "message": "VisionVault AI Backend Running"
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }
