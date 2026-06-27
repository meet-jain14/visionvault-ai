from fastapi import APIRouter
from fastapi.responses import FileResponse
import os

router = APIRouter()

UPLOAD_DIR = "datasets/uploads"


@router.get("/download/{filename}")
async def download_image(filename: str):

    file_path = os.path.join(
        UPLOAD_DIR,
        filename
    )

    return FileResponse(
        path=file_path,
        filename=filename,
        media_type="application/octet-stream"
    )   