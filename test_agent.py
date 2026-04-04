import os, sys, traceback
from dotenv import load_dotenv
load_dotenv()

print("=== AGENT DIAGNOSTIC ===")
print(f"Python: {sys.version}")

# 1. Check API key
key = os.getenv("OPENAI_API_KEY", "")
print(f"API Key: {key[:14]}..." if key and not key.startswith("<") else "API Key: MISSING")

# 2. Check imports
try:
    from langchain_openai import ChatOpenAI
    print("langchain_openai: OK")
except Exception as e:
    print(f"langchain_openai: FAILED - {e}")

try:
    from langchain.agents import AgentExecutor, create_openai_tools_agent
    print("langchain agents: OK")
except Exception as e:
    print(f"langchain agents: FAILED - {e}")

# 3. Check tool imports
try:
    from src.resume_tools import parse_resume, extract_skills_from_resume
    from src.job_tools import scrape_job_description, score_job_match
    from src.communication_tools import save_cover_letter, send_application_email
    from src.tracker_tools import track_application, get_application_report
    print("All tools: OK")
except Exception as e:
    print(f"Tools: FAILED - {e}")
    traceback.print_exc()

# 4. Build agent
try:
    from agent import build_agent
    agent = build_agent()
    print("Agent build: OK")
except Exception as e:
    print(f"Agent build: FAILED - {e}")
    traceback.print_exc()
    sys.exit(1)

# 5. Real invocation
try:
    print("\nTesting real invocation...")
    response = agent.invoke(
        {"input": "Say hello in one sentence"},
        config={"configurable": {"session_id": "test"}}
    )
    print(f"Agent response: {response['output']}")
    print("\n=== ALL TESTS PASSED ===")
except Exception as e:
    print(f"Invocation FAILED: {e}")
    traceback.print_exc()
