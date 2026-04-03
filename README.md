# 🤖 AutoNums — Autonomous AI Job Application Agent

[![Python](https://img.shields.io/badge/Python-3.10-blue?style=for-the-badge&logo=python)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-green?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.35-red?style=for-the-badge&logo=streamlit)](https://streamlit.io)
[![LangChain](https://img.shields.io/badge/LangChain-0.2-yellow?style=for-the-badge)](https://langchain.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-black?style=for-the-badge&logo=openai)](https://openai.com)
[![Selenium](https://img.shields.io/badge/Selenium-4.x-darkgreen?style=for-the-badge&logo=selenium)](https://selenium.dev)

*An autonomous multi-agent AI system that searches job listings, tailors resumes, writes cover letters, and applies to jobs — all on your behalf.*

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Multi-Agent Architecture](#-multi-agent-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Running the Project](#-running-the-project)
- [Features](#-features)
- [Example Usage](#-example-usage)
- [Team](#-team)

---

## 🧠 Project Overview

**AutoNums** is an intelligent job application assistant that automates the entire job-hunting pipeline:

1. Accepts your **profile, skills, and job preferences** as input
2. Automatically **searches job listings** from LinkedIn, Indeed, and Naukri
3. **Filters and ranks** jobs based on your profile match score
4. **Tailors your resume** for each job using AI
5. **Generates a custom cover letter** per application
6. **Auto-fills and submits** applications via browser automation
7. **Tracks all applications** in a live dashboard with status updates

---

## 🤖 Multi-Agent Architecture

```
User Profile + Job Preferences
           │
           ▼
┌──────────────────────┐
│  Coordinator Agent   │  ← Orchestrates the entire pipeline
└──────────┬───────────┘
           │
    ┌──────▼───────┐
    │  Search Agent │  ← Scrapes LinkedIn, Indeed, Naukri
    └──────┬───────┘
           │
   ┌───────▼────────┐
   │  Ranker Agent  │  ← Scores jobs by profile match %
   └───────┬────────┘
           │
   ┌───────▼──────────┐
   │  Resume Agent    │  ← Tailors resume per job description
   └───────┬──────────┘
           │
   ┌───────▼──────────────┐
   │  Cover Letter Agent  │  ← Writes personalized cover letters
   └───────┬──────────────┘
           │
   ┌───────▼──────────────┐
   │  Application Agent   │  ← Auto-fills & submits applications
   └───────┬──────────────┘
           │
   ┌───────▼──────────┐
   │  Tracker Agent   │  ← Logs status: Applied / Viewed / Replied
   └──────────────────┘
```

| Agent | Responsibility |
|-------|---------------|
| **Search Agent** | Fetches & deduplicates job listings from multiple platforms |
| **Ranker Agent** | Scores each job on skill match, experience, location, and salary |
| **Resume Agent** | Rewrites resume sections to align with each job description |
| **Cover Letter Agent** | Generates personalized, role-specific cover letters |
| **Application Agent** | Uses browser automation to fill and submit job forms |
| **Tracker Agent** | Maintains a live dashboard of all applications and their status |
| **Coordinator Agent** | Orchestrates all 6 stages in the correct sequence |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Python 3.10, FastAPI, Uvicorn |
| **AI / LLM** | OpenAI GPT-4o-mini via LangChain |
| **Browser Automation** | Selenium, Playwright |
| **Job Scraping** | BeautifulSoup4, Requests, LinkedIn API |
| **Resume Parsing** | PyPDF2, python-docx |
| **Frontend** | Streamlit |
| **Database** | SQLite (application tracker) |
| **Env Management** | python-dotenv |
| **Resilience** | Tenacity (retry with exponential backoff) |

---

## 📁 Project Structure

```
autonums-job-application/
│
├── backend/
│   ├── main.py                          # FastAPI app entry point
│   ├── config.py                        # All env vars & constants
│   │
│   ├── agents/
│   │   ├── search_agent.py              # Multi-platform job search & dedup
│   │   ├── ranker_agent.py              # Job scoring & profile matching
│   │   ├── resume_agent.py              # AI-powered resume tailoring
│   │   ├── cover_letter_agent.py        # Personalized cover letter writer
│   │   ├── application_agent.py         # Browser automation & form-filling
│   │   ├── tracker_agent.py             # Application status tracking
│   │   └── coordinator_agent.py         # Pipeline orchestrator
│   │
│   ├── services/
│   │   ├── linkedin_service.py          # LinkedIn scraper / API client
│   │   ├── indeed_service.py            # Indeed job listing client
│   │   ├── naukri_service.py            # Naukri.com scraper
│   │   ├── resume_parser.py             # PDF/DOCX resume text extraction
│   │   ├── browser_driver.py            # Selenium/Playwright driver setup
│   │   └── db_service.py                # SQLite tracker database
│   │
│   └── routes/
│       ├── jobs_route.py                # POST /api/jobs/search
│       ├── apply_route.py               # POST /api/jobs/apply
│       └── tracker_route.py             # GET  /api/tracker
│
├── frontend/
│   └── streamlit_app.py                 # 4-tab Streamlit UI
│
├── data/
│   ├── resumes/                         # Uploaded & tailored resume files
│   ├── cover_letters/                   # Generated cover letters
│   └── tracker.db                       # SQLite application tracker (auto-created)
│
├── requirements.txt
├── .env.example
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites

- **Python 3.10** (strictly required — use `py -3.10` on Windows)
- An **OpenAI API key** → [Get one here](https://platform.openai.com/api-keys) *(or use Groq API — it's free)*
- **Google Chrome** browser installed (for Selenium automation)
- Git

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/<your-username>/autonums-job-application.git
cd autonums-job-application
```

---

### Step 2 — Create a Virtual Environment (Python 3.10)

> ⚠️ **Important:** This project requires Python 3.10 specifically.

**Windows:**
```bash
py -3.10 -m venv venv
```

**macOS / Linux:**
```bash
python3.10 -m venv venv
```

---

### Step 3 — Activate the Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**macOS / Linux:**
```bash
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

---

### Step 4 — Install Dependencies

```bash
pip install -r requirements.txt
```

> First-time setup will install Selenium drivers automatically via `webdriver-manager`.

---

### Step 5 — Configure Environment Variables

```bash
cp .env.example .env
```

Open `.env` and fill in your keys:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
LINKEDIN_EMAIL=your-linkedin-email@example.com
LINKEDIN_PASSWORD=your-linkedin-password
BACKEND_URL=http://localhost:8000
DB_PATH=./data/tracker.db
MAX_JOBS_PER_SOURCE=10
HEADLESS_BROWSER=true
```

> 💡 Set `HEADLESS_BROWSER=false` if you want to watch the browser automation in real time.

---

## 🚀 Running the Project

Open **two separate terminals**, both with the virtual environment activated.

### Terminal 1 — Run the Backend (FastAPI)

```bash
venv\Scripts\activate

cd backend
python main.py
```

Backend will start at → `http://localhost:8000`  
API docs available at → `http://localhost:8000/docs`

---

### Terminal 2 — Run the Frontend (Streamlit)

```bash
venv\Scripts\activate

cd frontend
streamlit run streamlit_app.py
```

Frontend will open at → `http://localhost:8501`

---

## ✨ Features

- 🔍 **Multi-platform job search** across LinkedIn, Indeed, and Naukri simultaneously
- 🎯 **AI-powered job ranking** — scores each job by your profile match percentage
- 📄 **Smart resume tailoring** — rewrites your resume to match each job description
- ✉️ **Custom cover letter generation** — personalized, professional, role-specific
- 🤖 **Automated application submission** — fills and submits forms via browser automation
- 📊 **Live application tracker dashboard** — Applied / Viewed / Interview / Rejected status
- 💾 **Persistent SQLite database** — your application history is saved across sessions
- 📥 **Download tailored resumes & cover letters** as `.pdf` or `.docx` files

---

## 🎯 Example Usage

### Job Search Preferences to Try

```
Software Engineer with 2 years Python experience, remote, Bangalore
Data Analyst, fresher, open to relocation, ₹4-8 LPA
Full Stack Developer, React + Node.js, Hyderabad or remote
ML Engineer, NLP specialization, 3+ years, any metro city
DevOps Engineer, AWS + Kubernetes, Pune, ₹10-15 LPA
```

### Example Tracker Questions (in the dashboard)

```
How many jobs have I applied to this week?
Which applications are still awaiting a response?
What is my average match score across applied jobs?
Which companies have viewed my profile?
How many interviews have been scheduled?
```

---

## 👥 Team

| Name | GitHub |
|------|--------|
| Jan Adnan Farooq | [@adnaan-dev](https://github.com/adnaan-dev) |
| Abhishek | [@Abhishek-134](https://github.com/Abhishek-134) |
| Akeem Ali | [@Akeem786](https://github.com/Akeem786) |
| Mohammad Aakib Bhat | [@bhataakib02](https://github.com/bhataakib02) |
| Mayank Mihir | [@mayankkmk77](https://github.com/mayankkmk77) |
| Saqib Mokhtar | [@saqibmokhtar884](https://github.com/saqibmokhtar884) |
| Satakshik Chaurasia | [@satakshik-chaurasia](https://github.com/satakshik-chaurasia) |
| Sradha Ram | [@Sradha2474](https://github.com/Sradha2474) |

---

## 📄 License

This project is developed as part of an academic group project at **C.V. Raman Global University**.

---

*Built with ❤️ by the team — powered by LangChain, OpenAI, Selenium, and Streamlit*
