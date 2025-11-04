import { useState, useEffect } from 'react';
import { Coordinates as GetCoordinates } from '../components/Coordinates';
import { reverseGeocode } from '../components/City';
import type { LocationInfo } from '../components/City';
import { useWeatherContext } from './useWeatherContext';

export function useLocation() {
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { coordinates, setCoordinates, currentCity } = useWeatherContext();

  useEffect(() => {
    async function fetchLocation() {
      try {
        setLoading(true);
        setError(null);

        if (currentCity) {
          setLocation({
            city: currentCity,
            state: '',
            country: ''
          });
          return;
        }

        let coords = coordinates;

        if (!coords) {
          const userCoordinates = await GetCoordinates();
          coords = userCoordinates;
          setCoordinates(userCoordinates);
        }

        const locationInfo = await reverseGeocode(coords);
        setLocation(locationInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchLocation();
  }, [coordinates, setCoordinates, currentCity]);

  return { location, loading, error };
}
