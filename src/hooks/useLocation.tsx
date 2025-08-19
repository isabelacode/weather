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
        
        // Se há uma cidade pesquisada, usar o nome da cidade diretamente
        if (currentCity) {
          setLocation({
            city: currentCity,
            state: '',
            country: ''
          });
          return;
        }
        
        let coords = coordinates;
        
        // Se não há coordenadas no contexto, usar localização do usuário
        if (!coords) {
          const userCoordinates = await GetCoordinates();
          coords = userCoordinates;
          setCoordinates(userCoordinates);
        }
        
        // Fazer reverse geocoding apenas para localização do usuário
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
