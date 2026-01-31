// WAQI API Service - Uses public demo token for demo purposes
// For production, you should use your own API token from https://aqicn.org/data-platform/token/

const WAQI_BASE_URL = 'https://api.waqi.info';
const DEMO_TOKEN = 'demo'; // Public demo token

export interface WAQIData {
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  co: number;
  o3: number;
  so2?: number;
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  station: string;
  city: string;
  time: string;
}

export interface NearbyStation {
  name: string;
  aqi: number;
  lat: number;
  lon: number;
  distance?: number;
}

// Get AQI status based on value (India Standard)
export const getAQIStatus = (aqi: number): 'good' | 'moderate' | 'poor' | 'unhealthy' | 'severe' | 'hazardous' => {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 200) return 'poor';
  if (aqi <= 300) return 'unhealthy';
  if (aqi <= 400) return 'severe';
  return 'hazardous';
};

// Fetch AQI data by coordinates (geolocation)
export const fetchAQIByCoords = async (lat: number, lon: number): Promise<WAQIData | null> => {
  try {
    const response = await fetch(`${WAQI_BASE_URL}/feed/geo:${lat};${lon}/?token=${DEMO_TOKEN}`);
    const data = await response.json();
    
    if (data.status === 'ok' && data.data) {
      const { aqi, iaqi, city, time } = data.data;
      
      return {
        aqi: typeof aqi === 'number' ? aqi : parseInt(aqi) || 0,
        pm25: iaqi?.pm25?.v || 0,
        pm10: iaqi?.pm10?.v || 0,
        no2: iaqi?.no2?.v || 0,
        co: iaqi?.co?.v || 0,
        o3: iaqi?.o3?.v || 0,
        so2: iaqi?.so2?.v,
        temperature: iaqi?.t?.v,
        humidity: iaqi?.h?.v,
        windSpeed: iaqi?.w?.v,
        station: city?.name || 'Unknown Station',
        city: city?.name?.split(',')[0] || 'Unknown',
        time: time?.s || new Date().toISOString()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching AQI by coords:', error);
    return null;
  }
};

// Fetch AQI data by city name
export const fetchAQIByCity = async (cityName: string): Promise<WAQIData | null> => {
  try {
    const response = await fetch(`${WAQI_BASE_URL}/feed/${cityName}/?token=${DEMO_TOKEN}`);
    const data = await response.json();
    
    if (data.status === 'ok' && data.data) {
      const { aqi, iaqi, city, time } = data.data;
      
      return {
        aqi: typeof aqi === 'number' ? aqi : parseInt(aqi) || 0,
        pm25: iaqi?.pm25?.v || 0,
        pm10: iaqi?.pm10?.v || 0,
        no2: iaqi?.no2?.v || 0,
        co: iaqi?.co?.v || 0,
        o3: iaqi?.o3?.v || 0,
        so2: iaqi?.so2?.v,
        temperature: iaqi?.t?.v,
        humidity: iaqi?.h?.v,
        windSpeed: iaqi?.w?.v,
        station: city?.name || cityName,
        city: city?.name?.split(',')[0] || cityName,
        time: time?.s || new Date().toISOString()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching AQI by city:', error);
    return null;
  }
};

// Search for nearby stations
export const fetchNearbyStations = async (lat: number, lon: number): Promise<NearbyStation[]> => {
  try {
    // Use the map bounds API to get nearby stations
    const latDelta = 0.5; // ~50km radius
    const lonDelta = 0.5;
    const bounds = `${lat - latDelta},${lon - lonDelta},${lat + latDelta},${lon + lonDelta}`;
    
    const response = await fetch(`${WAQI_BASE_URL}/map/bounds/?latlng=${bounds}&token=${DEMO_TOKEN}`);
    const data = await response.json();
    
    if (data.status === 'ok' && data.data) {
      return data.data
        .filter((station: any) => station.aqi !== '-')
        .map((station: any) => ({
          name: station.station?.name?.split(',')[0] || 'Unknown',
          aqi: parseInt(station.aqi) || 0,
          lat: station.lat,
          lon: station.lon,
          distance: calculateDistance(lat, lon, station.lat, station.lon)
        }))
        .sort((a: NearbyStation, b: NearbyStation) => (a.distance || 0) - (b.distance || 0))
        .slice(0, 10);
    }
    return [];
  } catch (error) {
    console.error('Error fetching nearby stations:', error);
    return [];
  }
};

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 100) / 100;
};

// Generate historical data for charts (simulated based on current AQI)
export const generateHistoricalData = (currentAqi: number, pollutant: string, hours: number = 24) => {
  const data = [];
  const now = new Date();
  
  for (let i = hours - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const variation = (Math.random() - 0.5) * 40; // ±20 variation
    const value = Math.max(0, Math.round(currentAqi + variation));
    
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', hour12: true }),
      value,
      fullTime: time
    });
  }
  
  return data;
};

// Generate weekly trend data
export const generateWeeklyData = (currentValue: number) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    day,
    pm25: Math.max(0, Math.round(currentValue + (Math.random() - 0.5) * 60)),
    pm10: Math.max(0, Math.round(currentValue * 1.3 + (Math.random() - 0.5) * 80))
  }));
};
