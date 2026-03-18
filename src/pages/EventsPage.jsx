import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Heart,
  Briefcase,
  Music,
  Star,
  Building2,
  Coffee,
  GraduationCap,
  UtensilsCrossed,
  ChevronRight,
  ArrowRight,
  Eye,
  BookmarkPlus,
  SlidersHorizontal,
  MapPin,
  Thermometer,
  Filter,
  X,
  Tag,
  TrendingUp,
  Compass,
  MessageCircle,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const EVENT_TABS = [
  { id: "all", label: "All Events", icon: TrendingUp },
  { id: "wedding", label: "Wedding", icon: Heart },
  { id: "interview", label: "Interview", icon: Briefcase },
  { id: "party", label: "Party", icon: Music },
  { id: "eid", label: "Eid", icon: Star },
  { id: "formal", label: "Office", icon: Building2 },
  { id: "casual", label: "Casual", icon: Coffee },
  { id: "graduation", label: "Graduation", icon: GraduationCap },
  { id: "dinner", label: "Dinner", icon: UtensilsCrossed },
];

const GENDER_TABS = [
  { id: "all", label: "All" },
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
];

const ALL_OUTFITS = [
  // ── WOMEN – WEDDING ──
  {
    id: "w-wed-01",
    name: "Bridal Gharara — Ruby & Gold",
    event: "wedding",
    gender: "women",
    style: "traditional",
    formality: "ultra-formal",
    city: "Lahore",
    temp: "18°C",
    weather: "Cool",
    fabric: "Pure Silk · Zardozi Embroidery",
    priceRange: "Rs. 35,000 – 85,000",
    description:
      "A stunning ruby red pure silk gharara adorned with intricate zardozi and dabka embroidery. Timeless bridal elegance rooted in Pakistani tradition.",
    tips: ["Kundan jewelry set", "Low bun with jhoomar", "Nude heels"],
    brands: ["Maria B Bridal", "HSY", "Elan"],
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=85",
    badge: "Bridal Pick",
    badgeColor: "#E8456A",
    badgeBg: "rgba(232,69,106,0.15)",
    accent: "#E8456A",
    accentBg: "rgba(232,69,106,0.08)",
    accentBorder: "rgba(232,69,106,0.25)",
    rating: 4.9,
    views: "4.2k",
    trending: true,
    featured: true,
  },
  {
    id: "w-wed-02",
    name: "Walima Lehenga — Emerald Dreams",
    event: "wedding",
    gender: "women",
    style: "traditional",
    formality: "ultra-formal",
    city: "Karachi",
    temp: "26°C",
    weather: "Mild",
    fabric: "Net · Resham Embroidery",
    priceRange: "Rs. 18,000 – 45,000",
    description:
      "A breathtaking emerald green net lehenga with hand-done resham embroidery and gold gota trim. Perfect for walima or as a wedding guest.",
    tips: ["Gold Jadau earrings", "Soft waves hair", "Statement clutch"],
    brands: ["Khaadi Khaas", "Gul Ahmed Festive", "Rang Ja"],
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=85",
    badge: "Guest Favorite",
    badgeColor: "#E8B84B",
    badgeBg: "rgba(232,184,75,0.15)",
    accent: "#E8B84B",
    accentBg: "rgba(232,184,75,0.08)",
    accentBorder: "rgba(232,184,75,0.25)",
    rating: 4.7,
    views: "3.1k",
    trending: true,
    featured: false,
  },
  {
    id: "w-wed-03",
    name: "Nikah Angarkha — Ivory & Rose",
    event: "wedding",
    gender: "women",
    style: "fusion",
    formality: "ultra-formal",
    city: "Islamabad",
    temp: "22°C",
    weather: "Mild",
    fabric: "Silk Angarkha · Chikankari",
    priceRange: "Rs. 22,000 – 55,000",
    description:
      "An ethereal ivory silk angarkha with delicate chikankari embroidery in rose thread. Modern bridal silhouette that is minimalistic yet deeply elegant.",
    tips: [
      "Polki or pearl jewelry",
      "Braided hair with flowers",
      "Blush dupatta",
    ],
    brands: ["Faraz Manan", "Nomi Ansari", "Elan"],
    image: "/images/nikah-angarkha-ivory.png",
    badge: "Nikah Special",
    badgeColor: "#A47BFF",
    badgeBg: "rgba(164,123,255,0.15)",
    accent: "#7C4DFF",
    accentBg: "rgba(124,77,255,0.08)",
    accentBorder: "rgba(124,77,255,0.25)",
    rating: 4.8,
    views: "2.6k",
    trending: false,
    featured: false,
  },

  // ── WOMEN – INTERVIEW ──
  {
    id: "w-int-01",
    name: "Power Shalwar Kameez — Slate Blue",
    event: "interview",
    gender: "women",
    style: "smart-casual",
    formality: "formal",
    city: "Islamabad",
    temp: "22°C",
    weather: "Cool",
    fabric: "Cotton Wash & Wear",
    priceRange: "Rs. 3,500 – 8,000",
    description:
      "A pristine straight-cut shalwar kameez in slate blue wash-and-wear. Clean lines, minimal embroidery, draped dupatta — the ideal Pakistani corporate look.",
    tips: ["Minimal silver jewelry", "Neat ponytail or bun", "Kitten heels"],
    brands: ["Alkaram Studio", "Sapphire", "Gul Ahmed"],
    image:
      "https://images.unsplash.com/photo-1573497491765-dccce02b29df?auto=format&fit=crop&w=600&q=85",
    badge: "Professional",
    badgeColor: "#7C4DFF",
    badgeBg: "rgba(124,77,255,0.15)",
    accent: "#7C4DFF",
    accentBg: "rgba(124,77,255,0.08)",
    accentBorder: "rgba(124,77,255,0.25)",
    rating: 4.6,
    views: "2.9k",
    trending: false,
    featured: false,
  },
  {
    id: "w-int-02",
    name: "Classic Blazer & Trousers — Charcoal",
    event: "interview",
    gender: "women",
    style: "western-formal",
    formality: "formal",
    city: "Karachi",
    temp: "28°C",
    weather: "Mild",
    fabric: "Wool-Blend Blazer · Crepe Trousers",
    priceRange: "Rs. 6,000 – 18,000",
    description:
      "A tailored charcoal wool-blend blazer with straight-leg crepe trousers. A power look increasingly accepted across Pakistani professional environments.",
    tips: ["Small stud earrings", "Leather tote bag", "Block heel or loafers"],
    brands: ["Outfitters", "Bonanza", "Breakout"],
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=600&q=85",
    badge: "Top Rated",
    badgeColor: "#E8B84B",
    badgeBg: "rgba(232,184,75,0.15)",
    accent: "#E8B84B",
    accentBg: "rgba(232,184,75,0.08)",
    accentBorder: "rgba(232,184,75,0.25)",
    rating: 4.5,
    views: "1.8k",
    trending: true,
    featured: false,
  },

  // ── WOMEN – PARTY ──
  {
    id: "w-par-01",
    name: "Embellished Sharara — Midnight Purple",
    event: "party",
    gender: "women",
    style: "festive",
    formality: "semi-formal",
    city: "Lahore",
    temp: "24°C",
    weather: "Mild",
    fabric: "Chiffon Sharara · Sequence Work",
    priceRange: "Rs. 8,000 – 22,000",
    description:
      "A dazzling midnight purple chiffon sharara with scattered sequence and mirror work. The outfit that makes every party entrance unforgettable.",
    tips: ["Bold plum or red lip", "Chandelier earrings", "Gold strappy heels"],
    brands: ["Sobia Nazir", "Asim Jofa", "Zara Shahjahan"],
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=85",
    badge: "Party Hit",
    badgeColor: "#FF7A9A",
    badgeBg: "rgba(255,122,154,0.15)",
    accent: "#E8456A",
    accentBg: "rgba(232,69,106,0.08)",
    accentBorder: "rgba(232,69,106,0.25)",
    rating: 4.8,
    views: "3.8k",
    trending: true,
    featured: true,
  },
  {
    id: "w-par-02",
    name: "Sequin Co-ord Set — Champagne",
    event: "party",
    gender: "women",
    style: "fusion",
    formality: "semi-formal",
    city: "Karachi",
    temp: "29°C",
    weather: "Warm",
    fabric: "Sequin-embroidered Co-ord",
    priceRange: "Rs. 5,500 – 14,000",
    description:
      "A chic champagne sequin co-ord set — fitted crop top with flared palazzo trousers. Pakistani fusion fashion at its finest: traditional silhouette, modern styling.",
    tips: [
      "Nude heels",
      "Dewy makeup look",
      "Minimal jewelry — let the outfit shine",
    ],
    brands: ["Zainab Chottani Pret", "Cross Stitch", "Limelight"],
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=85",
    badge: "Trending",
    badgeColor: "#E8B84B",
    badgeBg: "rgba(232,184,75,0.15)",
    accent: "#E8B84B",
    accentBg: "rgba(232,184,75,0.08)",
    accentBorder: "rgba(232,184,75,0.25)",
    rating: 4.6,
    views: "2.2k",
    trending: true,
    featured: false,
  },

  // ── WOMEN – EID ──
  {
    id: "w-eid-01",
    name: "Anarkali Ensemble — Saffron",
    event: "eid",
    gender: "women",
    style: "traditional",
    formality: "semi-formal",
    city: "Multan",
    temp: "32°C",
    weather: "Warm",
    fabric: "Organza · Block Print",
    priceRange: "Rs. 6,000 – 16,000",
    description:
      "A vibrant saffron organza anarkali with hand-block print details and golden piping. Regal, festive, and breathable for warm Eid mornings.",
    tips: ["Gold jhumkas", "Soft wavy hair", "Khussas in gold"],
    brands: ["Khaadi", "Rang Ja", "Nishat Linen"],
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=85",
    badge: "Eid Special",
    badgeColor: "#E8B84B",
    badgeBg: "rgba(232,184,75,0.15)",
    accent: "#E8B84B",
    accentBg: "rgba(232,184,75,0.08)",
    accentBorder: "rgba(232,184,75,0.25)",
    rating: 4.7,
    views: "5.1k",
    trending: true,
    featured: true,
  },

  // ── WOMEN – CASUAL ──
  {
    id: "w-cas-01",
    name: "Lawn Kurta & Jeans — Dusty Rose",
    event: "casual",
    gender: "women",
    style: "casual",
    formality: "casual",
    city: "Lahore",
    temp: "33°C",
    weather: "Warm",
    fabric: "Lawn Kurta · Slim Denim",
    priceRange: "Rs. 2,500 – 7,000",
    description:
      "A printed lawn kurta in dusty rose paired with dark slim-fit jeans — the quintessential Pakistani millennial day look.",
    tips: ["White sneakers or flat sandals", "Tote bag", "Just a watch"],
    brands: ["Alkaram", "Khaadi", "Gul Ahmed RTW"],
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=85",
    badge: "Everyday Fav",
    badgeColor: "#4DEFE0",
    badgeBg: "rgba(0,212,180,0.12)",
    accent: "#00D4B4",
    accentBg: "rgba(0,212,180,0.07)",
    accentBorder: "rgba(0,212,180,0.2)",
    rating: 4.5,
    views: "4.5k",
    trending: false,
    featured: false,
  },

  // ── WOMEN – FORMAL ──
  {
    id: "w-for-01",
    name: "Office Kurta Set — Navy & White",
    event: "formal",
    gender: "women",
    style: "smart-casual",
    formality: "formal",
    city: "Islamabad",
    temp: "20°C",
    weather: "Cool",
    fabric: "Cotton Blend 3-Piece",
    priceRange: "Rs. 4,500 – 10,000",
    description:
      "A tailored navy and white 3-piece shalwar kameez set ideal for office environments. Clean cut, professional silhouette, modest and sophisticated.",
    tips: [
      "Pearl or silver earrings",
      "Leather handbag",
      "Block heels or ballerinas",
    ],
    brands: ["Sapphire", "Alkaram Studio", "Ideas"],
    image:
      "https://images.unsplash.com/photo-1573497491765-dccce02b29df?auto=format&fit=crop&w=600&q=85",
    badge: "Office Ready",
    badgeColor: "#A47BFF",
    badgeBg: "rgba(164,123,255,0.15)",
    accent: "#7C4DFF",
    accentBg: "rgba(124,77,255,0.08)",
    accentBorder: "rgba(124,77,255,0.25)",
    rating: 4.4,
    views: "1.9k",
    trending: false,
    featured: false,
  },

  // ── WOMEN – GRADUATION ──
  {
    id: "w-grad-01",
    name: "Festive Embroidered Suit — Teal",
    event: "graduation",
    gender: "women",
    style: "semi-formal",
    formality: "semi-formal",
    city: "Gujranwala",
    temp: "24°C",
    weather: "Mild",
    fabric: "Chiffon with Embroidery",
    priceRange: "Rs. 7,000 – 18,000",
    description:
      "A radiant teal chiffon suit with delicate gold embroidery. Elegant enough for convocation without overshadowing the graduation gown.",
    tips: ["Gold drop earrings", "Clutch purse", "Neutral heels"],
    brands: ["Sana Safinaz Pret", "Mushq", "Zara Shahjahan Pret"],
    image: "/images/teal-chiffon-suit.png",
    badge: "Grad Special",
    badgeColor: "#4DEFE0",
    badgeBg: "rgba(0,212,180,0.12)",
    accent: "#00D4B4",
    accentBg: "rgba(0,212,180,0.07)",
    accentBorder: "rgba(0,212,180,0.2)",
    rating: 4.6,
    views: "1.4k",
    trending: false,
    featured: false,
  },

  // ── WOMEN – DINNER ──
  {
    id: "w-din-01",
    name: "Silk Midi Dress — Deep Crimson",
    event: "dinner",
    gender: "women",
    style: "fusion",
    formality: "semi-formal",
    city: "Karachi",
    temp: "27°C",
    weather: "Mild",
    fabric: "Silk Blend · Evening Wear",
    priceRange: "Rs. 8,000 – 20,000",
    description:
      "A sleek deep crimson silk midi dress with subtle Pakistani embroidery at the hem. Refined, chic and perfect for fine dining or a special evening.",
    tips: ["Gold cuff bracelet", "Block heel mules", "Updo or sleek blowout"],
    brands: ["Hussain Rehar", "Shamaeel Ansari Pret", "Republic Womenswear"],
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=85",
    badge: "Evening Glam",
    badgeColor: "#E8456A",
    badgeBg: "rgba(232,69,106,0.15)",
    accent: "#E8456A",
    accentBg: "rgba(232,69,106,0.08)",
    accentBorder: "rgba(232,69,106,0.25)",
    rating: 4.7,
    views: "2.0k",
    trending: true,
    featured: false,
  },

  // ── MEN – WEDDING ──
  {
    id: "m-wed-01",
    name: "Sherwani — Ivory & Gold Brocade",
    event: "wedding",
    gender: "men",
    style: "traditional",
    formality: "ultra-formal",
    city: "Lahore",
    temp: "18°C",
    weather: "Cool",
    fabric: "Silk Sherwani · Zardozi",
    priceRange: "Rs. 45,000 – 1,50,000",
    description:
      "A majestic ivory silk sherwani with gold zardozi brocade. Paired with ivory churidar and hand-tied turban — the quintessential Pakistani groom's outfit.",
    tips: [
      "Gold or silver mojri",
      "Sehra or turban for groom",
      "Well-trimmed beard",
    ],
    brands: ["HSY", "Mohsin Naveed Ranjha", "Amir Adnan"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85",
    badge: "Groom's Choice",
    badgeColor: "#E8B84B",
    badgeBg: "rgba(232,184,75,0.15)",
    accent: "#E8B84B",
    accentBg: "rgba(232,184,75,0.08)",
    accentBorder: "rgba(232,184,75,0.25)",
    rating: 4.9,
    views: "6.3k",
    trending: true,
    featured: true,
  },
  {
    id: "m-wed-02",
    name: "Embroidered Waistcoat Set — Charcoal",
    event: "wedding",
    gender: "men",
    style: "semi-traditional",
    formality: "ultra-formal",
    city: "Lahore",
    temp: "20°C",
    weather: "Mild",
    fabric: "Wash & Wear Shalwar Kameez · Gold Waistcoat",
    priceRange: "Rs. 8,000 – 25,000",
    description:
      "A charcoal shalwar kameez topped with an intricately embroidered gold waistcoat. Polished wedding guest look without overshadowing the groom.",
    tips: ["Brown mojri or Oxford shoes", "Simple watch", "Pocket square"],
    brands: ["Junaid Jamshed", "Bonanza", "Gul Ahmed"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85",
    badge: "Guest Favorite",
    badgeColor: "#E8B84B",
    badgeBg: "rgba(232,184,75,0.15)",
    accent: "#E8B84B",
    accentBg: "rgba(232,184,75,0.08)",
    accentBorder: "rgba(232,184,75,0.25)",
    rating: 4.7,
    views: "3.2k",
    trending: true,
    featured: false,
  },

  // ── MEN – INTERVIEW ──
  {
    id: "m-int-01",
    name: "Classic Two-Piece Suit — Navy",
    event: "interview",
    gender: "men",
    style: "western-formal",
    formality: "formal",
    city: "Islamabad",
    temp: "20°C",
    weather: "Cool",
    fabric: "Wool-Blend Suit · Cotton Shirt",
    priceRange: "Rs. 12,000 – 40,000",
    description:
      "A perfectly tailored navy two-piece suit with slim lapels, white shirt, and grey silk tie. The benchmark of Pakistani professional male dressing.",
    tips: ["Polished Oxford shoes", "Conservative tie", "Well-groomed beard"],
    brands: ["Breakout", "Salateen", "Urbansole tailored"],
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=85",
    badge: "Interview Pro",
    badgeColor: "#7C4DFF",
    badgeBg: "rgba(124,77,255,0.15)",
    accent: "#7C4DFF",
    accentBg: "rgba(124,77,255,0.08)",
    accentBorder: "rgba(124,77,255,0.25)",
    rating: 4.8,
    views: "3.2k",
    trending: false,
    featured: false,
  },
  {
    id: "m-int-02",
    name: "Formal Shalwar Kameez — Light Grey",
    event: "interview",
    gender: "men",
    style: "traditional-formal",
    formality: "formal",
    city: "Faisalabad",
    temp: "34°C",
    weather: "Warm",
    fabric: "Cotton Wash-and-Wear",
    priceRange: "Rs. 3,000 – 7,000",
    description:
      "A crisp, well-pressed light grey shalwar kameez. Clean and dignified — widely accepted in Pakistani work environments.",
    tips: [
      "Formal leather sandals or khussa",
      "Pressed — no creases",
      "Neat combed hair",
    ],
    brands: ["Junaid Jamshed", "Alkaram Men", "Gul Ahmed Men"],
    image:
      "https://images.unsplash.com/photo-1573497491765-dccce02b29df?auto=format&fit=crop&w=600&q=85",
    badge: "Classic Choice",
    badgeColor: "#BFB4D4",
    badgeBg: "rgba(191,180,212,0.12)",
    accent: "#A47BFF",
    accentBg: "rgba(164,123,255,0.07)",
    accentBorder: "rgba(164,123,255,0.2)",
    rating: 4.5,
    views: "2.1k",
    trending: false,
    featured: false,
  },

  // ── MEN – PARTY ──
  {
    id: "m-par-01",
    name: "Embroidered Kurta — Midnight Blue",
    event: "party",
    gender: "men",
    style: "festive",
    formality: "semi-formal",
    city: "Karachi",
    temp: "28°C",
    weather: "Warm",
    fabric: "Chikankari Cotton",
    priceRange: "Rs. 5,000 – 14,000",
    description:
      "A flowing midnight blue kurta with silver-and-gold thread embroidery. The Pakistani man's answer to party fashion — festive without overdressing.",
    tips: [
      "Embroidered khussa",
      "Simple silver watch",
      "Rolled sleeves for dholki vibe",
    ],
    brands: ["Bonanza Satrangi", "J. Junaid Jamshed", "Sana Safinaz Men"],
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=600&q=85",
    badge: "Party Ready",
    badgeColor: "#FF7A9A",
    badgeBg: "rgba(255,122,154,0.15)",
    accent: "#E8456A",
    accentBg: "rgba(232,69,106,0.08)",
    accentBorder: "rgba(232,69,106,0.25)",
    rating: 4.6,
    views: "2.7k",
    trending: true,
    featured: false,
  },

  // ── MEN – EID ──
  {
    id: "m-eid-01",
    name: "Pastel Kurta Shalwar — Sage Green",
    event: "eid",
    gender: "men",
    style: "traditional",
    formality: "semi-formal",
    city: "Lahore",
    temp: "30°C",
    weather: "Warm",
    fabric: "Egyptian Cotton / Lawn",
    priceRange: "Rs. 3,500 – 9,000",
    description:
      "A breezy sage green Egyptian cotton kurta — clean, airy and deeply festive. The go-to Eid morning look for the modern Pakistani man.",
    tips: ["White khussa or sandals", "Light attar", "Neat hair styling"],
    brands: ["Junaid Jamshed", "Bonanza", "Gul Ahmed Men"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85",
    badge: "Eid Classic",
    badgeColor: "#00D4B4",
    badgeBg: "rgba(0,212,180,0.12)",
    accent: "#00D4B4",
    accentBg: "rgba(0,212,180,0.07)",
    accentBorder: "rgba(0,212,180,0.2)",
    rating: 4.6,
    views: "4.1k",
    trending: true,
    featured: false,
  },

  // ── MEN – FORMAL ──
  {
    id: "m-for-01",
    name: "Office Shalwar Kameez — Charcoal Grey",
    event: "formal",
    gender: "men",
    style: "smart-casual",
    formality: "formal",
    city: "Islamabad",
    temp: "22°C",
    weather: "Cool",
    fabric: "Wash & Wear Blend",
    priceRange: "Rs. 3,500 – 8,000",
    description:
      "A sharply pressed charcoal grey shalwar kameez in premium wash-and-wear. The daily professional uniform of the Pakistani corporate world.",
    tips: [
      "Formal leather shoes",
      "Press neatly",
      "Conservative color palette",
    ],
    brands: ["Junaid Jamshed", "Gul Ahmed Men", "Alkaram Men"],
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=85",
    badge: "Office Ready",
    badgeColor: "#7C4DFF",
    badgeBg: "rgba(124,77,255,0.15)",
    accent: "#7C4DFF",
    accentBg: "rgba(124,77,255,0.08)",
    accentBorder: "rgba(124,77,255,0.25)",
    rating: 4.4,
    views: "1.7k",
    trending: false,
    featured: false,
  },

  // ── MEN – CASUAL ──
  {
    id: "m-cas-01",
    name: "Graphic Kurta + Slim Chino — Urban",
    event: "casual",
    gender: "men",
    style: "casual",
    formality: "casual",
    city: "Karachi",
    temp: "30°C",
    weather: "Warm",
    fabric: "Cotton Kurta · Slim Chino",
    priceRange: "Rs. 2,000 – 6,000",
    description:
      "A cotton graphic kurta with slim chinos — the effortless urban Pakistani casual look. Comfortable, stylish and endlessly versatile.",
    tips: ["White sneakers", "Minimal accessories", "Rolled sleeves"],
    brands: ["Outfitters", "Breakout", "Bonanza Satrangi"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85",
    badge: "Street Style",
    badgeColor: "#4DEFE0",
    badgeBg: "rgba(0,212,180,0.12)",
    accent: "#00D4B4",
    accentBg: "rgba(0,212,180,0.07)",
    accentBorder: "rgba(0,212,180,0.2)",
    rating: 4.4,
    views: "2.3k",
    trending: false,
    featured: false,
  },

  // ── MEN – GRADUATION ──
  {
    id: "m-grad-01",
    name: "Smart Kurta & Waistcoat — Slate",
    event: "graduation",
    gender: "men",
    style: "semi-traditional",
    formality: "semi-formal",
    city: "Gujrat",
    temp: "24°C",
    weather: "Mild",
    fabric: "Wash & Wear · Embroidered Waistcoat",
    priceRange: "Rs. 5,000 – 14,000",
    description:
      "A slate grey wash-and-wear kurta paired with a hand-embroidered waistcoat. Smart, celebratory and perfectly suited for convocation day in any Pakistani city.",
    tips: ["Leather loafers", "Pocket square", "Classic watch"],
    brands: ["Junaid Jamshed", "Bonanza", "Alkaram Men"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85",
    badge: "Grad Look",
    badgeColor: "#A47BFF",
    badgeBg: "rgba(164,123,255,0.15)",
    accent: "#7C4DFF",
    accentBg: "rgba(124,77,255,0.08)",
    accentBorder: "rgba(124,77,255,0.25)",
    rating: 4.5,
    views: "1.2k",
    trending: false,
    featured: false,
  },

  // ── MEN – DINNER ──
  {
    id: "m-din-01",
    name: "Dark Kurta & Waistcoat — Midnight",
    event: "dinner",
    gender: "men",
    style: "fusion",
    formality: "semi-formal",
    city: "Lahore",
    temp: "22°C",
    weather: "Cool",
    fabric: "Silk-blend Kurta · Velvet Waistcoat",
    priceRange: "Rs. 7,000 – 18,000",
    description:
      "A deep midnight silk-blend kurta with a velvet embroidered waistcoat — understated luxury for a special dinner or date night in Pakistan.",
    tips: ["Dark Oxford shoes", "Minimalist watch", "Clean grooming"],
    brands: ["Amir Adnan", "J. Junaid Jamshed", "Mohsin Naveed Ranjha"],
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=85",
    badge: "Evening Look",
    badgeColor: "#E8456A",
    badgeBg: "rgba(232,69,106,0.15)",
    accent: "#E8456A",
    accentBg: "rgba(232,69,106,0.08)",
    accentBorder: "rgba(232,69,106,0.25)",
    rating: 4.7,
    views: "1.8k",
    trending: true,
    featured: false,
  },
];

/* ─────────────────────────────────────────────
   HELPER
───────────────────────────────────────────── */
function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          strokeWidth={s <= Math.floor(rating) ? 0 : 1.5}
          style={{
            color: s <= Math.round(rating) ? "#E8B84B" : "#4A4060",
            fill: s <= Math.floor(rating) ? "#E8B84B" : "none",
          }}
        />
      ))}
      <span
        style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: "0.7rem",
          color: "#BFB4D4",
          marginLeft: "4px",
        }}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   OUTFIT CARD
───────────────────────────────────────────── */
function OutfitCard({ outfit, onClick, liked, saved, onLike, onSave }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "18px",
        overflow: "hidden",
        border: `1px solid ${hovered ? outfit.accentBorder : "rgba(255,255,255,0.07)"}`,
        background: hovered ? outfit.accentBg : "rgba(255,255,255,0.03)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${outfit.accentBorder}`
          : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          height: "220px",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={outfit.image}
          alt={outfit.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            filter: "brightness(0.8)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(7,8,15,0.85) 0%, transparent 55%)",
          }}
        />

        {/* Top row: badge + actions */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            right: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: outfit.badgeColor,
              background: outfit.badgeBg,
              border: `1px solid ${outfit.accentBorder}`,
              borderRadius: "6px",
              padding: "4px 9px",
              backdropFilter: "blur(10px)",
            }}
          >
            {outfit.badge}
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike();
              }}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: liked
                  ? "rgba(232,69,106,0.25)"
                  : "rgba(7,8,15,0.6)",
                border: `1px solid ${liked ? "rgba(232,69,106,0.5)" : "rgba(255,255,255,0.15)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                outline: "none",
                backdropFilter: "blur(10px)",
                transition: "all 0.2s",
              }}
            >
              <Heart
                size={13}
                strokeWidth={liked ? 0 : 2}
                style={{
                  color: liked ? "#E8456A" : "#BFB4D4",
                  fill: liked ? "#E8456A" : "none",
                }}
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSave();
              }}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: saved ? "rgba(232,184,75,0.2)" : "rgba(7,8,15,0.6)",
                border: `1px solid ${saved ? "rgba(232,184,75,0.45)" : "rgba(255,255,255,0.15)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                outline: "none",
                backdropFilter: "blur(10px)",
                transition: "all 0.2s",
              }}
            >
              <BookmarkPlus
                size={13}
                strokeWidth={2}
                style={{ color: saved ? "#E8B84B" : "#BFB4D4" }}
              />
            </button>
          </div>
        </div>

        {/* Trending badge */}
        {outfit.trending && (
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "rgba(232,184,75,0.15)",
              border: "1px solid rgba(232,184,75,0.35)",
              borderRadius: "100px",
              padding: "3px 9px",
              backdropFilter: "blur(10px)",
            }}
          >
            <TrendingUp
              size={9}
              strokeWidth={2.5}
              style={{ color: "#E8B84B" }}
            />
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#F5D07A",
                textTransform: "uppercase",
              }}
            >
              Trending
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: "16px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Event + City row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.67rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: outfit.accent,
            }}
          >
            {outfit.event}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <MapPin size={10} strokeWidth={2} style={{ color: "#7A6E8A" }} />
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.67rem",
                color: "#7A6E8A",
              }}
            >
              {outfit.city}
            </span>
          </div>
        </div>

        {/* Name */}
        <h3
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "1rem",
            fontWeight: 700,
            color: "#F8F3E6",
            lineHeight: 1.25,
            marginBottom: "6px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {outfit.name}
        </h3>

        {/* Fabric */}
        <p
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "0.72rem",
            color: "#7A6E8A",
            marginBottom: "10px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {outfit.fabric}
        </p>

        {/* Rating + Views */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <StarRating rating={outfit.rating} />
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Eye size={11} strokeWidth={2} style={{ color: "#4A4060" }} />
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.67rem",
                color: "#4A4060",
              }}
            >
              {outfit.views}
            </span>
          </div>
        </div>

        {/* Price */}
        <div
          style={{
            marginTop: "12px",
            paddingTop: "10px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: outfit.accent,
            }}
          >
            {outfit.priceRange}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "6px",
              padding: "4px 8px",
            }}
          >
            <ArrowRight
              size={11}
              strokeWidth={2.5}
              style={{ color: "#BFB4D4" }}
            />
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.67rem",
                color: "#BFB4D4",
              }}
            >
              View
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DETAIL MODAL
───────────────────────────────────────────── */
function OutfitModal({ outfit, onClose, liked, saved, onLike, onSave }) {
  if (!outfit) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(13,15,30,0.97)",
          border: `1px solid ${outfit.accentBorder}`,
          borderRadius: "24px",
          overflow: "hidden",
          maxWidth: "760px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px ${outfit.accentBorder}`,
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: "3px",
            background: `linear-gradient(90deg, ${outfit.accent}, transparent)`,
          }}
        />

        <div
          className="flex flex-col md:grid md:grid-cols-2"
        >
          {/* Left: image */}
          <div style={{ position: "relative", minHeight: "320px" }}>
            <img
              src={outfit.image}
              alt={outfit.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.85)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(7,8,15,0.3) 0%, transparent 60%)",
              }}
            />
            {/* close btn */}
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(7,8,15,0.7)",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                outline: "none",
                backdropFilter: "blur(10px)",
              }}
            >
              <X size={15} strokeWidth={2.5} style={{ color: "#BFB4D4" }} />
            </button>
          </div>

          {/* Right: info */}
          <div
            style={{
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Badge row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: outfit.badgeColor,
                  background: outfit.badgeBg,
                  border: `1px solid ${outfit.accentBorder}`,
                  borderRadius: "6px",
                  padding: "4px 10px",
                }}
              >
                {outfit.badge}
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={onLike}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: liked
                      ? "rgba(232,69,106,0.2)"
                      : "rgba(255,255,255,0.05)",
                    border: `1px solid ${liked ? "rgba(232,69,106,0.4)" : "rgba(255,255,255,0.1)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <Heart
                    size={14}
                    strokeWidth={liked ? 0 : 2}
                    style={{
                      color: liked ? "#E8456A" : "#BFB4D4",
                      fill: liked ? "#E8456A" : "none",
                    }}
                  />
                </button>
                <button
                  onClick={onSave}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: saved
                      ? "rgba(232,184,75,0.15)"
                      : "rgba(255,255,255,0.05)",
                    border: `1px solid ${saved ? "rgba(232,184,75,0.4)" : "rgba(255,255,255,0.1)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <BookmarkPlus
                    size={14}
                    strokeWidth={2}
                    style={{ color: saved ? "#E8B84B" : "#BFB4D4" }}
                  />
                </button>
              </div>
            </div>

            {/* Name */}
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(1.1rem,2vw,1.5rem)",
                fontWeight: 800,
                color: "#F8F3E6",
                lineHeight: 1.2,
                marginBottom: "8px",
              }}
            >
              {outfit.name}
            </h2>

            <StarRating rating={outfit.rating} />

            {/* Meta chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                margin: "14px 0",
              }}
            >
              {[
                { icon: MapPin, val: outfit.city },
                { icon: Thermometer, val: outfit.temp },
                { icon: Tag, val: outfit.fabric },
                // eslint-disable-next-line no-unused-vars
              ].map(({ icon: Icon, val }) => (
                <div
                  key={val}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    padding: "5px 10px",
                  }}
                >
                  <Icon
                    size={11}
                    strokeWidth={2}
                    style={{ color: outfit.accent }}
                  />
                  <span
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.72rem",
                      color: "#BFB4D4",
                    }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.83rem",
                color: "#BFB4D4",
                lineHeight: 1.65,
                marginBottom: "16px",
              }}
            >
              {outfit.description}
            </p>

            {/* Tips */}
            <div
              style={{
                background: `${outfit.accent}10`,
                border: `1px solid ${outfit.accentBorder}`,
                borderRadius: "12px",
                padding: "14px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  marginBottom: "10px",
                }}
              >
                <Compass
                  size={13}
                  strokeWidth={2}
                  style={{ color: outfit.accent }}
                />
                <span
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.67rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: outfit.accent,
                  }}
                >
                  Styling Tips
                </span>
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {outfit.tips.map((tip, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <ChevronRight
                      size={12}
                      strokeWidth={2.5}
                      style={{
                        color: outfit.accent,
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.78rem",
                        color: "#BFB4D4",
                        lineHeight: 1.5,
                      }}
                    >
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands */}
            <div style={{ marginBottom: "16px" }}>
              <p
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.67rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#7A6E8A",
                  marginBottom: "8px",
                }}
              >
                Available at
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {outfit.brands.map((b) => (
                  <span
                    key={b}
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.72rem",
                      color: "#BFB4D4",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "6px",
                      padding: "4px 10px",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Price + CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "14px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                marginTop: "auto",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.65rem",
                    color: "#7A6E8A",
                    marginBottom: "2px",
                  }}
                >
                  Price Range
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: outfit.accent,
                  }}
                >
                  {outfit.priceRange}
                </p>
              </div>
              <Link
                to={`/get-outfit?event=${outfit.event}`}
                style={{ textDecoration: "none" }}
              >
                <button
                  className="btn-primary"
                  style={{ fontSize: "0.8rem", padding: "9px 18px" }}
                >
                  <Compass size={13} strokeWidth={2} />
                  Get This Look
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialEvent = searchParams.get("event") || "all";
  const initialGender = searchParams.get("gender") || "all";

  const [activeEvent, setActiveEvent] = useState(initialEvent);
  const [activeGender, setActiveGender] = useState(initialGender);
  const [search, setSearch] = useState("");
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [likedIds, setLikedIds] = useState(new Set());
  const [savedIds, setSavedIds] = useState(new Set());

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

  /* ── Filter ── */
  const filtered = ALL_OUTFITS.filter((o) => {
    if (activeEvent !== "all" && o.event !== activeEvent) return false;
    if (activeGender !== "all" && o.gender !== activeGender) return false;
    if (
      search &&
      !o.name.toLowerCase().includes(search.toLowerCase()) &&
      !o.event.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const handleEventTab = (id) => {
    setActiveEvent(id);
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("event", id);
      return p;
    });
  };

  return (
    <main style={{ minHeight: "100vh", paddingTop: "70px" }}>
      {/* ── Ambient orbs ── */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: "15%",
          left: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(124,77,255,0.07) 0%,transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: "10%",
          right: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(232,184,75,0.06) 0%,transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ════════════ PAGE HERO ════════════ */}
        <div
          style={{
            background: "rgba(7,8,15,0.7)",
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(232,184,75,0.1)",
            padding: "48px 0 36px",
          }}
        >
          <div className="section-container">
            {/* Breadcrumb */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "20px",
              }}
            >
              <Link
                to="/"
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.76rem",
                  color: "#7A6E8A",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#BFB4D4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7A6E8A")}
              >
                Home
              </Link>
              <ChevronRight
                size={11}
                strokeWidth={2}
                style={{ color: "#4A4060" }}
              />
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.76rem",
                  color: "#E8B84B",
                }}
              >
                Browse Events
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontStyle: "italic",
                    fontSize: "0.88rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#E8B84B",
                    marginBottom: "8px",
                  }}
                >
                  Pakistani Event Fashion
                </p>
                <h1
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "clamp(1.8rem,4vw,2.8rem)",
                    fontWeight: 800,
                    color: "#F8F3E6",
                    lineHeight: 1.1,
                    marginBottom: "10px",
                  }}
                >
                  Outfits for every{" "}
                  <span
                    style={{
                      fontStyle: "italic",
                      background: "linear-gradient(135deg,#F5D07A,#E8456A)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    occasion
                  </span>
                </h1>
                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.9375rem",
                    color: "#7A6E8A",
                    maxWidth: "480px",
                    lineHeight: 1.6,
                  }}
                >
                  Browse curated Pakistani outfit collections — filtered by
                  event, gender, and weather. Tap any card for full styling
                  details.
                </p>
              </div>

              {/* CTA */}
              <Link to="/get-outfit" style={{ textDecoration: "none" }}>
                <button
                  className="btn-primary"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <Compass size={15} strokeWidth={2} />
                  Get Personalised Picks
                </button>
              </Link>
            </div>

            {/* ── Search bar ── */}
            <div
              style={{
                position: "relative",
                marginTop: "28px",
                maxWidth: "420px",
              }}
            >
              <Filter
                size={15}
                strokeWidth={1.8}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#7A6E8A",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search outfits, events…"
                style={{
                  width: "100%",
                  paddingLeft: "40px",
                  paddingRight: "16px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#F8F3E6",
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.875rem",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.25s",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(232,184,75,0.4)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    outline: "none",
                    color: "#7A6E8A",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <X size={14} strokeWidth={2} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ════════════ EVENT TABS ════════════ */}
        <div
          style={{
            background: "rgba(7,8,15,0.5)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            position: "sticky",
            top: "70px",
            zIndex: 10,
          }}
        >
          <div className="section-container">
            {/* Event type tabs */}
            <div
              style={{
                display: "flex",
                gap: "4px",
                overflowX: "auto",
                padding: "12px 0",
                scrollbarWidth: "none",
              }}
            >
              {EVENT_TABS.map((tab) => {
                const isActive = activeEvent === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleEventTab(tab.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "7px 14px",
                      borderRadius: "8px",
                      background: isActive
                        ? "rgba(232,184,75,0.12)"
                        : "transparent",
                      border: "1px solid",
                      borderColor: isActive
                        ? "rgba(232,184,75,0.35)"
                        : "transparent",
                      color: isActive ? "#F5D07A" : "#7A6E8A",
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: isActive ? 600 : 400,
                      cursor: "pointer",
                      outline: "none",
                      whiteSpace: "nowrap",
                      transition: "all 0.2s",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.04)";
                        e.currentTarget.style.color = "#BFB4D4";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#7A6E8A";
                      }
                    }}
                  >
                    <Icon size={14} strokeWidth={isActive ? 2 : 1.6} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Gender tabs */}
            <div
              style={{
                display: "flex",
                gap: "6px",
                paddingBottom: "12px",
              }}
            >
              {GENDER_TABS.map((tab) => {
                const isActive = activeGender === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveGender(tab.id)}
                    style={{
                      padding: "5px 14px",
                      borderRadius: "100px",
                      background: isActive
                        ? "rgba(124,77,255,0.15)"
                        : "transparent",
                      border: "1px solid",
                      borderColor: isActive
                        ? "rgba(124,77,255,0.4)"
                        : "rgba(255,255,255,0.08)",
                      color: isActive ? "#A47BFF" : "#7A6E8A",
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: isActive ? 600 : 400,
                      cursor: "pointer",
                      outline: "none",
                      transition: "all 0.2s",
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}

              {/* Result count */}
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.75rem",
                  color: "#4A4060",
                  marginLeft: "auto",
                  alignSelf: "center",
                }}
              >
                {filtered.length} outfit{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* ════════════ OUTFIT GRID ════════════ */}
        <div className="section-container" style={{paddingTop:"40px",paddingBottom:"40px"}}>
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 24px",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <Filter
                  size={24}
                  strokeWidth={1.5}
                  style={{ color: "#4A4060" }}
                />
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "#F8F3E6",
                  marginBottom: "10px",
                }}
              >
                No outfits found
              </h3>
              <p
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.875rem",
                  color: "#7A6E8A",
                  marginBottom: "24px",
                }}
              >
                Try a different event or gender filter
              </p>
              <button
                onClick={() => {
                  setActiveEvent("all");
                  setActiveGender("all");
                  setSearch("");
                }}
                className="btn-secondary"
                style={{ fontSize: "0.85rem" }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {filtered.map((outfit) => (
                <OutfitCard
                  key={outfit.id}
                  outfit={outfit}
                  onClick={() => setSelectedOutfit(outfit)}
                  liked={likedIds.has(outfit.id)}
                  saved={savedIds.has(outfit.id)}
                  onLike={() => toggleLike(outfit.id)}
                  onSave={() => toggleSave(outfit.id)}
                />
              ))}
            </div>
          )}

          {/* ── Bottom CTA ── */}
          {filtered.length > 0 && (
            <div
              style={{
                marginTop: "64px",
                borderRadius: "24px",
                border: "1px solid rgba(232,184,75,0.15)",
                background:
                  "linear-gradient(135deg,rgba(232,184,75,0.05),rgba(124,77,255,0.05))",
                padding: "48px 32px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "400px",
                  height: "200px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(ellipse,rgba(232,184,75,0.08) 0%,transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#E8B84B",
                  marginBottom: "12px",
                }}
              >
                Want a personalised recommendation?
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(1.4rem,3vw,2rem)",
                  fontWeight: 800,
                  color: "#F8F3E6",
                  marginBottom: "16px",
                  lineHeight: 1.2,
                }}
              >
                Tell us your event & city — we'll handle the rest
              </h2>
              <p
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.875rem",
                  color: "#7A6E8A",
                  maxWidth: "420px",
                  margin: "0 auto 28px",
                  lineHeight: 1.6,
                }}
              >
                EventFit checks the live weather in your city and recommends the
                most suitable outfit from our curated collection.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link to="/get-outfit" style={{ textDecoration: "none" }}>
                  <button className="btn-primary">
                    <Compass size={15} strokeWidth={2} />
                    Get My Outfit
                  </button>
                </Link>
                <Link to="/stylebuddy" style={{ textDecoration: "none" }}>
                  <button className="btn-violet">
                    <MessageCircle size={15} strokeWidth={2} />
                    Chat with StyleBuddy
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ════════════ DETAIL MODAL ════════════ */}
      {selectedOutfit && (
        <OutfitModal
          outfit={selectedOutfit}
          onClose={() => setSelectedOutfit(null)}
          liked={likedIds.has(selectedOutfit.id)}
          saved={savedIds.has(selectedOutfit.id)}
          onLike={() => toggleLike(selectedOutfit.id)}
          onSave={() => toggleSave(selectedOutfit.id)}
        />
      )}
    </main>
  );
}
