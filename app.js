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

// Cities data - one well-known city per continent
const cities = [
  { id: 'new-york', name: 'New York', continent: 'North America', lat: 40.7128, lon: -74.0060, timezone: 'America/New_York' },
  { id: 'sao-paulo', name: 'São Paulo', continent: 'South America', lat: -23.5505, lon: -46.6333, timezone: 'America/Sao_Paulo' },
  { id: 'london', name: 'London', continent: 'Europe', lat: 51.5074, lon: -0.1278, timezone: 'Europe/London' },
  { id: 'cairo', name: 'Cairo', continent: 'Africa', lat: 30.0444, lon: 31.2357, timezone: 'Africa/Cairo' },
  { id: 'dubai', name: 'Dubai', continent: 'Middle East', lat: 25.2048, lon: 55.2708, timezone: 'Asia/Dubai' },
  { id: 'singapore', name: 'Singapore', continent: 'Asia', lat: 1.3521, lon: 103.8198, timezone: 'Asia/Singapore' },
  { id: 'tokyo', name: 'Tokyo', continent: 'Asia', lat: 35.6762, lon: 139.6503, timezone: 'Asia/Tokyo' },
  { id: 'sydney', name: 'Sydney', continent: 'Oceania', lat: -33.8688, lon: 151.2093, timezone: 'Australia/Sydney' }
];

// Weather code to emoji mapping (WMO codes used by Open-Meteo)
function getWeatherEmoji(code) {
  if (code === 0) return '☀️';
  if (code === 1) return '🌤️';
  if (code === 2) return '⛅';
  if (code === 3) return '☁️';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 55) return '🌦️';
  if (code >= 56 && code <= 57) return '🌧️';
  if (code >= 61 && code <= 65) return '🌧️';
  if (code >= 66 && code <= 67) return '🌨️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌧️';
  if (code >= 85 && code <= 86) return '🌨️';
  if (code >= 95 && code <= 99) return '⛈️';
  return '🌡️';
}

// Weather code to description
function getWeatherDescription(code) {
  if (code === 0) return 'Clear sky';
  if (code === 1) return 'Mainly clear';
  if (code === 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Foggy';
  if (code >= 51 && code <= 55) return 'Drizzle';
  if (code >= 56 && code <= 57) return 'Freezing drizzle';
  if (code >= 61 && code <= 65) return 'Rain';
  if (code >= 66 && code <= 67) return 'Freezing rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Rain showers';
  if (code >= 85 && code <= 86) return 'Snow showers';
  if (code >= 95 && code <= 99) return 'Thunderstorm';
  return 'Unknown';
}

// Main route
app.get('/', (req, res) => {
  const now = new Date();
  const dateTime = {
    date: now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };

  // Group cities by continent
  const continents = {};
  cities.forEach(city => {
    if (!continents[city.continent]) {
      continents[city.continent] = [];
    }
    continents[city.continent].push(city);
  });

  res.render('index', { dateTime, cities, continents });
});

// API endpoint for weather data of all cities
app.get('/api/weather', async (req, res) => {
  try {
    const weatherData = await Promise.all(
      cities.map(async (city) => {
        try {
          const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
              latitude: city.lat,
              longitude: city.lon,
              current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
              timezone: city.timezone
            }
          });
          const current = response.data.current;
          return {
            id: city.id,
            name: city.name,
            continent: city.continent,
            timezone: city.timezone,
            temperature: Math.round(current.temperature_2m),
            humidity: current.relative_humidity_2m,
            windSpeed: Math.round(current.wind_speed_10m),
            weatherCode: current.weather_code,
            emoji: getWeatherEmoji(current.weather_code),
            description: getWeatherDescription(current.weather_code)
          };
        } catch (err) {
          console.error('Weather fetch error for', city.name, err.message);
          return {
            id: city.id,
            name: city.name,
            continent: city.continent,
            timezone: city.timezone,
            temperature: null,
            error: 'Unable to fetch weather'
          };
        }
      })
    );
    res.json(weatherData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// City detail page for extended forecast
app.get('/city/:id', async (req, res) => {
  const city = cities.find(c => c.id === req.params.id);
  if (!city) {
    return res.status(404).send('City not found');
  }

  let forecast = null;
  let error = null;

  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: city.lat,
        longitude: city.lon,
        current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max',
        timezone: city.timezone,
        forecast_days: 7
      }
    });

    const current = response.data.current;
    const daily = response.data.daily;

    forecast = {
      current: {
        temperature: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        weatherCode: current.weather_code,
        emoji: getWeatherEmoji(current.weather_code),
        description: getWeatherDescription(current.weather_code)
      },
      daily: daily.time.map((date, i) => ({
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        maxTemp: Math.round(daily.temperature_2m_max[i]),
        minTemp: Math.round(daily.temperature_2m_min[i]),
        precipitation: daily.precipitation_sum[i],
        windSpeed: Math.round(daily.wind_speed_10m_max[i]),
        weatherCode: daily.weather_code[i],
        emoji: getWeatherEmoji(daily.weather_code[i]),
        description: getWeatherDescription(daily.weather_code[i])
      }))
    };
  } catch (err) {
    error = err.message;
  }

  res.render('city', { city, forecast, error });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
