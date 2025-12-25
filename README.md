# 🌤️ Weather Forecast Actor

[![Apify](https://img.shields.io/badge/Apify-Actor-00A699?style=flat-square)](https://apify.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

**Get accurate 7-day weather forecasts for any location worldwide using GPS coordinates.**

Built for the [Apify $1M Challenge](https://apify.com/challenge) 🏆

---

## ✨ Features

- 📍 **GPS-Based Forecasts** - Use precise latitude/longitude coordinates
- 📅 **7-Day Outlook** - Comprehensive weekly weather predictions
- 🌡️ **Flexible Units** - Support for both metric (Celsius) and imperial (Fahrenheit)
- ⚡ **Lightning Fast** - Executes in 1-3 seconds
- 📊 **Rich Data** - Temperature, humidity, wind, precipitation, and more
- 🔒 **Type-Safe** - Built with TypeScript for reliability
- 🌐 **Global Coverage** - Works for any location on Earth

---

## 🚀 Quick Start

### Input Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `latitude` | number | ✅ Yes | GPS latitude (-90 to 90) |
| `longitude` | number | ✅ Yes | GPS longitude (-180 to 180) |
| `units` | string | No | `"metric"` (Celsius) or `"imperial"` (Fahrenheit). Default: `"metric"` |
| `apiKey` | string | ✅ Yes | OpenWeatherMap API key ([Get free key](https://openweathermap.org/api)) |

### Example Input

```json
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "units": "metric",
  "apiKey": "your_openweathermap_api_key"
}
```

### Example Output

```json
{
  "location": {
    "latitude": 40.7128,
    "longitude": -74.006,
    "city": "New York",
    "country": "US",
    "timezone": -18000
  },
  "units": "metric",
  "forecast_period": "6-day forecast",
  "retrieved_at": "2025-12-25T05:01:20.441Z",
  "data_points": 40,
  "daily_forecast": [
    {
      "date": "2025-12-25",
      "temperature": {
        "min": 2,
        "max": 6,
        "average": 4.2,
        "unit": "°C"
      },
      "feels_like": {
        "day": -1,
        "night": -3
      },
      "humidity": 60,
      "pressure": 1017,
      "weather": {
        "main": "Clouds",
        "description": "overcast clouds"
      },
      "wind": {
        "speed": 5.5,
        "direction": 280
      },
      "precipitation": {
        "probability": 0,
        "amount": 0
      },
      "clouds": 100,
      "visibility": 10000
    }
    // ... more days
  ]
}
```

---

## 📦 Installation & Usage

### Running on Apify Platform

1. Navigate to [Apify Console](https://console.apify.com)
2. Create a new Actor or use this one
3. Provide input parameters
4. Run and collect results from the dataset

### Running Locally

```bash
# Clone or download this repository
cd weather-forecast-actor

# Install dependencies
npm install

# Build the project
npm run build

# Run with Apify CLI
npx apify run
```

**Note:** Create `storage/key_value_stores/default/INPUT.json` with your input data.

---

## 🌍 Finding GPS Coordinates

### Quick Methods

- **Google Maps**: Right-click any location → Click the coordinates
- **Current Location**: Use browser's geolocation API
- **Address Lookup**: [LatLong.net](https://www.latlong.net/)

### Popular Locations

| City | Latitude | Longitude |
|------|----------|-----------|
| New York, USA | 40.7128 | -74.0060 |
| London, UK | 51.5074 | -0.1278 |
| Tokyo, Japan | 35.6762 | 139.6503 |
| Paris, France | 48.8566 | 2.3522 |
| Sydney, Australia | -33.8688 | 151.2093 |
| Dubai, UAE | 25.2048 | 55.2708 |
| São Paulo, Brazil | -23.5505 | -46.6333 |

---

## 🔑 Getting an API Key

This Actor uses the OpenWeatherMap API:

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a **free account**
3. Navigate to **API Keys** section
4. Copy your API key
5. **Wait 10-15 minutes** for activation

**Free tier includes:**
- 60 calls per minute
- 1,000,000 calls per month
- Perfect for most use cases!

---

## 📊 Output Data Schema

### Location Object
- `latitude`, `longitude` - Input coordinates
- `city`, `country` - Resolved location names
- `timezone` - UTC offset in seconds

### Daily Forecast Object
- `date` - ISO date string (YYYY-MM-DD)
- `temperature` - Min, max, average temps with unit
- `feels_like` - Day and night apparent temperature
- `humidity` - Average relative humidity (%)
- `pressure` - Average atmospheric pressure (hPa)
- `weather` - Main condition and description
- `wind` - Speed and direction
- `precipitation` - Probability (%) and amount (mm)
- `clouds` - Cloud coverage (%)
- `visibility` - Visibility distance (meters)

---

## 🎯 Use Cases

### For Travelers ✈️
- Check weather before booking flights
- Plan clothing and gear for trips
- Avoid bad weather destinations

### For Event Planners 🎪
- Schedule outdoor events with confidence
- Have backup plans for rain
- Optimize attendee comfort

### For Developers 🤖
- Integrate weather into apps
- Build AI agents with weather awareness
- Create automated weather alerts

### For Data Analysis 📈
- Collect weather patterns over time
- Correlate weather with business metrics
- Build predictive models

---

## 🏗️ Technical Stack

- **Runtime**: Node.js 20+
- **Language**: TypeScript 5.3
- **Framework**: Apify SDK 3.2
- **HTTP Client**: Axios
- **Data Source**: OpenWeatherMap API
- **Deployment**: Docker containerized

---

## 🛠️ Development

### Project Structure

```
weather-forecast-actor/
├── src/
│   └── main.ts              # Main Actor logic
├── .actor/
│   ├── actor.json           # Actor metadata
│   ├── input_schema.json    # Input validation
│   └── INPUT.json           # Local input (git-ignored)
├── storage/                 # Local storage (git-ignored)
├── dist/                    # Compiled JavaScript
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

### Available Scripts

```bash
npm run build      # Compile TypeScript
npm run start      # Run compiled code
npm run dev        # Run with ts-node
npm run lint       # Type-check code
npm run clean      # Remove dist folder
npm run rebuild    # Clean and build
```

### Building for Production

```bash
# Clean build
npm run rebuild

# Test locally
npx apify run

# Deploy to Apify
apify push
```

---

## 🔒 Error Handling

The Actor handles common errors gracefully:

- **Invalid API Key** (401): Clear message with activation instructions
- **Location Not Found** (404): Suggests checking coordinates
- **Rate Limit** (429): Advises waiting or upgrading
- **Network Errors**: Provides connectivity troubleshooting
- **Invalid Input**: Validates all parameters with helpful messages

---

## 🚀 Performance

- **Execution Time**: 1-3 seconds average
- **Memory Usage**: ~50MB
- **API Calls**: 1 per Actor run
- **Cost**: <$0.01 per execution on Apify platform

---

## 📝 API Rate Limits

### Free Tier (OpenWeatherMap)
- **60 calls/minute**
- **1,000,000 calls/month**
- **3-hour forecast intervals**

### Recommended Usage
- Cache results when possible
- Respect rate limits
- Consider upgrading for high-volume use

---

## 🤝 Contributing

Contributions are welcome! Ideas for enhancement:

- [ ] Add more weather providers (Weather.com, AccuWeather)
- [ ] Support for weather alerts and warnings
- [ ] Historical weather data comparison
- [ ] Batch processing for multiple locations
- [ ] Weather-based recommendations
- [ ] Air quality index integration
- [ ] Multi-language support

---

## 📄 License

MIT License - feel free to use and modify!

---

## 🏆 Apify $1M Challenge

This Actor was built for the [Apify $1M Challenge](https://apify.com/challenge) - a global competition to build AI-powered data extraction and automation tools.

### Categories
- ✈️ Travel
- 🤖 Automation  
- 🔗 Integrations

---

## 📞 Support

- **Documentation**: [docs.apify.com](https://docs.apify.com)
- **Discord**: [Apify Community](https://discord.com/invite/jyEM2PRvMU)
- **OpenWeather**: [openweathermap.org/faq](https://openweathermap.org/faq)
- **Issues**: [GitHub Issues](https://github.com/nagaumamahesh/weather-forecast-actor/issues)

---

## 🙏 Acknowledgments

- Built with [Apify Platform](https://apify.com)
- Weather data from [OpenWeatherMap](https://openweathermap.org)
- Inspired by the developer community

---

**Made with ❤️ for the Apify $1M Challenge**

*Get started now: [Deploy this Actor](https://console.apify.com)*
