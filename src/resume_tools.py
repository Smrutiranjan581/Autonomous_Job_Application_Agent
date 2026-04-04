import PyPDF2
from langchain.tools import tool


@tool
def parse_resume(file_path: str) -> str:
    """Parse a resume from a PDF or text file and extract its content."""
    if file_path.endswith(".pdf"):
        with open(file_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            return "\n".join(page.extract_text() for page in reader.pages)
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()


@tool
def extract_skills_from_resume(resume_text: str) -> str:
    """Extract key skills, experience, and education from resume text."""
    return f"Resume content ready for analysis:\n{resume_text[:3000]}"
