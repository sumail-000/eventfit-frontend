import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  MessageCircle,
  Send,
  Mic,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  ChevronRight,
  Heart,
  BookmarkPlus,
  Eye,
  Star,
  ArrowLeft,
  RefreshCw,
  Copy,
  CheckCheck,
  Sun,
  CloudSun,
  CloudRain,
  Snowflake,
  Cloud,
  Zap,
  Scissors,
  Tag,
  Shirt,
  Lightbulb,
  X,
} from "lucide-react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const QUICK_REPLIES = [
  "Wedding in Lahore this weekend",
  "Interview outfit for tomorrow",
  "Eid outfit ideas for women",
  "Party / Dholki night look — men",
  "Office wear for cold Islamabad",
  "Casual outing in Karachi summer",
  "Graduation ceremony dress",
  "Dinner date — what to wear?",
];

const BOT_FLOWS = {
  greeting: {
    id: "greeting",
    text: "Assalam-o-Alaikum! I'm **StyleBuddy** — EventFit's intelligent fashion advisor, built for Pakistani occasions. Tell me about your event and city, and I'll check the live weather to recommend the perfect outfit for you. What are you dressing for?",
    quickReplies: [
      "Wedding / Shadi",
      "Interview",
      "Party / Mehendi",
      "Eid",
      "Office",
      "Casual",
    ],
  },
  genderAsk: {
    id: "genderAsk",
    text: "Perfect! Are you looking for **women's** or **men's** outfit recommendations?",
    quickReplies: ["Women's outfits", "Men's outfits"],
  },
  cityAsk: {
    id: "cityAsk",
    text: "Great! Which Pakistani city are you in? I'll fetch the live weather conditions to make sure your outfit is perfectly matched.",
    quickReplies: [
      "Lahore",
      "Karachi",
      "Islamabad",
      "Multan",
      "Peshawar",
      "Faisalabad",
      "Quetta",
    ],
  },
  weatherFetch: {
    id: "weatherFetch",
    text: "One moment — checking live weather for **{city}**...",
    isLoading: true,
  },
  recommendation: {
    id: "recommendation",
    text: "Based on **{condition}** weather at **{temp}°C** in **{city}**, and your **{event}** occasion, here are my top outfit picks for you:",
    showOutfits: true,
  },
};

/* ─────────────────────────────────────────────
   OUTFIT DATA (demo recommendations)
───────────────────────────────────────────── */
const DEMO_OUTFITS = {
  women: {
    wedding: [
      {
        id: "o1",
        name: "Bridal Gharara — Ruby & Gold",
        fabric: "Pure Silk · Zardozi Embroidery",
        event: "Wedding Barat",
        weather: "Cool / Mild",
        priceRange: "Rs. 35,000 – 85,000",
        brands: ["Maria B Bridal", "HSY", "Elan"],
        image:
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80",
        badge: "Bridal Pick",
        badgeColor: "#E8456A",
        rating: 4.9,
        tips: [
          "Pair with Kundan jewelry",
          "Opt for a low bun with jhoomar",
          "Nude heels to elongate silhouette",
        ],
        weatherNote:
          "Perfect for cool wedding seasons. Add a silk shawl below 15°C.",
        accent: "#E8456A",
      },
      {
        id: "o2",
        name: "Walima Lehenga — Emerald Dreams",
        fabric: "Net Lehenga · Resham Embroidery",
        event: "Walima / Guest",
        weather: "Mild / Warm",
        priceRange: "Rs. 18,000 – 45,000",
        brands: ["Khaadi Khaas", "Gul Ahmed Festive", "Rang Ja"],
        image:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
        badge: "Guest Favorite",
        badgeColor: "#E8B84B",
        rating: 4.7,
        tips: ["Gold Jadau earrings", "Soft waves hair", "Statement clutch"],
        weatherNote:
          "Light enough for spring weddings, layerable for cool evenings.",
        accent: "#E8B84B",
      },
      {
        id: "o3",
        name: "Nikah Angarkha — Ivory & Rose",
        fabric: "Silk Angarkha · Chikankari",
        event: "Nikah Ceremony",
        weather: "All Seasons",
        priceRange: "Rs. 22,000 – 55,000",
        brands: ["Faraz Manan", "Nomi Ansari", "Elan"],
        image: "/images/nikah-angarkha-ivory.png",
        badge: "Nikah Special",
        badgeColor: "#A47BFF",
        rating: 4.8,
        tips: [
          "Polki or pearl jewelry",
          "Braided hair with flowers",
          "Contrast dupatta in blush",
        ],
        weatherNote: "Lightweight — perfect for spring nikah ceremonies.",
        accent: "#7C4DFF",
      },
    ],
    interview: [
      {
        id: "o4",
        name: "Power Shalwar Kameez — Slate Blue",
        fabric: "Cotton Wash & Wear",
        event: "Job Interview",
        weather: "Mild / Cool",
        priceRange: "Rs. 3,500 – 8,000",
        brands: ["Alkaram Studio", "Sapphire", "Gul Ahmed"],
        image:
          "https://images.unsplash.com/photo-1573497491765-dccce02b29df?auto=format&fit=crop&w=400&q=80",
        badge: "Professional",
        badgeColor: "#7C4DFF",
        rating: 4.6,
        tips: [
          "Minimal silver jewelry",
          "Neat ponytail or bun",
          "Closed-toe flats or kitten heels",
        ],
        weatherNote: "Add a structured blazer if temperature is below 20°C.",
        accent: "#7C4DFF",
      },
      {
        id: "o5",
        name: "Classic Blazer & Trousers — Charcoal",
        fabric: "Wool-Blend Blazer · Crepe Trousers",
        event: "Corporate Interview",
        weather: "Cool / Cold",
        priceRange: "Rs. 6,000 – 18,000",
        brands: ["Outfitters", "Bonanza", "Breakout"],
        image:
          "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=400&q=80",
        badge: "Top Rated",
        badgeColor: "#E8B84B",
        rating: 4.5,
        tips: [
          "Small stud earrings",
          "Leather tote bag",
          "Block heel or loafers",
        ],
        weatherNote: "Perfect for winter interviews. Lightweight for spring.",
        accent: "#E8B84B",
      },
    ],
    party: [
      {
        id: "o6",
        name: "Embellished Sharara — Midnight Purple",
        fabric: "Chiffon Sharara · Sequence Work",
        event: "Party / Dholki",
        weather: "Mild / Warm",
        priceRange: "Rs. 8,000 – 22,000",
        brands: ["Sobia Nazir", "Asim Jofa", "Zara Shahjahan"],
        image:
          "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80",
        badge: "Party Hit",
        badgeColor: "#FF7A9A",
        rating: 4.8,
        tips: [
          "Bold lip — deep plum or red",
          "Chandelier earrings",
          "Strappy heels in gold",
        ],
        weatherNote:
          "Ideal for indoor parties. Carry a pashmina for cool evenings.",
        accent: "#E8456A",
      },
    ],
    eid: [
      {
        id: "o7",
        name: "Anarkali Ensemble — Saffron",
        fabric: "Organza · Block Print",
        event: "Eid-ul-Fitr",
        weather: "Warm / Hot",
        priceRange: "Rs. 6,000 – 16,000",
        brands: ["Khaadi", "Rang Ja", "Nishat Linen"],
        image:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
        badge: "Eid Special",
        badgeColor: "#E8B84B",
        rating: 4.7,
        tips: ["Gold jhumkas", "Soft wavy hair", "Khussas in gold"],
        weatherNote: "Organza is airy — perfect for warm Eid days.",
        accent: "#E8B84B",
      },
    ],
    casual: [
      {
        id: "o8",
        name: "Lawn Kurta & Jeans — Dusty Rose",
        fabric: "Lawn Kurta · Slim Denim",
        event: "Casual Outing",
        weather: "Warm / Hot",
        priceRange: "Rs. 2,500 – 7,000",
        brands: ["Alkaram", "Khaadi", "Gul Ahmed RTW"],
        image:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80",
        badge: "Everyday Fav",
        badgeColor: "#4DEFE0",
        rating: 4.5,
        tips: ["White sneakers or flat sandals", "Tote bag", "Just a watch"],
        weatherNote: "Perfect for summer days. Switch to cambric in monsoon.",
        accent: "#00D4B4",
      },
    ],
  },
  men: {
    wedding: [
      {
        id: "m1",
        name: "Sherwani — Ivory & Gold Brocade",
        fabric: "Silk Sherwani · Zardozi",
        event: "Wedding (Groom)",
        weather: "Cool / Mild",
        priceRange: "Rs. 45,000 – 1,50,000",
        brands: ["HSY", "Mohsin Naveed Ranjha", "Amir Adnan"],
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        badge: "Groom's Choice",
        badgeColor: "#E8B84B",
        rating: 4.9,
        tips: [
          "Gold or silver mojri",
          "Well-trimmed beard",
          "Sehra for baraat",
        ],
        weatherNote:
          "Best for cool winter barat. Opt for lighter silk in warm weather.",
        accent: "#E8B84B",
      },
      {
        id: "m2",
        name: "Embroidered Waistcoat Set — Charcoal",
        fabric: "Wash & Wear Shalwar Kameez · Gold Waistcoat",
        event: "Wedding Guest",
        weather: "Mild / Warm",
        priceRange: "Rs. 8,000 – 25,000",
        brands: ["Junaid Jamshed", "Bonanza", "Gul Ahmed Men"],
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        badge: "Guest Favorite",
        badgeColor: "#E8B84B",
        rating: 4.7,
        tips: ["Brown mojri or formal Oxford", "Simple watch", "Pocket square"],
        weatherNote: "Versatile for both indoor and outdoor wedding venues.",
        accent: "#E8B84B",
      },
    ],
    interview: [
      {
        id: "m3",
        name: "Classic Two-Piece Suit — Navy",
        fabric: "Wool-Blend Suit · Cotton Shirt",
        event: "Corporate Interview",
        weather: "Cool / Cold",
        priceRange: "Rs. 12,000 – 40,000",
        brands: ["Breakout", "Salateen", "J. (tailored)"],
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
        badge: "Interview Pro",
        badgeColor: "#7C4DFF",
        rating: 4.8,
        tips: [
          "Polished Oxford shoes",
          "Conservative tie",
          "Well-groomed beard",
        ],
        weatherNote:
          "Best for cool seasons. Linen-blend for summer interviews.",
        accent: "#7C4DFF",
      },
      {
        id: "m4",
        name: "Formal Shalwar Kameez — Light Grey",
        fabric: "Cotton Wash-and-Wear",
        event: "Local Interview",
        weather: "Warm / Mild",
        priceRange: "Rs. 3,000 – 7,000",
        brands: ["Junaid Jamshed", "Alkaram Men", "Gul Ahmed Men"],
        image:
          "https://images.unsplash.com/photo-1573497491765-dccce02b29df?auto=format&fit=crop&w=400&q=80",
        badge: "Classic Choice",
        badgeColor: "#BFB4D4",
        rating: 4.5,
        tips: [
          "Black leather sandals or formal khussa",
          "Pressed neatly — no creases",
        ],
        weatherNote: "Breathable for hot Pakistani summer interviews.",
        accent: "#A47BFF",
      },
    ],
    party: [
      {
        id: "m5",
        name: "Embroidered Kurta — Midnight Blue",
        fabric: "Thread-Embroidered Cotton",
        event: "Dholki / Mehendi",
        weather: "Mild / Warm",
        priceRange: "Rs. 5,000 – 14,000",
        brands: ["Bonanza Satrangi", "J. Junaid Jamshed", "Sana Safinaz Men"],
        image:
          "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=400&q=80",
        badge: "Party Ready",
        badgeColor: "#FF7A9A",
        rating: 4.6,
        tips: [
          "Embroidered khussa",
          "Simple silver watch",
          "Rolled sleeves for dholki vibe",
        ],
        weatherNote: "Cotton is breathable for warm dholki nights.",
        accent: "#E8456A",
      },
    ],
    eid: [
      {
        id: "m6",
        name: "Pastel Kurta Shalwar — Sage Green",
        fabric: "Egyptian Cotton / Lawn",
        event: "Eid-ul-Fitr",
        weather: "Warm / Hot",
        priceRange: "Rs. 3,500 – 9,000",
        brands: ["Junaid Jamshed", "Bonanza", "Gul Ahmed Men"],
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        badge: "Eid Classic",
        badgeColor: "#00D4B4",
        rating: 4.6,
        tips: ["White khussa or sandals", "Light attar", "Neat hair styling"],
        weatherNote: "Egyptian cotton stays cool in Eid summer heat.",
        accent: "#00D4B4",
      },
    ],
    casual: [
      {
        id: "m7",
        name: "Graphic Kurta + Chino — Urban Style",
        fabric: "Cotton Kurta · Slim Chino",
        event: "Casual Outing",
        weather: "Mild / Warm",
        priceRange: "Rs. 2,000 – 6,000",
        brands: ["Outfitters", "Breakout", "Bonanza Satrangi"],
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        badge: "Street Style",
        badgeColor: "#4DEFE0",
        rating: 4.4,
        tips: ["White sneakers", "Minimal accessories", "Rolled sleeves"],
        weatherNote: "Perfect for casual days. Switch to khaddar in winter.",
        accent: "#00D4B4",
      },
    ],
    formal: [
      {
        id: "m8",
        name: "Office Shalwar Kameez — Charcoal",
        fabric: "Wash & Wear Blend",
        event: "Office / Formal",
        weather: "Mild / Cool",
        priceRange: "Rs. 3,500 – 8,000",
        brands: ["Junaid Jamshed", "Gul Ahmed Men", "Alkaram Men"],
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
        badge: "Office Ready",
        badgeColor: "#7C4DFF",
        rating: 4.5,
        tips: [
          "Formal leather shoes",
          "Neat press essential",
          "Conservative colors",
        ],
        weatherNote: "All-season wash & wear is ideal for Pakistani offices.",
        accent: "#7C4DFF",
      },
    ],
  },
};

/* ─────────────────────────────────────────────
   MOCK WEATHER
───────────────────────────────────────────── */
function getMockWeatherForCity(city) {
  const month = new Date().getMonth() + 1;
  const isWinter = month <= 2 || month === 12;
  const isSummer = month >= 5 && month <= 6;
  const isMonsoon = month >= 7 && month <= 9;

  const cityData = {
    lahore: { winter: 12, summer: 39, monsoon: 33, spring: 24, autumn: 22 },
    karachi: { winter: 22, summer: 35, monsoon: 31, spring: 29, autumn: 27 },
    islamabad: { winter: 8, summer: 34, monsoon: 28, spring: 20, autumn: 18 },
    multan: { winter: 14, summer: 42, monsoon: 35, spring: 27, autumn: 24 },
    peshawar: { winter: 7, summer: 37, monsoon: 30, spring: 21, autumn: 20 },
    faisalabad: { winter: 11, summer: 39, monsoon: 34, spring: 25, autumn: 23 },
    quetta: { winter: 3, summer: 27, monsoon: 24, spring: 15, autumn: 13 },
    sialkot: { winter: 9, summer: 38, monsoon: 32, spring: 22, autumn: 20 },
    gujrat: { winter: 10, summer: 37, monsoon: 32, spring: 23, autumn: 21 },
    gujranwala: { winter: 10, summer: 38, monsoon: 33, spring: 24, autumn: 22 },
  };

  const key = city.toLowerCase().trim();
  const data = cityData[key] || {
    winter: 15,
    summer: 34,
    monsoon: 30,
    spring: 23,
    autumn: 21,
  };
  const season = isWinter
    ? "winter"
    : isSummer
      ? "summer"
      : isMonsoon
        ? "monsoon"
        : month <= 4
          ? "spring"
          : "autumn";
  const baseTemp = data[season];
  const temp = baseTemp + Math.round((Math.random() - 0.5) * 4);

  let condition, condIcon, condColor;
  if (isMonsoon) {
    condition = "Rainy";
    condIcon = "CloudRain";
    condColor = "#4DEFE0";
  } else if (isWinter && temp <= 10) {
    condition = "Cold";
    condIcon = "Snowflake";
    condColor = "#7CBFFF";
  } else if (isWinter) {
    condition = "Cloudy";
    condIcon = "Cloud";
    condColor = "#BFB4D4";
  } else if (isSummer && temp >= 36) {
    condition = "Scorching Hot";
    condIcon = "Sun";
    condColor = "#FF7A9A";
  } else if (temp >= 28) {
    condition = "Sunny";
    condIcon = "Sun";
    condColor = "#F5D07A";
  } else {
    condition = "Partly Cloudy";
    condIcon = "CloudSun";
    condColor = "#BFB4D4";
  }

  return {
    city: city.charAt(0).toUpperCase() + city.slice(1).toLowerCase(),
    temp,
    feelsLike: temp - 2,
    high: temp + 4,
    low: temp - 5,
    condition,
    condIcon,
    condColor,
    humidity: Math.round(40 + Math.random() * 40),
    wind: Math.round(8 + Math.random() * 18),
    isHot: temp >= 33,
    isCold: temp <= 14,
    isRainy: isMonsoon,
    season,
  };
}

/* ─────────────────────────────────────────────
   WEATHER ICON COMPONENT
───────────────────────────────────────────── */
function WeatherIcon({ name, size = 22, color = "#F5D07A" }) {
  const props = { size, strokeWidth: 1.8, style: { color } };
  switch (name) {
    case "Sun":
      return <Sun {...props} />;
    case "CloudSun":
      return <CloudSun {...props} />;
    case "CloudRain":
      return <CloudRain {...props} />;
    case "Snowflake":
      return <Snowflake {...props} />;
    default:
      return <Cloud {...props} />;
  }
}

/* ─────────────────────────────────────────────
   PARSE BOLD helper
───────────────────────────────────────────── */
function ParsedText({ text }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} style={{ color: "#F5D07A", fontWeight: 700 }}>
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */
export default function StyleBuddyPage() {
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState(initialQ);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationState, setConvState] = useState("greeting"); // greeting | genderAsk | cityAsk | weatherFetch | done  // eslint-disable-line no-unused-vars
  const [selectedGender, setGender] = useState("");
  const [selectedEvent, setEvent] = useState("");
  const [selectedCity, setCity] = useState("");
  const [weather, setWeather] = useState(null); // eslint-disable-line no-unused-vars
  const [recommendedOutfits, setRecommended] = useState([]);
  const [activeOutfit, setActiveOutfit] = useState(null);
  const [likedIds, setLikedIds] = useState(new Set());
  const [savedIds, setSavedIds] = useState(new Set());
  const [mobileTab, setMobileTab] = useState("chat"); // chat | outfits
  const [copiedId, setCopiedId] = useState(null); // eslint-disable-line no-unused-vars
  const [sessionId] = useState(() => Date.now().toString(36)); // eslint-disable-line no-unused-vars

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimers = useRef([]);

  /* ── Auto scroll ── */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* ── Send greeting on mount ── */
  useEffect(() => {
    const t = setTimeout(() => {
      pushBotMessage(
        BOT_FLOWS.greeting.text,
        BOT_FLOWS.greeting.quickReplies,
        "greeting",
      );
    }, 600);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── If ?q= param, auto-send ── */
  useEffect(() => {
    if (initialQ) {
      const t = setTimeout(() => {
        setInputText(initialQ);
        handleSend(initialQ);
      }, 1400);
      return () => clearTimeout(t);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ─── cleanup timers ── */
  useEffect(() => {
    const timers = typingTimers.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  /* ── Push bot message with typing simulation ── */
  function pushBotMessage(
    text,
    quickReplies = [],
    flowId = "",
    showOutfits = false,
    weatherData = null,
  ) {
    setIsTyping(true);
    const delay = Math.min(600 + text.length * 12, 2200);
    const t = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "bot",
          text,
          quickReplies,
          flowId,
          showOutfits,
          weatherData,
          timestamp: new Date(),
        },
      ]);
    }, delay);
    typingTimers.current.push(t);
  }

  /* ── Push user message ── */
  function pushUserMessage(text) {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        text,
        timestamp: new Date(),
      },
    ]);
  }

  /* ── Parse user input to extract event/city/gender ── */
  function parseUserInput(text) {
    const lower = text.toLowerCase();
    const events = {
      wedding: [
        "wedding",
        "shadi",
        "barat",
        "walima",
        "nikah",
        "mehndi",
        "mehendi",
      ],
      interview: ["interview", "job", "corporate"],
      party: ["party", "dholki", "birthday", "mehendi night"],
      eid: ["eid", "festival"],
      formal: ["office", "work", "formal", "meeting"],
      casual: ["casual", "outing", "shopping", "lunch", "hangout"],
      graduation: ["graduation", "convocation", "degree"],
      dinner: ["dinner", "date", "dining"],
    };
    const cities = [
      "lahore",
      "karachi",
      "islamabad",
      "rawalpindi",
      "faisalabad",
      "multan",
      "peshawar",
      "quetta",
      "sialkot",
      "gujrat",
      "gujranwala",
      "hyderabad",
      "abbottabad",
      "sargodha",
      "bahawalpur",
    ];
    const genders = {
      women: ["women", "woman", "female", "girl", "ladies", "bride", "bridal"],
      men: ["men", "man", "male", "guy", "groom", "boys"],
    };

    let detectedEvent = "";
    let detectedCity = "";
    let detectedGender = "";

    for (const [ev, kws] of Object.entries(events)) {
      if (kws.some((kw) => lower.includes(kw))) {
        detectedEvent = ev;
        break;
      }
    }
    for (const city of cities) {
      if (lower.includes(city)) {
        detectedCity = city;
        break;
      }
    }
    for (const [gen, kws] of Object.entries(genders)) {
      if (kws.some((kw) => lower.includes(kw))) {
        detectedGender = gen;
        break;
      }
    }

    return { detectedEvent, detectedCity, detectedGender };
  }

  /* ── Get outfit recommendations ── */
  function getRecommendations(gender, event) {
    const source = DEMO_OUTFITS[gender] || DEMO_OUTFITS.women;
    return source[event] || source.wedding || [];
  }

  /* ── Main send handler (calls backend /api/chat) ── */
  function handleSend(overrideText) {
    const text = (overrideText ?? inputText).trim();
    if (!text) return;
    setInputText("");
    pushUserMessage(text);

    const currentContext = {
      event: selectedEvent,
      gender: selectedGender,
      city: selectedCity,
    };

    setIsTyping(true);

    (async () => {
      try {
        const { sendChatMessage } = await import("../services/api.js");
        const res = await sendChatMessage(text, currentContext);

        if (res) {
          if (res.context?.gender) setGender(res.context.gender);
          if (res.context?.event) setEvent(res.context.event);
          if (res.context?.city) setCity(res.context.city);

          if (res.weather) setWeather(res.weather);

          const hasOutfits = res.outfits && res.outfits.length > 0;
          if (hasOutfits) {
            const mapped = res.outfits.map((o) => ({
              id: o.outfitId || o.id,
              name: o.name,
              fabric: o.fabric,
              event: o.occasion || o.event,
              weather: o.weatherSuitability?.join(', ') || 'All Seasons',
              priceRange: o.priceRange,
              brands: o.brands || [],
              image: o.image,
              badge: o.badge || '',
              badgeColor: o.badgeType === 'gold' ? '#E8B84B' : o.badgeType === 'rose' ? '#E8456A' : o.badgeType === 'violet' ? '#7C4DFF' : o.badgeType === 'teal' ? '#00D4B4' : '#E8B84B',
              rating: o.rating || 4.5,
              tips: o.tips || [],
              weatherNote: o.weatherTip || '',
              accent: o.badgeType === 'gold' ? '#E8B84B' : o.badgeType === 'rose' ? '#E8456A' : o.badgeType === 'violet' ? '#7C4DFF' : o.badgeType === 'teal' ? '#00D4B4' : '#E8B84B',
            }));
            setRecommended(mapped);
            if (mapped.length > 0) setActiveOutfit(mapped[0]);
          }

          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              role: "bot",
              text: res.reply,
              quickReplies: res.quickReplies || [],
              flowId: hasOutfits ? "recommendation" : "chat",
              showOutfits: hasOutfits,
              weatherData: res.weather ? {
                city: res.weather.city,
                temp: res.weather.temperature?.current,
                condition: {
                  label: res.weather.condition?.label,
                  icon: 'CloudSun',
                  color: '#4DEFE0',
                },
                humidity: res.weather.humidity,
              } : null,
              timestamp: new Date(),
            },
          ]);
          setConvState(hasOutfits ? "done" : "chat");
          return;
        }
      } catch { /* backend unavailable, fall through to local */ }

      /* ── Fallback to local logic if backend fails ── */
      setIsTyping(false);
      handleSendLocal(text);
    })();
  }

  /* ── Local fallback (same logic as before) ── */
  function handleSendLocal(text) {
    const { detectedEvent, detectedCity, detectedGender } = parseUserInput(text);

    let nextEvent = selectedEvent || detectedEvent;
    let nextGender = selectedGender || detectedGender;
    let nextCity = selectedCity || detectedCity;

    if (text.toLowerCase().includes("women") || text.toLowerCase().includes("woman") || text.toLowerCase().includes("female") || text.toLowerCase().includes("girl")) { nextGender = "women"; setGender("women"); }
    else if (text.toLowerCase().includes("men") || text.toLowerCase().includes("man") || text.toLowerCase().includes("male") || text.toLowerCase().includes("guy")) { nextGender = "men"; setGender("men"); }
    if (detectedCity) setCity(detectedCity);
    if (detectedEvent) setEvent(detectedEvent);

    if (nextGender && nextEvent && nextCity) {
      const w = getMockWeatherForCity(nextCity);
      setWeather(w);
      const outfits = getRecommendations(nextGender, nextEvent);
      setRecommended(outfits);
      if (outfits.length > 0) setActiveOutfit(outfits[0]);
      const outfitNames = outfits.slice(0, 3).map((o) => `• **${o.name}** — ${o.fabric}`).join("\n");
      pushBotMessage(`It's currently **${w.temp}°C** in **${nextCity}** — ${w.condition.toLowerCase()} conditions.\n\nBased on your **${nextEvent}** in **${nextCity}**, here are my top picks for **${nextGender === "women" ? "Women" : "Men"}**:\n\n${outfitNames}\n\nTap any outfit card on the right to explore details!`, ["Show more options", "Tips for this weather", "What accessories?"], "recommendation", true, w);
      setConvState("done");
      return;
    }

    if (!nextGender) { pushBotMessage("I'd love to help! Are you looking for **women's** or **men's** outfits?", ["Women's outfits", "Men's outfits"], "genderAsk"); setConvState("genderAsk"); return; }
    if (!nextEvent) { pushBotMessage("Great! What's the **occasion**?", ["Wedding / Shadi", "Interview / Job", "Eid Festival", "Party / Dholki", "Office / Formal", "Casual Outing", "Graduation", "Dinner / Date"], "eventAsk"); setConvState("eventAsk"); return; }
    if (!nextCity) { pushBotMessage("Almost there! Which **city** are you in?", ["Lahore", "Karachi", "Islamabad", "Multan", "Peshawar", "Quetta", "Faisalabad"], "cityAsk"); setConvState("cityAsk"); return; }

    pushBotMessage("Try describing your event — e.g. *\"Wedding outfit for women in Lahore\"*.", QUICK_REPLIES.slice(0, 4), "fallback");
  }

  /* ── Reset conversation ── */
  function handleReset() {
    setMessages([]);
    setGender("");
    setEvent("");
    setCity("");
    setWeather(null);
    setRecommended([]);
    setActiveOutfit(null);
    setConvState("greeting");
    setTimeout(() => {
      pushBotMessage(
        BOT_FLOWS.greeting.text,
        BOT_FLOWS.greeting.quickReplies,
        "greeting",
      );
    }, 300);
  }

  /* ── Toggle like/save ── */
  const toggleLike = (id) =>
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const toggleSave = (id) =>
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */
  const hasOutfits = recommendedOutfits.length > 0;
  const showOutfitPanel = hasOutfits && (mobileTab === "outfits" || true);
  const userHasMessaged = messages.some((m) => m.role === "user");

  return (
    <div
      style={{
        height: "calc(100vh - 70px)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient orbs */}
      <div aria-hidden style={{ position: "absolute", top: "8%", left: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(124,77,255,0.12) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "absolute", bottom: "5%", right: "-80px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle,rgba(232,69,106,0.08) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "800px", borderRadius: "50%", background: "radial-gradient(circle,rgba(232,184,75,0.04) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* ════════════ HEADER BAR ════════════ */}
      <div style={{ background: "rgba(7,8,15,0.85)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(124,77,255,0.15)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px", flexShrink: 0, position: "relative", zIndex: 10 }}>
        {/* Left: title */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", color: "#7A6E8A", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(124,77,255,0.1)"; e.currentTarget.style.color = "#A47BFF"; e.currentTarget.style.borderColor = "rgba(124,77,255,0.3)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#7A6E8A"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
            <ArrowLeft size={15} strokeWidth={2} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ position: "relative", width: "36px", height: "36px", borderRadius: "12px", background: "linear-gradient(135deg,#7C4DFF,#E8456A)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(124,77,255,0.4)" }}>
              <MessageCircle size={16} strokeWidth={2} style={{ color: "#fff" }} />
              <span style={{ position: "absolute", bottom: "-1px", right: "-1px", width: "10px", height: "10px", borderRadius: "50%", background: "#00D4B4", border: "2px solid #07080F", boxShadow: "0 0 8px #00D4B4" }} />
            </div>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, color: "#F8F3E6", lineHeight: 1 }}>StyleBuddy</h1>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.65rem", color: "#4DEFE0", letterSpacing: "0.03em" }}>Online · Fashion AI Advisor</span>
            </div>
          </div>
        </div>

        {/* Right: tabs + reset */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {hasOutfits && (
            <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", overflow: "hidden", padding: "2px" }} className="lg:hidden">
              {["chat", "outfits"].map((tab) => (
                <button key={tab} onClick={() => setMobileTab(tab)} style={{ padding: "6px 14px", background: mobileTab === tab ? "rgba(124,77,255,0.2)" : "transparent", border: "none", borderRadius: "8px", color: mobileTab === tab ? "#A47BFF" : "#7A6E8A", fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", fontWeight: mobileTab === tab ? 600 : 400, cursor: "pointer", outline: "none", transition: "all 0.2s", textTransform: "capitalize" }}>
                  {tab}
                  {tab === "outfits" && (<span style={{ marginLeft: "5px", background: "linear-gradient(135deg,#7C4DFF,#E8456A)", color: "#fff", borderRadius: "100px", padding: "1px 6px", fontSize: "0.58rem", fontWeight: 700 }}>{recommendedOutfits.length}</span>)}
                </button>
              ))}
            </div>
          )}
          <button onClick={handleReset} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#7A6E8A", fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", cursor: "pointer", outline: "none", transition: "all 0.25s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(232,69,106,0.08)"; e.currentTarget.style.borderColor = "rgba(232,69,106,0.25)"; e.currentTarget.style.color = "#FF7A9A"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#7A6E8A"; }}>
            <RefreshCw size={12} strokeWidth={2} />
            New Chat
          </button>
        </div>
      </div>

      {/* Gradient accent line under header */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, #7C4DFF, #E8456A, #E8B84B, transparent)", flexShrink: 0 }} />

      {/* ════════════ MAIN BODY ════════════ */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative", zIndex: 1 }}>

        {/* ════════════ CHAT PANEL ════════════ */}
        <div className={`${hasOutfits && mobileTab === "outfits" ? "hidden lg:flex" : "flex"}`} style={{ flex: 1, flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

          {/* Messages area */}
          <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "rgba(124,77,255,0.2) transparent" }}>
            <div style={{ maxWidth: hasOutfits ? "100%" : "720px", margin: "0 auto", padding: "28px 28px 16px", display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Welcome hero - show when chat is fresh */}
              {!userHasMessaged && messages.length <= 1 && !isTyping && (
                <div style={{ textAlign: "center", padding: "40px 20px 20px" }}>
                  {/* Large bot avatar */}
                  <div style={{ width: "72px", height: "72px", borderRadius: "22px", background: "linear-gradient(135deg,#7C4DFF,#E8456A)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 12px 40px rgba(124,77,255,0.35)", position: "relative" }}>
                    <MessageCircle size={30} strokeWidth={1.8} style={{ color: "#fff" }} />
                    <span style={{ position: "absolute", bottom: "-3px", right: "-3px", width: "16px", height: "16px", borderRadius: "50%", background: "#00D4B4", border: "3px solid #07080F", boxShadow: "0 0 12px #00D4B4" }} />
                  </div>
                  <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, color: "#F8F3E6", marginBottom: "8px", lineHeight: 1.15 }}>
                    Meet <span style={{ fontStyle: "italic", background: "linear-gradient(135deg,#A47BFF,#E8456A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>StyleBuddy</span>
                  </h2>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", color: "#BFB4D4", lineHeight: 1.7, maxWidth: "460px", margin: "0 auto 28px" }}>
                    Your AI-powered fashion advisor for Pakistani occasions. Tell me your event, city & preference — I'll handle the rest.
                  </p>

                  {/* Feature pills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "32px" }}>
                    {[
                      { icon: MapPin, label: "Live Weather", color: "#E8B84B", bg: "rgba(232,184,75,0.08)", border: "rgba(232,184,75,0.2)" },
                      { icon: Shirt, label: "500+ Outfits", color: "#E8456A", bg: "rgba(232,69,106,0.08)", border: "rgba(232,69,106,0.2)" },
                      { icon: Zap, label: "Instant Results", color: "#A47BFF", bg: "rgba(124,77,255,0.08)", border: "rgba(124,77,255,0.2)" },
                    ].map(({ icon: Icon, label, color, bg, border }) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "7px 14px", background: bg, border: `1px solid ${border}`, borderRadius: "100px" }}>
                        <Icon size={13} strokeWidth={2} style={{ color }} />
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", fontWeight: 500, color }}>{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg,#7C4DFF,#E8456A)", borderRadius: "2px", margin: "0 auto 24px" }} />
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "0.85rem", color: "#7A6E8A", letterSpacing: "0.05em" }}>Try one of these to get started</p>
                </div>
              )}

              {/* Chat messages */}
              {messages.map((msg) => (
                <div key={msg.id} style={{ display: "flex", gap: "10px", flexDirection: msg.role === "user" ? "row-reverse" : "row", alignItems: "flex-start", animation: "fadeIn 0.35s ease" }}>
                  {/* Avatar */}
                  {msg.role === "bot" && (
                    <div style={{ width: "30px", height: "30px", borderRadius: "10px", background: "linear-gradient(135deg,#7C4DFF,#E8456A)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px", boxShadow: "0 2px 8px rgba(124,77,255,0.3)" }}>
                      <MessageCircle size={13} strokeWidth={2} style={{ color: "#fff" }} />
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", gap: "8px", maxWidth: "80%", minWidth: 0 }}>
                    {/* Bubble */}
                    <div className={msg.role === "user" ? "bubble-user" : "bubble-bot"}>
                      <ParsedText text={msg.text} />
                    </div>

                    {/* Weather card */}
                    {msg.role === "bot" && msg.weatherData && (
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "linear-gradient(135deg,rgba(0,212,180,0.08),rgba(124,77,255,0.06))", border: "1px solid rgba(0,212,180,0.2)", borderRadius: "14px", padding: "12px 16px", maxWidth: "340px" }}>
                        <div style={{ width: "38px", height: "38px", borderRadius: "12px", background: "rgba(0,212,180,0.12)", border: "1px solid rgba(0,212,180,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <WeatherIcon name={msg.weatherData.condition?.icon} size={18} color="#4DEFE0" />
                        </div>
                        <div>
                          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#4DEFE0", display: "block" }}>{msg.weatherData.city} · {msg.weatherData.temp}°C</span>
                          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.7rem", color: "#7A6E8A" }}>{msg.weatherData.condition?.label} · {msg.weatherData.humidity}% humidity</span>
                        </div>
                      </div>
                    )}

                    {/* Quick replies */}
                    {msg.role === "bot" && msg.quickReplies?.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {msg.quickReplies.map((qr) => (
                          <button key={qr} onClick={() => handleSend(qr)} style={{ padding: "6px 14px", background: "rgba(124,77,255,0.06)", border: "1px solid rgba(124,77,255,0.22)", borderRadius: "100px", color: "#A47BFF", fontFamily: "'Inter',sans-serif", fontSize: "0.73rem", fontWeight: 500, cursor: "pointer", outline: "none", transition: "all 0.2s", whiteSpace: "nowrap" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(124,77,255,0.15)"; e.currentTarget.style.borderColor = "rgba(124,77,255,0.4)"; e.currentTarget.style.color = "#C4A0FF"; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(124,77,255,0.06)"; e.currentTarget.style.borderColor = "rgba(124,77,255,0.22)"; e.currentTarget.style.color = "#A47BFF"; e.currentTarget.style.transform = "translateY(0)"; }}>
                            {qr}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Timestamp */}
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.58rem", color: "#4A4060", marginTop: "-4px" }}>
                      {msg.timestamp?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "10px", background: "linear-gradient(135deg,#7C4DFF,#E8456A)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MessageCircle size={13} strokeWidth={2} style={{ color: "#fff" }} />
                  </div>
                  <div style={{ background: "rgba(124,77,255,0.08)", border: "1px solid rgba(124,77,255,0.18)", borderRadius: "16px 16px 16px 4px", padding: "14px 18px", display: "flex", gap: "5px", alignItems: "center" }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#A47BFF", animation: `bounce 1.2s ease infinite`, animationDelay: `${i * 0.18}s` }} />
                    ))}
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Quick suggestions row - show early in conversation */}
          {!userHasMessaged && messages.length <= 2 && !isTyping && (
            <div style={{ padding: "0 28px 12px", flexShrink: 0 }}>
              <div style={{ maxWidth: hasOutfits ? "100%" : "720px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "8px" }}>
                {QUICK_REPLIES.slice(0, 6).map((qr) => (
                  <button key={qr} onClick={() => handleSend(qr)} style={{ padding: "10px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", color: "#BFB4D4", fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", cursor: "pointer", outline: "none", transition: "all 0.25s", textAlign: "left", display: "flex", alignItems: "center", gap: "8px" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(124,77,255,0.08)"; e.currentTarget.style.color = "#A47BFF"; e.currentTarget.style.borderColor = "rgba(124,77,255,0.25)"; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "#BFB4D4"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <ChevronRight size={12} strokeWidth={2.5} style={{ color: "#7C4DFF", flexShrink: 0 }} />
                    {qr}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input bar */}
          <div style={{ padding: "12px 28px 18px", background: "rgba(7,8,15,0.7)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
            <div style={{ maxWidth: hasOutfits ? "100%" : "720px", margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(124,77,255,0.15)", borderRadius: "16px", padding: "6px 6px 6px 18px", transition: "all 0.3s", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }} onFocusCapture={(e) => { e.currentTarget.style.borderColor = "rgba(124,77,255,0.4)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(124,77,255,0.15)"; }} onBlurCapture={(e) => { e.currentTarget.style.borderColor = "rgba(124,77,255,0.15)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)"; }}>
                <input ref={inputRef} type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }} placeholder="Ask StyleBuddy anything — e.g. 'Wedding outfit in Lahore for women'…" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#F8F3E6", fontFamily: "'Inter',sans-serif", fontSize: "0.875rem", lineHeight: 1.5 }} />
                <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                  <button style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", outline: "none", color: "#7A6E8A", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#BFB4D4"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#7A6E8A"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
                    <Mic size={15} strokeWidth={1.8} />
                  </button>
                  <button onClick={() => handleSend()} disabled={!inputText.trim()} style={{ width: "36px", height: "36px", borderRadius: "10px", background: inputText.trim() ? "linear-gradient(135deg,#7C4DFF,#E8456A)" : "rgba(255,255,255,0.06)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: inputText.trim() ? "pointer" : "default", outline: "none", transition: "all 0.3s", boxShadow: inputText.trim() ? "0 4px 16px rgba(124,77,255,0.4)" : "none", transform: inputText.trim() ? "scale(1)" : "scale(0.95)" }}>
                    <Send size={14} strokeWidth={2.2} style={{ color: inputText.trim() ? "#fff" : "#4A4060" }} />
                  </button>
                </div>
              </div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.6rem", color: "#4A4060", textAlign: "center", marginTop: "8px" }}>
                StyleBuddy · EventFit AI — outfit suggestions based on Pakistani culture & live weather
              </p>
            </div>
          </div>
        </div>

        {/* ════════════ RIGHT: OUTFITS PANEL ════════════ */}
        {hasOutfits && (
          <div className={`${mobileTab === "chat" ? "hidden lg:flex" : "flex"}`} style={{ width: "380px", flexShrink: 0, flexDirection: "column", overflow: "hidden", borderLeft: "1px solid rgba(124,77,255,0.12)", background: "linear-gradient(180deg,rgba(124,77,255,0.03) 0%,rgba(7,8,15,0) 100%)" }}>
            {/* Panel header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0, background: "rgba(7,8,15,0.4)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                    <div style={{ width: "3px", height: "16px", borderRadius: "2px", background: "linear-gradient(180deg,#E8B84B,#E8456A)" }} />
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8B84B" }}>Recommended Outfits</p>
                  </div>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: "#7A6E8A", marginLeft: "11px" }}>{recommendedOutfits.length} outfits found</p>
                </div>
                <Link to={`/results?gender=${selectedGender}&event=${selectedEvent}&city=${selectedCity}`} style={{ textDecoration: "none" }}>
                  <button style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 12px", background: "rgba(232,184,75,0.08)", border: "1px solid rgba(232,184,75,0.22)", borderRadius: "8px", color: "#F5D07A", fontFamily: "'Inter',sans-serif", fontSize: "0.7rem", fontWeight: 500, cursor: "pointer", outline: "none", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(232,184,75,0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(232,184,75,0.08)"; }}>
                    View All <ChevronRight size={11} strokeWidth={2.5} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Outfit list */}
            <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: "12px", scrollbarWidth: "thin", scrollbarColor: "rgba(124,77,255,0.2) transparent" }}>
              {recommendedOutfits.map((outfit) => (
                <div key={outfit.id} onClick={() => setActiveOutfit(outfit)} style={{ borderRadius: "16px", overflow: "hidden", border: `1px solid ${activeOutfit?.id === outfit.id ? outfit.accent + "50" : "rgba(255,255,255,0.06)"}`, background: activeOutfit?.id === outfit.id ? outfit.accent + "0A" : "rgba(255,255,255,0.02)", cursor: "pointer", transition: "all 0.3s cubic-bezier(.22,.68,0,1.2)", transform: activeOutfit?.id === outfit.id ? "scale(1.01)" : "scale(1)", boxShadow: activeOutfit?.id === outfit.id ? `0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px ${outfit.accent}20` : "0 2px 8px rgba(0,0,0,0.2)" }} onMouseEnter={(e) => { if (activeOutfit?.id !== outfit.id) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "scale(1.01)"; } }} onMouseLeave={(e) => { if (activeOutfit?.id !== outfit.id) { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "scale(1)"; } }}>
                  {/* Outfit image */}
                  <div style={{ position: "relative", height: "130px", overflow: "hidden" }}>
                    <img src={outfit.image} alt={outfit.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) saturate(0.9)", transition: "all 0.5s ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.filter = "brightness(0.8) saturate(1)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "brightness(0.7) saturate(0.9)"; }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,8,15,0.95) 0%, rgba(7,8,15,0.3) 40%, transparent 70%)" }} />
                    {/* Top accent */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,${outfit.accent},transparent)`, opacity: activeOutfit?.id === outfit.id ? 1 : 0.4 }} />
                    {/* Badge */}
                    {outfit.badge && (<span style={{ position: "absolute", top: "10px", left: "10px", fontFamily: "'Inter',sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: outfit.badgeColor, background: `${outfit.accent}18`, border: `1px solid ${outfit.accent}35`, borderRadius: "6px", padding: "3px 8px", backdropFilter: "blur(8px)" }}>{outfit.badge}</span>)}
                    {/* Actions */}
                    <div style={{ position: "absolute", top: "8px", right: "8px", display: "flex", gap: "5px" }}>
                      <button onClick={(e) => { e.stopPropagation(); toggleLike(outfit.id); }} style={{ width: "26px", height: "26px", borderRadius: "8px", background: likedIds.has(outfit.id) ? "rgba(232,69,106,0.3)" : "rgba(7,8,15,0.7)", border: `1px solid ${likedIds.has(outfit.id) ? "rgba(232,69,106,0.5)" : "rgba(255,255,255,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", outline: "none", backdropFilter: "blur(8px)", transition: "all 0.2s" }}>
                        <Heart size={10} strokeWidth={likedIds.has(outfit.id) ? 0 : 2} style={{ color: likedIds.has(outfit.id) ? "#E8456A" : "#BFB4D4", fill: likedIds.has(outfit.id) ? "#E8456A" : "none" }} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); toggleSave(outfit.id); }} style={{ width: "26px", height: "26px", borderRadius: "8px", background: savedIds.has(outfit.id) ? "rgba(232,184,75,0.2)" : "rgba(7,8,15,0.7)", border: `1px solid ${savedIds.has(outfit.id) ? "rgba(232,184,75,0.4)" : "rgba(255,255,255,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", outline: "none", backdropFilter: "blur(8px)", transition: "all 0.2s" }}>
                        <BookmarkPlus size={10} strokeWidth={2} style={{ color: savedIds.has(outfit.id) ? "#E8B84B" : "#BFB4D4" }} />
                      </button>
                    </div>
                    {/* Name overlay */}
                    <div style={{ position: "absolute", bottom: "10px", left: "12px", right: "12px" }}>
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.88rem", fontWeight: 700, color: "#F8F3E6", lineHeight: 1.2, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>{outfit.name}</h3>
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "10px 12px 12px" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "0.75rem", color: "#7A6E8A", marginBottom: "8px" }}>{outfit.fabric}</p>

                    {outfit.tips?.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "8px" }}>
                        {outfit.tips.slice(0, 2).map((tip, i) => (
                          <span key={i} style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.6rem", color: outfit.accent, background: outfit.accent + "10", border: `1px solid ${outfit.accent}25`, borderRadius: "5px", padding: "2px 7px" }}>{tip}</span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", fontWeight: 700, color: outfit.accent }}>{outfit.priceRange}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={9} strokeWidth={s <= Math.floor(outfit.rating || 4.5) ? 0 : 1.5} style={{ color: s <= Math.round(outfit.rating || 4.5) ? "#E8B84B" : "#2A2240", fill: s <= Math.floor(outfit.rating || 4.5) ? "#E8B84B" : "none" }} />
                        ))}
                        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.6rem", color: "#7A6E8A", marginLeft: "2px" }}>{(outfit.rating || 4.5).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Brands footer */}
            {activeOutfit && (
              <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(7,8,15,0.5)", flexShrink: 0 }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A6E8A", marginBottom: "7px" }}>Available at</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {activeOutfit.brands?.map((b) => (
                    <span key={b} style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.68rem", color: "#BFB4D4", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", padding: "3px 9px" }}>{b}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
