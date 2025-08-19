import "./styles/global.css";
import "./styles/themes.css";
import { Header } from "./components/Header";
import {WeatherDashboard} from "./components/WeatherDashboard";
import  { Graphics } from "./components/Graphics";
import { WeatherProvider } from "./contexts/WeatherProvider";
import { Forecast } from "./components/Forecast";
import { Search } from "./components/Search";


function App() {

  return (
    <WeatherProvider>
      <Header />
      <WeatherDashboard />
      <Graphics />

      <Forecast />

      <Search />
    </WeatherProvider>
  )
}

export default App
