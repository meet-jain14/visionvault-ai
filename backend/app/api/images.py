from fastapi import APIRouter
import os
from pathlib import Path

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parents[2]
UPLOAD_DIR = BASE_DIR / "datasets" / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_EXTENSIONS = (
    ".png",
    ".jpg",
    ".jpeg",
    ".webp"
)

@router.get("/images")
async def get_images():

    images = []

    for filename in os.listdir(UPLOAD_DIR):

        if not filename.lower().endswith(
            ALLOWED_EXTENSIONS
        ):
            continue

        image_data = {

            "filename": filename,

            "path":
            f"/datasets/uploads/{filename}"

        }

        images.append(image_data)

    return images
