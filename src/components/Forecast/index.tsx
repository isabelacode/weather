import { useWeatherForecast } from "../../hooks/useWeatherForecast";
import { getWeatherInfo, getDayName } from "../../utils/weatherUtils";
import styles from "./styles.module.css";

export function Forecast() {
    const { data, loading, error } = useWeatherForecast();

    if (loading) {
        return (
            <div className={styles.container}>
                <h2>Previsão do Tempo</h2>
                <p className={styles.loading}>Carregando previsão...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <h2>Previsão do Tempo</h2>
                <p className={styles.error}>Erro: {error}</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2>Próximos 7 Dias</h2>
            <div className={styles.forecastGrid}>
                {data.map((day) => {
                    const weatherInfo = getWeatherInfo(day.weather_code);
                    const dayName = getDayName(day.date);
                    
                    return (
                        <div key={day.date} className={styles.dayCard}>
                            <div className={styles.dayName}>
                                {dayName}
                            </div>
                            <div className={styles.weatherIcon}>
                                {weatherInfo.icon}
                            </div>
                            <div className={styles.temperatures}>
                                <span className={styles.maxTemp}>
                                    {Math.round(day.temperature_2m_max)}°
                                </span>
                                <span className={styles.minTemp}>
                                    {Math.round(day.temperature_2m_min)}°
                                </span>
                            </div>
                            <div className={styles.description}>
                                {weatherInfo.description}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}