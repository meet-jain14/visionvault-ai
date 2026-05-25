from fastapi import APIRouter, UploadFile, File
import os
import shutil
from app.services.caption_service import generate_caption
from app.services.embedding_service import generate_image_embedding
from app.services.vector_db import store_embedding

router = APIRouter()

UPLOAD_DIR = "datasets/uploads"

@router.post("/upload")
async def upload_image(
    file: UploadFile = File(...)
):
    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )
    caption = generate_caption(file_path)
    embedding = generate_image_embedding(
        file_path
    )
    store_embedding(
        image_id=file.filename,
        embedding=embedding,
        caption=caption
    )
    return {
        "filename": file.filename,
        "status": "uploaded successfully",
        "caption": caption
    }