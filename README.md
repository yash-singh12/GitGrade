# GitGrade 🚀

GitGrade is an AI-powered "Recruiter" that analyzes your GitHub repository and gives you a score, summary, and personalized roadmap to get hired.

## Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion
- **Backend**: FastAPI (Python), Google Gemini 1.5 Flash
- **Deployment**: Vercel (Frontend) + Render (Backend)

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
# Create virtual env (optional but recommended)
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run Server
uvicorn main:app --reload
```
The API will be available at `http://localhost:8000`.

### 2. Frontend Setup
```bash
cd frontend
# Install dependencies
npm install

# Run Development Server
npm run dev
```
Open `http://localhost:3000` in your browser.

## Deployment

### Backend (Render)
1. Create a new Web Service on Render.
2. Connect your repo.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables**: Add `GEMINI_API_KEY`.

### Frontend (Vercel)
1. Import project to Vercel.
2. Framework Preset: Next.js.
3. Deploy!
