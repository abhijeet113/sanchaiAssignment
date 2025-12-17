import React ,{ useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather("");

    try {
      const res = await axios.get("http://localhost:8000/get-weather", {
        params: { user_input: city },
      });
      console.log("Weather API response:", res.data);
      setWeather(res.data.weather_info.output);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🌤 Weather Checker
        </h2>

        <input
          type="text"
          placeholder="Enter city (e.g. Pune)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={getWeather}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Get Weather
        </button>

        {loading && (
          <p className="mt-4 text-center text-gray-500">Loading...</p>
        )}

        {error && (
          <p className="mt-4 text-center text-red-500">{error}</p>
        )}

        {weather && (
          <div className="mt-4 p-4 bg-gray-50 border rounded-lg text-gray-700 text-sm">
            {weather}
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
