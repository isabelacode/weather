const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint para buscar previsão do tempo
app.get('/api/forecast', async (req, res) => {
   try {
      const { query } = req.query;
      const apiKey = process.env.WEATHER_API_KEY;

      const response = await axios.get(
         `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=5&aqi=no&alerts=no&lang=pt`
      );

      const futureForecast = response.data.forecast.forecastday;
      res.json(futureForecast);
   } catch (error) {
      console.error('Erro ao buscar previsão:', error);
      res.status(500).json({ error: 'Erro ao buscar previsão do tempo' });
   }
});

// Endpoint para buscar clima atual
app.get('/api/current', async (req, res) => {
   try {
      const { query } = req.query;
      const apiKey = process.env.WEATHER_API_KEY;

      const response = await axios.get(
         `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=1&aqi=no&alerts=no&lang=pt`
      );

      res.json(response.data);
   } catch (error) {
      console.error('Erro ao buscar clima atual:', error);
      res.status(500).json({ error: 'Erro ao buscar clima atual' });
   }
});

app.listen(PORT, () => {
   console.log(`Servidor rodando na porta ${PORT}`);
});
