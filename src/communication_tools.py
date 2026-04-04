import os
import smtplib
from email.mime.text import MIMEText
from langchain.tools import tool


@tool
def save_cover_letter(content: str) -> str:
    """
    Save a generated cover letter to the outputs folder.
    Input format: 'FILENAME: <name> ||| CONTENT: <letter_text>'
    """
    parts = content.split("|||")
    filename = "cover_letter.txt"
    text = content

    if len(parts) == 2:
        filename = parts[0].replace("FILENAME:", "").strip()
        text = parts[1].replace("CONTENT:", "").strip()

    os.makedirs("outputs", exist_ok=True)
    path = f"outputs/{filename}"
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    return f"Cover letter saved to {path}"


@tool
def send_application_email(details: str) -> str:
    """
    Send a job application email.
    Input format: 'TO: <email> ||| SUBJECT: <subject> ||| BODY: <body>'
    """
    try:
        parts = {p.split(":")[0].strip(): ":".join(p.split(":")[1:]).strip()
                 for p in details.split("|||")}
        to_email = parts.get("TO", "")
        subject = parts.get("SUBJECT", "Job Application")
        body = parts.get("BODY", "")

        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = os.getenv("EMAIL_ADDRESS")
        msg["To"] = to_email

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(os.getenv("EMAIL_ADDRESS"), os.getenv("EMAIL_PASSWORD"))
            server.send_message(msg)
        return f"Email sent successfully to {to_email}"
    except Exception as e:
        return f"Email failed (check .env credentials): {e}"
