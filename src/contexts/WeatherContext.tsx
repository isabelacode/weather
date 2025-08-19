import { createContext } from 'react';
import type { HourlyWeatherData } from '../hooks/useWeatherData';

export interface WeatherContextType {
  selectedHourData: HourlyWeatherData | null;
  setSelectedHourData: (data: HourlyWeatherData | null) => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);
