import React, { useState } from 'react';
import './App.css';
import { WeatherInfo } from './Components/WeatherInfo';
import { ForecastInfo } from './Components/ForecastInfo';

function App() {
   const [city, setCity] = useState('');

   return (
      <div className="App">
         <header className="App-header">
            <WeatherInfo city={city} />
            <ForecastInfo city={city} />

            <div className="search-box">
               <input
                  type="text"
                  placeholder="Digite o nome da cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
               />
               <button onClick={() => setCity(city)}>Buscar</button>
            </div>
         </header>
      </div>
   );
}

export default App;
