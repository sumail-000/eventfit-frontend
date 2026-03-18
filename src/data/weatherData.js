// ─────────────────────────────────────────────
//  EventFit — Weather Mock Data & Helpers
//  Pakistani cities with realistic seasonal data
// ─────────────────────────────────────────────

// ── Weather condition codes mapped to display info ──
export const WEATHER_CONDITIONS = {
  sunny: {
    id: "sunny",
    label: "Sunny",
    icon: "Sun",
    description: "Clear skies, bright sunshine",
    bgGradient:
      "linear-gradient(135deg, rgba(232,184,75,0.15), rgba(255,140,0,0.08))",
    borderColor: "rgba(232,184,75,0.3)",
    iconColor: "#F5D07A",
  },
  partly_cloudy: {
    id: "partly_cloudy",
    label: "Partly Cloudy",
    icon: "CloudSun",
    description: "Mix of sun and clouds",
    bgGradient:
      "linear-gradient(135deg, rgba(191,180,212,0.1), rgba(232,184,75,0.06))",
    borderColor: "rgba(191,180,212,0.25)",
    iconColor: "#BFB4D4",
  },
  cloudy: {
    id: "cloudy",
    label: "Cloudy",
    icon: "Cloud",
    description: "Overcast with thick clouds",
    bgGradient:
      "linear-gradient(135deg, rgba(150,160,180,0.1), rgba(100,110,130,0.06))",
    borderColor: "rgba(150,160,180,0.2)",
    iconColor: "#A0AABB",
  },
  rainy: {
    id: "rainy",
    label: "Rainy",
    icon: "CloudRain",
    description: "Showers expected throughout the day",
    bgGradient:
      "linear-gradient(135deg, rgba(0,212,180,0.1), rgba(124,77,255,0.06))",
    borderColor: "rgba(0,212,180,0.2)",
    iconColor: "#4DEFE0",
  },
  drizzle: {
    id: "drizzle",
    label: "Drizzle",
    icon: "CloudDrizzle",
    description: "Light intermittent drizzle",
    bgGradient:
      "linear-gradient(135deg, rgba(0,212,180,0.07), rgba(124,77,255,0.05))",
    borderColor: "rgba(0,212,180,0.15)",
    iconColor: "#6EE8DA",
  },
  stormy: {
    id: "stormy",
    label: "Thunderstorm",
    icon: "CloudLightning",
    description: "Heavy rain with lightning expected",
    bgGradient:
      "linear-gradient(135deg, rgba(124,77,255,0.15), rgba(232,69,106,0.08))",
    borderColor: "rgba(124,77,255,0.3)",
    iconColor: "#A47BFF",
  },
  windy: {
    id: "windy",
    label: "Windy",
    icon: "Wind",
    description: "Strong gusts — secure loose clothing",
    bgGradient:
      "linear-gradient(135deg, rgba(191,180,212,0.1), rgba(0,212,180,0.06))",
    borderColor: "rgba(191,180,212,0.2)",
    iconColor: "#BFB4D4",
  },
  foggy: {
    id: "foggy",
    label: "Foggy",
    icon: "CloudFog",
    description: "Dense fog — reduced visibility",
    bgGradient:
      "linear-gradient(135deg, rgba(150,160,180,0.12), rgba(100,110,130,0.08))",
    borderColor: "rgba(150,160,180,0.25)",
    iconColor: "#C0C8D8",
  },
  hot: {
    id: "hot",
    label: "Scorching Hot",
    icon: "Thermometer",
    description: "Extreme heat — stay cool",
    bgGradient:
      "linear-gradient(135deg, rgba(232,69,106,0.12), rgba(232,184,75,0.08))",
    borderColor: "rgba(232,69,106,0.25)",
    iconColor: "#FF7A9A",
  },
  cold: {
    id: "cold",
    label: "Cold",
    icon: "Snowflake",
    description: "Chilly temperatures — layer up",
    bgGradient:
      "linear-gradient(135deg, rgba(0,212,180,0.1), rgba(124,77,255,0.08))",
    borderColor: "rgba(0,212,180,0.2)",
    iconColor: "#4DEFE0",
  },
};

// ── Temperature category thresholds (°C) ──
export const TEMP_CATEGORIES = {
  freezing: {
    max: 5,
    label: "Freezing",
    color: "#4DEFE0",
    tip: "Heavy layers essential",
  },
  cold: { max: 15, label: "Cold", color: "#7CBFFF", tip: "Layer up warmly" },
  cool: {
    max: 22,
    label: "Cool",
    color: "#A47BFF",
    tip: "Light jacket recommended",
  },
  mild: {
    max: 28,
    label: "Mild",
    color: "#E8B84B",
    tip: "Comfortable outdoor weather",
  },
  warm: {
    max: 35,
    label: "Warm",
    color: "#FF9F6B",
    tip: "Breathable fabrics preferred",
  },
  hot: {
    max: 42,
    label: "Hot",
    color: "#FF7A9A",
    tip: "Lightweight & airy outfits only",
  },
  scorching: {
    max: 99,
    label: "Scorching",
    color: "#E8456A",
    tip: "Ultra-light fabrics, stay hydrated",
  },
};

// ── Major Pakistani cities with realistic seasonal weather ──
export const PAKISTANI_CITIES = [
  {
    id: "lahore",
    name: "Lahore",
    province: "Punjab",
    timezone: "PKT",
    lat: 31.5497,
    lon: 74.3436,
    seasons: {
      winter: {
        months: [12, 1, 2],
        avgTemp: 13,
        condition: "foggy",
        humidity: 72,
      },
      spring: {
        months: [3, 4],
        avgTemp: 24,
        condition: "partly_cloudy",
        humidity: 48,
      },
      summer: { months: [5, 6], avgTemp: 38, condition: "hot", humidity: 35 },
      monsoon: {
        months: [7, 8, 9],
        avgTemp: 33,
        condition: "rainy",
        humidity: 78,
      },
      autumn: {
        months: [10, 11],
        avgTemp: 22,
        condition: "sunny",
        humidity: 45,
      },
    },
  },
  {
    id: "karachi",
    name: "Karachi",
    province: "Sindh",
    timezone: "PKT",
    lat: 24.8607,
    lon: 67.0011,
    seasons: {
      winter: {
        months: [12, 1, 2],
        avgTemp: 21,
        condition: "sunny",
        humidity: 58,
      },
      spring: {
        months: [3, 4],
        avgTemp: 29,
        condition: "partly_cloudy",
        humidity: 62,
      },
      summer: { months: [5, 6], avgTemp: 34, condition: "hot", humidity: 70 },
      monsoon: {
        months: [7, 8, 9],
        avgTemp: 31,
        condition: "rainy",
        humidity: 82,
      },
      autumn: {
        months: [10, 11],
        avgTemp: 27,
        condition: "sunny",
        humidity: 55,
      },
    },
  },
  {
    id: "islamabad",
    name: "Islamabad",
    province: "Federal Capital",
    timezone: "PKT",
    lat: 33.6844,
    lon: 73.0479,
    seasons: {
      winter: {
        months: [12, 1, 2],
        avgTemp: 8,
        condition: "cold",
        humidity: 65,
      },
      spring: {
        months: [3, 4],
        avgTemp: 20,
        condition: "partly_cloudy",
        humidity: 52,
      },
      summer: { months: [5, 6], avgTemp: 34, condition: "hot", humidity: 40 },
      monsoon: {
        months: [7, 8, 9],
        avgTemp: 28,
        condition: "stormy",
        humidity: 80,
      },
      autumn: {
        months: [10, 11],
        avgTemp: 18,
        condition: "sunny",
        humidity: 42,
      },
    },
  },
  {
    id: "rawalpindi",
    name: "Rawalpindi",
    province: "Punjab",
    timezone: "PKT",
    lat: 33.5651,
    lon: 73.0169,
    seasons: {
      winter: {
        months: [12, 1, 2],
        avgTemp: 9,
        condition: "cold",
        humidity: 66,
      },
      spring: {
        months: [3, 4],
        avgTemp: 21,
        condition: "partly_cloudy",
        humidity: 50,
      },
      summer: { months: [5, 6], avgTemp: 35, condition: "hot", humidity: 38 },
      monsoon: {
        months: [7, 8, 9],
        avgTemp: 29,
        condition: "rainy",
        humidity: 79,
      },
      autumn: {
        months: [10, 11],
        avgTemp: 19,
        condition: "sunny",
        humidity: 43,
      },
    },
  },
  {
    id: "faisalabad",
    name: "Faisalabad",
    province: "Punjab",
    timezone: "PKT",
    lat: 31.418,
    lon: 73.0792,
    seasons: {
      winter: {
        months: [12, 1, 2],
        avgTemp: 11,
        condition: "foggy",
        humidity: 74,
      },
      spring: { months: [3, 4], avgTemp: 25, condition: "sunny", humidity: 44 },
      summer: { months: [5, 6], avgTemp: 39, condition: "hot", humidity: 30 },
      monsoon: {
        months: [7, 8, 9],
        avgTemp: 34,
        condition: "rainy",
        humidity: 75,
      },
      autumn: {
        months: [10, 11],
        avgTemp: 23,
        condition: "partly_cloudy",
        humidity: 46,
      },
    },
  },
  {
    id: "multan",
    name: "Multan",
    province: "Punjab",
    timezone: "PKT",
    lat: 30.1575,
    lon: 71.5249,
    seasons: {
      winter: {
        months: [12, 1, 2],
        avgTemp: 14,
        condition: "foggy",
        humidity: 68,
      },
      spring: { months: [3, 4], avgTemp: 27, condition: "sunny", humidity: 40 },
      summer: { months: [5, 6], avgTemp: 41, condition: "hot", humidity: 28 },
      monsoon: {
        months: [7, 8, 9],
        avgTemp: 35,
        condition: "rainy",
        humidity: 70,
      },
      autumn: {
        months: [10, 11],
        avgTemp: 24,
        condition: "sunny",
        humidity: 42,
      },
    },
  },
  {
    id: "peshawar",
    name: "Peshawar",
    province: "KPK",
    timezone: "PKT",
    lat: 34.015,
    lon: 71.5249,
    seasons: {
      winter: {
        months: [12, 1, 2],
        avgTemp: 7,
        condition: "cold",
        humidity: 60,
      },
      spring: {
        months: [3, 4],
        avgTemp: 21,
        condition: "partly_cloudy",
        humidity: 45,
      },
      summer: { months: [5, 6], avgTemp: 36, condition: "hot", humidity: 30 },
      monsoon: {
        months: [7, 8, 9],
        avgTemp: 30,
        condition: "rainy",
        humidity: 68,
      },
      autumn: {
        months: [10, 11],
        avgTemp: 20,
        condition: "sunny",
        humidity: 40,
      },
    },
  },
  {
    id: "quetta",
    name: "Quetta",
    province: "Balochistan",
    timezone: "PKT",
    lat: 30.1838,
    lon: 66.9753,
    seasons: {
      winter: {
        months: [12, 1, 2],
        avgTemp: 2,
        condition: "cold",
        humidity: 55,
      },
      spring: {
        months: [3, 4],
        avgTemp: 15,
        condition: "partly_cloudy",
        humidity: 42,
      },
      summer: { months: [5, 6], avgTemp: 26, condition: "sunny", humidity: 28 },
      monsoon: {
        months: [7, 8, 9],
        avgTemp: 24,
        condition: "rainy",
        humidity: 55,
      },
      autumn: {
        months: [10, 11],
        avgTemp: 13,
        condition: "cloudy",
        humidity: 45,
      },
    },
  },
  {
    id: "gujranwala",
    name: "Gujranwala",
    province: "Punjab",
    timezone: "PKT",
    lat: 32.1877,
    lon: 74.1945,
    seasons: {
      winter: {
        months: [12, 1, 2],
        avgTemp: 10,
        condition: "foggy",
        humidity: 73,
      },
      spring: { months: [3, 4], avgTemp: 24, condition: "sunny", humidity: 46 },
      summer: { months: [5, 6], avgTemp: 38, condition: "hot", humidity: 33 },
      monsoon: {
        months: [7, 8, 9],
        avgTemp: 33,
        condition: "rainy",
        humidity: 76,
      },
      autumn: {
        months: [10, 11],
        avgTemp: 22,
        condition: "partly_cloudy",
        humidity: 47,
      },
    },
  },
  {
    id: "gujrat",
    name: "Gujrat",
    province: "Punjab",
    timezone: "PKT",
    lat: 32.5738,
    lon: 74.0753,
    seasons: {
      winter: {
        months: [12, 1, 2],
        avgTemp: 10,
        condition: "foggy",
        humidity: 72,
      },
      spring: {
        months: [3, 4],
        avgTemp: 23,
        condition: "partly_cloudy",
        humidity: 47,
      },
      summer: { months: [5, 6], avgTemp: 37, condition: "hot", humidity: 32 },
      monsoon: {
        months: [7, 8, 9],
        avgTemp: 32,
        condition: "rainy",
        humidity: 77,
      },
      autumn: {
        months: [10, 11],
        avgTemp: 21,
        condition: "sunny",
        humidity: 45,
      },
    },
  },
  {
    id: "sialkot",
    name: "Sialkot",
    province: "Punjab",
    timezone: "PKT",
    lat: 32.4945,
    lon: 74.5229,
    seasons: {
      winter: {
        months: [12, 1, 2],
        avgTemp: 9,
        condition: "foggy",
        humidity: 75,
      },
      spring: {
        months: [3, 4],
        avgTemp: 22,
        condition: "partly_cloudy",
        humidity: 50,
      },
      summer: { months: [5, 6], avgTemp: 37, condition: "hot", humidity: 35 },
      monsoon: {
        months: [7, 8, 9],
        avgTemp: 32,
        condition: "rainy",
        humidity: 80,
      },
      autumn: {
        months: [10, 11],
        avgTemp: 20,
        condition: "sunny",
        humidity: 48,
      },
    },
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    province: "Sindh",
    timezone: "PKT",
    lat: 25.396,
    lon: 68.3578,
    seasons: {
      winter: {
        months: [12, 1, 2],
        avgTemp: 19,
        condition: "sunny",
        humidity: 52,
      },
      spring: { months: [3, 4], avgTemp: 30, condition: "sunny", humidity: 45 },
      summer: { months: [5, 6], avgTemp: 38, condition: "hot", humidity: 40 },
      monsoon: {
        months: [7, 8, 9],
        avgTemp: 33,
        condition: "rainy",
        humidity: 78,
      },
      autumn: {
        months: [10, 11],
        avgTemp: 26,
        condition: "sunny",
        humidity: 48,
      },
    },
  },
  {
    id: "abbottabad",
    name: "Abbottabad",
    province: "KPK",
    timezone: "PKT",
    lat: 34.1459,
    lon: 73.2094,
    seasons: {
      winter: {
        months: [12, 1, 2],
        avgTemp: 4,
        condition: "cold",
        humidity: 60,
      },
      spring: {
        months: [3, 4],
        avgTemp: 16,
        condition: "partly_cloudy",
        humidity: 52,
      },
      summer: { months: [5, 6], avgTemp: 26, condition: "sunny", humidity: 38 },
      monsoon: {
        months: [7, 8, 9],
        avgTemp: 22,
        condition: "rainy",
        humidity: 72,
      },
      autumn: {
        months: [10, 11],
        avgTemp: 14,
        condition: "cloudy",
        humidity: 50,
      },
    },
  },
];

// ─────────────────────────────────────────────
//  HELPER UTILITIES
// ─────────────────────────────────────────────

/**
 * Get the current season index based on month
 * @param {number} month — 1-based month number (1=Jan, 12=Dec)
 * @returns {string} season key
 */
export function getSeasonFromMonth(month) {
  if ([12, 1, 2].includes(month)) return "winter";
  if ([3, 4].includes(month)) return "spring";
  if ([5, 6].includes(month)) return "summer";
  if ([7, 8, 9].includes(month)) return "monsoon";
  if ([10, 11].includes(month)) return "autumn";
  return "summer";
}

/**
 * Get season label in English + Urdu
 */
export function getSeasonLabel(season) {
  const labels = {
    winter: { en: "Winter", ur: "سردی" },
    spring: { en: "Spring", ur: "بہار" },
    summer: { en: "Summer", ur: "گرمی" },
    monsoon: { en: "Monsoon", ur: "مون سون" },
    autumn: { en: "Autumn", ur: "خزاں" },
  };
  return labels[season] || labels.summer;
}

/**
 * Mock weather fetch — simulates API response for a given city
 * In production this is replaced by the real OpenWeatherMap call
 * @param {string} cityName
 * @returns {object} weather object
 */
export function getMockWeather(cityName) {
  const city = PAKISTANI_CITIES.find(
    (c) =>
      c.name.toLowerCase() === cityName.toLowerCase() ||
      c.id === cityName.toLowerCase(),
  );

  const currentMonth = new Date().getMonth() + 1; // 1-based
  const season = getSeasonFromMonth(currentMonth);

  if (!city) {
    // Generic fallback for unknown cities
    return buildWeatherObject(
      cityName,
      "—",
      season,
      { avgTemp: 27, condition: "partly_cloudy", humidity: 55 },
      currentMonth,
    );
  }

  const seasonData = city.seasons[season];
  return buildWeatherObject(
    city.name,
    city.province,
    season,
    seasonData,
    currentMonth,
  );
}

/**
 * Build a standardised weather response object
 */
function buildWeatherObject(cityName, province, season, seasonData, month) {
  const jitter = Math.round((Math.random() - 0.5) * 4); // ±2°C randomness
  const temp = seasonData.avgTemp + jitter;
  const feelsLike = temp - Math.round(Math.random() * 3);
  const tempHigh = temp + Math.round(Math.random() * 4 + 1);
  const tempLow = temp - Math.round(Math.random() * 5 + 2);

  const conditionInfo =
    WEATHER_CONDITIONS[seasonData.condition] ||
    WEATHER_CONDITIONS.partly_cloudy;
  const tempCategory = getTempCategory(temp);

  const windSpeed = Math.round(Math.random() * 18 + 5); // 5-23 km/h
  const visibility =
    seasonData.condition === "foggy"
      ? Math.round(Math.random() * 3 + 0.5)
      : seasonData.condition === "stormy"
        ? Math.round(Math.random() * 5 + 3)
        : Math.round(Math.random() * 8 + 8); // km

  return {
    city: cityName,
    province,
    country: "PK",
    season,
    seasonLabel: getSeasonLabel(season),
    month,
    timestamp: new Date().toISOString(),

    temperature: {
      current: temp,
      feelsLike,
      high: tempHigh,
      low: tempLow,
      unit: "°C",
    },

    condition: conditionInfo,
    humidity: Math.min(
      99,
      Math.max(
        20,
        seasonData.humidity + Math.round((Math.random() - 0.5) * 10),
      ),
    ),
    windSpeed,
    windUnit: "km/h",
    visibility,
    visibilityUnit: "km",
    uvIndex: getUVIndex(seasonData.condition, temp),
    tempCategory,

    // Outfit-relevant flags
    isRainy: ["rainy", "drizzle", "stormy"].includes(seasonData.condition),
    isHot: temp >= 34,
    isCold: temp <= 14,
    isWindy: windSpeed >= 20 || seasonData.condition === "windy",
    isFoggy: seasonData.condition === "foggy",

    // Contextual clothing tips
    clothingAlert: getClothingAlert(seasonData.condition, temp, windSpeed),
    outfitMood: getOutfitMood(temp, seasonData.condition, season),
  };
}

/**
 * Get UV index based on condition and temperature
 */
function getUVIndex(condition, temp) {
  if (["rainy", "stormy", "foggy"].includes(condition))
    return Math.round(Math.random() * 2 + 1);
  if (condition === "cloudy") return Math.round(Math.random() * 3 + 2);
  if (temp >= 35) return Math.round(Math.random() * 3 + 9);
  if (temp >= 28) return Math.round(Math.random() * 3 + 6);
  return Math.round(Math.random() * 3 + 3);
}

/**
 * Get temperature category info
 */
export function getTempCategory(temp) {
  if (temp <= 5) return { ...TEMP_CATEGORIES.freezing, value: temp };
  if (temp <= 15) return { ...TEMP_CATEGORIES.cold, value: temp };
  if (temp <= 22) return { ...TEMP_CATEGORIES.cool, value: temp };
  if (temp <= 28) return { ...TEMP_CATEGORIES.mild, value: temp };
  if (temp <= 35) return { ...TEMP_CATEGORIES.warm, value: temp };
  if (temp <= 42) return { ...TEMP_CATEGORIES.hot, value: temp };
  return { ...TEMP_CATEGORIES.scorching, value: temp };
}

/**
 * Return a human-readable clothing alert for the current weather
 */
export function getClothingAlert(condition, temp, windSpeed) {
  const alerts = [];

  if (temp >= 38)
    alerts.push("Extreme heat — choose ultra-light, breathable fabrics");
  if (temp <= 10) alerts.push("Cold weather — layer up with warm fabrics");
  if (temp <= 5)
    alerts.push("Freezing — heavy coats and warm layers essential");
  if (["rainy", "stormy"].includes(condition))
    alerts.push("Rain expected — avoid heavy embroidery & delicate fabrics");
  if (condition === "drizzle")
    alerts.push("Light drizzle — keep an umbrella handy");
  if (condition === "foggy")
    alerts.push("Dense fog — wear bright or light colours for visibility");
  if (windSpeed >= 22)
    alerts.push("Strong winds — secure dupatta & loose garments");
  if (temp >= 30 && ["rainy", "drizzle"].includes(condition))
    alerts.push("Humid — opt for moisture-wicking cotton");

  return alerts.length > 0
    ? alerts
    : ["Comfortable weather — dress as per your event style!"];
}

/**
 * Return an outfit mood string based on weather context
 * Used to tag outfits as suitable or not
 */
export function getOutfitMood(temp, condition) {
  if (temp >= 36 && !["rainy", "stormy"].includes(condition))
    return "ultra-light";
  if (temp >= 28) return "light";
  if (temp >= 20) return "layered";
  if (temp >= 12) return "warm";
  return "heavy";
}

/**
 * Returns a suitability score (0-100) between an outfit and current weather
 */
export function getWeatherSuitability(
  outfitWeatherTags = [],
  weatherMood = "light",
) {
  const moodMap = {
    "ultra-light": ["hot", "warm"],
    light: ["warm", "mild"],
    layered: ["mild", "cool"],
    warm: ["cool", "cold"],
    heavy: ["cold", "freezing"],
  };

  const recommended = moodMap[weatherMood] || ["mild"];
  const matches = outfitWeatherTags.filter((t) =>
    recommended.includes(t),
  ).length;

  if (matches === 0) return 35;
  if (matches === 1) return 70;
  return 95;
}

/**
 * Fabric recommendations based on weather
 */
export function getFabricRecommendation(weatherMood) {
  const recommendations = {
    "ultra-light": ["Lawn", "Voile", "Tissue", "Organza", "Chiffon"],
    light: ["Cotton", "Linen", "Lawn", "Chiffon", "Georgette"],
    layered: ["Cotton Blend", "Wash & Wear", "Cambric", "Karandi"],
    warm: ["Khaddar", "Karandi", "Linen Blend", "Wool Blend"],
    heavy: ["Wool", "Velvet", "Shawl fabric", "Pashmina", "Silk"],
  };
  return recommendations[weatherMood] || recommendations["light"];
}

/**
 * Get the appropriate season display info for UI
 */
export function getSeasonDisplayInfo(season) {
  const info = {
    winter: {
      icon: "Snowflake",
      color: "#4DEFE0",
      label: "Winter",
      months: "Dec – Feb",
    },
    spring: {
      icon: "Leaf",
      color: "#A8E063",
      label: "Spring",
      months: "Mar – Apr",
    },
    summer: {
      icon: "Sun",
      color: "#F5D07A",
      label: "Summer",
      months: "May – Jun",
    },
    monsoon: {
      icon: "CloudRain",
      color: "#5DD6F5",
      label: "Monsoon",
      months: "Jul – Sep",
    },
    autumn: {
      icon: "Wind",
      color: "#E8B84B",
      label: "Autumn",
      months: "Oct – Nov",
    },
  };
  return info[season] || info.summer;
}

// ─────────────────────────────────────────────
//  STATIC DEMO WEATHER SNAPSHOTS
//  Used for the landing page hero & demos
// ─────────────────────────────────────────────
export const DEMO_WEATHER_CARDS = [
  {
    city: "Lahore",
    temp: 32,
    condition: WEATHER_CONDITIONS.sunny,
    humidity: 42,
    wind: 14,
    tempCategory: getTempCategory(32),
  },
  {
    city: "Karachi",
    temp: 29,
    condition: WEATHER_CONDITIONS.partly_cloudy,
    humidity: 68,
    wind: 18,
    tempCategory: getTempCategory(29),
  },
  {
    city: "Islamabad",
    temp: 22,
    condition: WEATHER_CONDITIONS.cloudy,
    humidity: 55,
    wind: 12,
    tempCategory: getTempCategory(22),
  },
  {
    city: "Quetta",
    temp: 16,
    condition: WEATHER_CONDITIONS.cold,
    humidity: 44,
    wind: 20,
    tempCategory: getTempCategory(16),
  },
];

// ─────────────────────────────────────────────
//  CHAT QUICK SUGGESTIONS
// ─────────────────────────────────────────────
export const CHAT_QUICK_SUGGESTIONS = [
  "What to wear to a wedding in Lahore?",
  "Best outfit for summer interview in Karachi?",
  "Eid outfit ideas for women",
  "Dholki night outfit — men",
  "What should I wear in rainy weather?",
  "Office wear for cold winters in Islamabad",
  "Graduation ceremony outfit for girls",
  "Party wear for Multan summer",
];

// ─────────────────────────────────────────────
//  STYLEBUDDY CHATBOT RESPONSES (Mock)
// ─────────────────────────────────────────────
export const STYLEBUDDY_FLOWS = {
  greeting: {
    message:
      "Assalam-o-Alaikum! 👋 I'm **StyleBuddy**, your personal fashion advisor. Tell me — which event are you dressing for, and where are you located? I'll check the weather and suggest the perfect outfit!",
    quickReplies: [
      "Wedding in Lahore",
      "Interview tomorrow",
      "Eid outfit ideas",
      "Party tonight",
    ],
  },
  genderAsk: {
    message:
      "Great choice! Are you looking for **men's** or **women's** outfit recommendations?",
    quickReplies: ["Women's outfits", "Men's outfits"],
  },
  cityAsk: {
    message:
      "Which city are you in? I'll check the live weather to match your outfit perfectly!",
    quickReplies: [
      "Lahore",
      "Karachi",
      "Islamabad",
      "Rawalpindi",
      "Multan",
      "Faisalabad",
    ],
  },
  weatherFetch: {
    message: "Checking real-time weather for your city... hold on a moment!",
    isLoading: true,
  },
  recommendation: {
    message:
      "Based on your event, gender, and current weather, here are my **top outfit recommendations** for you:",
    showOutfits: true,
  },
  unknown: {
    message:
      "I didn't quite catch that! Could you tell me which **event** you're attending and your **city**? For example: 'Wedding in Lahore' or 'Interview in Karachi'.",
    quickReplies: [
      "Wedding in Lahore",
      "Interview in Karachi",
      "Party tonight",
      "Eid outfit ideas",
    ],
  },
  noOutfits: {
    message:
      "Hmm, I couldn't find outfits matching those exact criteria. Try a different event type or city and I'll do my best to help!",
    quickReplies: ["Try wedding outfits", "Show casual outfits", "Start over"],
  },
};
