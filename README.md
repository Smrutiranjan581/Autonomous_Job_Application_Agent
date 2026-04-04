# Job Application AI Agent

## Architecture
```
INPUT (Resume + Job URL/Description + Preferences)
        ↓
ORCHESTRATOR (LangChain OpenAI Tools Agent + Memory)
        ↓
TOOL PIPELINE:
  ├── resume_tools.py     → Parse & extract resume content
  ├── job_tools.py        → Scrape job URLs & score match
  ├── communication_tools.py → Generate cover letters & send emails
  └── tracker_tools.py    → SQLite application tracker
        ↓
OUTPUT (Cover Letters / Match Scores / Tracker Reports)
```

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Add your API key to `.env`:
```
OPENAI_API_KEY=your_key_here
```

3. Run the agent:
```bash
python agent.py
```

## Example Prompts

- `"Parse my resume at data/resume.pdf and tell me my key skills"`
- `"Scrape this job: https://jobs.example.com/swe-role and score it against my resume"`
- `"Write a cover letter for the Software Engineer role at Google"`
- `"Track my application to Amazon for the Data Scientist role"`
- `"Show me my application report"`
- `"Send my cover letter to hr@company.com"`

## Project Structure
```
job_application_agent/
├── agent.py                  # Main orchestrator & entry point
├── requirements.txt
├── .env                      # API keys (never commit this)
├── src/
│   ├── resume_tools.py       # Resume parsing tools
│   ├── job_tools.py          # Job scraping & matching tools
│   ├── communication_tools.py # Cover letter & email tools
│   └── tracker_tools.py      # Application tracker (SQLite)
├── data/
│   └── applications.db       # Auto-created SQLite database
└── outputs/
    └── cover_letter.txt      # Generated cover letters
```
