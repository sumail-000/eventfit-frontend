const API_BASE = '/api';

async function request(url, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[API] ${url} failed:`, err.message);
    return null;
  }
}

export async function fetchWeather(city) {
  const data = await request(`/weather?city=${encodeURIComponent(city)}`);
  if (!data) return null;
  return data;
}

export async function fetchOutfitRecommendations({ gender, event, city, weatherMood, styles }) {
  const params = new URLSearchParams({ gender, event });
  if (city) params.set('city', city);
  if (weatherMood) params.set('weatherMood', weatherMood);
  if (styles) params.set('styles', styles);
  const data = await request(`/outfits/recommend?${params}`);
  if (!data?.outfits) return [];
  return data.outfits.map(normalizeOutfit);
}

export async function fetchOutfits(filters = {}) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(filters)) {
    if (v) params.set(k, v);
  }
  const data = await request(`/outfits?${params}`);
  if (!data?.outfits) return [];
  return data.outfits.map(normalizeOutfit);
}

export async function fetchTrendingOutfits(limit = 8) {
  const data = await request(`/outfits/trending?limit=${limit}`);
  if (!data?.outfits) return [];
  return data.outfits.map(normalizeOutfit);
}

export async function sendChatMessage(message, context = {}) {
  const data = await request('/chat', {
    method: 'POST',
    body: JSON.stringify({ message, context }),
  });
  return data;
}

function normalizeOutfit(o) {
  return { ...o, id: o.outfitId || o.id };
}

export function mapWeatherForGetOutfit(weather) {
  if (!weather) return null;
  const condLabel = weather.condition?.label || 'Clear';
  let condIcon = 'CloudSun';
  let condColor = '#BFB4D4';

  if (condLabel.includes('Rain') || condLabel.includes('Drizzle')) {
    condIcon = 'CloudRain'; condColor = '#4DEFE0';
  } else if (condLabel.includes('Fog') || condLabel.includes('Mist')) {
    condIcon = 'Cloud'; condColor = '#BFB4D4';
  } else if (weather.isCold) {
    condIcon = 'Snowflake'; condColor = '#7CBFFF';
  } else if (weather.isHot) {
    condIcon = 'Sun'; condColor = '#FF7A9A';
  } else if (condLabel === 'Clear') {
    condIcon = 'Sun'; condColor = '#F5D07A';
  } else if (condLabel.includes('Cloud')) {
    condIcon = 'CloudSun'; condColor = '#BFB4D4';
  }

  return {
    city: weather.city,
    temp: weather.temperature?.current,
    feelsLike: weather.temperature?.feelsLike,
    high: weather.temperature?.high,
    low: weather.temperature?.low,
    condition: condLabel,
    condIcon,
    condColor,
    humidity: weather.humidity,
    wind: weather.windSpeed,
    isRainy: weather.isRainy,
    isHot: weather.isHot,
    isCold: weather.isCold,
  };
}

export function mapWeatherForResults(weather) {
  if (!weather) return null;
  const condLabel = weather.condition?.label || 'Clear';
  let iconId = 'partly_cloudy';
  let iconColor = '#BFB4D4';

  if (condLabel.includes('Rain') || condLabel.includes('Drizzle')) {
    iconId = 'rainy'; iconColor = '#4DEFE0';
  } else if (condLabel.includes('Fog') || condLabel.includes('Mist')) {
    iconId = 'foggy'; iconColor = '#BFB4D4';
  } else if (weather.isCold) {
    iconId = 'cold'; iconColor = '#7CBFFF';
  } else if (weather.isHot) {
    iconId = 'hot'; iconColor = '#FF7A9A';
  } else if (condLabel === 'Clear') {
    iconId = 'sunny'; iconColor = '#F5D07A';
  } else if (condLabel.includes('Cloud')) {
    iconId = 'cloudy'; iconColor = '#BFB4D4';
  }

  const seasonMonth = new Date().getMonth() + 1;
  let seasonLabel = 'Spring';
  if (seasonMonth >= 5 && seasonMonth <= 6) seasonLabel = 'Summer';
  else if (seasonMonth >= 7 && seasonMonth <= 9) seasonLabel = 'Monsoon';
  else if (seasonMonth >= 10 && seasonMonth <= 11) seasonLabel = 'Autumn';
  else if (seasonMonth === 12 || seasonMonth <= 2) seasonLabel = 'Winter';
  else seasonLabel = 'Spring';

  return {
    temperature: weather.temperature || { current: 25, feelsLike: 23, high: 29, low: 20 },
    condition: {
      label: condLabel,
      description: weather.condition?.description || '',
      id: iconId,
      iconColor,
    },
    humidity: weather.humidity,
    windSpeed: weather.windSpeed,
    visibility: weather.visibility || 10,
    tempCategory: weather.tempCategory || { label: 'Mild', color: '#E8B84B', tip: 'Comfortable weather' },
    clothingAlert: weather.clothingAlert || [],
    seasonLabel: { en: seasonLabel },
    outfitMood: weather.outfitMood || 'mild',
    city: weather.city,
  };
}
