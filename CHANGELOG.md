# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-12-25

### Added
- Initial release of Weather Forecast GPS Actor
- **Environment variable support**: API key can be provided via `OPENWEATHER_API_KEY` environment variable
- GPS-based 7-day weather forecast functionality
- Support for metric and imperial units
- OpenWeatherMap API integration
- Comprehensive error handling
- TypeScript implementation with full type safety
- Structured JSON output with rich weather data
- Docker containerization for Apify platform
- Input validation and schema
- Professional logging with Apify SDK
- MIT License

### Features
- Location-specific forecasts using GPS coordinates
- Daily temperature min/max/average
- Feels-like temperature for day and night
- Humidity, pressure, and visibility data
- Wind speed and direction
- Precipitation probability and amount
- Cloud coverage percentage
- 1-3 second execution time
- Global coverage for any location

### Technical
- Built with Apify SDK 3.2+
- TypeScript 5.3 for type safety
- Axios for HTTP requests
- Node.js 20+ runtime
- Clean architecture with separated concerns
- Industry best practices and code standards
