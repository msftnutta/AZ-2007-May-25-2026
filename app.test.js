const request = require('supertest');
const { app, cities, getWeatherEmoji, getWeatherDescription } = require('./app');

describe('getWeatherEmoji', () => {
  test('returns sun emoji for clear sky (code 0)', () => {
    expect(getWeatherEmoji(0)).toBe('☀️');
  });

  test('returns mainly clear emoji (code 1)', () => {
    expect(getWeatherEmoji(1)).toBe('🌤️');
  });

  test('returns partly cloudy emoji (code 2)', () => {
    expect(getWeatherEmoji(2)).toBe('⛅');
  });

  test('returns overcast emoji (code 3)', () => {
    expect(getWeatherEmoji(3)).toBe('☁️');
  });

  test('returns fog emoji for codes 45 and 48', () => {
    expect(getWeatherEmoji(45)).toBe('🌫️');
    expect(getWeatherEmoji(48)).toBe('🌫️');
  });

  test('returns drizzle emoji for codes 51-55', () => {
    expect(getWeatherEmoji(51)).toBe('🌦️');
    expect(getWeatherEmoji(53)).toBe('🌦️');
    expect(getWeatherEmoji(55)).toBe('🌦️');
  });

  test('returns rain emoji for codes 61-65', () => {
    expect(getWeatherEmoji(61)).toBe('🌧️');
    expect(getWeatherEmoji(63)).toBe('🌧️');
    expect(getWeatherEmoji(65)).toBe('🌧️');
  });

  test('returns snow emoji for codes 71-77', () => {
    expect(getWeatherEmoji(71)).toBe('❄️');
    expect(getWeatherEmoji(75)).toBe('❄️');
    expect(getWeatherEmoji(77)).toBe('❄️');
  });

  test('returns thunderstorm emoji for codes 95-99', () => {
    expect(getWeatherEmoji(95)).toBe('⛈️');
    expect(getWeatherEmoji(99)).toBe('⛈️');
  });

  test('returns default emoji for unknown code', () => {
    expect(getWeatherEmoji(999)).toBe('🌡️');
  });
});

describe('getWeatherDescription', () => {
  test('returns "Clear sky" for code 0', () => {
    expect(getWeatherDescription(0)).toBe('Clear sky');
  });

  test('returns "Mainly clear" for code 1', () => {
    expect(getWeatherDescription(1)).toBe('Mainly clear');
  });

  test('returns "Partly cloudy" for code 2', () => {
    expect(getWeatherDescription(2)).toBe('Partly cloudy');
  });

  test('returns "Overcast" for code 3', () => {
    expect(getWeatherDescription(3)).toBe('Overcast');
  });

  test('returns "Foggy" for codes 45 and 48', () => {
    expect(getWeatherDescription(45)).toBe('Foggy');
    expect(getWeatherDescription(48)).toBe('Foggy');
  });

  test('returns "Drizzle" for codes 51-55', () => {
    expect(getWeatherDescription(51)).toBe('Drizzle');
    expect(getWeatherDescription(55)).toBe('Drizzle');
  });

  test('returns "Rain" for codes 61-65', () => {
    expect(getWeatherDescription(61)).toBe('Rain');
    expect(getWeatherDescription(65)).toBe('Rain');
  });

  test('returns "Snow" for codes 71-77', () => {
    expect(getWeatherDescription(71)).toBe('Snow');
    expect(getWeatherDescription(77)).toBe('Snow');
  });

  test('returns "Thunderstorm" for codes 95-99', () => {
    expect(getWeatherDescription(95)).toBe('Thunderstorm');
    expect(getWeatherDescription(99)).toBe('Thunderstorm');
  });

  test('returns "Unknown" for unrecognized code', () => {
    expect(getWeatherDescription(999)).toBe('Unknown');
  });
});

describe('Cities data', () => {
  test('contains 8 cities', () => {
    expect(cities).toHaveLength(8);
  });

  test('each city has required properties', () => {
    cities.forEach(city => {
      expect(city).toHaveProperty('id');
      expect(city).toHaveProperty('name');
      expect(city).toHaveProperty('continent');
      expect(city).toHaveProperty('lat');
      expect(city).toHaveProperty('lon');
      expect(city).toHaveProperty('timezone');
    });
  });

  test('city ids are unique', () => {
    const ids = cities.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('latitudes are valid (-90 to 90)', () => {
    cities.forEach(city => {
      expect(city.lat).toBeGreaterThanOrEqual(-90);
      expect(city.lat).toBeLessThanOrEqual(90);
    });
  });

  test('longitudes are valid (-180 to 180)', () => {
    cities.forEach(city => {
      expect(city.lon).toBeGreaterThanOrEqual(-180);
      expect(city.lon).toBeLessThanOrEqual(180);
    });
  });
});

describe('Routes', () => {
  test('GET / returns 200 and HTML', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
    expect(res.text).toContain('World Weather Dashboard');
  });

  test('GET / contains all city names', async () => {
    const res = await request(app).get('/');
    cities.forEach(city => {
      expect(res.text).toContain(city.name);
    });
  });

  test('GET / contains continent labels on cards', async () => {
    const res = await request(app).get('/');
    const continents = [...new Set(cities.map(c => c.continent))];
    continents.forEach(continent => {
      expect(res.text).toContain(continent);
    });
  });

  test('GET /city/:id returns 200 for valid city', async () => {
    const res = await request(app).get('/city/london');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });

  test('GET /city/:id returns 404 for invalid city', async () => {
    const res = await request(app).get('/city/nonexistent');
    expect(res.statusCode).toBe(404);
  });

  test('GET /api/weather returns JSON array', async () => {
    const res = await request(app).get('/api/weather');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(cities.length);
  });

  test('GET /api/weather returns expected city fields', async () => {
    const res = await request(app).get('/api/weather');
    res.body.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('continent');
      expect(item).toHaveProperty('timezone');
    });
  });
});
