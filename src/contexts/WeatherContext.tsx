import { createContext } from 'react';
import type { HourlyWeatherData } from '../hooks/useWeatherData';
import type { Coordinates } from '../utils/weatherUtils';

export interface WeatherContextType {
  selectedHourData: HourlyWeatherData | null;
  setSelectedHourData: (data: HourlyWeatherData | null) => void;
  coordinates: Coordinates | null;
  setCoordinates: (coordinates: Coordinates | null) => void;
  currentCity: string | null;
  setCurrentCity: (city: string | null) => void;
  searchCity: (cityName: string) => Promise<void>;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);
