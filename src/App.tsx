import "./styles/global.css";
import "./styles/themes.css";
import { Header } from "./components/Header";
import {WeatherDashboard} from "./components/WeatherDashboard";
import  { Graphics } from "./components/Graphics";
import { WeatherProvider } from "./contexts/WeatherProvider";

function App() {

  return (
    <WeatherProvider>
      <Header />
      <WeatherDashboard />
      <Graphics />

      <div>
        <h1>previsao semanal</h1>
      </div>

      <div>
        <input type="text" />
        <button>pesquisar por cidade</button>
      </div>
    </WeatherProvider>
  )
}

export default App
