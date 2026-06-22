# Deployment Guide

This project should be deployed as two services:

- Frontend: Vercel, using the `frontend` directory.
- Backend: Hugging Face Spaces, using the root `Dockerfile`.

Small-memory web hosts are not recommended for the backend because the ML stack (`torch`, `transformers`, BLIP, OpenCLIP, ChromaDB) can exceed a 512Mi memory limit.

## 1. Deploy the backend to Hugging Face Spaces

1. Create or log in to a Hugging Face account.
2. Open `https://huggingface.co/spaces`.
3. Click **Create new Space**.
4. Choose:
   - **Space name:** `visionvault-backend` or any name you like.
   - **SDK:** `Docker`
   - **Visibility:** Public is easiest for a portfolio/demo. Private also works, but your frontend will need access to it.
   - **Hardware:** Start with the free CPU Space.
5. Create a Hugging Face access token:
   - Go to **Settings > Access Tokens**.
   - Create a token with read access.
6. In your Space, go to **Settings > Repository secrets** and add:
   ```txt
   HF_TOKEN=your_huggingface_token
   ```
7. Push this repository to the Space repo.

   Option A, from the Hugging Face Space page:
   ```bash
   git remote add hf https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME
   git push hf main
   ```

   Option B, upload these files manually in the Space:
   - `Dockerfile`
   - `.dockerignore`
   - `requirements.txt`
   - `.python-version`
   - the full `backend/` folder

8. Wait for the Space build to finish.
9. Test these URLs:
   ```txt
   https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space/
   https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space/health
   ```

The backend starts with:

```bash
uvicorn backend.app.main:app --host 0.0.0.0 --port 7860
```

The Dockerfile also respects a `PORT` environment variable if the platform provides one.

## 2. Deploy the frontend to Vercel

1. Push this repo to GitHub.
2. Create a new Vercel project from the GitHub repo.
3. In Vercel project settings, set:
   ```txt
   Root Directory: frontend
   Build Command: npm run build
   ```
4. Add this Vercel environment variable:
   ```txt
   NEXT_PUBLIC_API_BASE_URL=https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space
   ```
5. Redeploy the Vercel project.

The frontend uses `NEXT_PUBLIC_API_BASE_URL` for all API, image, upload, and search calls. For local development, it falls back to `http://127.0.0.1:8000`.

## 3. Local development

Run the backend:

```bash
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000
```

Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

Optional local frontend env file:

```txt
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

## Notes

- The first backend request may be slow because the ML models need to load.
- Free Hugging Face Spaces can sleep when idle, so the first request after sleeping may take longer.
- Uploaded images and local ChromaDB data are not a durable production database. For production, move uploaded files to object storage and store vector data in a hosted vector database.
