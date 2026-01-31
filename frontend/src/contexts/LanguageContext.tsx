import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'pa';

interface TranslationStrings {
  [key: string]: string;
}

interface Translations {
  en: TranslationStrings;
  hi: TranslationStrings;
  pa: TranslationStrings;
}

export const translations: Translations = {
  en: {
    // Navbar & Hero
    locateMe: "Locate Me",
    dashboard: "Dashboard",
    solutions: "Air Quality Solutions",
    airQualitySolutions: "Air Quality Solutions",
    compare: "Compare Models",
    compareModels: "Compare Models",
    advisor: "AI Advisor",
    aiAdvisor: "AI Advisor",
    search_placeholder: "Search any Location...",
    liveAqi: "Live AQI",
    airQualityIs: "Air Quality is",
    humidity: "Humidity",
    windSpeed: "Wind Speed",
    uvIndex: "UV Index",
    temperature: "Temperature",
    realTimeAQI: "Real-time Air Quality Index (AQI)",
    lastUpdated: "Last Updated",
    localTime: "Local Time",
    aqiScale: "AQI Scale",

    // Pollutant Details
    majorPollutants: "Major Air Pollutants",
    pollutant_header: "Major Air Pollutants",
    click_details: "Click any pollutant for details →",
    pm25_name: "Fine Particles (PM2.5)",
    pm10_name: "Coarse Particles (PM10)",
    no2_name: "Nitrogen Dioxide (NO₂)",
    co_name: "Carbon Monoxide (CO)",
    ozone_name: "Ozone (O₃)",
    
    // Status Descriptions
    good: "Good",
    moderate: "Moderate",
    poor: "Poor",
    unhealthy: "Unhealthy",
    severe: "Severe",
    hazardous: "Hazardous",
    aboveStandard: "above Standard",
    
    // Health Advice Text
    health_good: "The air is fresh and free from toxins. Enjoy outdoor activities.",
    health_moderate: "Air quality is acceptable. Sensitive individuals should monitor.",
    health_poor: "Breathing may become slightly uncomfortable for sensitive groups.",
    health_unhealthy: "Risky for children and elderly. Limit outdoor activities.",
    health_severe: "Prolonged exposure can cause chronic health issues.",
    health_hazardous: "Dangerously high pollution. Stay indoors.",

    // Solutions Section
    sol_title: "Air Quality Solutions",
    sol_subtitle: "Protect yourself and your family with our recommended solutions",
    sol_monitor: "Air Quality Monitor",
    sol_monitor_desc: "Real-time indoor air quality monitoring for your home and office",
    sol_sensors: "Air Quality Sensors",
    sol_sensors_desc: "Professional-grade sensors for accurate pollutant measurement",
    sol_fresh_air: "Fresh Air Machine",
    sol_fresh_air_desc: "HEPA air purifiers to keep your indoor air clean and fresh",
    sol_cabin: "Car Cabin Filter",
    sol_cabin_desc: "High-efficiency cabin air filters for vehicles",
    sol_mask: "N95 Mask",
    sol_mask_desc: "Medical-grade respiratory protection against fine particles",

    // Leaderboard
    leaderboard_title: "World's Most Polluted Cities 2026",
    leaderboard_sub: "Real-time air quality index ranking of cities & countries",
    rank_col: "Rank",
    city_col: "Most Polluted Cities",
    country_col: "Most Polluted Countries",
    aqi_col: "AQI",
    status_col: "AQI Status",
    std_col: "Standard Value",
    globalLeaderboard: "Global City AQI Ranking",
    cityRanking: "City Ranking",
    countryRanking: "Country Ranking",

    // Footer
    footer_about_title: "About AirGuard",
    footer_about_desc: "Real-time Air quality and Weather data around the world",
    footer_links: "Quick Links",
    footer_contact: "Contact Us",
    footer_location: "Location",
    rights_reserved: "© 2026 AirGuard. All rights reserved.",
    aboutUs: "About AirGuard",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    socials: "Socials",
    findUsOn: "Find us on:",
    supportDesk: "Support Desk",
    airQuality: "Air Quality",
    rankings: "Rankings",

    // Charts
    historicalData: "Historical & Analytical Data",
    barGraph: "Bar Graph",
    lineTrend: "Line Trend",
    pieChart: "Composition",
    histogram: "Histogram",
    hourlyAQI: "Hourly AQI Trend",
    weeklyTrend: "Weekly Pollution Trend",
    pollutantComposition: "Pollutant Composition",
    aqiDistribution: "AQI Distribution",

    // Health Advisor
    healthInsights: "Health Insights",
    askHealth: "Can I go jogging today?",
    aiHealthAdvisor: "AI Health Advisor",
    typeQuestion: "Type your health question...",
    send: "Send",

    // AQI Scale
    aqiScaleInfo: "AQI Scale Information",
    aqiScaleDescription: "Understanding the Air Quality Index levels",

    // Pollutant Simulator
    adjustPollutants: "Adjust Pollutant Levels",
    projectedAqi: "Projected AQI",
    reset: "Reset",
    quickScenarios: "Quick Scenarios",
    lessTraffic: "50% Less Traffic",
    reducedIndustry: "Reduced Industrial Activity",
    wildfire: "Wildfire Scenario",
    greenCity: "Green City Initiative",

    // Location
    fetchingLocation: "Fetching your location...",
    locationFound: "Location found!",
    selectCity: "Select City",
    locationChanged: "Location Changed",
    nowShowingAQI: "Now showing AQI data for",

    // Pollutant Detail Page
    backToDashboard: "Back to Dashboard",
    currentLevel: "Current",
    level: "Level",
    whoGuidelineExceeded: "WHO Guideline Exceeded",
    currentLevelIs: "Current level is",
    aboveWHO: "above the WHO recommended guideline of",
    healthImpact: "Health Impact",
    breathingEquivalent: "Breathing this air today is equivalent to smoking",
    cigarettes: "cigarettes",
    healthEffects: "Health Effects",
    hourTrend: "24-Hour",
    trend: "Trend",
    uncoveringSources: "Uncovering the Sources",
    understandingWhere: "Understanding where",
    comesFrom: "comes from helps identify solutions",
    protectiveMeasures: "Protective Measures",
    wearN95: "Wear N95 Mask",
    whenOutdoors: "When outdoors, especially during high pollution hours",
    useAirPurifier: "Use Air Purifier",
    keepIndoorClean: "Keep indoor air clean with HEPA filters",
    avoidOutdoorExercise: "Avoid Outdoor Exercise",
    exerciseIndoors: "Exercise indoors when AQI is above 100",
    keepWindowsClosed: "Keep Windows Closed",
    preventPollutants: "Prevent outdoor pollutants from entering",

    // Pollutant-specific health descriptions
    pm_good: "Air is clear. Little to no risk from particles.",
    pm_moderate: "Sensitive people should consider reducing heavy exertion.",
    pm_poor: "Particles may cause coughing or throat irritation.",
    pm_unhealthy: "High particle load. Dangerous for lungs and heart. Wear a mask.",
    pm_hazardous: "Emergency conditions. Serious risk of heart/lung damage. Avoid all outdoor exposure.",
    
    o3_good: "Ozone levels are safe. Enjoy the outdoors.",
    o3_moderate: "Unusually sensitive people may experience heavy breathing.",
    o3_poor: "Ground-level ozone may cause lung inflammation and asthma attacks.",
    o3_unhealthy: "High risk of respiratory infection. Avoid outdoor exercise.",
    o3_hazardous: "Extreme respiratory distress likely. Stay indoors with air filtration.",
    
    co_good: "CO levels are negligible. Normal oxygen flow.",
    co_moderate: "Levels are acceptable, but can increase in heavy traffic.",
    co_poor: "May cause mild headache or fatigue in heart patients.",
    co_unhealthy: "Significant oxygen reduction in blood. Chest pain is possible.",
    co_hazardous: "Toxic levels! Immediate risk of blackout or heart failure. Evacuate if indoor source.",
    
    no2_good: "Nitrogen levels are low. Air is safe.",
    no2_moderate: "Nitrogen dioxide levels may slightly irritate airways.",
    no2_poor: "Increased risk of respiratory symptoms like coughing.",
    no2_unhealthy: "High risk for asthmatics. Long-term exposure reduces lung function.",
    no2_hazardous: "Severe airway inflammation likely. Danger to all groups. Limit exposure immediately.",
    
    so2_good: "SO2 concentration is very low.",
    so2_moderate: "Acceptable, but asthmatics may feel tightness in the chest.",
    so2_poor: "Throat irritation and wheezing likely for sensitive groups.",
    so2_unhealthy: "Severe risk of bronchoconstriction. Keep windows closed.",
    so2_hazardous: "Emergency Warning: Risk of severe asthma attacks and permanent lung harm.",
  },

  hi: {
    // Navbar & Hero
    locateMe: "मुझे खोजें",
    dashboard: "डैशबोर्ड",
    solutions: "वायु गुणवत्ता समाधान",
    airQualitySolutions: "वायु गुणवत्ता समाधान",
    compare: "मॉडल तुलना",
    compareModels: "मॉडल तुलना",
    advisor: "AI सलाहकार",
    aiAdvisor: "AI सलाहकार",
    search_placeholder: "कोई भी स्थान खोजें...",
    liveAqi: "लाइव AQI",
    airQualityIs: "वायु गुणवत्ता है",
    humidity: "नमी",
    windSpeed: "हवा की गति",
    uvIndex: "UV सूचकांक",
    temperature: "तापमान",
    realTimeAQI: "रीयल-टाइम वायु गुणवत्ता सूचकांक (AQI)",
    lastUpdated: "अंतिम अपडेट",
    localTime: "स्थानीय समय",
    aqiScale: "AQI पैमाना",

    // Pollutant Details
    majorPollutants: "प्रमुख वायु प्रदूषक",
    pollutant_header: "प्रमुख वायु प्रदूषक",
    click_details: "विवरण के लिए किसी भी प्रदूषक पर क्लिक करें →",
    pm25_name: "सूक्ष्म कण (PM2.5)",
    pm10_name: "मोटे कण (PM10)",
    no2_name: "नाइट्रोजन डाइऑक्साइड (NO₂)",
    co_name: "कार्बन मोनोऑक्साइड (CO)",
    ozone_name: "ओजोन (O₃)",

    // Status Descriptions
    good: "अच्छा",
    moderate: "मध्यम",
    poor: "खराब",
    unhealthy: "अस्वस्थ",
    severe: "गंभीर",
    hazardous: "खतरनाक",
    aboveStandard: "मानक से ऊपर",

    // Health Advice Text
    health_good: "हवा ताजी और विषाक्त पदार्थों से मुक्त है। बाहरी गतिविधियों का आनंद लें।",
    health_moderate: "वायु गुणवत्ता स्वीकार्य है। संवेदनशील व्यक्तियों को निगरानी करनी चाहिए।",
    health_poor: "संवेदनशील समूहों के लिए सांस लेना थोड़ा असहज हो सकता है।",
    health_unhealthy: "बच्चों और बुजुर्गों के लिए जोखिम भरा। बाहरी गतिविधियां सीमित करें।",
    health_severe: "लंबे समय तक संपर्क में रहने से पुरानी स्वास्थ्य समस्याएं हो सकती हैं।",
    health_hazardous: "खतरनाक रूप से उच्च प्रदूषण। घर के अंदर रहें।",

    // Solutions Section
    sol_title: "वायु गुणवत्ता समाधान",
    sol_subtitle: "हमारे अनुशंसित समाधानों के साथ अपनी और अपने परिवार की सुरक्षा करें",
    sol_monitor: "वायु गुणवत्ता मॉनिटर",
    sol_monitor_desc: "आपके घर और कार्यालय के लिए वास्तविक समय वायु निगरानी",
    sol_sensors: "वायु गुणवत्ता सेंसर",
    sol_sensors_desc: "सटीक प्रदूषक माप के लिए पेशेवर-ग्रेड सेंसर",
    sol_fresh_air: "ताजी हवा की मशीन",
    sol_fresh_air_desc: "अंदर की हवा को साफ और ताजा रखने के लिए HEPA प्यूरीफायर",
    sol_cabin: "कार केबिन फिल्टर",
    sol_cabin_desc: "वाहनों के लिए उच्च दक्षता वाले केबिन एयर फिल्टर",
    sol_mask: "N95 मास्क",
    sol_mask_desc: "सूक्ष्म कणों के खिलाफ चिकित्सा-ग्रेड श्वसन सुरक्षा",

    // Leaderboard
    leaderboard_title: "विश्व के सबसे प्रदूषित शहर 2026",
    leaderboard_sub: "शहरों और देशों की वास्तविक समय वायु गुणवत्ता सूचकांक रैंकिंग",
    rank_col: "रैंक",
    city_col: "सबसे प्रदूषित शहर",
    country_col: "सबसे प्रदूषित देश",
    aqi_col: "AQI",
    status_col: "AQI स्थिति",
    std_col: "मानक मूल्य",
    globalLeaderboard: "वैश्विक शहर AQI रैंकिंग",
    cityRanking: "शहर रैंकिंग",
    countryRanking: "देश रैंकिंग",

    // Footer
    footer_about_title: "AirGuard के बारे में",
    footer_about_desc: "दुनिया भर में वास्तविक समय वायु गुणवत्ता और मौसम डेटा",
    footer_links: "त्वरित लिंक",
    footer_contact: "संपर्क करें",
    footer_location: "स्थान",
    rights_reserved: "© 2026 AirGuard. सर्वाधिकार सुरक्षित।",
    aboutUs: "AirGuard के बारे में",
    quickLinks: "त्वरित लिंक",
    contactUs: "संपर्क करें",
    socials: "सोशल मीडिया",
    findUsOn: "हमें यहां खोजें:",
    supportDesk: "सहायता डेस्क",
    airQuality: "वायु गुणवत्ता",
    rankings: "रैंकिंग",

    // Charts
    historicalData: "ऐतिहासिक और विश्लेषणात्मक डेटा",
    barGraph: "बार ग्राफ",
    lineTrend: "लाइन ट्रेंड",
    pieChart: "संरचना",
    histogram: "हिस्टोग्राम",
    hourlyAQI: "प्रति घंटा AQI ट्रेंड",
    weeklyTrend: "साप्ताहिक प्रदूषण ट्रेंड",
    pollutantComposition: "प्रदूषक संरचना",
    aqiDistribution: "AQI वितरण",

    // Health Advisor
    healthInsights: "स्वास्थ्य अंतर्दृष्टि",
    askHealth: "क्या मैं आज जॉगिंग कर सकता हूं?",
    aiHealthAdvisor: "AI स्वास्थ्य सलाहकार",
    typeQuestion: "अपना स्वास्थ्य प्रश्न टाइप करें...",
    send: "भेजें",

    // AQI Scale
    aqiScaleInfo: "AQI पैमाना जानकारी",
    aqiScaleDescription: "वायु गुणवत्ता सूचकांक स्तरों को समझना",

    // Pollutant Simulator
    adjustPollutants: "प्रदूषक स्तर समायोजित करें",
    projectedAqi: "अनुमानित AQI",
    reset: "रीसेट",
    quickScenarios: "त्वरित परिदृश्य",
    lessTraffic: "50% कम ट्रैफिक",
    reducedIndustry: "कम औद्योगिक गतिविधि",
    wildfire: "जंगल की आग परिदृश्य",
    greenCity: "हरित शहर पहल",

    // Location
    fetchingLocation: "आपका स्थान खोज रहे हैं...",
    locationFound: "स्थान मिल गया!",
    selectCity: "शहर चुनें",
    locationChanged: "स्थान बदला गया",
    nowShowingAQI: "अब AQI डेटा दिखा रहा है",

    // Pollutant Detail Page
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
    currentLevel: "वर्तमान",
    level: "स्तर",
    whoGuidelineExceeded: "WHO दिशानिर्देश पार हो गया",
    currentLevelIs: "वर्तमान स्तर है",
    aboveWHO: "WHO अनुशंसित दिशानिर्देश से ऊपर",
    healthImpact: "स्वास्थ्य प्रभाव",
    breathingEquivalent: "आज इस हवा में सांस लेना बराबर है",
    cigarettes: "सिगरेट के",
    healthEffects: "स्वास्थ्य प्रभाव",
    hourTrend: "24-घंटे",
    trend: "ट्रेंड",
    uncoveringSources: "स्रोतों की खोज",
    understandingWhere: "यह समझना कि",
    comesFrom: "कहां से आता है समाधान पहचानने में मदद करता है",
    protectiveMeasures: "सुरक्षात्मक उपाय",
    wearN95: "N95 मास्क पहनें",
    whenOutdoors: "बाहर जाते समय, विशेष रूप से उच्च प्रदूषण घंटों में",
    useAirPurifier: "एयर प्यूरीफायर का उपयोग करें",
    keepIndoorClean: "HEPA फिल्टर के साथ इनडोर हवा को साफ रखें",
    avoidOutdoorExercise: "बाहरी व्यायाम से बचें",
    exerciseIndoors: "जब AQI 100 से ऊपर हो तो घर के अंदर व्यायाम करें",
    keepWindowsClosed: "खिड़कियां बंद रखें",
    preventPollutants: "बाहरी प्रदूषकों को अंदर आने से रोकें",

    // Pollutant-specific health descriptions
    pm_good: "हवा साफ है। कणों से कोई खतरा नहीं।",
    pm_moderate: "संवेदनशील लोगों को भारी परिश्रम कम करना चाहिए।",
    pm_poor: "कणों से खांसी या गले में जलन हो सकती है।",
    pm_unhealthy: "उच्च कण भार। फेफड़ों और हृदय के लिए खतरनाक। मास्क पहनें।",
    pm_hazardous: "आपातकालीन स्थिति। हृदय/फेफड़ों की क्षति का गंभीर खतरा।",
    
    o3_good: "ओज़ोन का स्तर सुरक्षित है। बाहर का आनंद लें।",
    o3_moderate: "असामान्य रूप से संवेदनशील लोगों को भारी सांस का अनुभव हो सकता है।",
    o3_poor: "जमीनी स्तर का ओज़ोन फेफड़ों की सूजन और अस्थमा का कारण बन सकता है।",
    o3_unhealthy: "श्वसन संक्रमण का उच्च जोखिम। बाहरी व्यायाम से बचें।",
    o3_hazardous: "अत्यधिक श्वसन तकलीफ संभव। एयर फिल्ट्रेशन के साथ घर के अंदर रहें।",
    
    co_good: "CO का स्तर नगण्य है। सामान्य ऑक्सीजन प्रवाह।",
    co_moderate: "स्तर स्वीकार्य है, लेकिन भारी ट्रैफिक में बढ़ सकता है।",
    co_poor: "हृदय रोगियों में हल्का सिरदर्द या थकान हो सकती है।",
    co_unhealthy: "रक्त में महत्वपूर्ण ऑक्सीजन कमी। सीने में दर्द संभव।",
    co_hazardous: "विषाक्त स्तर! बेहोशी या हृदय विफलता का तत्काल खतरा।",
    
    no2_good: "नाइट्रोजन का स्तर कम है। हवा सुरक्षित है।",
    no2_moderate: "NO₂ का स्तर वायुमार्ग में हल्की जलन कर सकता है।",
    no2_poor: "खांसी जैसे श्वसन लक्षणों का बढ़ा हुआ खतरा।",
    no2_unhealthy: "अस्थमा रोगियों के लिए उच्च जोखिम। लंबे समय तक संपर्क से फेफड़ों की क्षमता कम होती है।",
    no2_hazardous: "गंभीर वायुमार्ग सूजन संभव। सभी समूहों के लिए खतरा।",
    
    so2_good: "SO2 की सांद्रता बहुत कम है।",
    so2_moderate: "स्वीकार्य, लेकिन अस्थमा रोगियों को छाती में जकड़न हो सकती है।",
    so2_poor: "संवेदनशील समूहों में गले में जलन और घरघराहट संभव।",
    so2_unhealthy: "ब्रोंकोकॉन्स्ट्रिक्शन का गंभीर खतरा। खिड़कियां बंद रखें।",
    so2_hazardous: "आपातकालीन चेतावनी: गंभीर अस्थमा और स्थायी फेफड़ों की क्षति का खतरा।",
  },

  pa: {
    // Navbar & Hero
    locateMe: "ਮੈਨੂੰ ਲੱਭੋ",
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    solutions: "ਹਵਾ ਗੁਣਵੱਤਾ ਹੱਲ",
    airQualitySolutions: "ਹਵਾ ਗੁਣਵੱਤਾ ਹੱਲ",
    compare: "ਮਾਡਲ ਤੁਲਨਾ",
    compareModels: "ਮਾਡਲ ਤੁਲਨਾ",
    advisor: "AI ਸਲਾਹਕਾਰ",
    aiAdvisor: "AI ਸਲਾਹਕਾਰ",
    search_placeholder: "ਕੋਈ ਵੀ ਸਥਾਨ ਲੱਭੋ...",
    liveAqi: "ਲਾਈਵ AQI",
    airQualityIs: "ਹਵਾ ਦੀ ਗੁਣਵੱਤਾ ਹੈ",
    humidity: "ਨਮੀ",
    windSpeed: "ਹਵਾ ਦੀ ਗਤੀ",
    uvIndex: "UV ਇੰਡੈਕਸ",
    temperature: "ਤਾਪਮਾਨ",
    realTimeAQI: "ਰੀਅਲ-ਟਾਈਮ ਹਵਾ ਗੁਣਵੱਤਾ ਸੂਚਕਾਂਕ (AQI)",
    lastUpdated: "ਆਖਰੀ ਅੱਪਡੇਟ",
    localTime: "ਸਥਾਨਕ ਸਮਾਂ",
    aqiScale: "AQI ਪੈਮਾਨਾ",

    // Pollutant Details
    majorPollutants: "ਮੁੱਖ ਹਵਾ ਪ੍ਰਦੂਸ਼ਕ",
    pollutant_header: "ਮੁੱਖ ਹਵਾ ਪ੍ਰਦੂਸ਼ਕ",
    click_details: "ਵੇਰਵਿਆਂ ਲਈ ਕਿਸੇ ਵੀ ਪ੍ਰਦੂਸ਼ਕ 'ਤੇ ਕਲਿੱਕ ਕਰੋ →",
    pm25_name: "ਬਰੀਕ ਕਣ (PM2.5)",
    pm10_name: "ਮੋਟੇ ਕਣ (PM10)",
    no2_name: "ਨਾਇਟ੍ਰੋਜਨ ਡਾਈਆਕਸਾਈਡ (NO₂)",
    co_name: "ਕਾਰਬਨ ਮੋਨੋਆਕਸਾਈਡ (CO)",
    ozone_name: "ਓਜ਼ੋਨ (O₃)",

    // Status Descriptions
    good: "ਵਧੀਆ",
    moderate: "ਦਰਮਿਆਨਾ",
    poor: "ਮਾੜਾ",
    unhealthy: "ਸਿਹਤ ਲਈ ਹਾਨੀਕਾਰਕ",
    severe: "ਗੰਭੀਰ",
    hazardous: "ਖਤਰਨਾਕ",
    aboveStandard: "ਮਿਆਰੀ ਤੋਂ ਉੱਪਰ",

    // Health Advice Text
    health_good: "ਹਵਾ ਤਾਜ਼ੀ ਅਤੇ ਜ਼ਹਿਰੀਲੇ ਪਦਾਰਥਾਂ ਤੋਂ ਮੁਕਤ ਹੈ। ਬਾਹਰੀ ਗਤੀਵਿਧੀਆਂ ਦਾ ਆਨੰਦ ਲਓ।",
    health_moderate: "ਹਵਾ ਦੀ ਗੁਣਵੱਤਾ ਸਵੀਕਾਰਯੋਗ ਹੈ। ਸੰਵੇਦਨਸ਼ੀਲ ਵਿਅਕਤੀਆਂ ਨੂੰ ਧਿਆਨ ਰੱਖਣਾ ਚਾਹੀਦਾ ਹੈ।",
    health_poor: "ਸਾਹ ਲੈਣਾ ਥੋੜ੍ਹਾ ਮੁਸ਼ਕਲ ਹੋ ਸਕਦਾ ਹੈ।",
    health_unhealthy: "ਬੱਚਿਆਂ ਅਤੇ ਬਜ਼ੁਰਗਾਂ ਲਈ ਖਤਰਾ। ਬਾਹਰ ਜਾਣ ਤੋਂ ਪਰਹੇਜ਼ ਕਰੋ।",
    health_severe: "ਲੰਬੇ ਸਮੇਂ ਤੱਕ ਸੰਪਰਕ ਗੰਭੀਰ ਸਿਹਤ ਸਮੱਸਿਆਵਾਂ ਦਾ ਕਾਰਨ ਬਣ ਸਕਦਾ ਹੈ।",
    health_hazardous: "ਖਤਰਨਾਕ ਪੱਧਰ 'ਤੇ ਪ੍ਰਦੂਸ਼ਣ। ਘਰ ਦੇ ਅੰਦਰ ਰਹੋ।",

    // Solutions Section
    sol_title: "ਹਵਾ ਗੁਣਵੱਤਾ ਹੱਲ",
    sol_subtitle: "ਸਾਡੇ ਸੁਝਾਏ ਹੱਲਾਂ ਨਾਲ ਆਪਣੀ ਅਤੇ ਆਪਣੇ ਪਰਿਵਾਰ ਦੀ ਰੱਖਿਆ ਕਰੋ",
    sol_monitor: "ਹਵਾ ਗੁਣਵੱਤਾ ਮੋਨੀਟਰ",
    sol_monitor_desc: "ਤੁਹਾਡੇ ਘਰ ਅਤੇ ਦਫਤਰ ਲਈ ਅਸਲ-ਸਮੇਂ ਦੀ ਹਵਾ ਨਿਗਰਾਨੀ",
    sol_sensors: "ਹਵਾ ਗੁਣਵੱਤਾ ਸੈਂਸਰ",
    sol_sensors_desc: "ਸਹੀ ਪ੍ਰਦੂਸ਼ਕ ਮਾਪ ਲਈ ਪੇਸ਼ੇਵਰ ਸੈਂਸਰ",
    sol_fresh_air: "ਤਾਜ਼ੀ ਹਵਾ ਦੀ ਮਸ਼ੀਨ",
    sol_fresh_air_desc: "ਅੰਦਰਲੀ ਹਵਾ ਨੂੰ ਸਾਫ਼ ਰੱਖਣ ਲਈ HEPA ਪਿਊਰੀਫਾਇਰ",
    sol_cabin: "ਕਾਰ ਕੈਬਿਨ ਫਿਲਟਰ",
    sol_cabin_desc: "ਗੱਡੀਆਂ ਲਈ ਉੱਚ ਸਮਰੱਥਾ ਵਾਲੇ ਕੈਬਿਨ ਏਅਰ ਫਿਲਟਰ",
    sol_mask: "N95 ਮਾਸਕ",
    sol_mask_desc: "ਬਰੀਕ ਕਣਾਂ ਵਿਰੁੱਧ ਮੈਡੀਕਲ-ਗ੍ਰੇਡ ਸਾਹ ਸੁਰੱਖਿਆ",

    // Leaderboard
    leaderboard_title: "ਦੁਨੀਆ ਦੇ ਸਭ ਤੋਂ ਪ੍ਰਦੂਸ਼ਿਤ ਸ਼ਹਿਰ 2026",
    leaderboard_sub: "ਸ਼ਹਿਰਾਂ ਅਤੇ ਦੇਸ਼ਾਂ ਦੀ ਅਸਲ-ਸਮੇਂ ਦੀ AQI ਰੈਂਕਿੰਗ",
    rank_col: "ਰੈਂਕ",
    city_col: "ਸਭ ਤੋਂ ਪ੍ਰਦੂਸ਼ਿਤ ਸ਼ਹਿਰ",
    country_col: "ਸਭ ਤੋਂ ਪ੍ਰਦੂਸ਼ਿਤ ਦੇਸ਼",
    aqi_col: "AQI",
    status_col: "AQI ਸਥਿਤੀ",
    std_col: "ਮਿਆਰੀ ਮੁੱਲ",
    globalLeaderboard: "ਗਲੋਬਲ ਸ਼ਹਿਰ AQI ਰੈਂਕਿੰਗ",
    cityRanking: "ਸ਼ਹਿਰ ਰੈਂਕਿੰਗ",
    countryRanking: "ਦੇਸ਼ ਰੈਂਕਿੰਗ",

    // Footer
    footer_about_title: "AirGuard ਬਾਰੇ",
    footer_about_desc: "ਦੁਨੀਆ ਭਰ ਵਿੱਚ ਅਸਲ-ਸਮੇਂ ਦੀ ਹਵਾ ਗੁਣਵੱਤਾ ਅਤੇ ਮੌਸਮ ਡੇਟਾ",
    footer_links: "ਜਲਦੀ ਲਿੰਕ",
    footer_contact: "ਸੰਪਰਕ ਕਰੋ",
    footer_location: "ਟਿਕਾਣਾ",
    rights_reserved: "© 2026 AirGuard. ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।",
    aboutUs: "AirGuard ਬਾਰੇ",
    quickLinks: "ਤੁਰੰਤ ਲਿੰਕ",
    contactUs: "ਸੰਪਰਕ ਕਰੋ",
    socials: "ਸੋਸ਼ਲ ਮੀਡੀਆ",
    findUsOn: "ਸਾਨੂੰ ਇੱਥੇ ਲੱਭੋ:",
    supportDesk: "ਸਹਾਇਤਾ ਡੈਸਕ",
    airQuality: "ਹਵਾ ਗੁਣਵੱਤਾ",
    rankings: "ਰੈਂਕਿੰਗ",

    // Charts
    historicalData: "ਇਤਿਹਾਸਕ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣਾਤਮਕ ਡੇਟਾ",
    barGraph: "ਬਾਰ ਗ੍ਰਾਫ",
    lineTrend: "ਲਾਈਨ ਟ੍ਰੈਂਡ",
    pieChart: "ਰਚਨਾ",
    histogram: "ਹਿਸਟੋਗ੍ਰਾਮ",
    hourlyAQI: "ਪ੍ਰਤੀ ਘੰਟਾ AQI ਟ੍ਰੈਂਡ",
    weeklyTrend: "ਹਫ਼ਤਾਵਾਰੀ ਪ੍ਰਦੂਸ਼ਣ ਟ੍ਰੈਂਡ",
    pollutantComposition: "ਪ੍ਰਦੂਸ਼ਕ ਰਚਨਾ",
    aqiDistribution: "AQI ਵੰਡ",

    // Health Advisor
    healthInsights: "ਸਿਹਤ ਸੂਝ",
    askHealth: "ਕੀ ਮੈਂ ਅੱਜ ਜੌਗਿੰਗ ਕਰ ਸਕਦਾ ਹਾਂ?",
    aiHealthAdvisor: "AI ਸਿਹਤ ਸਲਾਹਕਾਰ",
    typeQuestion: "ਆਪਣਾ ਸਿਹਤ ਸਵਾਲ ਟਾਈਪ ਕਰੋ...",
    send: "ਭੇਜੋ",

    // AQI Scale
    aqiScaleInfo: "AQI ਪੈਮਾਨਾ ਜਾਣਕਾਰੀ",
    aqiScaleDescription: "ਹਵਾ ਗੁਣਵੱਤਾ ਸੂਚਕਾਂਕ ਪੱਧਰਾਂ ਨੂੰ ਸਮਝਣਾ",

    // Pollutant Simulator
    adjustPollutants: "ਪ੍ਰਦੂਸ਼ਕ ਪੱਧਰ ਸਮਾਯੋਜਿਤ ਕਰੋ",
    projectedAqi: "ਅਨੁਮਾਨਿਤ AQI",
    reset: "ਰੀਸੈੱਟ",
    quickScenarios: "ਤੁਰੰਤ ਦ੍ਰਿਸ਼",
    lessTraffic: "50% ਘੱਟ ਟ੍ਰੈਫਿਕ",
    reducedIndustry: "ਘੱਟ ਉਦਯੋਗਿਕ ਗਤੀਵਿਧੀ",
    wildfire: "ਜੰਗਲੀ ਅੱਗ ਦ੍ਰਿਸ਼",
    greenCity: "ਹਰੇ ਸ਼ਹਿਰ ਦੀ ਪਹਿਲਕਦਮੀ",

    // Location
    fetchingLocation: "ਤੁਹਾਡੀ ਸਥਿਤੀ ਲੱਭ ਰਹੇ ਹਾਂ...",
    locationFound: "ਸਥਿਤੀ ਮਿਲ ਗਈ!",
    selectCity: "ਸ਼ਹਿਰ ਚੁਣੋ",
    locationChanged: "ਸਥਿਤੀ ਬਦਲੀ ਗਈ",
    nowShowingAQI: "ਹੁਣ AQI ਡੇਟਾ ਦਿਖਾ ਰਿਹਾ ਹੈ",

    // Pollutant Detail Page
    backToDashboard: "ਡੈਸ਼ਬੋਰਡ 'ਤੇ ਵਾਪਸ ਜਾਓ",
    currentLevel: "ਮੌਜੂਦਾ",
    level: "ਪੱਧਰ",
    whoGuidelineExceeded: "WHO ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ ਤੋਂ ਪਾਰ",
    currentLevelIs: "ਮੌਜੂਦਾ ਪੱਧਰ ਹੈ",
    aboveWHO: "WHO ਸਿਫ਼ਾਰਸ਼ੀ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ ਤੋਂ ਉੱਪਰ",
    healthImpact: "ਸਿਹਤ ਪ੍ਰਭਾਵ",
    breathingEquivalent: "ਅੱਜ ਇਸ ਹਵਾ ਵਿੱਚ ਸਾਹ ਲੈਣਾ ਬਰਾਬਰ ਹੈ",
    cigarettes: "ਸਿਗਰੇਟ ਦੇ",
    healthEffects: "ਸਿਹਤ ਪ੍ਰਭਾਵ",
    hourTrend: "24-ਘੰਟੇ",
    trend: "ਟ੍ਰੈਂਡ",
    uncoveringSources: "ਸ੍ਰੋਤਾਂ ਦੀ ਖੋਜ",
    understandingWhere: "ਇਹ ਸਮਝਣਾ ਕਿ",
    comesFrom: "ਕਿੱਥੋਂ ਆਉਂਦਾ ਹੈ ਹੱਲ ਲੱਭਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ",
    protectiveMeasures: "ਸੁਰੱਖਿਆ ਉਪਾਅ",
    wearN95: "N95 ਮਾਸਕ ਪਹਿਨੋ",
    whenOutdoors: "ਬਾਹਰ ਜਾਂਦੇ ਸਮੇਂ, ਖਾਸ ਕਰਕੇ ਉੱਚ ਪ੍ਰਦੂਸ਼ਣ ਸਮੇਂ",
    useAirPurifier: "ਏਅਰ ਪਿਊਰੀਫਾਇਰ ਵਰਤੋ",
    keepIndoorClean: "HEPA ਫਿਲਟਰਾਂ ਨਾਲ ਅੰਦਰਲੀ ਹਵਾ ਸਾਫ਼ ਰੱਖੋ",
    avoidOutdoorExercise: "ਬਾਹਰੀ ਕਸਰਤ ਤੋਂ ਬਚੋ",
    exerciseIndoors: "ਜਦੋਂ AQI 100 ਤੋਂ ਉੱਪਰ ਹੋਵੇ ਤਾਂ ਘਰ ਦੇ ਅੰਦਰ ਕਸਰਤ ਕਰੋ",
    keepWindowsClosed: "ਖਿੜਕੀਆਂ ਬੰਦ ਰੱਖੋ",
    preventPollutants: "ਬਾਹਰੀ ਪ੍ਰਦੂਸ਼ਕਾਂ ਨੂੰ ਅੰਦਰ ਆਉਣ ਤੋਂ ਰੋਕੋ",

    // Pollutant-specific health descriptions
    pm_good: "ਹਵਾ ਸਾਫ਼ ਹੈ। ਕਣਾਂ ਤੋਂ ਕੋਈ ਖ਼ਤਰਾ ਨਹੀਂ।",
    pm_moderate: "ਸੰਵੇਦਨਸ਼ੀਲ ਲੋਕਾਂ ਨੂੰ ਭਾਰੀ ਮਿਹਨਤ ਘੱਟ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ।",
    pm_poor: "ਕਣਾਂ ਤੋਂ ਖੰਘ ਜਾਂ ਗਲੇ ਵਿੱਚ ਜਲਣ ਹੋ ਸਕਦੀ ਹੈ।",
    pm_unhealthy: "ਉੱਚ ਕਣ ਭਾਰ। ਫੇਫੜਿਆਂ ਅਤੇ ਦਿਲ ਲਈ ਖ਼ਤਰਨਾਕ। ਮਾਸਕ ਪਹਿਨੋ।",
    pm_hazardous: "ਐਮਰਜੈਂਸੀ ਹਾਲਾਤ। ਦਿਲ/ਫੇਫੜਿਆਂ ਦੇ ਨੁਕਸਾਨ ਦਾ ਗੰਭੀਰ ਖ਼ਤਰਾ।",
    
    o3_good: "ਓਜ਼ੋਨ ਦਾ ਪੱਧਰ ਸੁਰੱਖਿਅਤ ਹੈ। ਬਾਹਰ ਦਾ ਆਨੰਦ ਮਾਣੋ।",
    o3_moderate: "ਅਸਧਾਰਨ ਤੌਰ 'ਤੇ ਸੰਵੇਦਨਸ਼ੀਲ ਲੋਕਾਂ ਨੂੰ ਭਾਰੀ ਸਾਹ ਦਾ ਅਨੁਭਵ ਹੋ ਸਕਦਾ ਹੈ।",
    o3_poor: "ਜ਼ਮੀਨੀ ਪੱਧਰ ਦਾ ਓਜ਼ੋਨ ਫੇਫੜਿਆਂ ਦੀ ਸੋਜ ਅਤੇ ਦਮੇ ਦਾ ਕਾਰਨ ਬਣ ਸਕਦਾ ਹੈ।",
    o3_unhealthy: "ਸਾਹ ਦੀ ਲਾਗ ਦਾ ਉੱਚ ਖ਼ਤਰਾ। ਬਾਹਰੀ ਕਸਰਤ ਤੋਂ ਬਚੋ।",
    o3_hazardous: "ਬਹੁਤ ਜ਼ਿਆਦਾ ਸਾਹ ਦੀ ਤਕਲੀਫ਼ ਸੰਭਵ। ਏਅਰ ਫਿਲਟ੍ਰੇਸ਼ਨ ਨਾਲ ਘਰ ਦੇ ਅੰਦਰ ਰਹੋ।",
    
    co_good: "CO ਦਾ ਪੱਧਰ ਨਗਣਯ ਹੈ। ਆਮ ਆਕਸੀਜਨ ਵਹਾਅ।",
    co_moderate: "ਪੱਧਰ ਸਵੀਕਾਰਯੋਗ ਹੈ, ਪਰ ਭਾਰੀ ਟ੍ਰੈਫਿਕ ਵਿੱਚ ਵਧ ਸਕਦਾ ਹੈ।",
    co_poor: "ਦਿਲ ਦੇ ਮਰੀਜ਼ਾਂ ਵਿੱਚ ਹਲਕਾ ਸਿਰ ਦਰਦ ਜਾਂ ਥਕਾਵਟ ਹੋ ਸਕਦੀ ਹੈ।",
    co_unhealthy: "ਖੂਨ ਵਿੱਚ ਮਹੱਤਵਪੂਰਨ ਆਕਸੀਜਨ ਕਮੀ। ਛਾਤੀ ਵਿੱਚ ਦਰਦ ਸੰਭਵ।",
    co_hazardous: "ਜ਼ਹਿਰੀਲੇ ਪੱਧਰ! ਬੇਹੋਸ਼ੀ ਜਾਂ ਦਿਲ ਦੀ ਅਸਫਲਤਾ ਦਾ ਤੁਰੰਤ ਖ਼ਤਰਾ।",
    
    no2_good: "ਨਾਈਟ੍ਰੋਜਨ ਦਾ ਪੱਧਰ ਘੱਟ ਹੈ। ਹਵਾ ਸੁਰੱਖਿਅਤ ਹੈ।",
    no2_moderate: "NO₂ ਦਾ ਪੱਧਰ ਸਾਹ ਨਾਲੀਆਂ ਵਿੱਚ ਹਲਕੀ ਜਲਣ ਕਰ ਸਕਦਾ ਹੈ।",
    no2_poor: "ਖੰਘ ਵਰਗੇ ਸਾਹ ਦੇ ਲੱਛਣਾਂ ਦਾ ਵਧਿਆ ਹੋਇਆ ਖ਼ਤਰਾ।",
    no2_unhealthy: "ਦਮੇ ਵਾਲੇ ਲੋਕਾਂ ਲਈ ਉੱਚ ਖ਼ਤਰਾ। ਲੰਬੇ ਸਮੇਂ ਦੇ ਸੰਪਰਕ ਨਾਲ ਫੇਫੜਿਆਂ ਦੀ ਸਮਰੱਥਾ ਘਟਦੀ ਹੈ।",
    no2_hazardous: "ਗੰਭੀਰ ਸਾਹ ਨਾਲੀ ਸੋਜ ਸੰਭਵ। ਸਾਰੇ ਸਮੂਹਾਂ ਲਈ ਖ਼ਤਰਾ।",
    
    so2_good: "SO2 ਦੀ ਗਾੜ੍ਹਾਪਣ ਬਹੁਤ ਘੱਟ ਹੈ।",
    so2_moderate: "ਸਵੀਕਾਰਯੋਗ, ਪਰ ਦਮੇ ਵਾਲੇ ਲੋਕਾਂ ਨੂੰ ਛਾਤੀ ਵਿੱਚ ਜਕੜਨ ਮਹਿਸੂਸ ਹੋ ਸਕਦੀ ਹੈ।",
    so2_poor: "ਸੰਵੇਦਨਸ਼ੀਲ ਸਮੂਹਾਂ ਵਿੱਚ ਗਲੇ ਵਿੱਚ ਜਲਣ ਅਤੇ ਘਰਘਰਾਹਟ ਸੰਭਵ।",
    so2_unhealthy: "ਬ੍ਰੌਂਕੋਕੰਸਟ੍ਰਿਕਸ਼ਨ ਦਾ ਗੰਭੀਰ ਖ਼ਤਰਾ। ਖਿੜਕੀਆਂ ਬੰਦ ਰੱਖੋ।",
    so2_hazardous: "ਐਮਰਜੈਂਸੀ ਚੇਤਾਵਨੀ: ਗੰਭੀਰ ਦਮੇ ਅਤੇ ਸਥਾਈ ਫੇਫੜਿਆਂ ਦੇ ਨੁਕਸਾਨ ਦਾ ਖ਼ਤਰਾ।",
  }
};

// Number localization utility
const hindiDigits: Record<string, string> = {
  '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
  '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
};

const punjabiDigits: Record<string, string> = {
  '0': '੦', '1': '੧', '2': '੨', '3': '੩', '4': '੪',
  '5': '੫', '6': '੬', '7': '੭', '8': '੮', '9': '੯'
};

const localizeNumber = (value: string | number | undefined | null, lang: Language): string => {
  if (value === undefined || value === null || value === '') return '';
  const str = value.toString();
  
  if (lang === 'hi') {
    return str.replace(/[0-9]/g, (d) => hindiDigits[d] || d);
  }
  
  if (lang === 'pa') {
    return str.replace(/[0-9]/g, (d) => punjabiDigits[d] || d);
  }

  return str;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  n: (value: string | number | undefined | null) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[language][key];
    if (!translation) {
      // Fallback to English if translation not found
      return translations.en[key] || key;
    }
    return translation;
  };

  const n = (value: string | number | undefined | null): string => {
    return localizeNumber(value, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, n }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
