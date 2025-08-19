import { useState, useEffect } from "react";
import {
    Sun,
    Cloud,
    CloudRain,
    CloudSnow,
    Zap,
    CloudDrizzle,
    Droplets,
    Wind,
    Eye
} from "lucide-react";
import { Coordinates } from "../Coordinates";
import { useWeatherContext } from "../../hooks/useWeatherContext";
import styles from "./styles.module.css";

interface WeatherData {
    current: {
        temperature_2m: number;
        relative_humidity_2m: number;
        precipitation: number;
        wind_speed_10m: number;
        weather_code: number;
        time: string;
    };
}

const getWeatherIcon = (weatherCode: number) => {
    if (weatherCode === 0) return <Sun size={32} />;
    if (weatherCode <= 3) return <Cloud size={32} />;
    if (weatherCode <= 48) return <Cloud size={32} />;
    if (weatherCode <= 57) return <CloudDrizzle size={32} />;
    if (weatherCode <= 67) return <CloudRain size={32} />;
    if (weatherCode <= 77) return <CloudSnow size={32} />;
    if (weatherCode <= 82) return <CloudRain size={32} />;
    if (weatherCode <= 86) return <CloudSnow size={32} />;
    if (weatherCode >= 95) return <Zap size={32} />;
    return <Cloud size={32} />;
};

const getWeatherDescription = (weatherCode: number) => {
    const descriptions: { [key: number]: string } = {
        0: "Céu limpo",
        1: "Principalmente limpo",
        2: "Parcialmente nublado",
        3: "Nublado",
        45: "Névoa",
        48: "Névoa com geada",
        51: "Garoa leve",
        53: "Garoa moderada",
        55: "Garoa intensa",
        61: "Chuva leve",
        63: "Chuva moderada",
        65: "Chuva intensa",
        71: "Neve leve",
        73: "Neve moderada",
        75: "Neve intensa",
        80: "Pancadas de chuva leves",
        81: "Pancadas de chuva moderadas",
        82: "Pancadas de chuva intensas",
        95: "Tempestade",
        96: "Tempestade com granizo leve",
        99: "Tempestade com granizo intenso"
    };
    return descriptions[weatherCode] || "Condição desconhecida";
};

export function WeatherDashboard() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { selectedHourData } = useWeatherContext();

    const displayData = selectedHourData ? {
        current: {
            temperature_2m: selectedHourData.temperature_2m,
            relative_humidity_2m: selectedHourData.relative_humidity_2m,
            precipitation: 0, 
            wind_speed_10m: selectedHourData.wind_speed_10m,
            weather_code: selectedHourData.weather_code,
            time: selectedHourData.time
        }
    } : weatherData;

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {

                const coords = await Coordinates();
                const { latitude, longitude } = coords;

                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&timezone=auto`
                );

                if (!response.ok) {
                    throw new Error('Erro ao buscar dados do clima');
                }

                const data = await response.json();
                setWeatherData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;
    if (!weatherData && !selectedHourData) return <div>Nenhum dado disponível</div>;

    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        const dayOfWeek = date.toLocaleDateString('pt-BR', { weekday: 'long' });
        const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        return `${dayOfWeek}, ${time}`;
    };

    return (
        <div className={styles.weatherDashboard}>
            <div className={styles.weatherTemperatura}>
                {getWeatherIcon(displayData?.current.weather_code || 0)}
                <p>{Math.round(displayData?.current.temperature_2m || 0)}°C</p>
            </div>
            <div className={styles.weatherDetails}>
                <div>
                    <p><Droplets size={16} /> Chuva: {displayData?.current.precipitation || 0}mm</p>
                    <p><Eye size={16} /> Umidade: {displayData?.current.relative_humidity_2m || 0}%</p>
                    <p><Wind size={16} /> Vento: {Math.round(displayData?.current.wind_speed_10m || 0)}km/h</p>
                </div>
                <div>
                    <p>{selectedHourData ? 'Previsão para' : 'Clima'}</p>
                    <p>{formatDateTime(displayData?.current.time || new Date().toISOString())}</p>
                    <p>{getWeatherDescription(displayData?.current.weather_code || 0)}</p>
                </div>
            </div>
        </div>
    )
}
