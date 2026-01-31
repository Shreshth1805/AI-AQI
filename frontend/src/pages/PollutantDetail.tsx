import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Cigarette, Factory, Wind, CloudRain, Car, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAQI } from '@/contexts/AQIContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { generateHistoricalData, getAQIStatus } from '@/services/aqiService';

interface PollutantInfo {
  id: string;
  name: string;
  fullName: string;
  unit: string;
  whoGuideline: number;
  description: string;
  healthEffects: string[];
  sources: { icon: React.ReactNode; name: string; percentage: number }[];
  cigaretteEquivalent: number; // per 10 units above safe level
}

const pollutantData: Record<string, PollutantInfo> = {
  'PM2.5': {
    id: 'PM2.5',
    name: 'PM2.5',
    fullName: 'Particulate Matter (PM2.5)',
    unit: 'µg/m³',
    whoGuideline: 15,
    description: 'Fine particulate matter less than 2.5 micrometers in diameter. These tiny particles can penetrate deep into the lungs and even enter the bloodstream.',
    healthEffects: [
      'Respiratory issues and aggravated asthma',
      'Decreased lung function',
      'Cardiovascular problems',
      'Premature death in people with heart or lung disease'
    ],
    sources: [
      { icon: <Factory className="h-5 w-5" />, name: 'Industrial Emissions', percentage: 35 },
      { icon: <Car className="h-5 w-5" />, name: 'Vehicle Exhaust', percentage: 30 },
      { icon: <Flame className="h-5 w-5" />, name: 'Crop Burning', percentage: 20 },
      { icon: <Wind className="h-5 w-5" />, name: 'Dust & Construction', percentage: 15 }
    ],
    cigaretteEquivalent: 0.18
  },
  'PM10': {
    id: 'PM10',
    name: 'PM10',
    fullName: 'Particulate Matter (PM10)',
    unit: 'µg/m³',
    whoGuideline: 45,
    description: 'Coarse particulate matter between 2.5 and 10 micrometers. Includes dust, pollen, and mold spores.',
    healthEffects: [
      'Irritation of eyes, nose, and throat',
      'Coughing and sneezing',
      'Aggravated asthma symptoms',
      'Reduced visibility'
    ],
    sources: [
      { icon: <Wind className="h-5 w-5" />, name: 'Windblown Dust', percentage: 40 },
      { icon: <Factory className="h-5 w-5" />, name: 'Construction Sites', percentage: 25 },
      { icon: <Car className="h-5 w-5" />, name: 'Road Dust', percentage: 20 },
      { icon: <CloudRain className="h-5 w-5" />, name: 'Natural Sources', percentage: 15 }
    ],
    cigaretteEquivalent: 0.08
  },
  'NO2': {
    id: 'NO2',
    name: 'NO₂',
    fullName: 'Nitrogen Dioxide (NO₂)',
    unit: 'µg/m³',
    whoGuideline: 25,
    description: 'A reddish-brown gas with a pungent odor, primarily from combustion processes in vehicles and power plants.',
    healthEffects: [
      'Airway inflammation',
      'Reduced lung function',
      'Increased asthma attacks',
      'Greater susceptibility to respiratory infections'
    ],
    sources: [
      { icon: <Car className="h-5 w-5" />, name: 'Vehicle Traffic', percentage: 50 },
      { icon: <Factory className="h-5 w-5" />, name: 'Power Plants', percentage: 30 },
      { icon: <Flame className="h-5 w-5" />, name: 'Industrial Boilers', percentage: 15 },
      { icon: <Wind className="h-5 w-5" />, name: 'Other Sources', percentage: 5 }
    ],
    cigaretteEquivalent: 0.12
  },
  'CO': {
    id: 'CO',
    name: 'CO',
    fullName: 'Carbon Monoxide (CO)',
    unit: 'mg/m³',
    whoGuideline: 4,
    description: 'A colorless, odorless gas produced by incomplete combustion of carbon-containing fuels.',
    healthEffects: [
      'Headaches and dizziness',
      'Reduced oxygen delivery to organs',
      'Impaired concentration',
      'Cardiovascular effects'
    ],
    sources: [
      { icon: <Car className="h-5 w-5" />, name: 'Vehicle Emissions', percentage: 60 },
      { icon: <Factory className="h-5 w-5" />, name: 'Industrial Processes', percentage: 20 },
      { icon: <Flame className="h-5 w-5" />, name: 'Residential Heating', percentage: 15 },
      { icon: <Wind className="h-5 w-5" />, name: 'Natural Sources', percentage: 5 }
    ],
    cigaretteEquivalent: 0.25
  },
  'O3': {
    id: 'O3',
    name: 'O₃',
    fullName: 'Ozone (O₃)',
    unit: 'µg/m³',
    whoGuideline: 100,
    description: 'Ground-level ozone is formed when pollutants react with sunlight. It\'s the main ingredient in smog.',
    healthEffects: [
      'Chest pain and coughing',
      'Throat irritation',
      'Reduced lung function',
      'Aggravated respiratory conditions'
    ],
    sources: [
      { icon: <Car className="h-5 w-5" />, name: 'Vehicle NOx + Sunlight', percentage: 45 },
      { icon: <Factory className="h-5 w-5" />, name: 'Industrial VOCs', percentage: 30 },
      { icon: <Flame className="h-5 w-5" />, name: 'Chemical Solvents', percentage: 15 },
      { icon: <Wind className="h-5 w-5" />, name: 'Natural VOCs', percentage: 10 }
    ],
    cigaretteEquivalent: 0.05
  }
};

const PollutantDetail: React.FC = () => {
  const { pollutantId } = useParams<{ pollutantId: string }>();
  const navigate = useNavigate();
  const { aqiData, location } = useAQI();
  const { t, n } = useLanguage();

  const pollutant = pollutantData[pollutantId?.toUpperCase() || 'PM2.5'] || pollutantData['PM2.5'];

  const currentValue = useMemo(() => {
    switch (pollutant.id) {
      case 'PM2.5': return aqiData.pm25;
      case 'PM10': return aqiData.pm10;
      case 'NO2': return aqiData.no2;
      case 'CO': return aqiData.co;
      case 'O3': return aqiData.o3;
      default: return aqiData.pm25;
    }
  }, [pollutant.id, aqiData]);

  const whoMultiple = (currentValue / pollutant.whoGuideline).toFixed(1);
  const cigarettes = ((currentValue - pollutant.whoGuideline) * pollutant.cigaretteEquivalent).toFixed(1);
  
  const historicalData = useMemo(() => generateHistoricalData(currentValue, pollutant.id), [currentValue, pollutant.id]);

  const getBarColor = (value: number) => {
    const status = getAQIStatus(value);
    const colors = {
      good: '#22c55e',
      moderate: '#eab308',
      poor: '#f97316',
      unhealthy: '#ef4444',
      severe: '#a855f7',
      hazardous: '#991b1b'
    };
    return colors[status];
  };

  const status = getAQIStatus(currentValue);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToDashboard')}
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline" className="text-xs">
              {location.city}, {location.state}
            </Badge>
            <Badge className="bg-red-500 text-white text-xs animate-pulse">LIVE</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{pollutant.fullName} Level</h1>
          <p className="text-muted-foreground max-w-2xl">{pollutant.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Current Level & WHO Comparison */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current Level Card */}
            <Card className="p-6">
              <h3 className="text-sm text-muted-foreground mb-2">{t('currentLevel')} {pollutant.name} {t('level')}</h3>
              <div className="flex items-end gap-3">
                <span className={`text-5xl font-bold text-aqi-${status}`}>{n(currentValue)}</span>
                <span className="text-xl text-muted-foreground mb-1">{pollutant.unit}</span>
              </div>
              <div className="mt-4">
                <Badge className={`bg-aqi-${status} text-white`}>
                  {t(status)}
                </Badge>
              </div>
            </Card>

            {/* WHO Guideline Comparison */}
            <Card className="p-6 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-orange-700 dark:text-orange-400">{t('whoGuidelineExceeded')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('currentLevelIs')} <span className="font-bold text-orange-600">{n(whoMultiple)}× {t('aboveWHO')}</span> {n(pollutant.whoGuideline)} {pollutant.unit}
                  </p>
                </div>
              </div>
            </Card>

            {/* Cigarette Equivalent */}
            {parseFloat(cigarettes) > 0 && (
              <Card className="p-6 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                <div className="flex items-start gap-3">
                  <Cigarette className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-red-700 dark:text-red-400">{t('healthImpact')}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('breathingEquivalent')} <span className="font-bold text-red-600">{n(cigarettes)} {t('cigarettes')}</span>
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Health Effects */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">{t('healthEffects')}</h3>
              <ul className="space-y-2">
                {pollutant.healthEffects.map((effect, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground">{effect}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Right Column - Charts & Sources */}
          <div className="lg:col-span-2 space-y-6">
            {/* Historical Chart */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">{t('hourTrend')} {pollutant.name} {t('trend')}</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 10 }}
                      interval={2}
                    />
                    <YAxis 
                      tick={{ fontSize: 10 }}
                      label={{ value: pollutant.unit, angle: -90, position: 'insideLeft', fontSize: 10 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value} ${pollutant.unit}`, pollutant.name]}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {historicalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-aqi-good"></div>
                  <span>Good</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-aqi-moderate"></div>
                  <span>Moderate</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-aqi-poor"></div>
                  <span>Poor</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-aqi-unhealthy"></div>
                  <span>Unhealthy</span>
                </div>
              </div>
            </Card>

            {/* Pollution Sources */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">{t('uncoveringSources')}</h3>
              <p className="text-sm text-muted-foreground mb-6">
                {t('understandingWhere')} {pollutant.name} {t('comesFrom')}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pollutant.sources.map((source, index) => (
                  <Card key={index} className="p-4 text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">
                      {source.icon}
                    </div>
                    <h4 className="font-medium text-sm mb-1">{source.name}</h4>
                    <span className="text-2xl font-bold text-primary">{n(source.percentage)}%</span>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold mb-4 text-blue-700 dark:text-blue-400">{t('protectiveMeasures')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 text-sm">{n(1)}</div>
                  <div>
                    <h4 className="font-medium text-sm">{t('wearN95')}</h4>
                    <p className="text-xs text-muted-foreground">{t('whenOutdoors')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 text-sm">{n(2)}</div>
                  <div>
                    <h4 className="font-medium text-sm">{t('useAirPurifier')}</h4>
                    <p className="text-xs text-muted-foreground">{t('keepIndoorClean')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 text-sm">{n(3)}</div>
                  <div>
                    <h4 className="font-medium text-sm">{t('avoidOutdoorExercise')}</h4>
                    <p className="text-xs text-muted-foreground">{t('exerciseIndoors')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 text-sm">{n(4)}</div>
                  <div>
                    <h4 className="font-medium text-sm">{t('keepWindowsClosed')}</h4>
                    <p className="text-xs text-muted-foreground">{t('preventPollutants')}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PollutantDetail;
