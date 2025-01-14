import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import './Graphic.css';

export const Graphic = ({ weatherData, setSelectedWeatherData }) => {
   const chartRef = useRef(null);
   const chartInstance = useRef(null);

   useEffect(() => {
      if (
         !weatherData ||
         !weatherData.forecastday[0] ||
         !weatherData.forecastday[0].hour
      ) {
         console.log('Dados não encontrados ou formato errado.');
         return;
      }

      const hours = weatherData.forecastday[0].hour;
      console.log('Dados das horas:', hours);

      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      let nextHours = hours.filter((hour) => {
         const hourTime = new Date(hour.time);
         return (
            hourTime.getHours() >= currentHour &&
            hourTime.getHours() < currentHour + 8
         );
      });

      if (nextHours.length < 8) {
         const remainingHours = hours.filter((hour) => {
            const hourTime = new Date(hour.time);
            return hourTime.getHours() < 8;
         });
         nextHours.push(...remainingHours.slice(0, 8 - nextHours.length));
      }

      if (nextHours.length < 8) {
         console.log('Não há horas suficientes para mostrar.');
         return;
      }

      const ctx = chartRef.current ? chartRef.current.getContext('2d') : null;
      if (!ctx) {
         console.log('Não foi possível obter o contexto do canvas.');
         return;
      }

      if (chartInstance.current) {
         chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
         type: 'line',
         data: {
            labels: nextHours.map((hour) => hour.time.split(' ')[1]),
            datasets: [
               {
                  label: 'Temperatura',
                  data: nextHours.map((hour) => hour.temp_c),
                  borderColor: '#FFD700',
                  backgroundColor: 'rgba(255, 215, 0, 0.2)',
                  tension: 0.4,
                  fill: true,
                  pointRadius: 3,
                  pointBackgroundColor: '#FFD700',
               },
            ],
         },
         options: {
            responsive: true,
            plugins: {
               legend: {
                  display: false,
               },
               tooltip: {
                  backgroundColor: '#333',
                  bodyColor: '#fff',
                  titleColor: '#FFD700',
                  callbacks: {
                     label: function (tooltipItem) {
                        const temp = tooltipItem.raw;
                        return `${temp} °C`;
                     },
                  },
               },
            },
            scales: {
               x: {
                  ticks: {
                     color: '#ccc',
                  },
                  grid: {
                     display: false,
                  },
               },
               y: {
                  display: false,
               },
            },
            onClick: (event, elements) => {
               if (elements.length > 0) {
                  const elementIndex = elements[0].index;
                  const selectedHour = nextHours[elementIndex];
                  const conditionText = selectedHour.condition.text;
                  const readableCondition =
                     conditionText === 'Clear'
                        ? 'Sol'
                        : conditionText === 'Rain'
                          ? 'Chuva'
                          : conditionText === 'Cloudy'
                            ? 'Nuvens'
                            : conditionText;

                  setSelectedWeatherData({
                     hour: selectedHour.time.split(' ')[1],
                     temperature: selectedHour.temp_c,
                     condition: readableCondition,
                     humidity: selectedHour.humidity,
                     windSpeed: selectedHour.wind_kph,
                     icon: selectedHour.condition.icon,
                  });
               }
            },
         },
      });

      return () => {
         if (chartInstance.current) {
            chartInstance.current.destroy();
         }
      };
   }, [weatherData, setSelectedWeatherData]);

   return (
      <div className="graphic-container">
         <canvas ref={chartRef} aria-label="Gráfico de Temperatura"></canvas>
      </div>
   );
};
