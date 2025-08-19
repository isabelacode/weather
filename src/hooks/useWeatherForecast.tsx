import { useState, useEffect } from 'react';
import { Coordinates as GetCoordinates } from '../components/Coordinates';
import { getNext7Days } from '../utils/weatherUtils';
import { useWeatherContext } from './useWeatherContext';

export interface DailyWeatherData {
  date: string;
  weather_code: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
}

export interface DailyWeatherDataResponse {
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export function useWeatherForecast() {
  const [data, setData] = useState<DailyWeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { coordinates, setCoordinates } = useWeatherContext();

  useEffect(() => {
    async function fetchDailyWeatherData() {
      try {
        setLoading(true);
        setError(null);
        
        let coords = coordinates;
        
        // Se não há coordenadas no contexto, usar localização do usuário
        if (!coords) {
          const userCoordinates = await GetCoordinates();
          coords = userCoordinates;
          setCoordinates(userCoordinates);
        }

        const { latitude, longitude } = coords;

        // Buscar dados diários dos próximos 7 dias
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`
        );

        if (!response.ok) {
          throw new Error('Erro ao buscar dados meteorológicos');
        }

        const weatherData: DailyWeatherDataResponse = await response.json();
        
        // Obter as datas dos próximos 7 dias a partir de hoje
        const next7Days = getNext7Days();
        
        // Filtrar apenas os dados das datas desejadas
        const filteredData: DailyWeatherData[] = [];
        
        next7Days.forEach(targetDate => {
          const dataIndex = weatherData.daily.time.findIndex(date => date === targetDate);
          if (dataIndex !== -1) {
            filteredData.push({
              date: weatherData.daily.time[dataIndex],
              weather_code: weatherData.daily.weather_code[dataIndex],
              temperature_2m_max: weatherData.daily.temperature_2m_max[dataIndex],
              temperature_2m_min: weatherData.daily.temperature_2m_min[dataIndex],
            });
          } else {
            // Fallback caso não tenhamos dados para essa data
            filteredData.push({
              date: targetDate,
              weather_code: 0, // Céu limpo como padrão
              temperature_2m_max: 25,
              temperature_2m_min: 15,
            });
          }
        });

        setData(filteredData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchDailyWeatherData();
  }, [coordinates, setCoordinates]);

  return { data, loading, error };
}
