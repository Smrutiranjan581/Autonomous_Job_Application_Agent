# 🤖 AutoNums — Autonomous AI Job Application Agent

[![Python](https://img.shields.io/badge/Python-3.10-blue?style=for-the-badge&logo=python)](https://python.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-green?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-black?style=for-the-badge&logo=openai)](https://openai.com)
[![LangChain](https://img.shields.io/badge/LangChain-0.2-yellow?style=for-the-badge)](https://langchain.com)

*An autonomous AI agent that searches job listings, tailors resumes, writes cover letters, and tracks applications — all on your behalf.*

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Agent Architecture](#-agent-architecture)
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
2. Automatically **searches job listings** from multiple platforms
3. **Tailors your resume** for each job using AI
4. **Tracks all applications** in a live dashboard with status updates
5. Allows **chat-based interaction** to query your job search progress

---

## 🤖 Agent Architecture

```
User Input (Profile + Job Preferences)
              │
              ▼
       ┌─────────────┐
       │  agent.py   │  ← Main AI Agent (Orchestrator)
       └──────┬──────┘
              │
    ┌─────────▼──────────┐
    │     src/ Tools     │
    ├────────────────────┤
    │  job_tools.py      │  ← Job search & filtering
    │  resume_tools.py   │  ← Resume parsing & tailoring
    │  tracker_tools.py  │  ← Application status tracking
    │  communication_    │  ← Email & notification tools
    │  tools.py          │
    └────────────────────┘
              │
    ┌─────────▼──────────┐
    │     app.py         │  ← FastAPI Backend Server
    └─────────┬──────────┘
              │
    ┌─────────▼──────────┐
    │    ui/ Frontend    │  ← React + Vite UI
    └────────────────────┘
```

| Module | Responsibility |
|--------|---------------|
| **agent.py** | Main AI agent — orchestrates the full pipeline |
| **job_tools.py** | Searches, filters, and ranks job listings |
| **resume_tools.py** | Parses resume and tailors it per job description |
| **tracker_tools.py** | Tracks application status (Applied / Viewed / Replied) |
| **communication_tools.py** | Handles email drafting and notifications |
| **app.py** | FastAPI backend — exposes REST API endpoints |
| **test_agent.py** | Unit tests for agent and tools |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Python 3.10, FastAPI, Uvicorn |
| **AI / LLM** | OpenAI GPT-4o-mini, LangChain |
| **Frontend** | React 18, Vite, JavaScript |
| **UI Components** | ChatInput, ChatWindow, Sidebar, PDFModal, ReportModal, Header |
| **Resume Parsing** | PyPDF2 / python-docx |
| **Env Management** | python-dotenv |
| **Package Manager** | npm (frontend), pip (backend) |

---

## 📁 Project Structure

```
autonums-job-application/
│
├── src/                              # Python backend tools
│   ├── __init__.py
│   ├── communication_tools.py        # Email & notification handling
│   ├── job_tools.py                  # Job search & ranking logic
│   ├── resume_tools.py               # Resume parsing & AI tailoring
│   └── tracker_tools.py             # Application tracker logic
│
├── ui/                               # React + Vite frontend
│   ├── dist/                         # Production build output
│   ├── public/                       # Static assets
│   ├── src/
│   │   ├── assets/                   # Images, icons
│   │   ├── components/
│   │   │   ├── ChatInput.jsx         # Chat message input bar
│   │   │   ├── ChatWindow.jsx        # Chat conversation display
│   │   │   ├── Header.jsx            # Top navigation header
│   │   │   ├── PDFModal.jsx          # Resume/PDF preview modal
│   │   │   ├── ReportModal.jsx       # Application report modal
│   │   │   └── Sidebar.jsx           # Navigation sidebar
│   │   ├── api.js                    # API calls to backend
│   │   ├── App.css                   # Global app styles
│   │   ├── App.jsx                   # Root React component
│   │   ├── index.css                 # Base CSS styles
│   │   └── main.jsx                  # React entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── data/                             # Job data & stored results
├── frontend/                         # Additional frontend assets
├── outputs/                          # Generated resumes & cover letters
│
├── agent.py                          # Main AI agent entry point
├── app.py                            # FastAPI backend server
├── test_agent.py                     # Agent unit tests
├── .env                              # Environment variables
├── requirements.txt                  # Python dependencies
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites

- **Python 3.10+**
- **Node.js 18+** and **npm**
- An **OpenAI API key** → [Get one here](https://platform.openai.com/api-keys)
- Git

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/<your-username>/autonums-job-application.git
cd autonums-job-application
```

---

### Step 2 — Backend Setup (Python)

**Create virtual environment:**

```bash
python -m venv venv
```

**Activate it:**

Windows:
```bash
venv\Scripts\activate
```

macOS / Linux:
```bash
source venv/bin/activate
```

**Install dependencies:**

```bash
pip install -r requirements.txt
```

---

### Step 3 — Frontend Setup (React + Vite)

```bash
cd ui
npm install
```

---

### Step 4 — Configure Environment Variables

```bash
cp .env.example .env
```

Open `.env` and fill in:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

---

## 🚀 Running the Project

Open **two separate terminals**.

### Terminal 1 — Run the Backend

```bash
venv\Scripts\activate
python app.py
```

Backend starts at → `http://localhost:8000`

---

### Terminal 2 — Run the Frontend

```bash
cd ui
npm run dev
```

Frontend opens at → `http://localhost:5173`

---

## ✨ Features

- 💬 **Chat-based interface** — interact with the AI agent via ChatWindow & ChatInput
- 🔍 **Automated job search** — finds relevant jobs based on your profile
- 📄 **AI resume tailoring** — customizes your resume per job description
- 📊 **Application tracker** — tracks Applied / Viewed / Replied status
- 📁 **PDF preview** — view resumes and reports directly in the browser via PDFModal
- 📋 **Report generation** — detailed application reports via ReportModal
- 🔔 **Communication tools** — email drafting and notification support

---

## 🎯 Example Usage

### Job Preferences to Try

```
Software Engineer, Python, 2 years experience, remote
Data Analyst, fresher, Bangalore, ₹4-8 LPA
Full Stack Developer, React + Node.js, Hyderabad
ML Engineer, NLP, 3+ years, any metro city
```

### Chat Questions to Ask the Agent

```
How many jobs have I applied to this week?
Show me jobs matching my Python skills
Generate a tailored resume for this job description
What is the status of my recent applications?
Draft a cover letter for this role
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

*Built with ❤️ by the team — powered by LangChain, OpenAI, React, and FastAPI*
