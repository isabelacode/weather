import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ForecastInfo.css';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;


export const ForecastInfo = ({ city }) => {
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForecast = async (query) => {
            try {
                setError(null);
                const response = await axios.get(
                    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7&aqi=no&alerts=no&lang=pt`
                );
                setForecast(response.data.forecast.forecastday);
            } catch (err) {
                setError('Não foi possível obter a previsão. Verifique o nome da cidade ou a permissão de localização.');
            }
        };

        if (city) {
            fetchForecast(city);
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchForecast(`${latitude},${longitude}`);
                },
                () => {
                    setError('Permissão de localização negada ou indisponível.');
                }
            );
        }
    }, [city]);

    const formatDate = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="forecast-info">
            {error && <p className="error-message">{error}</p>}
            {forecast && (
                <div>
                    <h2>Previsão para os próximos 7 dias</h2>
                    <ul>
                        {forecast.map((day) => (
                            <li key={day.date} className="forecast-day">
                                <p>Data: {formatDate(day.date)}</p>
                                <p>Máx: {day.day.maxtemp_c}°C / Mín: {day.day.mintemp_c}°C</p>
                                <p>Condição: {day.day.condition.text}</p>
                                <img
                                    src={day.day.condition.icon}
                                    alt={day.day.condition.text}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
