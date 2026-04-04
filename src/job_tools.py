import requests
from bs4 import BeautifulSoup
from langchain.tools import tool


@tool
def scrape_job_description(url: str) -> str:
    """Scrape job description from a job posting URL."""
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")
        for tag in soup(["script", "style", "nav", "footer"]):
            tag.decompose()
        text = soup.get_text(separator="\n", strip=True)
        return text[:4000]
    except Exception as e:
        return f"Could not scrape URL: {e}. Please paste the job description manually."


@tool
def score_job_match(input_text: str) -> str:
    """
    Score how well a resume matches a job description.
    Input format: 'RESUME: <resume_text> ||| JOB: <job_description>'
    """
    parts = input_text.split("|||")
    if len(parts) != 2:
        return "Please provide input as: 'RESUME: <text> ||| JOB: <text>'"
    resume = parts[0].replace("RESUME:", "").strip()
    job = parts[1].replace("JOB:", "").strip()
    resume_words = set(resume.lower().split())
    job_words = set(job.lower().split())
    common = resume_words & job_words
    score = min(100, int((len(common) / max(len(job_words), 1)) * 200))
    return f"Match Score: {score}/100\nAnalysis ready for LLM deep scoring."
