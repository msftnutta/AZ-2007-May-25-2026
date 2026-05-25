# Weather & DateTime Dashboard

A simple Node.js web application that displays the current date/time and live weather conditions using the Azure Maps Weather API.

## Features

- Displays current date and time (formatted in US English)
- Shows real-time weather conditions including temperature, humidity, and wind speed
- Uses Azure Maps Weather API for weather data
- Server-side rendered with EJS templates
- Styled with Tailwind CSS

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- An [Azure Maps account](https://learn.microsoft.com/en-us/azure/azure-maps/how-to-manage-account-keys) with a subscription key

## Project Structure

```
├── app.js              # Express server and route handler
├── views/
│   └── index.ejs       # HTML template (EJS)
├── public/
│   └── style.css       # Additional static styles
├── .env                # Environment variables (not committed)
├── .gitignore          # Git ignore rules
└── package.json        # Dependencies and scripts
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Create a `.env` file in the project root:

   ```env
   AZURE_MAPS_KEY=your_azure_maps_subscription_key
   LATITUDE=3.1390
   LONGITUDE=101.6869
   PORT=3000
   ```

   - `AZURE_MAPS_KEY` — Your Azure Maps subscription key (required)
   - `LATITUDE` / `LONGITUDE` — Coordinates for the weather location (defaults to Kuala Lumpur)
   - `PORT` — Server port (defaults to 3000)

3. **Start the application**

   ```bash
   npm start
   ```

4. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Azure Maps Weather API

This application calls the Azure Maps [Current Conditions](https://learn.microsoft.com/en-us/rest/api/maps/weather/get-current-conditions) endpoint:

```
GET https://{your-account}.eastus.account.maps.azure.com/weather/currentConditions/json?api-version=1.1&query={lat},{lon}&subscription-key={key}
```

The response provides temperature, weather description, humidity, wind speed, and other meteorological data.

## Dependencies

| Package | Purpose |
|---------|---------|
| express | Web framework |
| ejs | Server-side HTML templating |
| axios | HTTP client for API calls |
| dotenv | Load environment variables from `.env` |
| @azure/identity | Azure authentication (optional, for Entra ID auth) |
