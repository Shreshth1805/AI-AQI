import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RotateCcw, Play, Car, Factory, Flame, TreeDeciduous } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import mascotGood from '@/assets/mascot-good.png';
import mascotMask from '@/assets/mascot-mask.png';

interface PollutantLevel {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  value: number;
}

const PollutantSimulator: React.FC = () => {
  const { t } = useLanguage();
  const [pollutants, setPollutants] = useState<PollutantLevel[]>([
    { id: 'pm25', name: 'Fine Particles (PM2.5)', description: 'Vehicle emissions, industrial activity', icon: '🌫️', value: 0 },
    { id: 'pm10', name: 'Coarse Particles (PM10)', description: 'Construction, dust, pollen', icon: '💨', value: 0 },
    { id: 'no2', name: 'Nitrogen Dioxide (NO2)', description: 'Traffic, power plants', icon: '🏭', value: 0 },
    { id: 'co', name: 'Carbon Monoxide (CO)', description: 'Vehicle exhaust, heating', icon: '🚗', value: 0 },
    { id: 'o3', name: 'Ozone (O3)', description: 'Sunlight + pollutants reaction', icon: '☀️', value: 0 },
  ]);

  const [isSimulating, setIsSimulating] = useState(false);

  const calculateProjectedAQI = () => {
    const baseAQI = 54;
    const adjustment = pollutants.reduce((acc, p) => acc + p.value * 0.5, 0);
    return Math.max(0, Math.min(500, Math.round(baseAQI + adjustment)));
  };

  const projectedAQI = calculateProjectedAQI();

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { status: 'Good', color: 'text-aqi-good' };
    if (aqi <= 100) return { status: 'Moderate', color: 'text-aqi-moderate' };
    if (aqi <= 200) return { status: 'Poor', color: 'text-aqi-poor' };
    if (aqi <= 300) return { status: 'Unhealthy', color: 'text-aqi-unhealthy' };
    if (aqi <= 400) return { status: 'Severe', color: 'text-aqi-severe' };
    return { status: 'Hazardous', color: 'text-aqi-hazardous' };
  };

  const { status, color } = getAQIStatus(projectedAQI);

  const handleSliderChange = (id: string, newValue: number[]) => {
    setPollutants(prev => 
      prev.map(p => p.id === id ? { ...p, value: newValue[0] } : p)
    );
  };

  const handleReset = () => {
    setPollutants(prev => prev.map(p => ({ ...p, value: 0 })));
  };

  const handleScenario = (scenario: string) => {
    switch (scenario) {
      case 'lessTraffic':
        setPollutants(prev => prev.map(p => ({
          ...p,
          value: p.id === 'no2' || p.id === 'co' ? -30 : p.value
        })));
        break;
      case 'reducedIndustry':
        setPollutants(prev => prev.map(p => ({
          ...p,
          value: p.id === 'pm25' || p.id === 'pm10' ? -25 : p.value
        })));
        break;
      case 'wildfire':
        setPollutants(prev => prev.map(p => ({
          ...p,
          value: p.id === 'pm25' || p.id === 'pm10' ? 40 : p.value
        })));
        break;
      case 'greenCity':
        setPollutants(prev => prev.map(p => ({ ...p, value: -20 })));
        break;
    }
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 1500);
  };

  return (
    <section id="compare" className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-6">{t('adjustPollutants')}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sliders */}
          <Card className="glass-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Adjust Pollutant Levels</h3>
              <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                {t('reset')}
              </Button>
            </div>

            <div className="space-y-6">
              {pollutants.map((pollutant) => (
                <div key={pollutant.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{pollutant.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{pollutant.name}</div>
                        <div className="text-xs text-muted-foreground">{pollutant.description}</div>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${pollutant.value > 0 ? 'text-destructive' : pollutant.value < 0 ? 'text-aqi-good' : 'text-muted-foreground'}`}>
                      {pollutant.value > 0 ? '+' : ''}{pollutant.value}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground w-8">-50%</span>
                    <Slider
                      value={[pollutant.value]}
                      onValueChange={(value) => handleSliderChange(pollutant.id, value)}
                      min={-50}
                      max={50}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground w-8">+50%</span>
                  </div>
                </div>
              ))}
            </div>

          </Card>

          {/* Projected AQI */}
          <div className="space-y-6">
            <Card className="glass-card p-6 text-center">
              <h3 className="font-semibold mb-4">{t('projectedAqi')}</h3>
              <div className="mb-4">
                <img 
                  src={projectedAQI > 100 ? mascotMask : mascotGood} 
                  alt="AQI Status" 
                  className="w-24 h-24 mx-auto object-contain"
                />
              </div>
              <div className={`text-6xl font-bold ${color} ${isSimulating ? 'animate-pulse' : ''}`}>
                {projectedAQI}
              </div>
              <div className={`text-lg font-medium ${color}`}>{status}</div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4">{t('quickScenarios')}</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => handleScenario('lessTraffic')}
                >
                  <Car className="h-4 w-4" />
                  {t('lessTraffic')}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => handleScenario('reducedIndustry')}
                >
                  <Factory className="h-4 w-4" />
                  {t('reducedIndustry')}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => handleScenario('wildfire')}
                >
                  <Flame className="h-4 w-4" />
                  {t('wildfire')}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => handleScenario('greenCity')}
                >
                  <TreeDeciduous className="h-4 w-4" />
                  {t('greenCity')}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PollutantSimulator;
