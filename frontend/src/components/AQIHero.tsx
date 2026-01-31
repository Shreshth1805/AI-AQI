import React from 'react';
import { Droplets, Wind, Sun, MapPin, Clock, Maximize2, Compass } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAQI } from '@/contexts/AQIContext';
import mascotGood from '@/assets/mascot-good.png';
import mascotMask from '@/assets/mascot-mask.png';

const AQIHero: React.FC = () => {
  const { t, n } = useLanguage();
  const { location, aqiData, isLoading, locateUser } = useAQI();

  const getAQIColor = (status: string) => {
    const colors = {
      good: 'text-aqi-good',
      moderate: 'text-aqi-moderate',
      poor: 'text-aqi-poor',
      unhealthy: 'text-aqi-unhealthy',
      severe: 'text-aqi-severe',
      hazardous: 'text-aqi-hazardous'
    };
    return colors[status as keyof typeof colors] || 'text-muted-foreground';
  };

  const getMascot = () => {
    if (aqiData.aqi > 100) return mascotMask;
    return mascotGood;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <section id="dashboard">
      {/* Full Width Map Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] bg-muted">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d100000!2d${location.coordinates.lng}!3d${location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1705916400000!5m2!1sen!2sin`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-[30%]"
        ></iframe>
        
        {/* Map Overlay Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Tabs defaultValue="aqi" className="bg-card/95 backdrop-blur-sm rounded-lg shadow-lg">
            <TabsList className="grid grid-cols-2 w-[160px]">
              <TabsTrigger value="aqi" className="text-xs gap-1">
                <Wind className="h-3 w-3" /> AQI
              </TabsTrigger>
              <TabsTrigger value="weather" className="text-xs gap-1">
                <Sun className="h-3 w-3" /> Weather
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="icon" className="h-9 w-9 bg-card/95 backdrop-blur-sm shadow-lg">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl h-[85vh]">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d200000!2d${location.coordinates.lng}!3d${location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1705916400000!5m2!1sen!2sin`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* AQI Map Label */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-card/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
          <span className="text-primary font-bold">AQI</span>
          <span className="text-sm font-medium">Map</span>
          <Maximize2 className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Content Below Map */}
      <div className="container mx-auto px-4 py-6">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {t('realTimeAQI')}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <MapPin className="h-4 w-4 text-primary" />
              <a href="#" className="text-primary font-medium hover:underline">
                {location.city}, {location.state}, {location.country}
              </a>
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              {t('lastUpdated')}: {formatDate(aqiData.lastUpdated)} {formatTime(aqiData.lastUpdated)} ({t('localTime')})
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={locateUser}
              disabled={isLoading}
              className="gap-2"
            >
              <Compass className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              {t('locateMe')}
            </Button>
          </div>
        </div>

        {/* Main AQI Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* AQI Card - Takes 8 columns */}
          <Card className="lg:col-span-8 p-6 glass-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center gap-1 text-red-500 animate-pulse-ring">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                {t('liveAqi')}
              </span>
              <span className="text-sm text-muted-foreground">{t('airQualityIs')}</span>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* AQI Display */}
              <div className="flex-1">
                <div className="flex items-end gap-4">
                  <div className={`text-7xl md:text-8xl font-bold ${getAQIColor(aqiData.status)} ${isLoading ? 'animate-pulse' : ''}`}>
                    {n(aqiData.aqi)}
                  </div>
                  <div className="mb-3">
                    <span className={`text-2xl md:text-3xl font-semibold ${getAQIColor(aqiData.status)}`}>
                      {t(aqiData.status)}
                    </span>
                    <p className="text-sm text-muted-foreground">AQI (IN)</p>
                  </div>
                </div>

                {/* Quick Pollutant Info */}
                <div className="flex gap-6 mt-4">
                  <div>
                    <span className="text-sm font-medium">PM2.5: </span>
                    <span className="font-bold">{n(aqiData.pm25)}</span>
                    <span className="text-xs text-muted-foreground"> µg/m³</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">PM10: </span>
                    <span className="font-bold">{n(aqiData.pm10)}</span>
                    <span className="text-xs text-muted-foreground"> µg/m³</span>
                  </div>
                </div>

                {/* AQI Scale */}
                <div className="mt-6">
                  <div className="flex text-xs text-muted-foreground mb-1">
                    <span className="flex-1">{t('good')}</span>
                    <span className="flex-1 text-center">{t('moderate')}</span>
                    <span className="flex-1 text-center">{t('poor')}</span>
                    <span className="flex-1 text-center">{t('unhealthy')}</span>
                    <span className="flex-1 text-center">{t('severe')}</span>
                    <span className="flex-1 text-right">{t('hazardous')}</span>
                  </div>
                  <div className="h-2.5 rounded-full flex overflow-hidden">
                    <div className="flex-1 bg-aqi-good"></div>
                    <div className="flex-1 bg-aqi-moderate"></div>
                    <div className="flex-1 bg-aqi-poor"></div>
                    <div className="flex-1 bg-aqi-unhealthy"></div>
                    <div className="flex-1 bg-aqi-severe"></div>
                    <div className="flex-1 bg-aqi-hazardous"></div>
                  </div>
                  <div className="relative mt-1">
                    <div 
                      className="absolute w-3 h-3 bg-foreground rounded-full border-2 border-card transform -translate-x-1/2 shadow-md"
                      style={{ left: `${Math.min((aqiData.aqi / 500) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex text-xs text-muted-foreground mt-3">
                    <span>{n(0)}</span>
                    <span className="flex-1"></span>
                    <span>{n(50)}</span>
                    <span className="flex-1"></span>
                    <span>{n(100)}</span>
                    <span className="flex-1"></span>
                    <span>{n(200)}</span>
                    <span className="flex-1"></span>
                    <span>{n(300)}</span>
                    <span className="flex-1"></span>
                    <span>{n(400)}</span>
                    <span className="flex-1"></span>
                    <span>{n(500)}+</span>
                  </div>
                </div>
              </div>

              {/* Mascot */}
              <div className="w-32 md:w-44 flex-shrink-0">
                <img 
                  src={getMascot()} 
                  alt="AQI Mascot" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </Card>

          {/* Weather Card - Takes 4 columns */}
          <Card className="lg:col-span-4 p-6 glass-card">
            <div className="flex flex-col h-full">
              {/* Weather Display */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">☀️</div>
                <div>
                  <div className="text-4xl font-bold">{n(aqiData.temperature)}°C</div>
                  <div className="text-muted-foreground">Sunny</div>
                </div>
              </div>

              {/* Weather Details */}
              <div className="grid grid-cols-3 gap-4 mt-auto">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Droplets className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <div className="text-xs text-muted-foreground">{t('humidity')}</div>
                  <div className="font-bold">{n(aqiData.humidity)}%</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Wind className="h-5 w-5 text-cyan-500 mx-auto mb-1" />
                  <div className="text-xs text-muted-foreground">{t('windSpeed')}</div>
                  <div className="font-bold">{n(aqiData.windSpeed)} km/h</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Sun className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                  <div className="text-xs text-muted-foreground">{t('uvIndex')}</div>
                  <div className="font-bold">{n(aqiData.uvIndex)}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AQIHero;
