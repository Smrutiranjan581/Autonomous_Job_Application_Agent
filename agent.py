import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

from src.resume_tools import parse_resume, extract_skills_from_resume
from src.job_tools import scrape_job_description, score_job_match
from src.communication_tools import save_cover_letter, send_application_email
from src.tracker_tools import track_application, get_application_report

load_dotenv()

SYSTEM_PROMPT = """You are an expert Job Application AI Agent. You help users:

1. PARSE & ANALYZE their resume
2. SCRAPE & SCORE job descriptions against their resume
3. GENERATE tailored cover letters
4. TRACK all job applications in a database
5. DRAFT & SEND application emails

PIPELINE you follow for each job application:
  Step 1 → Parse resume (if provided)
  Step 2 → Scrape or receive job description
  Step 3 → Score the match and identify gaps
  Step 4 → Generate a tailored cover letter
  Step 5 → Track the application
  Step 6 → Optionally send email

Always be proactive, structured, and guide the user through each step.
When generating cover letters, make them professional, specific, and compelling.
"""

def build_agent() -> AgentExecutor:
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3)

    tools = [
        parse_resume,
        extract_skills_from_resume,
        scrape_job_description,
        score_job_match,
        save_cover_letter,
        send_application_email,
        track_application,
        get_application_report,
    ]

    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT),
        MessagesPlaceholder("chat_history", optional=True),
        ("human", "{input}"),
        MessagesPlaceholder("agent_scratchpad"),
    ])

    agent = create_openai_tools_agent(llm, tools, prompt)
    executor = AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=True,
        max_iterations=10,
        handle_parsing_errors=True,
    )

    store = {}

    def get_session_history(session_id: str) -> BaseChatMessageHistory:
        if session_id not in store:
            store[session_id] = ChatMessageHistory()
        return store[session_id]

    return RunnableWithMessageHistory(
        executor,
        get_session_history,
        input_messages_key="input",
        history_messages_key="chat_history",
    )


def run_agent():
    print("\n🤖 Job Application AI Agent Ready!")
    print("=" * 50)
    print("Commands: 'quit' to exit | 'report' to see applications")
    print("=" * 50)

    agent_executor = build_agent()

    while True:
        user_input = input("\nYou: ").strip()
        if not user_input:
            continue
        if user_input.lower() in ["quit", "exit"]:
            print("Goodbye! Good luck with your applications! 🚀")
            break

        response = agent_executor.invoke(
            {"input": user_input},
            config={"configurable": {"session_id": "main"}}
        )
        print(f"\n🤖 Agent: {response['output']}")


if __name__ == "__main__":
    run_agent()
