// Função para mapear códigos do tempo para ícones e descrições
export function getWeatherInfo(weatherCode: number) {
  const weatherMap: { [key: number]: { icon: string; description: string } } = {
    0: { icon: '☀️', description: 'Céu limpo' },
    1: { icon: '🌤️', description: 'Principalmente limpo' },
    2: { icon: '⛅', description: 'Parcialmente nublado' },
    3: { icon: '☁️', description: 'Nublado' },
    45: { icon: '🌫️', description: 'Nevoeiro' },
    48: { icon: '🌫️', description: 'Nevoeiro com geada' },
    51: { icon: '🌦️', description: 'Chuvisco leve' },
    53: { icon: '🌦️', description: 'Chuvisco moderado' },
    55: { icon: '🌦️', description: 'Chuvisco intenso' },
    56: { icon: '🌨️', description: 'Chuvisco gelado leve' },
    57: { icon: '🌨️', description: 'Chuvisco gelado intenso' },
    61: { icon: '🌧️', description: 'Chuva leve' },
    63: { icon: '🌧️', description: 'Chuva moderada' },
    65: { icon: '🌧️', description: 'Chuva intensa' },
    66: { icon: '🌨️', description: 'Chuva gelada leve' },
    67: { icon: '🌨️', description: 'Chuva gelada intensa' },
    71: { icon: '❄️', description: 'Neve leve' },
    73: { icon: '❄️', description: 'Neve moderada' },
    75: { icon: '❄️', description: 'Neve intensa' },
    77: { icon: '❄️', description: 'Grãos de neve' },
    80: { icon: '🌦️', description: 'Pancadas de chuva leves' },
    81: { icon: '🌦️', description: 'Pancadas de chuva moderadas' },
    82: { icon: '🌦️', description: 'Pancadas de chuva violentas' },
    85: { icon: '🌨️', description: 'Pancadas de neve leves' },
    86: { icon: '🌨️', description: 'Pancadas de neve intensas' },
    95: { icon: '⛈️', description: 'Tempestade' },
    96: { icon: '⛈️', description: 'Tempestade com granizo leve' },
    99: { icon: '⛈️', description: 'Tempestade com granizo intenso' },
  };

  return weatherMap[weatherCode] || { icon: '❓', description: 'Desconhecido' };
}

// Função para obter o nome do dia da semana em português
export function getDayName(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Verificar se é hoje
  if (date.toDateString() === today.toDateString()) {
    return 'Hoje';
  }

  // Verificar se é amanhã
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Amanhã';
  }

  // Retornar o nome do dia da semana
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  return dayNames[date.getDay()];
}

// Função para gerar array de datas a partir de hoje pelos próximos 7 dias
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

// Interface para coordenadas
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Função para obter coordenadas de uma cidade usando geocoding
export async function getCityCoordinates(cityName: string): Promise<Coordinates> {
  try {
    // Usar a API de geocoding do Open-Meteo
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
    // Se é um erro que já criamos, manter a mensagem original
    if (error instanceof Error && error.message.includes('não encontrada')) {
      throw error;
    }
    // Para outros erros, usar mensagem genérica
    throw new Error('Erro ao buscar informações da cidade. Tente novamente.');
  }
}
