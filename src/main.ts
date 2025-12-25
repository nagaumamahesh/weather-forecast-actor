/**
 * Weather Forecast Actor - GPS-based 7-day weather forecast
 * Built for the Apify $1M Challenge
 * 
 * @see https://apify.com/challenge
 */

import { Actor, log } from 'apify';
import axios, { AxiosError } from 'axios';

// ============================================================================
// Constants
// ============================================================================

const OPENWEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const DEFAULT_UNITS = 'metric';
const MAX_FORECAST_DAYS = 7;
const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Actor input schema
 */
interface ActorInput {
    latitude: number;
    longitude: number;
    units?: 'metric' | 'imperial';
    apiKey: string;
}

/**
 * Daily weather data output
 */
interface DailyWeather {
    date: string;
    temperature: {
        min: number;
        max: number;
        average: number;
        unit: string;
    };
    feels_like: {
        day: number;
        night: number;
    };
    humidity: number;
    pressure: number;
    weather: {
        main: string;
        description: string;
    };
    wind: {
        speed: number;
        direction?: number;
    };
    precipitation: {
        probability: number;
        amount?: number;
    };
    clouds: number;
    visibility?: number;
}

/**
 * Complete forecast result
 */
interface ForecastResult {
    location: {
        latitude: number;
        longitude: number;
        city?: string;
        country?: string;
        timezone?: number;
    };
    units: string;
    forecast_period: string;
    retrieved_at: string;
    data_points: number;
    daily_forecast: DailyWeather[];
}

/**
 * OpenWeatherMap API response types
 */
interface OpenWeatherForecastItem {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg?: number;
    };
    visibility?: number;
    pop: number;
    rain?: {
        '3h': number;
    };
    snow?: {
        '3h': number;
    };
}

interface OpenWeatherResponse {
    cod: string;
    message: number;
    cnt: number;
    list: OpenWeatherForecastItem[];
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Validates input coordinates
 * @throws {Error} If coordinates are invalid
 */
function validateCoordinates(latitude: number, longitude: number): void {
    if (!Number.isFinite(latitude) || latitude < MIN_LATITUDE || latitude > MAX_LATITUDE) {
        throw new Error(
            `Invalid latitude: ${latitude}. Must be a number between ${MIN_LATITUDE} and ${MAX_LATITUDE}.`
        );
    }

    if (!Number.isFinite(longitude) || longitude < MIN_LONGITUDE || longitude > MAX_LONGITUDE) {
        throw new Error(
            `Invalid longitude: ${longitude}. Must be a number between ${MIN_LONGITUDE} and ${MAX_LONGITUDE}.`
        );
    }
}

/**
 * Validates Actor input
 * @throws {Error} If input is invalid
 */
function validateInput(input: ActorInput | null): asserts input is ActorInput {
    if (!input) {
        throw new Error('Input is required. Please provide latitude, longitude, and apiKey.');
    }

    if (!input.apiKey || typeof input.apiKey !== 'string' || input.apiKey.trim().length === 0) {
        throw new Error('API key is required. Get a free key from https://openweathermap.org/api');
    }

    validateCoordinates(input.latitude, input.longitude);

    if (input.units && !['metric', 'imperial'].includes(input.units)) {
        throw new Error('Units must be either "metric" or "imperial".');
    }
}

/**
 * Fetches weather forecast from OpenWeatherMap API
 */
async function fetchWeatherForecast(
    latitude: number,
    longitude: number,
    apiKey: string,
    units: string
): Promise<OpenWeatherResponse> {
    const url = `${OPENWEATHER_API_BASE_URL}/forecast`;

    log.info('Fetching weather forecast', {
        latitude,
        longitude,
        units,
        apiUrl: url
    });

    try {
        const response = await axios.get<OpenWeatherResponse>(url, {
            params: {
                lat: latitude,
                lon: longitude,
                appid: apiKey,
                units: units,
                cnt: 40 // 5 days of 3-hour forecasts
            },
            timeout: 10000, // 10 second timeout
            headers: {
                'User-Agent': 'Apify-Weather-Actor/1.0'
            }
        });

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

/**
 * Handles API errors with meaningful messages
 */
function handleApiError(error: unknown): never {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        
        if (axiosError.response) {
            const status = axiosError.response.status;
            
            switch (status) {
                case 401:
                    throw new Error(
                        'Invalid API key. Please verify your key at https://openweathermap.org/api. ' +
                        'New keys may take 10-15 minutes to activate.'
                    );
                case 404:
                    throw new Error(
                        'Location not found. Please verify your coordinates are valid.'
                    );
                case 429:
                    throw new Error(
                        'API rate limit exceeded. Please try again later or upgrade your API plan.'
                    );
                default:
                    throw new Error(
                        `OpenWeatherMap API error (${status}): ${axiosError.response.statusText}`
                    );
            }
        } else if (axiosError.request) {
            throw new Error(
                'Network error: Unable to reach OpenWeatherMap API. Please check your internet connection.'
            );
        }
    }

    throw new Error(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
}

/**
 * Groups forecast data by date
 */
function groupForecastsByDate(forecasts: OpenWeatherForecastItem[]): Map<string, OpenWeatherForecastItem[]> {
    const grouped = new Map<string, OpenWeatherForecastItem[]>();

    for (const forecast of forecasts) {
        const date = new Date(forecast.dt * 1000).toISOString().split('T')[0];
        
        if (!grouped.has(date)) {
            grouped.set(date, []);
        }
        
        grouped.get(date)!.push(forecast);
    }

    return grouped;
}

/**
 * Processes raw forecast data into daily summaries
 */
function processDailyForecasts(
    groupedData: Map<string, OpenWeatherForecastItem[]>,
    units: string
): DailyWeather[] {
    const dailyForecasts: DailyWeather[] = [];
    const temperatureUnit = units === 'metric' ? '°C' : '°F';
    const dates = Array.from(groupedData.keys()).sort().slice(0, MAX_FORECAST_DAYS);

    for (const date of dates) {
        const dayData = groupedData.get(date)!;
        
        // Calculate temperature statistics
        const temperatures = dayData.map(d => d.main.temp);
        const minTemp = Math.min(...temperatures);
        const maxTemp = Math.max(...temperatures);
        const avgTemp = temperatures.reduce((a, b) => a + b, 0) / temperatures.length;

        // Get midday forecast (most representative)
        const middayIndex = Math.floor(dayData.length / 2);
        const middayForecast = dayData[middayIndex];

        // Get first and last forecasts for day/night feels like
        const firstForecast = dayData[0];
        const lastForecast = dayData[dayData.length - 1];

        // Calculate precipitation amount if available
        let precipitationAmount = 0;
        for (const item of dayData) {
            precipitationAmount += item.rain?.['3h'] || item.snow?.['3h'] || 0;
        }

        dailyForecasts.push({
            date,
            temperature: {
                min: Math.round(minTemp * 10) / 10,
                max: Math.round(maxTemp * 10) / 10,
                average: Math.round(avgTemp * 10) / 10,
                unit: temperatureUnit
            },
            feels_like: {
                day: Math.round(middayForecast.main.feels_like),
                night: Math.round(lastForecast.main.feels_like)
            },
            humidity: Math.round(
                dayData.reduce((sum, item) => sum + item.main.humidity, 0) / dayData.length
            ),
            pressure: Math.round(
                dayData.reduce((sum, item) => sum + item.main.pressure, 0) / dayData.length
            ),
            weather: {
                main: middayForecast.weather[0].main,
                description: middayForecast.weather[0].description
            },
            wind: {
                speed: Math.round(middayForecast.wind.speed * 10) / 10,
                direction: middayForecast.wind.deg
            },
            precipitation: {
                probability: Math.round(
                    Math.max(...dayData.map(d => d.pop)) * 100
                ),
                amount: precipitationAmount > 0 ? Math.round(precipitationAmount * 10) / 10 : undefined
            },
            clouds: Math.round(
                dayData.reduce((sum, item) => sum + item.clouds.all, 0) / dayData.length
            ),
            visibility: middayForecast.visibility
        });
    }

    return dailyForecasts;
}

/**
 * Builds the final forecast result
 */
function buildForecastResult(
    weatherData: OpenWeatherResponse,
    dailyForecasts: DailyWeather[],
    input: ActorInput
): ForecastResult {
    return {
        location: {
            latitude: input.latitude,
            longitude: input.longitude,
            city: weatherData.city.name,
            country: weatherData.city.country,
            timezone: weatherData.city.timezone
        },
        units: input.units || DEFAULT_UNITS,
        forecast_period: `${dailyForecasts.length}-day forecast`,
        retrieved_at: new Date().toISOString(),
        data_points: weatherData.cnt,
        daily_forecast: dailyForecasts
    };
}

// ============================================================================
// Main Actor Logic
// ============================================================================

Actor.main(async () => {
    log.info('Weather Forecast Actor started');

    // Get and validate input
    const input = await Actor.getInput<ActorInput>();
    validateInput(input);

    const { latitude, longitude, apiKey, units = DEFAULT_UNITS } = input;

    log.info('Input validated', {
        latitude,
        longitude,
        units,
        apiKeyProvided: true
    });

    try {
        // Fetch weather data
        const weatherData = await fetchWeatherForecast(latitude, longitude, apiKey, units);

        // Process forecast data
        const groupedForecasts = groupForecastsByDate(weatherData.list);
        const dailyForecasts = processDailyForecasts(groupedForecasts, units);

        // Build result
        const result = buildForecastResult(weatherData, dailyForecasts, input);

        // Save to dataset
        await Actor.pushData(result);

        // Log success
        log.info('Weather forecast retrieved successfully', {
            location: `${result.location.city}, ${result.location.country}`,
            forecastDays: dailyForecasts.length,
            dataPoints: weatherData.cnt
        });

        log.info(`✅ Success! Retrieved ${dailyForecasts.length}-day forecast for ${result.location.city}`);

    } catch (error) {
        log.error('Failed to fetch weather forecast', { error: (error as Error).message });
        throw error;
    }
});
