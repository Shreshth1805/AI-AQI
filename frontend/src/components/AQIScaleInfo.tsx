import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import mascotGood from '@/assets/mascot-good.png';
import mascotMask from '@/assets/mascot-mask.png';

interface AQILevel {
  rangeStart: number;
  rangeEnd: string;
  status: string;
  statusKey: string;
  descriptionKey: string;
  color: string;
  bgColor: string;
}

const aqiLevels: AQILevel[] = [
  {
    rangeStart: 0,
    rangeEnd: '50',
    status: 'Good',
    statusKey: 'good',
    descriptionKey: 'health_good',
    color: 'text-aqi-good',
    bgColor: 'bg-aqi-good'
  },
  {
    rangeStart: 51,
    rangeEnd: '100',
    status: 'Moderate',
    statusKey: 'moderate',
    descriptionKey: 'health_moderate',
    color: 'text-aqi-moderate',
    bgColor: 'bg-aqi-moderate'
  },
  {
    rangeStart: 101,
    rangeEnd: '200',
    status: 'Poor',
    statusKey: 'poor',
    descriptionKey: 'health_poor',
    color: 'text-aqi-poor',
    bgColor: 'bg-aqi-poor'
  },
  {
    rangeStart: 201,
    rangeEnd: '300',
    status: 'Unhealthy',
    statusKey: 'unhealthy',
    descriptionKey: 'health_unhealthy',
    color: 'text-aqi-unhealthy',
    bgColor: 'bg-aqi-unhealthy'
  },
  {
    rangeStart: 301,
    rangeEnd: '400',
    status: 'Severe',
    statusKey: 'severe',
    descriptionKey: 'health_severe',
    color: 'text-aqi-severe',
    bgColor: 'bg-aqi-severe'
  },
  {
    rangeStart: 401,
    rangeEnd: '500+',
    status: 'Hazardous',
    statusKey: 'hazardous',
    descriptionKey: 'health_hazardous',
    color: 'text-aqi-hazardous',
    bgColor: 'bg-aqi-hazardous'
  }
];

// Pollutant-specific health descriptions for each level
const pollutantDescriptions: Record<string, Record<string, string>> = {
  PM: {
    good: 'pm_good',
    moderate: 'pm_moderate',
    poor: 'pm_poor',
    unhealthy: 'pm_unhealthy',
    severe: 'pm_unhealthy',
    hazardous: 'pm_hazardous'
  },
  Ozone: {
    good: 'o3_good',
    moderate: 'o3_moderate',
    poor: 'o3_poor',
    unhealthy: 'o3_unhealthy',
    severe: 'o3_unhealthy',
    hazardous: 'o3_hazardous'
  },
  CO: {
    good: 'co_good',
    moderate: 'co_moderate',
    poor: 'co_poor',
    unhealthy: 'co_unhealthy',
    severe: 'co_unhealthy',
    hazardous: 'co_hazardous'
  },
  SO2: {
    good: 'so2_good',
    moderate: 'so2_moderate',
    poor: 'so2_poor',
    unhealthy: 'so2_unhealthy',
    severe: 'so2_unhealthy',
    hazardous: 'so2_hazardous'
  },
  NO2: {
    good: 'no2_good',
    moderate: 'no2_moderate',
    poor: 'no2_poor',
    unhealthy: 'no2_unhealthy',
    severe: 'no2_unhealthy',
    hazardous: 'no2_hazardous'
  }
};

const pollutantInfo = {
  PM: {
    title: 'Particulate Matter',
    description: 'Fine particles suspended in air. PM2.5 is most dangerous as it can enter bloodstream.'
  },
  Ozone: {
    title: 'Ground-Level Ozone',
    description: 'Formed when pollutants react in sunlight. Causes respiratory issues.'
  },
  CO: {
    title: 'Carbon Monoxide',
    description: 'Colorless, odorless gas from incomplete combustion. Reduces oxygen in blood.'
  },
  SO2: {
    title: 'Sulfur Dioxide',
    description: 'From burning fossil fuels. Irritates eyes and respiratory system.'
  },
  NO2: {
    title: 'Nitrogen Dioxide',
    description: 'From vehicle emissions. Aggravates respiratory diseases.'
  }
};

const AQIScaleInfo: React.FC = () => {
  const { t, n } = useLanguage();
  const [activeTab, setActiveTab] = useState('AQI');

  const getMascotForLevel = (index: number) => {
    return index > 2 ? mascotMask : mascotGood;
  };

  const getDescriptionForPollutant = (pollutant: string, statusKey: string) => {
    const descriptions = pollutantDescriptions[pollutant];
    if (descriptions && descriptions[statusKey]) {
      return t(descriptions[statusKey]);
    }
    return t(`health_${statusKey}`);
  };

  const formatRange = (level: AQILevel) => {
    const endNum = level.rangeEnd.replace('+', '');
    const hasPlus = level.rangeEnd.includes('+');
    return `${n(level.rangeStart)} - ${n(endNum)}${hasPlus ? '+' : ''}`;
  };

  return (
    <section id="aqi-scale" className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-6">{t('aqiScaleInfo')}</h2>
        
        <Card className="glass-card p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 flex-wrap h-auto gap-2">
              <TabsTrigger value="AQI" className="px-6">AQI</TabsTrigger>
              <TabsTrigger value="PM" className="px-6">PM</TabsTrigger>
              <TabsTrigger value="Ozone" className="px-6">Ozone</TabsTrigger>
              <TabsTrigger value="CO" className="px-6">CO</TabsTrigger>
              <TabsTrigger value="SO2" className="px-6">SO2</TabsTrigger>
              <TabsTrigger value="NO2" className="px-6">NO2</TabsTrigger>
            </TabsList>

            <TabsContent value="AQI" className="space-y-4">
              {aqiLevels.map((level, index) => (
                <div 
                  key={level.statusKey}
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className={`w-4 h-4 rounded-full ${level.bgColor} flex-shrink-0`}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${level.color}`}>{t(level.statusKey)}</span>
                      <span className="text-sm text-muted-foreground">({formatRange(level)})</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{t(level.descriptionKey)}</p>
                  </div>
                  <img 
                    src={getMascotForLevel(index)} 
                    alt="Status mascot" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
              ))}
            </TabsContent>

            {Object.entries(pollutantInfo).map(([key, info]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">{info.title}</h3>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>
                {aqiLevels.map((level, index) => (
                  <div 
                    key={level.statusKey}
                    className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className={`w-4 h-4 rounded-full ${level.bgColor} flex-shrink-0`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${level.color}`}>{t(level.statusKey)}</span>
                        <span className="text-sm text-muted-foreground">({formatRange(level)})</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {getDescriptionForPollutant(key, level.statusKey)}
                      </p>
                    </div>
                    <img 
                      src={getMascotForLevel(index)} 
                      alt="Status mascot" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </div>
    </section>
  );
};

export default AQIScaleInfo;
