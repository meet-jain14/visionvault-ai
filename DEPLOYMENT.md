Deployment steps

Frontend (Vercel)
- Connect your Git repository to Vercel.
- In the project settings, set the Root Directory to `frontend`.
- Vercel auto-detects Next.js; ensure build command is `npm run build` and output is default.
- Add an environment variable `NEXT_PUBLIC_API_BASE_URL` with your Render backend URL (example: `https://your-backend.onrender.com`).
- (Optional) Use `vercel --prod` or Vercel web UI to deploy.

Backend (Render)
- Create a new Web Service on Render.
- Environment: `Python 3` (or use Docker for custom images).
- Build Command: `pip install -r requirements.txt`.
- Start Command: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`.
- Set the `PORT` env var to the default Render `$PORT` (Render injects it automatically).
- Use `render.yaml` (included) to configure auto-deploy from your repo.

Troubleshooting tip (ModuleNotFoundError: No module named 'app')
- If Render logs show "ModuleNotFoundError: No module named 'app'", it means Python couldn't import `app` because the package is under `backend/app`.
- Fixes:
	- Update the start command to use the full module path: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT` (this repo's `render.yaml` is already updated).
	- Or set `PYTHONPATH=backend` in your service env so `app` becomes importable: `PYTHONPATH=backend uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
	- Alternatively, run Uvicorn from the `backend` directory: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
- This repo also includes `.python-version` so Render does not default to Python 3.14.


Notes & caveats
- The backend uses heavy ML libraries (torch, transformers, chromadb). Consider using a Docker service or a machine with sufficient RAM/CPU; Render free/small plans may not suffice.
- Static `datasets/` folder mounted via FastAPI `StaticFiles` is ephemeral on most cloud hosts — use object storage (S3) for persistence in production.
- CORS: backend already allows all origins; consider restricting in production and using environment-based config.

Files added
- `frontend/vercel.json` – minimal Vercel config.
- `render.yaml` – Render service template for the backend.

If you want, I can:
- Create a `Dockerfile` for the backend and a Render Docker service definition.
- Add a GitHub Actions workflow to deploy the frontend and backend automatically.
