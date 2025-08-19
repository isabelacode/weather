import { useState } from 'react';
import { useWeatherContext } from '../../hooks/useWeatherContext';
import styles from "./styles.module.css";

export function Search() {
    const [cityName, setCityName] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const { searchCity, currentCity, setCoordinates, setCurrentCity } = useWeatherContext();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!cityName.trim()) {
            setSearchError('Digite o nome de uma cidade');
            return;
        }

        setIsSearching(true);
        setSearchError(null);

        try {
            await searchCity(cityName.trim());
            setSearchError(null);
            setCityName(''); // Limpar o campo após busca bem-sucedida
        } catch (error) {
            console.error('Erro capturado no Search:', error);
            const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar cidade';
            setSearchError(errorMessage);
        } finally {
            setIsSearching(false);
        }
    };

    const handleUseCurrentLocation = () => {
        setCoordinates(null);
        setCurrentCity(null);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
                <input 
                    type="text" 
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    placeholder="Digite o nome da cidade..."
                    disabled={isSearching}
                    className={styles.searchInput}
                />
                <button 
                    type="submit" 
                    disabled={isSearching}
                    className={styles.searchButton}
                >
                    {isSearching ? 'Buscando...' : 'Pesquisar'}
                </button>
            </form>
            
            {currentCity && (
                <button 
                    onClick={handleUseCurrentLocation}
                    className={styles.locationButton}
                >
                    Usar minha localização
                </button>
            )}
            
            {searchError && (
                <p className={styles.error}>
                    {searchError}
                </p>
            )}
        </div>
    );
}