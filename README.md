# VisionVault AI

> An AI-powered image intelligence and semantic retrieval platform that allows users to upload, analyze, caption, and search images using multimodal embeddings and semantic similarity.

Built using modern AI pipelines including **BLIP image captioning**, **OpenCLIP embeddings**, **ChromaDB vector search**, **FastAPI**, and **Next.js**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [AI Pipeline](#ai-pipeline)
- [Project Screenshots](#project-screenshots)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Future Enhancements](#future-enhancements)
- [Real-World Use Cases](#real-world-use-cases)
- [Highlights](#highlights)
- [Author](#author)

---

## Features

### AI Image Captioning
- Automatically generates natural-language captions for uploaded images using **BLIP**

### Semantic Search
Search images using natural language or visual queries — no filenames or tags needed:
- Text queries
- Image queries
- Multimodal embeddings

### Multi-Image Upload
- Multiple image upload
- Folder upload
- Drag & drop upload UX

### Vector Database Retrieval
- Uses **ChromaDB** for storing and retrieving semantic embeddings efficiently

### Modern AI UI
Premium dark-themed futuristic interface featuring:
- Glassmorphism design
- Hover animations
- Modal previews
- Responsive layouts
- Image download support

### Fullscreen Modal Preview
- Click any image to open a cinematic fullscreen preview experience

---

## Tech Stack

### Frontend
- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Axios**
- **Lucide React**

### Backend
- **FastAPI**
- **Python**
- **Uvicorn**

### AI / ML
- **BLIP** (Salesforce) — image captioning
- **OpenCLIP** — semantic embeddings
- **PyTorch** — deep learning backbone
- **ChromaDB** — vector database

---

## AI Pipeline

```
Image Upload
      ↓
BLIP Caption Generation
      ↓
OpenCLIP Embedding Creation
      ↓
Store Embeddings in ChromaDB
      ↓
Semantic Retrieval via Text / Image Search
```

---

## Project Screenshots

- **Hero Section** - Landing page overview
<img width="1918" height="855" alt="Hero" src="https://github.com/user-attachments/assets/cf65cc46-d1f5-468a-9808-2af9e99aea7e" />

- **Upload Interface** - Multi-image drag & drop uploader
<img width="1919" height="740" alt="upload" src="https://github.com/user-attachments/assets/2711dab9-361e-4717-83ea-29c88b404cf1" />

- **Semantic Search** - Text and image-based search UI
<img width="1718" height="830" alt="search" src="https://github.com/user-attachments/assets/d5f0dd92-7fa3-4a43-8cc5-2acac5b64236" />

- **AI Gallery** - Retrieved results with captions
<img width="1919" height="845" alt="Gallery" src="https://github.com/user-attachments/assets/a5bac08f-d678-4f02-8a2a-514fffe03ede" />

- **Modal Preview** - Fullscreen cinematic image preview
<img width="1375" height="811" alt="preview" src="https://github.com/user-attachments/assets/91fa7289-6b42-45a3-9f4b-113ff8b7fb75" />


---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/meet-jain14/visionvault-ai.git
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs on: `http://localhost:3000`

### 3. Backend Setup

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000
```

> Backend runs on: `http://127.0.0.1:8000`

---

## Folder Structure

```
visionvault-ai/
│
├── frontend/
│
├── backend/
│   ├── app/
│   └── datasets/uploads/
│
├── Dockerfile
├── requirements.txt
└── README.md
```

---

## Future Enhancements

- [ ] PDF image extraction
- [ ] OCR support
- [ ] AI tagging system
- [ ] Background task queue
- [ ] Cloud storage integration
- [ ] Authentication system
- [ ] Image clustering
- [ ] Semantic filtering
- [ ] Video frame search
- [ ] AI-generated metadata summaries

---

## Real-World Use Cases

- Digital asset management
- AI-powered image retrieval
- Research dataset exploration
- Media organization
- Smart gallery systems
- Document image extraction
- Visual semantic search engines

---

## Highlights

- Multimodal AI search
- BLIP caption generation
- OpenCLIP semantic embeddings
- ChromaDB vector retrieval
- Full-stack AI architecture
- Production-style UI/UX
- Responsive modern design

---

## Author

**Meet Jain**


- GitHub: [@meet-jain14](https://github.com/meet-jain14)
- Project Repository: [visionvault-ai](https://github.com/meet-jain14/visionvault-ai)
