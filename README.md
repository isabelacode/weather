# Weather Forecast Application

Este projeto é uma aplicação de previsão do tempo desenvolvida em **React JS**, que utiliza a API da Weather para fornecer previsões precisas com visualizações gráficas intuitivas e detalhes sobre o clima atual e futuro.

## Funcionalidades Principais

- **Clima Atual**: Exibe informações sobre o clima atual, como temperatura, umidade e condições climáticas.
- **Previsão de 5 Dias**: Mostra a previsão do tempo para os próximos cinco dias, incluindo as temperaturas máximas e mínimas.
- **Gráfico de 8 Horas**: Apresenta um gráfico detalhado com dados de temperatura e condições climáticas para as próximas oito horas.
- **Detalhamento Horário**: Permite ao usuário selecionar uma hora específica para exibir informações detalhadas do clima.

## Tecnologias Utilizadas

- **React JS**: Biblioteca principal para a criação de componentes interativos.
- **Axios**: Para fazer requisições à API da Weather.
- **Chart.js**: Para criar gráficos interativos e responsivos.
- **CSS**: Para a estilização dos componentes.

## Como Executar o Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/isabelacode/weather-app
```

### 2. Crie sua Conta na API de Clima
 - **Acesse:** https://www.weatherapi.com/ e crie uma conta.
 -  Após criar a conta, obtenha a sua chave de API.

### 3. Crie o Arquivo .env
Na raiz do projeto, crie um arquivo .env com o seguinte conteúdo:
```bash
WEATHER_API_KEY=sua_chave_api
```

### 4. Instale as Dependências
No diretório do projeto, execute:
```bash
cd weather-forecast-app
npm install
```

### 5. Inicie o Servidor
Para rodar o projeto localmente, execute o comando:
```bash
npm run dev
```
### 6. Acesse no Navegador
Abra seu navegador e acesse:
```bash
http://localhost:3000
```
## Configuração da API
Certifique-se de que a API da Weather está configurada corretamente. Se necessário, atualize a URL base da API no código:
```bash
const API_BASE_URL = "http://fedora-1:5000/api/forecast";
```