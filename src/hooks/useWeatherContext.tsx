import { useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';

export function useWeatherContext() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeatherContext deve ser usado dentro de um WeatherProvider');
  }
  return context;
}
