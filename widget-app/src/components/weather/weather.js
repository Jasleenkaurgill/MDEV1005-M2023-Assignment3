import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Header from "../header/header";

const Weather = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        // Fetch weather data from the API
        fetch("https://api.open-meteo.com/v1/forecast?latitude=44.4001&longitude=-79.6663&hourly=temperature_2m")
            .then((response) => response.json())
            .then((data) => setWeatherData(data))
            .catch((error) => console.error(error));
    }, []);

    if (!user) {
        navigate("/login");
    }

    return (
        <>
            <Header />
            <div className="weather-container">
                {weatherData ? (
                    <>
                        <h2 className="weather-title">Weather Forecast for Barrie</h2>
                        <div className="weather-card">
                            <p>Current Temperature: {weatherData.hourly.temperature_2m[0]} °C</p>
                            <p>Next 24 Hours:</p>
                            <ul>
                                {weatherData.hourly.time.slice(1, 25).map((time, index) => (
                                    <li key={time}>
                                        Time: {time}, Temperature: {weatherData.hourly.temperature_2m[index + 1]} °C
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : (
                    <p>Loading weather data...</p>
                )}
            </div>
        </>
    );
};

export default Weather;
