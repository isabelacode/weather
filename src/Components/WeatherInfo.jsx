import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherInfo.css';
import { Graphic } from './Graphic';

export const WeatherInfo = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [selectedWeatherData, setSelectedWeatherData] = useState(null);

  useEffect(() => {
    const fetchLocationWeather = async (query) => {
      try {
        setError(null);
        const response = await axios.get(
          `http://fedora-1:5000/api/current?query=${query}`
        );
        setWeather(response.data);
      } catch (err) {
        setError('Não foi possível obter a localização. Tente novamente!');
      }
    };

    if (city) {
      fetchLocationWeather(city);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationWeather(`${latitude},${longitude}`);
        },
        (err) => {
          setError('Permissão de localização negada ou indisponível.');
        }
      );
    }
  }, [city]); 

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-info">
          <div className="title">
            <h2 className="titles">{weather.location.name}, {weather.location.country}</h2>
          </div>
          
          {selectedWeatherData ? (
            <div className="info">
              <div className="groupJoining">
                <div className="groupOne">
                  <img
                    src={selectedWeatherData.icon}
                    alt="weather icon"
                  />
                  <p>{selectedWeatherData.temperature}°C</p>
                </div>
                <div className="groupTwo">
                  <p>Umidade: {selectedWeatherData.humidity}%</p>
                  <p>Vento: {selectedWeatherData.windSpeed} km/h</p>
                </div>
              </div>
              <div className="groupthree">
                <p>Hora: {selectedWeatherData.hour}</p>
                <p>{selectedWeatherData.condition}</p>
              </div>
            </div>
          ) : (
            <div className="info">
              <div className="groupJoining">
                <div className="groupOne">
                  <img
                    src={weather.current.condition.icon}
                    alt="weather icon"
                  />
                  <p>{weather.current.temp_c}°C</p>
                </div>
                <div className="groupTwo">
                  <p>Umidade: {weather.current.humidity}%</p>
                  <p>Vento: {weather.current.wind_kph} km/h</p>
                </div>
              </div>
              <div className="groupthree">
                <p>{weather.current.condition.text}</p>
              </div>
            </div>
          )}
        </div>
      )}
      {weather && weather.forecast && weather.forecast.forecastday[0] && (
        <Graphic
          weatherData={weather.forecast}
          setSelectedWeatherData={setSelectedWeatherData} 
        />
      )}
    </div>
  );
};
