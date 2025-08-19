import { useState } from 'react';
import type { ReactNode } from 'react';
import type { HourlyWeatherData } from '../hooks/useWeatherData';
import type { Coordinates } from '../utils/weatherUtils';
import { getCityCoordinates } from '../utils/weatherUtils';
import { WeatherContext } from './WeatherContext';

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [selectedHourData, setSelectedHourData] = useState<HourlyWeatherData | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [currentCity, setCurrentCity] = useState<string | null>(null);

  const searchCity = async (cityName: string) => {
    try {
      const cityCoordinates = await getCityCoordinates(cityName);
      setCoordinates(cityCoordinates);
      setCurrentCity(cityName);
    } catch (error) {
      console.error('Erro ao buscar cidade:', error);
      throw error;
    }
  };

  return (
    <WeatherContext.Provider 
      value={{ 
        selectedHourData, 
        setSelectedHourData,
        coordinates,
        setCoordinates,
        currentCity,
        setCurrentCity,
        searchCity
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
