import { useState, useEffect } from 'react';
import { Coordinates } from '../components/Coordinates';
import { reverseGeocode } from '../components/City';
import type { LocationInfo } from '../components/City';

export function useLocation() {
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      try {
        setLoading(true);
        const coordinates = await Coordinates();
        const locationInfo = await reverseGeocode(coordinates);
        setLocation(locationInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchLocation();
  }, []);

  return { location, loading, error };
}
