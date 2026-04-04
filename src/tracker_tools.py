import sqlite3
from datetime import datetime
from langchain.tools import tool

DB_PATH = "data/applications.db"


def _get_conn():
    import os
    os.makedirs("data", exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company TEXT, role TEXT, status TEXT,
            date_applied TEXT, notes TEXT
        )
    """)
    conn.commit()
    return conn


@tool
def track_application(details: str) -> str:
    """
    Save a job application to the tracker database.
    Input format: 'COMPANY: <name> ||| ROLE: <title> ||| STATUS: <status> ||| NOTES: <notes>'
    """
    parts = {p.split(":")[0].strip(): ":".join(p.split(":")[1:]).strip()
             for p in details.split("|||")}
    conn = _get_conn()
    conn.execute(
        "INSERT INTO applications (company, role, status, date_applied, notes) VALUES (?,?,?,?,?)",
        (parts.get("COMPANY", "Unknown"), parts.get("ROLE", "Unknown"),
         parts.get("STATUS", "Applied"), datetime.now().strftime("%Y-%m-%d"),
         parts.get("NOTES", ""))
    )
    conn.commit()
    conn.close()
    return f"Application tracked: {parts.get('COMPANY')} - {parts.get('ROLE')}"


@tool
def get_application_report(query: str = "all") -> str:
    """Get a report of all tracked job applications."""
    conn = _get_conn()
    rows = conn.execute(
        "SELECT company, role, status, date_applied, notes FROM applications ORDER BY date_applied DESC"
    ).fetchall()
    conn.close()
    if not rows:
        return "No applications tracked yet."
    report = "=== APPLICATION TRACKER ===\n"
    for r in rows:
        report += f"\n📌 {r[0]} | {r[1]} | Status: {r[2]} | Date: {r[3]}\n   Notes: {r[4]}\n"
    return report
