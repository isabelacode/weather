import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import styles from "./styles.module.css";
import { useWeatherData } from "../../hooks/useWeatherData";
import { useWeatherContext } from "../../hooks/useWeatherContext";

type GraphType = "temperature" | "humidity" | "wind";

export function Graphics() {
    const [activeGraph, setActiveGraph] = useState<GraphType>("temperature");
    const { data, loading, error } = useWeatherData();
    const { setSelectedHourData } = useWeatherContext();

    function handleGraphicsChange(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        graphType: GraphType
    ) {
        event.preventDefault();
        setActiveGraph(graphType);
    }

    const handleDotClick = (index: number) => {
        if (data[index]) {
            setSelectedHourData(data[index]);
        }
    };

    const CustomDot = (props: { cx?: number; cy?: number; payload?: { value: number; index: number } }) => {
        const { cx, cy, payload } = props;
        if (!cx || !cy || !payload) return null;

        return (
            <g>
                <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill={
                        activeGraph === "temperature" ? "#eab308" :
                            activeGraph === "humidity" ? "#0ea5e9" : "#22c55e"
                    }
                    stroke="#fff"
                    strokeWidth={2}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDotClick(payload.index)}
                />
                <text
                    x={cx}
                    y={cy - 15}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={12}
                    fontWeight="bold"
                    style={{
                        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))',
                        cursor: 'pointer'
                    }}
                    onClick={() => handleDotClick(payload.index)}
                >
                    {payload.value}
                </text>
            </g>
        );
    };

    const getGraphData = () => {
        return data.map((item, index) => {
            const date = new Date(item.time);
            const hour = date.getHours().toString().padStart(2, '0') + ':00';

            return {
                time: hour,
                index: index,
                value: activeGraph === "temperature"
                    ? Math.round(item.temperature_2m)
                    : activeGraph === "humidity"
                        ? item.relative_humidity_2m
                        : Math.round(item.wind_speed_10m)
            };
        });
    };

    if (loading) return <div>Carregando gráfico...</div>;
    if (error) return <div>Erro ao carregar dados: {error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.graphicsLinks}>
                <a
                    href="#"
                    onClick={(e) => handleGraphicsChange(e, "temperature")}
                    className={activeGraph === "temperature" ? styles.active : ""}
                >
                    Temperatura
                </a>
                <p>|</p>
                <a
                    href="#"
                    onClick={(e) => handleGraphicsChange(e, "humidity")}
                    className={activeGraph === "humidity" ? styles.active : ""}
                >
                    Umidade
                </a>
                <p>|</p>
                <a
                    href="#"
                    onClick={(e) => handleGraphicsChange(e, "wind")}
                    className={activeGraph === "wind" ? styles.active : ""}
                >
                    Vento
                </a>
            </div>

            <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={getGraphData()} margin={{ top: 30, right: 30, left: 30, bottom: 30 }}>
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={
                                    activeGraph === "temperature" ? "#8c08eaff" :
                                        activeGraph === "humidity" ? "#0ea5e9" : "#22c55e"
                                } stopOpacity={0.8} />
                                <stop offset="95%" stopColor={
                                    activeGraph === "temperature" ? "#8c08eaff" :
                                        activeGraph === "humidity" ? "#0ea5e9" : "#22c55e"
                                } stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#aab3cc', fontSize: 12 }}
                        />
                        <YAxis hide />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={
                                activeGraph === "temperature" ? "#8c08eaff" :
                                    activeGraph === "humidity" ? "#0ea5e9" : "#22c55e"
                            }
                            strokeWidth={3}
                            fill="url(#colorGradient)"
                            dot={<CustomDot />}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
