import React from 'react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wind, Gauge, RefreshCw, Car, ShieldCheck } from 'lucide-react';

interface Solution {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const solutions: Solution[] = [
  {
    id: 'monitor',
    title: 'Air Quality Monitor',
    description: 'Real-time indoor air quality monitoring for your home and office',
    icon: <Gauge className="h-8 w-8" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'sensors',
    title: 'Air Quality Sensors',
    description: 'Professional-grade sensors for accurate pollutant measurement',
    icon: <Wind className="h-8 w-8" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'purifier',
    title: 'Fresh Air Machine',
    description: 'HEPA air purifiers to keep your indoor air clean and fresh',
    icon: <RefreshCw className="h-8 w-8" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'carfilter',
    title: 'Car Cabin Filter',
    description: 'High-efficiency cabin air filters for vehicles',
    icon: <Car className="h-8 w-8" />,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'mask',
    title: 'N95 Mask',
    description: 'Medical-grade respiratory protection against fine particles',
    icon: <ShieldCheck className="h-8 w-8" />,
    color: 'from-indigo-500 to-violet-500'
  }
];

const Solutions: React.FC = () => {
  const { t } = useLanguage();

  // Translated solutions
  const translatedSolutions = [
    { ...solutions[0], title: t('sol_monitor'), description: t('sol_monitor_desc') },
    { ...solutions[1], title: t('sol_sensors'), description: t('sol_sensors_desc') },
    { ...solutions[2], title: t('sol_fresh_air'), description: t('sol_fresh_air_desc') },
    { ...solutions[3], title: t('sol_cabin'), description: t('sol_cabin_desc') },
    { ...solutions[4], title: t('sol_mask'), description: t('sol_mask_desc') },
  ];

  return (
    <section id="solutions" className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('sol_title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('sol_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {translatedSolutions.map((solution) => (
            <Card 
              key={solution.id}
              className="glass-card p-6 text-center cursor-pointer hover-lift group"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center text-primary-foreground transform group-hover:scale-110 transition-transform`}>
                {solution.icon}
              </div>
              <h3 className="font-semibold mb-2">{solution.title}</h3>
              <p className="text-sm text-muted-foreground">{solution.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
