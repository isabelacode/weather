import { useState, useEffect } from 'react';
import { Coordinates as GetCoordinates } from '../components/Coordinates';
import { useWeatherContext } from './useWeatherContext';

export interface HourlyWeatherData {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}

export interface DailyWeatherData {
  date: string;
  weather_code: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
}

export interface WeatherDataResponse {
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
    weather_code: number[];
  };
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export function useWeatherData() {
  const [data, setData] = useState<HourlyWeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { coordinates, setCoordinates } = useWeatherContext();

  useEffect(() => {
    async function fetchHourlyWeatherData() {
      try {
        setLoading(true);
        setError(null);

        let coords = coordinates;

        if (!coords) {
          const userCoordinates = await GetCoordinates();
          coords = userCoordinates;
          setCoordinates(userCoordinates);
        }

        const { latitude, longitude } = coords;

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto&forecast_days=2`
        );

        if (!response.ok) {
          throw new Error('Erro ao buscar dados meteorológicos');
        }

        const weatherData: WeatherDataResponse = await response.json();

        const allData: HourlyWeatherData[] = weatherData.hourly.time.map((time, index) => ({
          time,
          temperature_2m: weatherData.hourly.temperature_2m[index],
          relative_humidity_2m: weatherData.hourly.relative_humidity_2m[index],
          wind_speed_10m: weatherData.hourly.wind_speed_10m[index],
          weather_code: weatherData.hourly.weather_code[index],
        }));

        const now = new Date();
        const currentHour = now.getHours();

        const startIndex = allData.findIndex(item => {
          const itemDate = new Date(item.time);
          return itemDate.getHours() >= currentHour && itemDate >= now;
        });

        const validStartIndex = startIndex >= 0 ? startIndex : 0;

        const filteredData: HourlyWeatherData[] = [];
        for (let i = validStartIndex; i < allData.length && filteredData.length < 8; i += 3) {
          filteredData.push(allData[i]);
        }

        setData(filteredData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchHourlyWeatherData();
  }, [coordinates, setCoordinates]);

  return { data, loading, error };
}