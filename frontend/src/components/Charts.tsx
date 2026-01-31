import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, LineChart, PieChart, BarChart } from 'lucide-react';
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAQI } from '@/contexts/AQIContext';

type ChartType = 'bar' | 'line' | 'pie' | 'histogram';

const Charts: React.FC = () => {
  const { t } = useLanguage();
  const { selectedPollutant } = useAQI();
  const [activeChart, setActiveChart] = useState<ChartType>('bar');

  // Generate hourly data for bar chart
  const generateHourlyData = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hour = i < 10 ? `0${i}:00` : `${i}:00`;
      hours.push({
        hour,
        value: Math.floor(Math.random() * 150) + 50,
        [selectedPollutant]: Math.floor(Math.random() * 100) + 30,
      });
    }
    return hours;
  };

  // Generate weekly data for line chart
  const generateWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      'PM2.5': Math.floor(Math.random() * 80) + 40,
      'PM10': Math.floor(Math.random() * 100) + 50,
    }));
  };

  // Pollutant composition data for pie chart
  const compositionData = [
    { name: 'PM2.5', value: 40, color: '#EF4444' },
    { name: 'PM10', value: 30, color: '#F97316' },
    { name: 'NO₂', value: 15, color: '#EAB308' },
    { name: 'CO', value: 10, color: '#22C55E' },
    { name: 'O₃', value: 5, color: '#06B6D4' },
  ];

  // Histogram data (severity frequency)
  const histogramData = [
    { range: 'Good (0-50)', count: 5, color: '#22C55E' },
    { range: 'Moderate (51-100)', count: 8, color: '#EAB308' },
    { range: 'Poor (101-200)', count: 12, color: '#F97316' },
    { range: 'Unhealthy (201-300)', count: 4, color: '#EF4444' },
    { range: 'Severe (301-400)', count: 2, color: '#7C3AED' },
    { range: 'Hazardous (401+)', count: 0, color: '#7F1D1D' },
  ];

  const chartButtons = [
    { type: 'bar' as ChartType, label: t('barGraph'), icon: BarChart3 },
    { type: 'line' as ChartType, label: t('lineTrend'), icon: LineChart },
    { type: 'pie' as ChartType, label: t('pieChart'), icon: PieChart },
    { type: 'histogram' as ChartType, label: t('histogram'), icon: BarChart },
  ];

  const hourlyData = generateHourlyData();
  const weeklyData = generateWeeklyData();

  return (
    <section id="charts" className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-2">{t('historicalData')}</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Currently viewing: <span className="font-semibold text-primary">{selectedPollutant}</span>
        </p>

        {/* Chart Toggle Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {chartButtons.map(({ type, label, icon: Icon }) => (
            <Button
              key={type}
              variant={activeChart === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveChart(type)}
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>

        <Card className="glass-card p-6">
          <div className="h-[400px] w-full">
            {activeChart === 'bar' && (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Bar 
                    dataKey={selectedPollutant} 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                    name={`${selectedPollutant} Level`}
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'line' && (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="PM2.5" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    dot={{ fill: '#EF4444' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="PM10" 
                    stroke="#F97316" 
                    strokeWidth={2}
                    dot={{ fill: '#F97316' }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'pie' && (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={compositionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {compositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            )}

            {activeChart === 'histogram' && (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={histogramData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="range" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={80} />
                  <YAxis tick={{ fontSize: 12 }} label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="count" name="Days in Range">
                    {histogramData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Charts;
