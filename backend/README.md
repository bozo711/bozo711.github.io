# Polyglot backend (Python + PHP + Java)
One container exposes all three: `/api/python`, `/api/php`, `/api/java`.

## Deploy free on Render
1. Push this repo to GitHub.
2. Render.com → New → Web Service → pick the repo.
3. Runtime: **Docker**, Dockerfile path: `backend/Dockerfile`, root dir: `backend`.
4. Deploy. Copy the URL (e.g. https://jarvis-polyglot.onrender.com).
5. In the app's ⚛ Physics lab, paste that URL into "Polyglot backend URL".

## Run locally (Mac, needs php + java installed)
    cd backend && python3 server.py    # http://localhost:8080/api/python?n=10
