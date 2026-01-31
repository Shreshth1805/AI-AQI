import React from 'react';
import { Mail, MapPin, Instagram, Twitter, Linkedin, Youtube, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const footerLinks = {
    aboutAqi: [
      { label: 'About Us', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'AQI Monitor', href: '#' },
      { label: 'Air Quality Blog', href: '#' },
      { label: 'Climate Change', href: '#' },
      { label: 'Community AQI Monitor', href: '#' },
      { label: 'World Air Quality Report', href: '#' },
    ],
    airQuality: [
      { label: 'AQI App', href: '#' },
      { label: 'AQI TV App', href: '#' },
      { label: 'AQI Map', href: '#' },
      { label: 'AQI APIs', href: '#' },
      { label: 'AQI Widgets', href: '#' },
      { label: 'Web Dashboard', href: '#' },
    ],
    rankings: [
      { label: 'Live AQI City Ranking', href: '#' },
      { label: 'Historic AQI City Ranking', href: '#' },
      { label: 'Historic AQI Country Ranking', href: '#' },
      { label: 'Weather Ranking', href: '#' },
    ],
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-4">
              AirGuard
            </div>
            <p className="text-sm text-slate-400 mb-4">
              {t('footer_about_desc')}
            </p>
          </div>

          {/* About AQI */}
          <div>
            <h4 className="font-semibold text-slate-100 mb-4">{t('aboutUs')}</h4>
            <ul className="space-y-2">
              {footerLinks.aboutAqi.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Air Quality */}
          <div>
            <h4 className="font-semibold text-slate-100 mb-4">{t('airQuality')}</h4>
            <ul className="space-y-2">
              {footerLinks.airQuality.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Rankings */}
          <div>
            <h4 className="font-semibold text-slate-100 mb-4">{t('rankings')}</h4>
            <ul className="space-y-2">
              {footerLinks.rankings.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-semibold text-slate-100 mb-4">{t('footer_location')}</h4>
            <div className="space-y-3">
              <a 
                href="#"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                {t('supportDesk')}
                <span className="w-2 h-2 bg-primary rounded-full"></span>
              </a>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="h-4 w-4" />
                info@airguard.in
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>706, 7th Floor, Crown Heights, Rohini Sec-10, Delhi 110085, INDIA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            {t('rights_reserved')}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 mr-2">{t('findUsOn')}</span>
            <a href="#" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
              <Youtube className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
