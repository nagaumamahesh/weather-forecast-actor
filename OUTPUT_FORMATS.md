# 📊 Output Format Guide

The Weather Forecast Actor supports **3 different output formats** optimized for various export types and use cases.

---

## 🎯 Format Options

### 1. Detailed Format (Default)
**Best for**: JSON, JSONL, API consumption, nested data structures

**Structure**: Full nested objects with all fields organized hierarchically

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
  "retrieved_at": "2025-12-25T10:00:00.000Z",
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
        "probability": 20,
        "amount": 0
      },
      "clouds": 100,
      "visibility": 10000
    }
  ]
}
```

**Advantages**:
- ✅ Complete data structure
- ✅ Easy to parse programmatically
- ✅ Maintains relationships
- ✅ Best for JSON/JSONL

---

### 2. Simple Format
**Best for**: CSV, Excel, HTML Table, flat database imports

**Structure**: Flat rows with each day as a separate record

```json
[
  {
    "date": "2025-12-25",
    "city": "New York",
    "country": "US",
    "latitude": 40.7128,
    "longitude": -74.006,
    "temp_min": 2,
    "temp_max": 6,
    "temp_avg": 4.2,
    "temp_unit": "°C",
    "feels_like_day": -1,
    "feels_like_night": -3,
    "weather": "Clouds",
    "description": "overcast clouds",
    "humidity": 60,
    "pressure": 1017,
    "wind_speed": 5.5,
    "wind_direction": 280,
    "precipitation_probability": 20,
    "precipitation_amount": 0,
    "clouds": 100,
    "visibility": 10000,
    "retrieved_at": "2025-12-25T10:00:00.000Z"
  },
  {
    "date": "2025-12-26",
    ...
  }
]
```

**Advantages**:
- ✅ Perfect for **CSV export**
- ✅ **Excel-friendly** - each row is a day
- ✅ Easy to sort and filter
- ✅ Great for database imports
- ✅ Works perfectly with HTML tables
- ✅ No nested structures

**Example CSV Export**:
```csv
date,city,country,temp_min,temp_max,weather,humidity,wind_speed
2025-12-25,New York,US,2,6,Clouds,60,5.5
2025-12-26,New York,US,-3,3,Clouds,37,4.0
```

---

### 3. Summary Format
**Best for**: RSS feeds, notifications, quick overview, dashboards

**Structure**: Concise with combined string fields

```json
{
  "location": "New York, US",
  "coordinates": "40.7128, -74.006",
  "units": "metric",
  "forecast_period": "6-day forecast",
  "retrieved_at": "2025-12-25T10:00:00.000Z",
  "forecast": [
    {
      "date": "2025-12-25",
      "temperature": "2 to 6°C",
      "weather": "Clouds - overcast clouds",
      "precipitation": "20%",
      "wind": "5.5 m/s",
      "humidity": "60%"
    }
  ]
}
```

**Advantages**:
- ✅ Human-readable
- ✅ Compact and concise
- ✅ Perfect for RSS feeds
- ✅ Great for notifications
- ✅ Dashboard-friendly
- ✅ Reduced data size

---

## 🎨 How to Use

### In Apify Console

1. Open your Actor input
2. Find "Output Format" dropdown
3. Select one of:
   - **Detailed (full nested structure)** - Default
   - **Simple (flat structure for CSV/Excel)** - Best for exports
   - **Summary (concise overview)** - Best for displays

### In API Call

```json
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "units": "metric",
  "apiKey": "your_key",
  "outputFormat": "simple"
}
```

### In Code

```javascript
const input = {
  latitude: 40.7128,
  longitude: -74.0060,
  units: "metric",
  apiKey: process.env.OPENWEATHER_API_KEY,
  outputFormat: "simple" // or "detailed" or "summary"
};
```

---

## 📥 Export Compatibility Matrix

| Format | JSON | CSV | Excel | XML | HTML Table | RSS | JSONL |
|--------|------|-----|-------|-----|------------|-----|-------|
| **Detailed** | ✅ Perfect | ❌ Nested | ⚠️ Complex | ✅ Good | ⚠️ Complex | ✅ Good | ✅ Perfect |
| **Simple** | ✅ Good | ✅ Perfect | ✅ Perfect | ✅ Good | ✅ Perfect | ✅ Good | ✅ Perfect |
| **Summary** | ✅ Perfect | ✅ Good | ✅ Good | ✅ Good | ✅ Perfect | ✅ Perfect | ✅ Perfect |

**Legend**:
- ✅ **Perfect**: Optimal format for this export type
- ✅ **Good**: Works well
- ⚠️ **Complex**: Works but may require flattening
- ❌ **Nested**: Will be flattened/split by exporter

---

## 💡 Use Case Recommendations

### For Data Analysis
```json
{"outputFormat": "simple"}
```
- Export as CSV
- Import into Excel/Google Sheets
- Use pivot tables
- Create charts easily

### For API Integration
```json
{"outputFormat": "detailed"}
```
- Full data structure
- Easy to parse
- Maintain relationships
- Complete information

### For Notifications/Alerts
```json
{"outputFormat": "summary"}
```
- Concise messages
- Email notifications
- SMS alerts
- Dashboard displays

### For RSS Feeds
```json
{"outputFormat": "summary"}
```
- Human-readable
- Compact format
- Perfect for feed readers

### For Database Import
```json
{"outputFormat": "simple"}
```
- Flat table structure
- One row per day
- Easy to query
- Standard SQL operations

---

## 📊 Field Comparison

### Detailed Format Fields
```
location {
  latitude, longitude, city, country, timezone
}
units
forecast_period
retrieved_at
data_points
daily_forecast[] {
  date
  temperature { min, max, average, unit }
  feels_like { day, night }
  humidity, pressure
  weather { main, description }
  wind { speed, direction }
  precipitation { probability, amount }
  clouds, visibility
}
```

### Simple Format Fields (Flat)
```
date, city, country, latitude, longitude,
temp_min, temp_max, temp_avg, temp_unit,
feels_like_day, feels_like_night,
weather, description, humidity, pressure,
wind_speed, wind_direction,
precipitation_probability, precipitation_amount,
clouds, visibility, retrieved_at
```

### Summary Format Fields (Combined)
```
location (string)
coordinates (string)
units
forecast_period
retrieved_at
forecast[] {
  date
  temperature (string)
  weather (string)
  precipitation (string)
  wind (string)
  humidity (string)
}
```

---

## 🚀 Examples

### Exporting to CSV for Excel

1. Set `outputFormat: "simple"`
2. Run Actor
3. Go to Storage → Dataset
4. Select "CSV" format
5. Click "Download"
6. Open in Excel - perfectly formatted!

**Result**: Clean spreadsheet with each day as a row ✅

### Creating an RSS Feed

1. Set `outputFormat: "summary"`
2. Run Actor
3. Go to Storage → Dataset
4. Select "RSS" format
5. Copy the feed URL

**Result**: Human-readable weather feed ✅

### API Integration

1. Set `outputFormat: "detailed"`
2. Call Actor via API
3. Parse JSON response
4. Access nested data easily

**Result**: Complete structured data ✅

---

## 🎯 Quick Decision Guide

**Choose Detailed if**:
- You need all data fields
- Building an API
- Want nested structures
- JSON is your primary format

**Choose Simple if**:
- Exporting to CSV/Excel
- Importing to database
- Need flat table structure
- Creating HTML tables

**Choose Summary if**:
- Creating RSS feeds
- Sending notifications
- Building dashboards
- Need human-readable format

---

## ⚙️ Technical Details

### Output Processing

- **Detailed**: Returns single object with all data
- **Simple**: Returns array of objects (one per day)
- **Summary**: Returns single object with simplified arrays

### Dataset Storage

- **Detailed**: 1 record in dataset
- **Simple**: N records (one per day, better for CSV)
- **Summary**: 1 record in dataset

### Performance

All formats have the same processing time - the transformation happens after data collection.

---

## 📝 Notes

- Default format is "detailed" if not specified
- Format can be changed per run
- All formats contain the same core weather data
- Format affects only the output structure, not the data fetched

---

**Choose the right format for your needs and export seamlessly!** 🎉
