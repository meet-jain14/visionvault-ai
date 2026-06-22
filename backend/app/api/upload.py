from fastapi import APIRouter, UploadFile, File
from typing import List
import os

from ..services.caption_service import generate_caption
from ..services.embedding_service import generate_image_embedding
from ..services.vector_db import store_embedding

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

UPLOAD_DIR = os.path.join(BASE_DIR, "datasets", "uploads")

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_images(files: List[UploadFile] = File(...)):

    uploaded_results = []

    for file in files:

        clean_filename = os.path.basename(file.filename)

        file_path = os.path.join(UPLOAD_DIR, clean_filename)

        with open(file_path, "wb") as buffer:

            buffer.write(await file.read())

        caption = generate_caption(file_path)

        embedding = generate_image_embedding(file_path)

        store_embedding(clean_filename, embedding, caption)

        uploaded_results.append({"filename": clean_filename, "caption": caption})

    return {
        "status": "dataset uploaded successfully",
        "processed_images": uploaded_results,
    }
