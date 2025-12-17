import requests
import os
from dotenv import load_dotenv

load_dotenv()

# print(os.getenv("WEATHER_API_Key"))



def weatherdata(city_name: str):
    
    print("Fetching weather for:", city_name)
    try:
        url = "https://weather-api138.p.rapidapi.com/weather"

        headers = {
            "x-rapidapi-key": os.getenv("WEATHER_API_Key"),
            "x-rapidapi-host": "weather-api138.p.rapidapi.com"
        }

        params = {
            "city_name": city_name
        }

        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        
        data=response.json()
        
        temp_celsius = round(data["main"]["temp"] - 273.15, 2)
        description = data["weather"][0]["description"]
        humidity = data["main"]["humidity"]
        wind_speed = data["wind"]["speed"]
        city = data["name"]
        country = data["sys"]["country"]

        statement = (
            f"The weather in {city}, {country} is {description}. "
            f"The temperature is {temp_celsius}°C, "
            f"humidity is {humidity}%, "
            f"and wind speed is {wind_speed} m/s."
        )

        return statement

    except Exception as e:
        # IMPORTANT: Return string, not None
        return f"Sorry, I couldn't fetch the weather for {city_name}. Error: {str(e)}"


# print(weatherdata("Pune"))

