from fastapi import APIRouter
import os

router = APIRouter()

UPLOAD_DIR = "datasets/uploads"

ALLOWED_EXTENSIONS = (
    ".png",
    ".jpg",
    ".jpeg",
    ".webp"
)

@router.get("/images")
async def get_images():

    images = []

    for filename in os.listdir(
        UPLOAD_DIR
    ):

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