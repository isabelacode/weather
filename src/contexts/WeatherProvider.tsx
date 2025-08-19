import { useState } from 'react';
import type { ReactNode } from 'react';
import type { HourlyWeatherData } from '../hooks/useWeatherData';
import { WeatherContext } from './WeatherContext';

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [selectedHourData, setSelectedHourData] = useState<HourlyWeatherData | null>(null);

  return (
    <WeatherContext.Provider value={{ selectedHourData, setSelectedHourData }}>
      {children}
    </WeatherContext.Provider>
  );
}
