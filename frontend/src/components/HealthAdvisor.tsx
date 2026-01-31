import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, AlertTriangle, AlertOctagon, CheckCircle, Activity, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAQI } from '@/contexts/AQIContext';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  isTyping?: boolean;
}

const HealthAdvisor: React.FC = () => {
  const { t } = useLanguage();
  const { aqiData, location } = useAQI();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: `Hello! I'm your AQI Health Advisor 🌿. The current AQI in ${location?.city || 'your area'} is ${aqiData.aqi}. Ask me anything about air quality, health tips, outdoor activities, or mask recommendations!`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getHealthAdvice = (aqi: number) => {
    if (aqi <= 50) {
      return {
        icon: <CheckCircle className="h-5 w-5 text-aqi-good" />,
        status: 'Good Air Quality',
        advice: 'Air quality is excellent! All outdoor activities are safe.',
        recommendation: 'Great day for outdoor exercises, jogging, or any activity!'
      };
    } else if (aqi <= 100) {
      return {
        icon: <Activity className="h-5 w-5 text-aqi-moderate" />,
        status: 'Moderate Air Quality',
        advice: 'Air quality is acceptable. Sensitive individuals should monitor.',
        recommendation: 'Outdoor activities are generally safe. Take breaks if needed.'
      };
    } else if (aqi <= 200) {
      return {
        icon: <AlertTriangle className="h-5 w-5 text-aqi-poor" />,
        status: 'Poor Air Quality',
        advice: '⚠️ Risk: High for Asthmatics. Recommendation: Consider wearing an N95 mask.',
        recommendation: 'Reduce prolonged outdoor exertion. Indoor activities preferred.'
      };
    } else if (aqi <= 300) {
      return {
        icon: <AlertTriangle className="h-5 w-5 text-aqi-unhealthy" />,
        status: 'Unhealthy Air Quality',
        advice: '⚠️ Risk: Unhealthy for all. Recommendation: Wear N95 mask outdoors.',
        recommendation: 'Avoid outdoor activities. Keep windows closed.'
      };
    } else {
      return {
        icon: <AlertOctagon className="h-5 w-5 text-aqi-hazardous" />,
        status: 'Hazardous Air Quality',
        advice: '⛔ Risk: Hazardous. Recommendation: Schools should close. Stay indoors.',
        recommendation: 'Do not go outside. Use air purifiers indoors if available.'
      };
    }
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase().trim();
    const { aqi, pm25, pm10, no2, co, o3 } = aqiData;
    const cityName = location?.city || 'your area';

    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
      return `Hello! 👋 I'm here to help you stay healthy. The current AQI in ${cityName} is ${aqi}. What would you like to know about air quality or health recommendations?`;
    }

    // Thank you responses
    if (lowerMessage.match(/^(thanks|thank you|thx|appreciate)/)) {
      return `You're welcome! 😊 Stay safe and breathe healthy! Feel free to ask me anything else about air quality.`;
    }

    // Current AQI/Status queries
    if (lowerMessage.match(/(current|now|today).*(aqi|air quality|pollution)/) || 
        lowerMessage.match(/(what|how).*(aqi|air quality|pollution)/) ||
        lowerMessage === 'aqi') {
      const advice = getHealthAdvice(aqi);
      return `📊 **Current Air Quality in ${cityName}:**\n\n` +
             `• AQI: ${aqi} (${advice.status})\n` +
             `• PM2.5: ${pm25} µg/m³\n` +
             `• PM10: ${pm10} µg/m³\n` +
             `• NO2: ${no2} ppb\n` +
             `• Ozone: ${o3} ppb\n\n` +
             `${advice.recommendation}`;
    }

    // Activity-related queries - Jogging/Running/Exercise
    if (lowerMessage.match(/(jog|run|exercise|workout|gym|sport|play)/)) {
      if (aqi <= 50) return '✅ **Perfect for outdoor exercise!** The air is clean. Enjoy your jog or workout without any concerns.';
      if (aqi <= 100) return '👍 **Moderate conditions for exercise.** You can jog or exercise, but take it easy if you feel any discomfort. Consider a shorter session.';
      if (aqi <= 150) return '⚠️ **Caution advised.** Sensitive individuals should reduce outdoor exercise. Consider indoor alternatives like yoga, gym workouts, or home exercises.';
      if (aqi <= 200) return '🚫 **Not recommended for outdoor exercise.** Try indoor activities instead:\n• Indoor yoga\n• Home workouts\n• Gym with good ventilation\n• Swimming (indoor pool)';
      return '❌ **Avoid all outdoor physical activity!** The air is hazardous. Stay indoors and do light stretching or meditation instead.';
    }

    // Walking/Outdoor activities
    if (lowerMessage.match(/(walk|outdoor|outside|park|garden)/)) {
      if (aqi <= 100) return '✅ **Walking is safe!** Enjoy your outdoor time. The air quality is acceptable for most people.';
      if (aqi <= 150) return '⚠️ **Short walks are okay**, but wear a mask if you\'ll be out for more than 30 minutes. Sensitive groups should limit exposure.';
      if (aqi <= 200) return '🚫 **Limit outdoor walks.** If you must go out:\n• Wear an N95/KN95 mask\n• Keep it short (under 15 minutes)\n• Avoid busy roads';
      return '❌ **Stay indoors!** The air quality is dangerous. If going out is essential, wear a properly fitted N95 mask.';
    }

    // Mask queries
    if (lowerMessage.match(/(mask|n95|respirator|face cover)/)) {
      if (aqi <= 50) return '😊 **No mask needed** in current conditions. Air quality is excellent!';
      if (aqi <= 100) return '💡 Masks are **optional** for most people. Sensitive individuals (asthma, allergies) may consider a cloth mask outdoors.';
      if (aqi <= 150) return '😷 **N95/KN95 masks recommended** for outdoor activities, especially for:\n• Children\n• Elderly\n• People with respiratory conditions';
      if (aqi <= 200) return '😷 **Definitely wear an N95/KN95 mask** when going outdoors! Make sure it fits properly around your nose and mouth.';
      return '🆘 **N95 mask is ESSENTIAL!** Do not go outside without proper respiratory protection. Surgical masks are NOT sufficient in these conditions.';
    }

    // Window/Ventilation queries
    if (lowerMessage.match(/(window|ventilation|fresh air|open)/)) {
      if (aqi <= 50) return '🪟 **Open your windows!** Fresh air will help ventilate your home. Current conditions are excellent.';
      if (aqi <= 100) return '🪟 You can **open windows for short periods**. Consider doing it in early morning when pollution is typically lower.';
      if (aqi <= 150) return '⚠️ **Keep windows mostly closed.** If you need ventilation:\n• Open briefly in early morning\n• Use an air purifier\n• Close during traffic hours';
      return '🚫 **Keep all windows closed!** Use air purifiers or AC in recirculation mode. Seal any gaps where outdoor air might enter.';
    }

    // Children/School queries
    if (lowerMessage.match(/(child|kid|school|student|baby|infant|toddler)/)) {
      if (aqi <= 50) return '👶 **Safe for children!** They can play outside, attend school, and enjoy outdoor activities normally.';
      if (aqi <= 100) return '👶 **Generally safe for children.** Monitor for any signs of discomfort. Reduce intense outdoor play.';
      if (aqi <= 150) return '⚠️ **Limit outdoor time for children:**\n• Shorten recess/outdoor play\n• Keep windows closed in classrooms\n• Watch for coughing or eye irritation';
      if (aqi <= 200) return '🚫 **Keep children indoors as much as possible.** Schools should:\n• Cancel outdoor activities\n• Use air purifiers\n• Consider online classes for sensitive children';
      return '🆘 **Schools should close!** Children are extremely vulnerable. Keep them indoors with air purification. Avoid any outdoor exposure.';
    }

    // Elderly queries
    if (lowerMessage.match(/(elderly|old|senior|aged|grandparent)/)) {
      if (aqi <= 50) return '👴 **Safe for elderly!** Normal activities are fine. Encourage light outdoor walks.';
      if (aqi <= 100) return '👴 **Moderate risk.** Elderly with heart/lung conditions should monitor symptoms.';
      if (aqi <= 200) return '⚠️ **High risk for elderly:**\n• Stay indoors\n• Use air purifiers\n• Keep medications handy\n• Monitor blood pressure and breathing';
      return '🆘 **Dangerous for elderly!** Strict indoor stay required. Have emergency contacts ready. Consider temporary relocation if no air purifier available.';
    }

    // Asthma/Respiratory queries
    if (lowerMessage.match(/(asthma|respiratory|breathing|lung|copd|bronchitis)/)) {
      if (aqi <= 50) return '✅ **Low risk** for people with respiratory conditions. Normal activities are safe.';
      if (aqi <= 100) return '⚠️ **Monitor symptoms closely.** Keep rescue inhaler handy. Reduce intense outdoor activities.';
      if (aqi <= 150) return '🚨 **High risk!** For people with asthma/respiratory conditions:\n• Stay indoors\n• Use prescribed inhalers\n• Run air purifiers\n• Have emergency plan ready';
      return '🆘 **CRITICAL for respiratory patients!** Seek medical advice. Stay in a clean air room. Have emergency numbers ready. Consider temporary relocation.';
    }

    // Heart/Cardiovascular queries
    if (lowerMessage.match(/(heart|cardiac|cardiovascular|blood pressure|bp)/)) {
      if (aqi <= 100) return '❤️ **Generally safe** for heart patients. Monitor as usual and stay hydrated.';
      if (aqi <= 200) return '⚠️ **Caution for heart patients:**\n• Limit exertion\n• Stay indoors\n• Monitor blood pressure\n• Keep medications nearby';
      return '🆘 **High risk for cardiovascular patients!** Air pollution can trigger heart events. Stay indoors, rest, and contact your doctor if you feel unwell.';
    }

    // Air purifier queries
    if (lowerMessage.match(/(air purifier|purifier|hepa|filter|clean air)/)) {
      if (aqi <= 100) return '💨 Air purifiers are **optional** in current conditions but still beneficial for general health.';
      return `💨 **Air purifier is highly recommended!** (AQI: ${aqi})\n\n` +
             `Recommendations:\n` +
             `• Use HEPA filters (H13 or H14)\n` +
             `• Run 24/7 in bedrooms\n` +
             `• Close windows while running\n` +
             `• Change filters as recommended`;
    }

    // Pregnancy queries
    if (lowerMessage.match(/(pregnan|expecting|baby|maternal)/)) {
      if (aqi <= 50) return '🤰 **Safe for pregnant women.** Normal activities are fine.';
      if (aqi <= 100) return '🤰 **Generally safe**, but avoid prolonged outdoor exposure during high traffic hours.';
      return `⚠️ **Important for pregnant women!** (AQI: ${aqi})\n\n` +
             `• Limit outdoor exposure\n` +
             `• Wear N95 mask when outside\n` +
             `• Use air purifiers at home\n` +
             `• Stay hydrated\n` +
             `• Consult your doctor if experiencing discomfort`;
    }

    // What to do / recommendations
    if (lowerMessage.match(/(what should i do|what to do|recommendation|advise|suggest|tips)/)) {
      const advice = getHealthAdvice(aqi);
      if (aqi <= 50) {
        return `🌟 **Great news!** Air quality is good in ${cityName}.\n\n` +
               `You can:\n` +
               `✅ Exercise outdoors\n` +
               `✅ Open windows\n` +
               `✅ Enjoy outdoor activities\n` +
               `✅ Let children play outside`;
      } else if (aqi <= 100) {
        return `⚡ **Moderate conditions in ${cityName}.**\n\n` +
               `Recommendations:\n` +
               `• Limit prolonged outdoor exertion\n` +
               `• Sensitive groups should monitor symptoms\n` +
               `• Consider indoor activities during peak hours`;
      } else if (aqi <= 200) {
        return `⚠️ **Poor air quality in ${cityName}!**\n\n` +
               `Please:\n` +
               `🏠 Stay indoors when possible\n` +
               `😷 Wear N95 mask outside\n` +
               `🚫 Avoid outdoor exercise\n` +
               `🪟 Keep windows closed\n` +
               `💨 Use air purifiers`;
      } else {
        return `🆘 **Hazardous conditions in ${cityName}!**\n\n` +
               `URGENT recommendations:\n` +
               `🏠 Stay indoors strictly\n` +
               `😷 N95 mask essential if going out\n` +
               `🚫 No outdoor activities\n` +
               `🪟 Seal windows and doors\n` +
               `💨 Run air purifiers 24/7\n` +
               `📞 Keep emergency contacts ready`;
      }
    }

    // Pollutant-specific queries
    if (lowerMessage.match(/(pm2\.?5|pm 2\.?5|particulate)/)) {
      return `📊 **PM2.5 Information:**\n\n` +
             `Current Level: ${pm25} µg/m³\n` +
             `WHO Guideline: 15 µg/m³\n\n` +
             `PM2.5 are tiny particles that can enter your bloodstream through lungs. ` +
             `They come from vehicle exhaust, industrial emissions, and burning.`;
    }

    if (lowerMessage.match(/(pm10|dust|coarse)/)) {
      return `📊 **PM10 Information:**\n\n` +
             `Current Level: ${pm10} µg/m³\n` +
             `WHO Guideline: 45 µg/m³\n\n` +
             `PM10 are coarser particles from construction, road dust, and pollen.`;
    }

    if (lowerMessage.match(/(no2|nitrogen)/)) {
      return `📊 **NO2 (Nitrogen Dioxide) Information:**\n\n` +
             `Current Level: ${no2} ppb\n\n` +
             `NO2 comes mainly from vehicle emissions and power plants. It can irritate airways and worsen respiratory conditions.`;
    }

    if (lowerMessage.match(/(ozone|o3)/)) {
      return `📊 **Ozone (O3) Information:**\n\n` +
             `Current Level: ${o3} ppb\n\n` +
             `Ground-level ozone forms when pollutants react in sunlight. It can trigger asthma and reduce lung function.`;
    }

    if (lowerMessage.match(/(carbon monoxide|co\b)/)) {
      return `📊 **Carbon Monoxide (CO) Information:**\n\n` +
             `Current Level: ${co} ppm\n\n` +
             `CO is a colorless, odorless gas from incomplete combustion. High levels reduce oxygen delivery to organs.`;
    }

    // Help command
    if (lowerMessage.match(/(help|what can you do|commands|options)/)) {
      return `🤖 **I can help you with:**\n\n` +
             `• Current AQI and pollutant levels\n` +
             `• Outdoor activity recommendations\n` +
             `• Mask recommendations\n` +
             `• Health advice for sensitive groups\n` +
             `• Air purifier recommendations\n` +
             `• Specific pollutant information\n\n` +
             `Just ask me anything about air quality!`;
    }

    // Default response with helpful suggestions
    return `I understand you're asking about "${userMessage}". Based on the current AQI of ${aqi} in ${cityName}:\n\n` +
           `${getHealthAdvice(aqi).recommendation}\n\n` +
           `Feel free to ask me about:\n` +
           `• Safe activities for today\n` +
           `• Mask recommendations\n` +
           `• Health tips for children/elderly\n` +
           `• Air purifier advice`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay for more natural feel
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

    const botResponse: Message = {
      id: messages.length + 2,
      type: 'bot',
      content: generateResponse(input)
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botResponse]);
  };

  const healthAdvice = getHealthAdvice(aqiData.aqi);

  // Quick question buttons
  const quickQuestions = [
    "Can I jog today?",
    "Do I need a mask?",
    "Is it safe for kids?",
    "Current AQI"
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-6">{t('healthInsights')}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Health Status Card */}
          <Card className="glass-card p-6">
            <div className="flex items-start gap-4 mb-4">
              {healthAdvice.icon}
              <div>
                <h3 className="font-semibold">{healthAdvice.status}</h3>
                <p className="text-sm text-muted-foreground">{healthAdvice.advice}</p>
              </div>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Today's Recommendation</h4>
              <p className="text-sm text-muted-foreground">{healthAdvice.recommendation}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">😷</div>
                <div className="text-xs font-medium">
                  {aqiData.aqi > 100 ? 'Mask Recommended' : 'Mask Optional'}
                </div>
              </div>
              <div className="bg-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">{aqiData.aqi > 200 ? '🏠' : '🌳'}</div>
                <div className="text-xs font-medium">
                  {aqiData.aqi > 200 ? 'Stay Indoors' : 'Outdoor Safe'}
                </div>
              </div>
            </div>
          </Card>

          {/* Chatbot */}
          <Card className="glass-card p-6 flex flex-col h-[450px]">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">AQI Health Assistant</h3>
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">AI Powered</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 text-sm whitespace-pre-line ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-lg p-3 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="flex flex-wrap gap-2 mb-3">
              {quickQuestions.map((q) => (
                <Button
                  key={q}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => {
                    setInput(q);
                  }}
                >
                  {q}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('askHealth')}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
                disabled={isTyping}
              />
              <Button onClick={handleSend} size="icon" disabled={isTyping || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HealthAdvisor;
