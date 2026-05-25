from fastapi import APIRouter
from app.services.embedding_service import generate_text_embedding
from app.services.vector_db import search_similar

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