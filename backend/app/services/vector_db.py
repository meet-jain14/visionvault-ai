import chromadb

client = chromadb.PersistentClient(
    path="chromadb"
)

collection = client.get_or_create_collection(
    name="visionvault_images",
    metadata={
        "hnsw:space": "cosine"
    }
)

def store_embedding(
    image_id: str,
    embedding,
    caption: str
):
    collection.add(
        ids=[image_id],
        embeddings=[embedding],
        documents=[caption],
        metadatas=[
            {
                "caption": caption
            }
        ]
    )

def search_similar(
    embedding,
    top_k=3
):
    results = collection.query(
        query_embeddings=[embedding],
        n_results=top_k
    )

    return results