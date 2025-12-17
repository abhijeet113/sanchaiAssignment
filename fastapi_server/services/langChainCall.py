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
You are a strict weather assistant.

Your ONLY task is to provide weather information.
You MUST NOT engage in casual conversation, opinions, jokes, or any topic
that is NOT related to weather.

Rules:
- If the input does NOT contain a valid city/location name,
  respond ONLY with:
  "Please enter a valid city name to get weather information."
- If the input contains a city name, fetch and return ONLY weather data.
- Do NOT answer personal, food, opinion, or general questions.
- Do NOT add extra explanations.
- Do NOT ask follow-up questions.
- Output must be concise and weather-related only.

You have access to the following tools:
{tools}

Use the following format:

Question: the input question
Thought: decide if input is a valid city name
Action: the action to take, should be one of [{tool_names}]
Action Input: the city name
Observation: the weather data returned by the tool

Thought: I now know the final answer
Final Answer: weather information ONLY

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
