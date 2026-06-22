import os
from fastapi import APIRouter
from ..services.vector_db import search_similar
from fastapi import UploadFile, File
from ..services.embedding_service import (
    generate_text_embedding,
    generate_image_embedding
)

router = APIRouter()



@router.get("/search")
async def semantic_search(
    query: str
):

    query_embedding = generate_text_embedding(query)

    results = search_similar(
        query_embedding
    )

    return results

@router.post("/search-by-image")
async def search_by_image(
    file: UploadFile = File(...)
):

    temp_path = (
        f"temp_{file.filename}"
    )

    with open(
        temp_path,
        "wb"
    ) as buffer:

        buffer.write(
            await file.read()
        )

    embedding = (
        generate_image_embedding(
            temp_path
        )
    )

    results = search_similar(
        embedding
    )

    os.remove(temp_path)

    return results
