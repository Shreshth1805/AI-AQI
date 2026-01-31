import React, { useEffect, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAQI } from '@/contexts/AQIContext';
import { fetchNearbyStations, NearbyStation, getAQIStatus } from '@/services/aqiService';
import { useLanguage } from '@/contexts/LanguageContext';

const NearbyLocationsMap: React.FC = () => {
  const { location, locateUser, isLoading } = useAQI();
  const { t } = useLanguage();
  const [nearbyStations, setNearbyStations] = useState<NearbyStation[]>([]);
  const [loadingStations, setLoadingStations] = useState(false);

  useEffect(() => {
    const loadNearbyStations = async () => {
      if (location.coordinates.lat && location.coordinates.lng) {
        setLoadingStations(true);
        const stations = await fetchNearbyStations(location.coordinates.lat, location.coordinates.lng);
        setNearbyStations(stations);
        setLoadingStations(false);
      }
    };
    loadNearbyStations();
  }, [location.coordinates]);

  const getAQIBgClass = (aqi: number) => {
    const status = getAQIStatus(aqi);
    const colors = {
      good: 'bg-aqi-good text-white',
      moderate: 'bg-aqi-moderate text-black',
      poor: 'bg-aqi-poor text-white',
      unhealthy: 'bg-aqi-unhealthy text-white',
      severe: 'bg-aqi-severe text-white',
      hazardous: 'bg-aqi-hazardous text-white'
    };
    return colors[status];
  };

  // Default stations if API doesn't return data
  const defaultStations: NearbyStation[] = [
    { name: 'Patiala', aqi: 156, lat: 30.34, lon: 76.38, distance: 0 },
    { name: 'Rajpura', aqi: 142, lat: 30.48, lon: 76.59, distance: 15.2 },
    { name: 'Sangrur', aqi: 168, lat: 30.24, lon: 75.84, distance: 42.5 },
    { name: 'Ludhiana', aqi: 189, lat: 30.90, lon: 75.85, distance: 65.3 },
    { name: 'Mohali', aqi: 134, lat: 30.70, lon: 76.72, distance: 48.7 },
  ];

  const displayStations = nearbyStations.length > 0 ? nearbyStations : defaultStations;

  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 py-3 overflow-x-auto scrollbar-hide">
          {/* Locate Me Button */}
          <button
            onClick={locateUser}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all flex-shrink-0 disabled:opacity-50"
          >
            <Navigation className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? t('locating') : t('locateMe')}
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-border flex-shrink-0"></div>

          {/* Map Icon */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Nearby:</span>
          </div>

          {/* Nearby Locations */}
          <div className="flex items-center gap-3">
            {loadingStations ? (
              <span className="text-sm text-muted-foreground animate-pulse">Loading stations...</span>
            ) : (
              displayStations.slice(0, 6).map((station, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full flex-shrink-0 hover:bg-muted transition-colors cursor-pointer"
                >
                  <span className="text-sm font-medium">{station.name}</span>
                  {station.distance !== undefined && station.distance > 0 && (
                    <span className="text-xs text-muted-foreground">{station.distance} km</span>
                  )}
                  <Badge className={`${getAQIBgClass(station.aqi)} text-xs px-2 py-0`}>
                    {station.aqi}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyLocationsMap;
