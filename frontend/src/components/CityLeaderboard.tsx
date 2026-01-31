import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { leaderboardCities } from '@/data/cityData';

interface City {
  rank: number;
  name: string;
  country: string;
  flag: string;
  aqi: number;
  status: 'good' | 'moderate' | 'poor' | 'unhealthy' | 'severe' | 'hazardous';
  standardValue: string;
}

const CityLeaderboard: React.FC = () => {
  const { t, n } = useLanguage();
  const [viewType, setViewType] = useState<'city' | 'country'>('city');
  const [rankingType, setRankingType] = useState<'city' | 'country'>('city');
  const [favorites, setFavorites] = useState<number[]>([]);

  const getStatusColor = (status: string) => {
    const colors = {
      good: 'bg-aqi-good',
      moderate: 'bg-aqi-moderate',
      poor: 'bg-aqi-poor',
      unhealthy: 'bg-aqi-unhealthy',
      severe: 'bg-aqi-severe',
      hazardous: 'bg-aqi-hazardous'
    };
    return colors[status as keyof typeof colors] || 'bg-muted';
  };

  const getStatusText = (status: string) => {
    return t(status);
  };

  const getStatusTextColor = (status: string) => {
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

  const toggleFavorite = (rank: number) => {
    setFavorites(prev => 
      prev.includes(rank) 
        ? prev.filter(r => r !== rank)
        : [...prev, rank]
    );
  };

  // Get unique countries with average AQI
  const countryData = useMemo(() => {
    const countryMap = new Map<string, { country: string; flag: string; cities: City[]; totalAqi: number }>();
    
    leaderboardCities.forEach(city => {
      if (countryMap.has(city.country)) {
        const existing = countryMap.get(city.country)!;
        existing.cities.push(city as City);
        existing.totalAqi += city.aqi;
      } else {
        countryMap.set(city.country, {
          country: city.country,
          flag: city.flag,
          cities: [city as City],
          totalAqi: city.aqi
        });
      }
    });

    return Array.from(countryMap.values())
      .map((data, index) => ({
        rank: index + 1,
        country: data.country,
        flag: data.flag,
        avgAqi: Math.round(data.totalAqi / data.cities.length),
        cityCount: data.cities.length
      }))
      .sort((a, b) => b.avgAqi - a.avgAqi)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  }, []);

  const getAqiStatus = (aqi: number): City['status'] => {
    if (aqi <= 50) return 'good';
    if (aqi <= 100) return 'moderate';
    if (aqi <= 200) return 'poor';
    if (aqi <= 300) return 'unhealthy';
    if (aqi <= 400) return 'severe';
    return 'hazardous';
  };

  const displayData = viewType === 'city' ? leaderboardCities : countryData;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1 text-destructive">
              <span className="w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
              {t('liveAqi')} {t('rankings')}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">{t('leaderboard_title')}</h2>
          <p className="text-muted-foreground">{t('leaderboard_sub')}</p>
        </div>

        <Card className="glass-card p-6">
          {/* Toggle Buttons */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex gap-4 flex-wrap">
              <Button
                variant={rankingType === 'city' ? 'default' : 'outline'}
                className="gap-2"
                onClick={() => {
                  setRankingType('city');
                  setViewType('city');
                }}
              >
                <span className="text-primary-foreground">↗</span>
                {t('leaderboard_title')}
              </Button>
              <Button
                variant={rankingType === 'country' ? 'default' : 'outline'}
                className="gap-2"
                onClick={() => {
                  setRankingType('country');
                  setViewType('country');
                }}
              >
                <span className="text-primary-foreground">↗</span>
                {t('countryRanking')}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewType === 'city' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('city')}
              >
                {t('cityRanking')}
              </Button>
              <Button
                variant={viewType === 'country' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('country')}
              >
                {t('countryRanking')}
              </Button>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 py-3 border-b border-border text-sm font-medium text-muted-foreground">
            <div className="col-span-1">{t('rank_col')}</div>
            <div className="col-span-4">{viewType === 'city' ? t('city_col') : t('country_col')}</div>
            <div className="col-span-2 text-center">{t('aqi_col')}</div>
            <div className="col-span-2 text-center">{t('status_col')}</div>
            <div className="col-span-2 text-center">{t('std_col')}</div>
            <div className="col-span-1 text-center">Follow</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {viewType === 'city' ? (
              leaderboardCities.map((city) => (
                <div 
                  key={city.rank}
                  className="grid grid-cols-12 gap-4 py-4 items-center hover:bg-secondary/30 transition-colors"
                >
                  <div className="col-span-1 font-medium">{n(city.rank)}.</div>
                  <div className="col-span-4 flex items-center gap-2">
                    <span className="text-xl">{city.flag}</span>
                    <span className="font-medium">{city.name}, {city.country}</span>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium text-primary-foreground ${getStatusColor(city.status)}`}>
                      {n(city.aqi)}
                    </span>
                  </div>
                  <div className={`col-span-2 text-center font-medium ${getStatusTextColor(city.status)}`}>
                    {getStatusText(city.status)}
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-destructive font-medium">{n(city.standardValue.replace('x', ''))}x</span>
                    <span className="text-muted-foreground text-sm"> {t('aboveStandard')}</span>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(city.rank)}
                      className={favorites.includes(city.rank) ? 'text-destructive' : 'text-muted-foreground'}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(city.rank) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              countryData.map((country) => {
                const status = getAqiStatus(country.avgAqi);
                return (
                  <div 
                    key={country.rank}
                    className="grid grid-cols-12 gap-4 py-4 items-center hover:bg-secondary/30 transition-colors"
                  >
                    <div className="col-span-1 font-medium">{n(country.rank)}.</div>
                    <div className="col-span-4 flex items-center gap-2">
                      <span className="text-xl">{country.flag}</span>
                      <span className="font-medium">{country.country}</span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium text-primary-foreground ${getStatusColor(status)}`}>
                        {n(country.avgAqi)}
                      </span>
                    </div>
                    <div className={`col-span-2 text-center font-medium ${getStatusTextColor(status)}`}>
                      {getStatusText(status)}
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="text-muted-foreground">{n(country.cityCount)} {country.cityCount === 1 ? 'city' : 'cities'}</span>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(country.rank + 100)}
                        className={favorites.includes(country.rank + 100) ? 'text-destructive' : 'text-muted-foreground'}
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(country.rank + 100) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CityLeaderboard;
