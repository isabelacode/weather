import {
    MoonIcon,
    SunIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "../../hooks/useLocation";
import styles from "./styles.module.css";

type AvailableThemes = "dark" | "light";


export function Header() {
    const { location, loading, error } = useLocation();
    const [theme, setTheme] = useState<AvailableThemes>(() => {
        const storageTheme =
            (localStorage.getItem("theme") as AvailableThemes) || "dark";
        return storageTheme;
    });

    const nextThemeIcon = {
        dark: <SunIcon />,
        light: <MoonIcon />,
    };

    function handleThemeChange(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) {
        event.preventDefault();

        setTheme((prevTheme) => {
            const nextTheme = prevTheme === "dark" ? "light" : "dark";
            return nextTheme;
        });
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);


    return (
        <div className={styles.header}>
            <h1 className={styles.headerTitle}>
                {loading && "Detectando localização..."}
                {error && "Localização não disponível"}
                {location && (
                    location.state 
                        ? `${location.city}, ${location.state}` 
                        : location.city
                )}
            </h1>
            <a
                className={styles.menuLink}
                href="#"
                aria-label="Mudar Tema"
                title="Mudar Tema"
                onClick={handleThemeChange}
            >
                {nextThemeIcon[theme]}
            </a>
        </div>
    );
}