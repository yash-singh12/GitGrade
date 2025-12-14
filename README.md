# GitGrade 🚀

> **Turn your GitHub into a Hiring Magnet.**

GitGrade is an intelligent, AI-powered system that acts as a **Technical Recruiter** for your code. It analyzes your GitHub repositories without cloning them, providing an instant employability score, professional feedback, and a personalized roadmap to help you land your next job.

---

## ✨ Key Features

### 🧠 AI-Powered Analysis
- **"Recruiter Persona"**: Uses Google Gemini (Flash Model) to evaluate code not just for syntax, but for employability, structure, and best practices.
- **Smart Spot-Check**: Analyzes project architecture, `README` quality, and key source files to form a holistic opinion in seconds.
- **In-Memory Processing**: Secure and fast—no code is ever cloned or stored on our servers.

### 🎨 Premium Frontend Experience
- **Modern Design**: Sleek, "Git Good" inspired aesthetic with a vibrant Orange brand identity.
- **Interactive Reports**:
    - **Score Gauge**: Animated visual representation of your repository's health.
    - **Metrics Dashboard**: Detailed breakdown of Documentation, Complexity, and Best Practices.
    - **Actionable Roadmap**: A checklist of concrete steps to improve your project.
- **Smooth UX**: Glassmorphism navbar, framer-motion animations, and responsive layout.

### ⚡ Technical Highlights
- **FastAPI Backend**: High-performance Python API handling asynchronous GitHub data fetching.
- **Next.js Frontend**: Server-side rendering and optimized client interactions.
- **Zero-Config Deployment**: Ready for Vercel (Frontend) and Render (Backend).

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Python, FastAPI, Uvicorn, Google Gemini API, HTTPX.
- **Tools**: Git, npm, pip.

---

## 🚀 Getting Started

### 1. Backend Setup
```bash
cd backend
# Create virtual env (optional)
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up Environment Variables
cp .env.example .env
# Open .env and add your GEMINI_API_KEY (Get it from https://aistudio.google.com/app/apikey)

# Run Server
uvicorn main:app --reload

```
*Server runs at `http://localhost:8000`*

### 2. Frontend Setup
```bash
cd frontend
# Install dependencies
npm install

# Run Development Server
npm run dev
```
*App runs at `http://localhost:3000`*

---

## 📦 Short Description (For Portfolio/Socials)

**GitGrade** is an AI-powered developer tool that helps engineers improve their GitHub portfolios. By leveraging the **Google Gemini LLM**, it simulates a technical recruiter's review process, scanning repositories to provide an **Employability Score (0-100)**, a professional summary, and a tailored roadmap for improvement. Built with **Next.js** and **FastAPI**, it features a secure, in-memory analysis engine and a premium, animated UI designed to turn code into a career asset.

---

## 📄 License
MIT License.
