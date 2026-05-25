# VisionVault AI 🚀

An AI-powered image intelligence platform that enables semantic image search, automated caption generation, and multimodal dataset exploration using modern computer vision and vector search techniques.

---

## ✨ Features

* 🔍 Semantic Image Search using CLIP embeddings
* 🧠 AI-generated captions using BLIP
* 📂 Upload and manage image datasets
* ⚡ FastAPI backend for AI inference workflows
* 🗄️ ChromaDB vector database integration
* 🎨 Modern Next.js + Tailwind frontend
* 🖼️ Responsive image gallery with expandable layout
* 🌌 Glassmorphic UI with smooth navigation

---

# 🛠️ Tech Stack

## Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Framer Motion
* Axios

## Backend

* FastAPI
* Python
* OpenCLIP
* HuggingFace Transformers
* ChromaDB
* Uvicorn

## AI Models

* BLIP Image Captioning
* OpenCLIP (ViT-B-32)

---

# 🧠 How It Works

1. User uploads an image.
2. Backend generates an AI caption using BLIP.
3. OpenCLIP generates multimodal embeddings.
4. Embeddings are stored inside ChromaDB.
5. Users can search images using natural language.
6. Semantic similarity retrieval returns relevant images.

---

# 📸 Screenshots

## Home Page
<img width="1919" height="863" alt="VisionVault_homepage" src="https://github.com/user-attachments/assets/93f7c35d-e22b-4c9b-aea3-09bb3a2441be" />


## Upload & AI Captioning
<img width="1574" height="338" alt="VisionVault_upload" src="https://github.com/user-attachments/assets/28cca3d1-8cf1-482a-aa6c-fe061a93e772" />


## Semantic Search
<img width="1580" height="354" alt="VisionVault_search" src="https://github.com/user-attachments/assets/b701592f-d29f-4685-9afb-faca7218d789" />


## Dataset Gallery
<img width="965" height="280" alt="VisionVault_gallery1" src="https://github.com/user-attachments/assets/1eae4dab-22a7-48d0-beec-9deb3ff40306" />

---

# 🚀 Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/visionvault-ai.git
cd visionvault-ai
```

---

## 2. Backend Setup

```bash
cd backend
python -m venv venv
```

### Activate Virtual Environment

#### Windows

```bash
.\venv\Scripts\activate
```

#### Mac/Linux

```bash
source venv/bin/activate
```

---

## 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

## 5. Frontend Setup

```bash
cd frontend
npm install
```

---

## 6. Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 📁 Project Structure

```bash
visionvault-ai/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   └── main.py
│   ├── datasets/
│   └── chromadb/
│
├── frontend/
│   ├── app/
│   ├── components/
│   └── public/
│
└── README.md
```

---

# 💡 Future Improvements

* User authentication
* Cloud image storage
* Drag & drop uploads
* AI tagging system
* Hybrid vector search
* Docker deployment
* Async background processing

---

# 👨‍💻 Author

**Meet Jain**

* LinkedIn: https://www.linkedin.com/in/meet-jain-b32164325
* GitHub: [https://github.com/meet-jain14]

---

# ⭐ Support
If you liked this project, consider giving it a star on GitHub ⭐
