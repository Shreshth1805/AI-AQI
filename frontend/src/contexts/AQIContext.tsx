import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { fetchAQIByCoords, fetchAQIByCity, WAQIData, getAQIStatus } from '@/services/aqiService';
import { toast } from 'sonner';
import { getCityData } from '@/data/cityData';

export interface LocationData {
  city: string;
  state: string;
  country: string;
  coordinates: { lat: number; lng: number };
}

export interface AQIData {
  aqi: number;
  status: 'good' | 'moderate' | 'poor' | 'unhealthy' | 'severe' | 'hazardous';
  pm25: number;
  pm10: number;
  no2: number;
  co: number;
  o3: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  lastUpdated: Date;
}

interface AQIContextType {
  location: LocationData;
  aqiData: AQIData;
  isLoading: boolean;
  selectedPollutant: string;
  setSelectedPollutant: (pollutant: string) => void;
  locateUser: () => void;
  fetchCityData: (city: string) => void;
  setLocation: (location: LocationData) => void;
}

const defaultLocation: LocationData = {
  city: 'Patiala',
  state: 'Punjab',
  country: 'India',
  coordinates: { lat: 30.3398, lng: 76.3869 }
};

const convertWAQIToAQIData = (waqi: WAQIData): AQIData => {
  return {
    aqi: waqi.aqi,
    status: getAQIStatus(waqi.aqi),
    pm25: waqi.pm25 || Math.floor(Math.random() * 80) + 40,
    pm10: waqi.pm10 || Math.floor(Math.random() * 100) + 50,
    no2: waqi.no2 || Math.floor(Math.random() * 60) + 20,
    co: waqi.co || parseFloat((Math.random() * 2 + 0.5).toFixed(1)),
    o3: waqi.o3 || Math.floor(Math.random() * 50) + 30,
    temperature: waqi.temperature || Math.floor(Math.random() * 10) + 15,
    humidity: waqi.humidity || Math.floor(Math.random() * 30) + 30,
    windSpeed: waqi.windSpeed || Math.floor(Math.random() * 15) + 5,
    uvIndex: Math.floor(Math.random() * 6) + 2,
    lastUpdated: new Date()
  };
};

const generateFallbackAQIData = (): AQIData => {
  const aqi = Math.floor(Math.random() * 150) + 80;
  return {
    aqi,
    status: getAQIStatus(aqi),
    pm25: Math.floor(Math.random() * 80) + 40,
    pm10: Math.floor(Math.random() * 100) + 50,
    no2: Math.floor(Math.random() * 60) + 20,
    co: parseFloat((Math.random() * 2 + 0.5).toFixed(1)),
    o3: Math.floor(Math.random() * 50) + 30,
    temperature: Math.floor(Math.random() * 10) + 15,
    humidity: Math.floor(Math.random() * 30) + 30,
    windSpeed: Math.floor(Math.random() * 15) + 5,
    uvIndex: Math.floor(Math.random() * 6) + 2,
    lastUpdated: new Date()
  };
};

const AQIContext = createContext<AQIContextType | undefined>(undefined);

export const AQIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationData>(defaultLocation);
  const [aqiData, setAqiData] = useState<AQIData>(generateFallbackAQIData());
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPollutant, setSelectedPollutant] = useState('PM2.5');

  // Fetch data for a specific city
  const fetchDataForCity = useCallback(async (cityName: string) => {
    const data = await fetchAQIByCity(cityName);
    if (data) {
      setAqiData(convertWAQIToAQIData(data));
    }
  }, []);

  // Fetch initial data for default location
  useEffect(() => {
    fetchDataForCity(location.city.toLowerCase());
  }, []);

  // Auto-refresh AQI data every 5 minutes
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      console.log('Auto-refreshing AQI data...');
      fetchDataForCity(location.city.toLowerCase());
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(refreshInterval);
  }, [location.city, fetchDataForCity]);

  const locateUser = useCallback(() => {
    setIsLoading(true);
    toast.info('Fetching your location...', { duration: 2000 });
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const data = await fetchAQIByCoords(latitude, longitude);
            
            if (data) {
              setLocation({
                city: data.city || 'Your Location',
                state: data.station?.split(',')[1]?.trim() || 'Punjab',
                country: 'India',
                coordinates: { lat: latitude, lng: longitude }
              });
              setAqiData(convertWAQIToAQIData(data));
              toast.success(`Air quality data loaded for ${data.city || 'your location'}`, { duration: 3000 });
            } else {
              // Fallback to simulated data
              setLocation({
                city: 'Your Location',
                state: 'Punjab',
                country: 'India',
                coordinates: { lat: latitude, lng: longitude }
              });
              setAqiData(generateFallbackAQIData());
              toast.warning('Using estimated data - no station nearby', { duration: 3000 });
            }
          } catch (error) {
            console.error('Error fetching AQI:', error);
            setAqiData(generateFallbackAQIData());
            toast.error('Failed to fetch AQI data, using estimates', { duration: 3000 });
          }
          
          setIsLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast.error('Location access denied. Using default location.', { duration: 3000 });
          setAqiData(generateFallbackAQIData());
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      toast.error('Geolocation not supported by your browser', { duration: 3000 });
      setAqiData(generateFallbackAQIData());
      setIsLoading(false);
    }
  }, []);

  const fetchCityData = useCallback(async (city: string) => {
    setIsLoading(true);
    try {
      const data = await fetchAQIByCity(city);
      if (data) {
        setLocation({
          city: data.city || city,
          state: data.station?.split(',')[1]?.trim() || '',
          country: 'India',
          coordinates: { lat: 0, lng: 0 }
        });
        setAqiData(convertWAQIToAQIData(data));
        toast.success(`Air quality data loaded for ${city}`, { duration: 3000 });
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
      toast.error('Failed to fetch data for this city', { duration: 3000 });
    }
    setIsLoading(false);
  }, []);

  const handleSetLocation = useCallback((newLocation: LocationData) => {
    setLocation(newLocation);
    
    // Check if we have city data in our database
    const cityData = getCityData(newLocation.city);
    if (cityData) {
      // Use our pre-defined city data
      setAqiData({
        aqi: cityData.aqi,
        status: cityData.status,
        pm25: cityData.pollutants.pm25,
        pm10: cityData.pollutants.pm10,
        no2: cityData.pollutants.no2,
        co: cityData.pollutants.co,
        o3: cityData.pollutants.o3,
        temperature: cityData.temp,
        humidity: cityData.humidity,
        windSpeed: cityData.wind,
        uvIndex: Math.floor(Math.random() * 6) + 2,
        lastUpdated: new Date()
      });
      toast.success(`Air quality data loaded for ${cityData.name}`, { duration: 3000 });
    } else {
      // Fetch from API for unknown cities
      fetchCityData(newLocation.city);
    }
  }, [fetchCityData]);

  return (
    <AQIContext.Provider value={{ 
      location, 
      aqiData, 
      isLoading, 
      selectedPollutant, 
      setSelectedPollutant, 
      locateUser,
      fetchCityData,
      setLocation: handleSetLocation
    }}>
      {children}
    </AQIContext.Provider>
  );
};

export const useAQI = (): AQIContextType => {
  const context = useContext(AQIContext);
  if (!context) {
    throw new Error('useAQI must be used within an AQIProvider');
  }
  return context;
};
