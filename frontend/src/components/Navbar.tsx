import React, { useState } from 'react';
import { MapPin, Sun, Moon, Globe, Menu, X, Info, ChevronDown, Bot } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import HealthAdvisor from '@/components/HealthAdvisor';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAQI } from '@/contexts/AQIContext';
import { toast } from '@/hooks/use-toast';
import { availableLocations } from '@/data/cityData';

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { locateUser, isLoading, setLocation, location } = useAQI();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiAdvisorOpen, setAiAdvisorOpen] = useState(false);

  const handleLocateMe = () => {
    toast({
      title: t('fetchingLocation'),
      description: "Getting your current location...",
    });
    locateUser();
  };

  const handleSelectLocation = (loc: typeof availableLocations[0]) => {
    setLocation({
      city: loc.name,
      state: '',
      country: loc.country,
      coordinates: { lat: loc.lat, lng: loc.lng }
    });
    toast({
      title: "Location Changed",
      description: `Now showing AQI data for ${loc.name}, ${loc.country}`,
    });
  };

  const languageLabels = {
    en: 'English',
    hi: 'हिंदी',
    pa: 'ਪੰਜਾਬੀ'
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Get current location display
  const currentLocationDisplay = location?.city 
    ? `${availableLocations.find(l => l.name === location.city)?.flag || '📍'} ${location.city}`
    : '📍 Select Location';

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-card/80 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              AirGuard
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Button
              variant="default"
              size="sm"
              onClick={handleLocateMe}
              disabled={isLoading}
              className="gap-2"
            >
              <MapPin className="h-4 w-4" />
              {isLoading ? '...' : t('locateMe')}
            </Button>
            
            <button
              onClick={() => scrollToSection('dashboard')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('dashboard')}
            </button>
            <button
              onClick={() => scrollToSection('solutions')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('airQualitySolutions')}
            </button>
            <button
              onClick={() => scrollToSection('compare')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('compareModels')}
            </button>
            <button
              onClick={() => scrollToSection('aqi-scale')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Info className="h-3.5 w-3.5" />
              {t('aqiScale')}
            </button>
            
            {/* AI Advisor Button */}
            <Dialog open={aiAdvisorOpen} onOpenChange={setAiAdvisorOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/30 hover:border-primary">
                  <Bot className="h-4 w-4 text-primary" />
                  {t('aiAdvisor')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0">
                <DialogHeader className="p-4 pb-0">
                  <DialogTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    {t('aiHealthAdvisor')}
                  </DialogTitle>
                </DialogHeader>
                <div className="h-[70vh] overflow-auto">
                  <HealthAdvisor />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  {languageLabels[language]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border border-border">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('hi')}>
                  हिंदी
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('pa')}>
                  ਪੰਜਾਬੀ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Location Selector Dropdown (replaces India Standard badge) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {currentLocationDisplay}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 max-h-80 overflow-y-auto bg-popover border border-border">
                <DropdownMenuLabel>Select City</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {availableLocations.map((loc) => (
                  <DropdownMenuItem 
                    key={`${loc.name}-${loc.country}`}
                    onClick={() => handleSelectLocation(loc)}
                    className="cursor-pointer"
                  >
                    <span className="mr-2">{loc.flag}</span>
                    {loc.name}, {loc.country}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-3">
              <Button
                variant="default"
                size="sm"
                onClick={handleLocateMe}
                disabled={isLoading}
                className="gap-2 w-full"
              >
                <MapPin className="h-4 w-4" />
                {isLoading ? '...' : t('locateMe')}
              </Button>
              
              <button
                onClick={() => scrollToSection('dashboard')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left py-2"
              >
                {t('dashboard')}
              </button>
              <button
                onClick={() => scrollToSection('solutions')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left py-2"
              >
                {t('airQualitySolutions')}
              </button>
              <button
                onClick={() => scrollToSection('compare')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left py-2"
              >
                {t('compareModels')}
              </button>
              <button
                onClick={() => scrollToSection('aqi-scale')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left py-2 flex items-center gap-1"
              >
                <Info className="h-3.5 w-3.5" />
                {t('aqiScaleInfo')}
              </button>

              {/* Location Selector for Mobile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 w-full justify-between">
                    {currentLocationDisplay}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 max-h-60 overflow-y-auto bg-popover border border-border">
                  <DropdownMenuLabel>Select City</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {availableLocations.map((loc) => (
                    <DropdownMenuItem 
                      key={`mobile-${loc.name}-${loc.country}`}
                      onClick={() => handleSelectLocation(loc)}
                      className="cursor-pointer"
                    >
                      <span className="mr-2">{loc.flag}</span>
                      {loc.name}, {loc.country}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Globe className="h-4 w-4" />
                      {languageLabels[language]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-popover border border-border">
                    <DropdownMenuItem onClick={() => setLanguage('en')}>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('hi')}>
                      हिंदी
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('pa')}>
                      ਪੰਜਾਬੀ
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
