import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  Snowflake,
  HelpCircle,
} from "lucide-react";
import type { JSX } from "react";


export function getWeatherInfo(weatherCode: number) {
  const weatherMap: { [key: number]: { icon: JSX.Element; description: string } } = {
    0: { icon: <Sun />, description: 'Céu limpo' },
    1: { icon: <CloudSun />, description: 'Principalmente limpo' },
    2: { icon: <Cloud />, description: 'Parcialmente nublado' },
    3: { icon: <Cloud />, description: 'Nublado' },
    45: { icon: <CloudFog />, description: 'Nevoeiro' },
    48: { icon: <CloudFog />, description: 'Nevoeiro com geada' },
    51: { icon: <CloudDrizzle />, description: 'Chuvisco leve' },
    53: { icon: <CloudRain />, description: 'Chuvisco moderado' },
    55: { icon: <CloudRain />, description: 'Chuvisco intenso' },
    56: { icon: <CloudSnow />, description: 'Chuvisco gelado leve' },
    57: { icon: <CloudSnow />, description: 'Chuvisco gelado intenso' },
    61: { icon: <CloudRain />, description: 'Chuva leve' },
    63: { icon: <CloudRain />, description: 'Chuva moderada' },
    65: { icon: <CloudRain />, description: 'Chuva intensa' },
    66: { icon: <CloudSnow />, description: 'Chuva gelada leve' },
    67: { icon: <CloudSnow />, description: 'Chuva gelada intensa' },
    71: { icon: <Snowflake />, description: 'Neve leve' },
    73: { icon: <Snowflake />, description: 'Neve moderada' },
    75: { icon: <Snowflake />, description: 'Neve intensa' },
    77: { icon: <Snowflake />, description: 'Grãos de neve' },
    80: { icon: <CloudRain />, description: 'Pancadas de chuva leves' },
    81: { icon: <CloudRain />, description: 'Pancadas de chuva moderadas' },
    82: { icon: <CloudRain />, description: 'Pancadas de chuva violentas' },
    85: { icon: <CloudSnow />, description: 'Pancadas de neve leves' },
    86: { icon: <CloudSnow />, description: 'Pancadas de neve intensas' },
    95: { icon: <CloudRain />, description: 'Tempestade' },
    96: { icon: <CloudRain />, description: 'Tempestade com granizo leve' },
    99: { icon: <CloudRain />, description: 'Tempestade com granizo intenso' },
  };

  return weatherMap[weatherCode] || { icon: <HelpCircle />, description: 'Desconhecido' };
}

export function getDayName(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Hoje';
  }

  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Amanhã';
  }

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  return dayNames[date.getDay()];
}

export function getNext7Days(): string[] {
  const today = new Date();
  const dates: string[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }

  return dates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export async function getCityCoordinates(cityName: string): Promise<Coordinates> {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=pt&format=json`
    );

    if (!response.ok) {
      throw new Error('Erro ao conectar com o serviço de busca de cidades');
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error(`Cidade "${cityName}" não encontrada. Verifique se o nome está correto.`);
    }

    const city = data.results[0];
    return {
      latitude: city.latitude,
      longitude: city.longitude,
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes('não encontrada')) {
      throw error;
    }
    throw new Error('Erro ao buscar informações da cidade. Tente novamente.');
  }
}
