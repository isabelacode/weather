import "./styles/global.css";
import "./styles/themes.css";
import { Header } from "./components/Header";

function App() {

  return (
    <>
      <Header />
      <div>
        <div>
          <p>icon clima</p>
          <p>temperatura</p>
        </div>
        <div>
          <p>Chuva</p>
          <p>Umidade</p>
          <p>Vento</p>
        </div>
        <div>
          <p>Clima</p>
          <p>dia da semana, hora</p>
          <p>clima predominante</p>
        </div>
      </div>

      <div>
        <a href="#"> Temperatura</a>
        <a href="#"> Umidade</a>
        <a href="#"> Vento</a>
      </div>

      <div>
        <h1>previsao semanal</h1>
      </div>

      <div>
        <input type="text" />
        <button>pesquisar por cidade</button>
      </div>

    </>
  )
}

export default App
