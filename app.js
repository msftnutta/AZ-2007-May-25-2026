require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Main route
app.get('/', async (req, res) => {
  const now = new Date();
  const dateTime = {
    date: now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    time: now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  };

  let weather = null;
  let error = null;

  try {
    const subscriptionKey = process.env.AZURE_MAPS_KEY;
    if (!subscriptionKey) {
      throw new Error('AZURE_MAPS_KEY is not set in .env file');
    }

    // Default location: Kuala Lumpur, Malaysia
    const lat = process.env.LATITUDE || '3.1390';
    const lon = process.env.LONGITUDE || '101.6869';

    const url = `https://c176813f-72af-4d0b-93ca-1950838ab48c.eastus.account.maps.azure.com/weather/currentConditions/json`;
    const response = await axios.get(url, {
      params: {
        'api-version': '1.1',
        'query': `${lat},${lon}`,
        'subscription-key': subscriptionKey
      }
    });

    const result = response.data.results[0];
    weather = {
      description: result.phrase,
      temperature: result.temperature.value,
      unit: result.temperature.unit === 'C' ? '°C' : '°F',
      humidity: result.relativeHumidity,
      wind: result.wind.speed.value,
      windUnit: result.wind.speed.unit,
      iconCode: result.iconCode
    };
  } catch (err) {
    error = err.message;
  }

  res.render('index', { dateTime, weather, error });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
