// Complete city database with AQI data for all 19 cities
export interface CityData {
  name: string;
  country: string;
  flag: string;
  aqi: number;
  status: 'good' | 'moderate' | 'poor' | 'unhealthy' | 'severe' | 'hazardous';
  temp: number;
  humidity: number;
  wind: number;
  pollutants: {
    pm25: number;
    pm10: number;
    no2: number;
    co: number;
    so2: number;
    o3: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  standardValue: string;
}

export const cityDatabase: Record<string, CityData> = {
  // --- High Pollution Group ---
  "beijing": {
    name: "Beijing",
    country: "China",
    flag: "🇨🇳",
    aqi: 434,
    status: "hazardous",
    temp: 2,
    humidity: 45,
    wind: 12,
    pollutants: { pm25: 310, pm10: 380, no2: 120, co: 5.2, so2: 45, o3: 30 },
    coordinates: { lat: 39.9042, lng: 116.4074 },
    standardValue: "29x"
  },
  "cairo": {
    name: "Cairo",
    country: "Egypt",
    flag: "🇪🇬",
    aqi: 400,
    status: "severe",
    temp: 32,
    humidity: 20,
    wind: 18,
    pollutants: { pm25: 250, pm10: 310, no2: 90, co: 4.1, so2: 30, o3: 45 },
    coordinates: { lat: 30.0444, lng: 31.2357 },
    standardValue: "27x"
  },
  "mumbai": {
    name: "Mumbai",
    country: "India",
    flag: "🇮🇳",
    aqi: 398,
    status: "severe",
    temp: 28,
    humidity: 85,
    wind: 10,
    pollutants: { pm25: 210, pm10: 260, no2: 85, co: 3.5, so2: 20, o3: 50 },
    coordinates: { lat: 19.0760, lng: 72.8777 },
    standardValue: "27x"
  },
  "dubai": {
    name: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    aqi: 385,
    status: "severe",
    temp: 35,
    humidity: 40,
    wind: 15,
    pollutants: { pm25: 200, pm10: 280, no2: 70, co: 3.0, so2: 25, o3: 60 },
    coordinates: { lat: 25.276987, lng: 55.296249 },
    standardValue: "26x"
  },
  "istanbul": {
    name: "Istanbul",
    country: "Turkey",
    flag: "🇹🇷",
    aqi: 350,
    status: "severe",
    temp: 14,
    humidity: 60,
    wind: 19,
    pollutants: { pm25: 180, pm10: 220, no2: 65, co: 2.8, so2: 18, o3: 40 },
    coordinates: { lat: 41.0082, lng: 28.9784 },
    standardValue: "23x"
  },
  "bangkok": {
    name: "Bangkok",
    country: "Thailand",
    flag: "🇹🇭",
    aqi: 320,
    status: "severe",
    temp: 34,
    humidity: 75,
    wind: 8,
    pollutants: { pm25: 160, pm10: 200, no2: 60, co: 2.5, so2: 15, o3: 55 },
    coordinates: { lat: 13.7563, lng: 100.5018 },
    standardValue: "21x"
  },
  "seoul": {
    name: "Seoul",
    country: "South Korea",
    flag: "🇰🇷",
    aqi: 280,
    status: "unhealthy",
    temp: 5,
    humidity: 50,
    wind: 14,
    pollutants: { pm25: 140, pm10: 180, no2: 55, co: 2.0, so2: 12, o3: 35 },
    coordinates: { lat: 37.5665, lng: 126.9780 },
    standardValue: "19x"
  },
  "moscow": {
    name: "Moscow",
    country: "Russia",
    flag: "🇷🇺",
    aqi: 245,
    status: "unhealthy",
    temp: -5,
    humidity: 80,
    wind: 20,
    pollutants: { pm25: 120, pm10: 150, no2: 50, co: 1.8, so2: 10, o3: 25 },
    coordinates: { lat: 55.7558, lng: 37.6173 },
    standardValue: "16x"
  },
  "mexico city": {
    name: "Mexico City",
    country: "Mexico",
    flag: "🇲🇽",
    aqi: 180,
    status: "poor",
    temp: 22,
    humidity: 35,
    wind: 11,
    pollutants: { pm25: 90, pm10: 130, no2: 45, co: 1.5, so2: 8, o3: 65 },
    coordinates: { lat: 19.4326, lng: -99.1332 },
    standardValue: "12x"
  },
  "johannesburg": {
    name: "Johannesburg",
    country: "South Africa",
    flag: "🇿🇦",
    aqi: 145,
    status: "poor",
    temp: 25,
    humidity: 45,
    wind: 13,
    pollutants: { pm25: 75, pm10: 110, no2: 40, co: 1.2, so2: 7, o3: 50 },
    coordinates: { lat: -26.2041, lng: 28.0473 },
    standardValue: "10x"
  },

  // --- Moderate/Good Group ---
  "berlin": {
    name: "Berlin",
    country: "Germany",
    flag: "🇩🇪",
    aqi: 85,
    status: "moderate",
    temp: 10,
    humidity: 70,
    wind: 16,
    pollutants: { pm25: 45, pm10: 60, no2: 30, co: 0.8, so2: 5, o3: 28 },
    coordinates: { lat: 52.5200, lng: 13.4050 },
    standardValue: "5.7x"
  },
  "madrid": {
    name: "Madrid",
    country: "Spain",
    flag: "🇪🇸",
    aqi: 78,
    status: "moderate",
    temp: 18,
    humidity: 55,
    wind: 12,
    pollutants: { pm25: 40, pm10: 55, no2: 28, co: 0.7, so2: 4, o3: 35 },
    coordinates: { lat: 40.4168, lng: -3.7038 },
    standardValue: "5.2x"
  },
  "rio de janeiro": {
    name: "Rio de Janeiro",
    country: "Brazil",
    flag: "🇧🇷",
    aqi: 70,
    status: "moderate",
    temp: 29,
    humidity: 82,
    wind: 15,
    pollutants: { pm25: 35, pm10: 50, no2: 25, co: 0.6, so2: 3, o3: 40 },
    coordinates: { lat: -22.9068, lng: -43.1729 },
    standardValue: "4.8x"
  },
  "tokyo": {
    name: "Tokyo",
    country: "Japan",
    flag: "🇯🇵",
    aqi: 65,
    status: "moderate",
    temp: 15,
    humidity: 60,
    wind: 18,
    pollutants: { pm25: 30, pm10: 45, no2: 22, co: 0.5, so2: 3, o3: 30 },
    coordinates: { lat: 35.6762, lng: 139.6503 },
    standardValue: "4.3x"
  },
  "london": {
    name: "London",
    country: "UK",
    flag: "🇬🇧",
    aqi: 55,
    status: "moderate",
    temp: 11,
    humidity: 85,
    wind: 22,
    pollutants: { pm25: 25, pm10: 35, no2: 20, co: 0.4, so2: 2, o3: 25 },
    coordinates: { lat: 51.5074, lng: -0.1278 },
    standardValue: "3.7x"
  },
  "paris": {
    name: "Paris",
    country: "France",
    flag: "🇫🇷",
    aqi: 50,
    status: "good",
    temp: 13,
    humidity: 78,
    wind: 15,
    pollutants: { pm25: 20, pm10: 30, no2: 18, co: 0.4, so2: 2, o3: 28 },
    coordinates: { lat: 48.8566, lng: 2.3522 },
    standardValue: "3.3x"
  },
  "new york": {
    name: "New York",
    country: "USA",
    flag: "🇺🇸",
    aqi: 45,
    status: "good",
    temp: 16,
    humidity: 65,
    wind: 25,
    pollutants: { pm25: 18, pm10: 25, no2: 15, co: 0.3, so2: 1, o3: 22 },
    coordinates: { lat: 40.7128, lng: -74.0060 },
    standardValue: "3x"
  },
  "toronto": {
    name: "Toronto",
    country: "Canada",
    flag: "🇨🇦",
    aqi: 40,
    status: "good",
    temp: 12,
    humidity: 70,
    wind: 20,
    pollutants: { pm25: 15, pm10: 20, no2: 12, co: 0.3, so2: 1, o3: 20 },
    coordinates: { lat: 43.65107, lng: -79.347015 },
    standardValue: "2.7x"
  },
  "sydney": {
    name: "Sydney",
    country: "Australia",
    flag: "🇦🇺",
    aqi: 35,
    status: "good",
    temp: 24,
    humidity: 55,
    wind: 30,
    pollutants: { pm25: 12, pm10: 18, no2: 10, co: 0.2, so2: 1, o3: 18 },
    coordinates: { lat: -33.8688, lng: 151.2093 },
    standardValue: "2.3x"
  }
};

// Helper function to get city data by name (case-insensitive)
export const getCityData = (cityName: string): CityData | undefined => {
  const key = cityName.toLowerCase();
  return cityDatabase[key];
};

// Get all city names for dropdown
export const getAllCityNames = (): string[] => {
  return Object.values(cityDatabase).map(city => city.name);
};

// Available locations for dropdown (derived from cityDatabase)
export const availableLocations = Object.values(cityDatabase).map(city => ({
  name: city.name,
  country: city.country,
  flag: city.flag,
  lat: city.coordinates.lat,
  lng: city.coordinates.lng
}));

// City list for leaderboard (sorted by AQI descending)
export const leaderboardCities = Object.values(cityDatabase)
  .sort((a, b) => b.aqi - a.aqi)
  .map((city, index) => ({
    rank: index + 1,
    name: city.name,
    country: city.country,
    flag: city.flag,
    aqi: city.aqi,
    status: city.status,
    standardValue: city.standardValue
  }));
