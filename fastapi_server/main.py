from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow all origins (DEV only)
    allow_credentials=True,
    allow_methods=["*"],   # GET, POST, PUT, DELETE, etc
    allow_headers=["*"],   # Authorization, Content-Type, etc
)



@app.get("/")
def read_root():
    return {"message": "FastAPI is running 🚀"}


@app.get("/get-weather")
def get_weather(user_input: str):
    print("Received user input:", user_input)
    from services.langChainCall import agent
    result = agent.invoke({"input": user_input})
    return {"weather_info": result}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    