import { Coordinates } from "../Coordinates";

export interface LocationInfo {
  city: string;
  state: string;
  country: string;
}

export async function reverseGeocode(coordinates: Coordinates): Promise<LocationInfo> {
  const { latitude, longitude } = coordinates;
  
  // Usando Nominatim (OpenStreetMap) - gratuito
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data && data.address) {
      const address = data.address;
      return {
        city: address.city || address.town || address.village || address.suburb || 'Cidade não encontrada',
        state: address.state || address.region || address.county || '',
        country: address.country || 'País não encontrado'
      };
    }
    
    throw new Error('Localização não encontrada');
  } catch (error) {
    console.error('Erro na geocodificação:', error);
    throw new Error('Erro ao buscar localização');
  }
}