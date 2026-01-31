import React from 'react';
import Navbar from '@/components/Navbar';
import NearbyLocationsMap from '@/components/NearbyLocationsMap';
import AQIHero from '@/components/AQIHero';
import PollutantCards from '@/components/PollutantCards';
import AQIScaleInfo from '@/components/AQIScaleInfo';
import Charts from '@/components/Charts';
import HealthAdvisor from '@/components/HealthAdvisor';
import PollutantSimulator from '@/components/PollutantSimulator';
import CityLeaderboard from '@/components/CityLeaderboard';
import Solutions from '@/components/Solutions';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <NearbyLocationsMap />
      <main>
        <AQIHero />
        <PollutantCards />
        <AQIScaleInfo />
        <Charts />
        <HealthAdvisor />
        <PollutantSimulator />
        <CityLeaderboard />
        <Solutions />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
