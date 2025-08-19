import { useState, useEffect } from 'react';
import { Coordinates } from '../components/Coordinates';

export interface HourlyWeatherData {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}

export interface WeatherDataResponse {
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
    weather_code: number[];
  };
}

export function useWeatherData() {
  const [data, setData] = useState<HourlyWeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHourlyWeatherData() {
      try {
        setLoading(true);
        const coordinates = await Coordinates();
        const { latitude, longitude } = coordinates;

        // Buscar dados horários das próximas 48 horas (2 dias) para garantir dados suficientes
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto&forecast_days=2`
        );

        if (!response.ok) {
          throw new Error('Erro ao buscar dados meteorológicos');
        }

        const weatherData: WeatherDataResponse = await response.json();
        
        // Transformar todos os dados primeiro
        const allData: HourlyWeatherData[] = weatherData.hourly.time.map((time, index) => ({
          time,
          temperature_2m: weatherData.hourly.temperature_2m[index],
          relative_humidity_2m: weatherData.hourly.relative_humidity_2m[index],
          wind_speed_10m: weatherData.hourly.wind_speed_10m[index],
          weather_code: weatherData.hourly.weather_code[index],
        }));

        // Encontrar o índice da hora atual ou próxima
        const now = new Date();
        const currentHour = now.getHours();
        
        const startIndex = allData.findIndex(item => {
          const itemDate = new Date(item.time);
          return itemDate.getHours() >= currentHour && itemDate >= now;
        });

        // Se não encontrar, começar do primeiro item
        const validStartIndex = startIndex >= 0 ? startIndex : 0;

        // Filtrar de 3 em 3 horas a partir do índice encontrado, máximo 8 intervalos
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
  }, []);

  return { data, loading, error };
}