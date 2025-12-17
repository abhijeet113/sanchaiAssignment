import os
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain.agents import create_react_agent, AgentExecutor
from langchain.prompts import PromptTemplate
from langchain.tools import Tool

from services.weather import weatherdata

load_dotenv()

# Optional calculator tool (kept for future use)
def calculator(expression: str) -> str:
    try:
        return str(eval(expression))
    except Exception as e:
        return f"Error: {e}"


# LLM (OpenRouter)
llm = ChatOpenAI(
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),
    openai_api_base="https://openrouter.ai/api/v1",
    model="xiaomi/mimo-v2-flash:free",
    temperature=0
)

# Tools
tools = [
    Tool(
        name="Weather",
        func=weatherdata,
        description="Get current weather information for a given city",
        return_direct=True
    )
]
# ReAct Prompt (required in new API)
prompt = PromptTemplate.from_template("""
You are a helpful assistant with access to the following tools:

{tools}

Use the following format:

Question: the input question
Thought: you should think step by step
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action

Thought: I now know the final answer
Final Answer: the final answer to the user

Question: {input}

{agent_scratchpad}
""")


# Create ReAct Agent
react_agent = create_react_agent(
    llm=llm,
    tools=tools,
    prompt=prompt
)

# Agent Executor
agent = AgentExecutor(
    agent=react_agent,
    tools=tools,
    verbose=False,
    handle_parsing_errors=True
)

# Test run (optional)
if __name__ == "__main__":
    response = agent.invoke({"input": "What is the weather in Pune?"})
    print(response["output"])
