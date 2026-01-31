import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAQI } from '@/contexts/AQIContext';

interface Pollutant {
  id: string;
  name: string;
  fullNameKey: string;
  value: number;
  unit: string;
  icon: string;
  description: string;
}

const PollutantCards: React.FC = () => {
  const { t, n } = useLanguage();
  const { aqiData, selectedPollutant, setSelectedPollutant, location } = useAQI();
  const navigate = useNavigate();

  const pollutants: Pollutant[] = [
    {
      id: 'PM2.5',
      name: 'PM2.5',
      fullNameKey: 'pm25_name',
      value: aqiData.pm25,
      unit: 'µg/m³',
      icon: '🌫️',
      description: 'Fine particles that can penetrate deep into lungs'
    },
    {
      id: 'PM10',
      name: 'PM10',
      fullNameKey: 'pm10_name',
      value: aqiData.pm10,
      unit: 'µg/m³',
      icon: '💨',
      description: 'Coarse particles from dust and pollen'
    },
    {
      id: 'NO2',
      name: 'NO₂',
      fullNameKey: 'no2_name',
      value: aqiData.no2,
      unit: 'µg/m³',
      icon: '🏭',
      description: 'From vehicle emissions and power plants'
    },
    {
      id: 'CO',
      name: 'CO',
      fullNameKey: 'co_name',
      value: aqiData.co,
      unit: 'mg/m³',
      icon: '🚗',
      description: 'Colorless gas from incomplete combustion'
    },
    {
      id: 'O3',
      name: 'O₃',
      fullNameKey: 'ozone_name',
      value: aqiData.o3,
      unit: 'µg/m³',
      icon: '☀️',
      description: 'Ground-level ozone from sunlight + pollutants'
    }
  ];

  const handlePollutantClick = (pollutantId: string) => {
    setSelectedPollutant(pollutantId);
    // Navigate to the pollutant detail page
    navigate(`/pollutant/${pollutantId.toLowerCase()}`);
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">{t('pollutant_header')}</h2>
            <p className="text-sm text-muted-foreground">{location.city}</p>
          </div>
          <p className="text-sm text-muted-foreground">{t('click_details')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pollutants.map((pollutant) => (
            <Card
              key={pollutant.id}
              onClick={() => handlePollutantClick(pollutant.id)}
              className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                selectedPollutant === pollutant.id
                  ? 'ring-2 ring-primary border-primary shadow-lg'
                  : 'glass-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{pollutant.icon}</div>
                  <div>
                    <div className="text-xs text-muted-foreground">{t(pollutant.fullNameKey)}</div>
                    <div className="font-medium">{pollutant.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-xl font-bold">{n(pollutant.value)}</div>
                    <div className="text-xs text-muted-foreground">{pollutant.unit}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PollutantCards;
