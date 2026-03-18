import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  Compass,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Heart,
  Briefcase,
  Music,
  Star,
  Building2,
  Coffee,
  GraduationCap,
  UtensilsCrossed,
  User,
  Users,
  CheckCircle2,
  Thermometer,
  Droplets,
  Wind,
  CloudSun,
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

/* ── Step definitions ── */
const STEPS = [
  { id: 1, label: "Gender", shortLabel: "Who" },
  { id: 2, label: "Event", shortLabel: "What" },
  { id: 3, label: "Details", shortLabel: "Where" },
];

/* ── Gender options ── */
const GENDERS = [
  {
    id: "women",
    label: "Women",
    labelUrdu: "خواتین",
    description: "Bridal, festive, professional & casual outfits for women",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
    accent: "#E8456A",
    gradient: "linear-gradient(135deg, #E8456A 0%, #7C4DFF 100%)",
    glow: "rgba(232,69,106,0.35)",
    border: "rgba(232,69,106,0.5)",
    icon: User,
  },
  {
    id: "men",
    label: "Men",
    labelUrdu: "مرد",
    description: "Sherwanis, suits, kurtas & professional attire for men",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    accent: "#7C4DFF",
    gradient: "linear-gradient(135deg, #7C4DFF 0%, #00D4B4 100%)",
    glow: "rgba(124,77,255,0.35)",
    border: "rgba(124,77,255,0.5)",
    icon: Users,
  },
];

/* ── Event type options ── */
const EVENT_TYPES = [
  {
    id: "wedding",
    label: "Wedding / Shadi",
    labelUrdu: "شادی",
    icon: Heart,
    color: "#E8456A",
    bg: "rgba(232,69,106,0.08)",
    border: "rgba(232,69,106,0.25)",
    gradient: "linear-gradient(135deg,#E8456A,#7C4DFF)",
    description: "Nikah, Barat & Walima",
  },
  {
    id: "interview",
    label: "Interview",
    labelUrdu: "انٹرویو",
    icon: Briefcase,
    color: "#7C4DFF",
    bg: "rgba(124,77,255,0.08)",
    border: "rgba(124,77,255,0.25)",
    gradient: "linear-gradient(135deg,#7C4DFF,#00D4B4)",
    description: "Corporate & University",
  },
  {
    id: "party",
    label: "Party / Mehendi",
    labelUrdu: "پارٹی",
    icon: Music,
    color: "#E8B84B",
    bg: "rgba(232,184,75,0.08)",
    border: "rgba(232,184,75,0.25)",
    gradient: "linear-gradient(135deg,#E8B84B,#E8456A)",
    description: "Dholki & Birthday",
  },
  {
    id: "eid",
    label: "Eid / Festival",
    labelUrdu: "عید",
    icon: Star,
    color: "#00D4B4",
    bg: "rgba(0,212,180,0.08)",
    border: "rgba(0,212,180,0.25)",
    gradient: "linear-gradient(135deg,#00D4B4,#7C4DFF)",
    description: "Eid-ul-Fitr & Adha",
  },
  {
    id: "formal",
    label: "Formal / Office",
    labelUrdu: "دفتر",
    icon: Building2,
    color: "#A47BFF",
    bg: "rgba(164,123,255,0.08)",
    border: "rgba(164,123,255,0.25)",
    gradient: "linear-gradient(135deg,#A47BFF,#E8B84B)",
    description: "Daily Work & Meetings",
  },
  {
    id: "casual",
    label: "Casual / Outing",
    labelUrdu: "کیژول",
    icon: Coffee,
    color: "#FF7A9A",
    bg: "rgba(255,122,154,0.08)",
    border: "rgba(255,122,154,0.25)",
    gradient: "linear-gradient(135deg,#FF7A9A,#E8B84B)",
    description: "Shopping & Lunch",
  },
  {
    id: "graduation",
    label: "Graduation",
    labelUrdu: "گریجویشن",
    icon: GraduationCap,
    color: "#E8B84B",
    bg: "rgba(232,184,75,0.08)",
    border: "rgba(232,184,75,0.25)",
    gradient: "linear-gradient(135deg,#E8B84B,#7C4DFF)",
    description: "Convocation Ceremony",
  },
  {
    id: "dinner",
    label: "Dinner / Date",
    labelUrdu: "ڈنر",
    icon: UtensilsCrossed,
    color: "#E8456A",
    bg: "rgba(232,69,106,0.08)",
    border: "rgba(232,69,106,0.25)",
    gradient: "linear-gradient(135deg,#E8456A,#E8B84B)",
    description: "Fine Dining & Evenings",
  },
];

/* ── Pakistani cities ── */
const CITIES = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Gujranwala",
  "Sialkot",
  "Gujrat",
  "Hyderabad",
  "Abbottabad",
  "Bahawalpur",
  "Sargodha",
];

/* ── Style preference chips ── */
const STYLE_PREFS = [
  { id: "traditional", label: "Traditional" },
  { id: "fusion", label: "Fusion" },
  { id: "western", label: "Western" },
  { id: "modest", label: "Modest" },
  { id: "trendy", label: "Trendy" },
  { id: "minimal", label: "Minimal" },
  { id: "maximalist", label: "Maximalist" },
  { id: "classic", label: "Classic" },
];

/* ── Weather fetch via backend API ── */
function useWeather(city, enabled) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city || !enabled) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setWeather(null);

    (async () => {
      try {
        const { fetchWeather, mapWeatherForGetOutfit } = await import("../services/api.js");
        const raw = await fetchWeather(city);
        if (cancelled) return;
        if (raw) {
          setWeather(mapWeatherForGetOutfit(raw));
        } else {
          setError("Could not fetch weather");
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [city, enabled]);

  return { weather, loading, error };
}

/* ── Weather icon helper ── */
function WeatherIcon({ name, size = 20, color }) {
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

/* ═══════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════ */
export default function GetOutfitPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [gender, setGender] = useState("");
  const [eventType, setEventType] = useState(searchParams.get("event") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [cityInput, setCityInput] = useState(searchParams.get("city") || "");
  const [cityDropdown, setCityDropdown] = useState(false);
  const [stylePrefs, setStylePrefs] = useState([]);
  const [fetchWeatherEnabled, setFetchWeatherEnabled] = useState(false);
  const [animating, setAnimating] = useState(false);

  const { weather, loading: weatherLoading } = useWeather(
    city,
    fetchWeatherEnabled,
  );

  /* ── If event pre-selected from URL, skip to step 3 on gender set ── */
  const handleGenderSelect = (g) => {
    setGender(g);
    if (eventType) {
      goToStep(3);
    } else {
      goToStep(2);
    }
  };

  const goToStep = (step) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentStep(step);
      setAnimating(false);
    }, 220);
  };

  const handleEventSelect = (evId) => {
    setEventType(evId);
    goToStep(3);
  };

  const handleCitySelect = (c) => {
    setCity(c);
    setCityInput(c);
    setCityDropdown(false);
    setFetchWeatherEnabled(true);
  };

  const toggleStylePref = (id) => {
    setStylePrefs((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleSubmit = () => {
    if (!gender || !eventType || !city) return;
    const params = new URLSearchParams({
      gender,
      event: eventType,
      city,
      styles: stylePrefs.join(","),
    });
    navigate(`/results?${params.toString()}`);
  };

  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;
  const canProceedStep3 = city.trim().length >= 2;

  const filteredCities = CITIES.filter((c) =>
    c.toLowerCase().includes(cityInput.toLowerCase()),
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        paddingTop: "70px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* ── Ambient orbs ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          left: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(124,77,255,0.12) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-80px",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(232,69,106,0.09) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ════════════ PAGE HEADER ════════════ */}
      <div
        style={{
          borderBottom: "1px solid rgba(232,184,75,0.1)",
          background: "rgba(7,8,15,0.6)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="section-container" style={{maxWidth:"768px",paddingTop:"40px",paddingBottom:"40px"}}>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "24px",
            }}
          >
            <Link
              to="/"
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.78rem",
                color: "#7A6E8A",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#BFB4D4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#7A6E8A")}
            >
              Home
            </Link>
            <ChevronRight
              size={12}
              strokeWidth={2}
              style={{ color: "#4A4060" }}
            />
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.78rem",
                color: "#E8B84B",
              }}
            >
              Get Outfit
            </span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "8px" }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontStyle: "italic",
                fontSize: "0.88rem",
                letterSpacing: "0.12em",
                color: "#E8B84B",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Personalised Recommendation
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
              Find your perfect{" "}
              <span
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg,#F5D07A,#E8B84B,#E8456A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                outfit
              </span>
            </h1>
            <p
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.9375rem",
                color: "#BFB4D4",
                lineHeight: 1.65,
                maxWidth: "480px",
              }}
            >
              Three quick steps — your gender, event type, and city. We'll
              handle the weather and recommend outfits tailored for Pakistan.
            </p>
          </div>

          {/* ── Progress bar ── */}
          <div style={{ marginTop: "28px" }}>
            {/* step labels */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background:
                        s.id < currentStep
                          ? "linear-gradient(135deg,#E8B84B,#E8456A)"
                          : s.id === currentStep
                            ? "rgba(232,184,75,0.15)"
                            : "rgba(255,255,255,0.05)",
                      border: "1px solid",
                      borderColor:
                        s.id <= currentStep
                          ? "rgba(232,184,75,0.5)"
                          : "rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.4s ease",
                      boxShadow:
                        s.id === currentStep
                          ? "0 0 0 4px rgba(232,184,75,0.12)"
                          : "none",
                    }}
                  >
                    {s.id < currentStep ? (
                      <CheckCircle2
                        size={13}
                        strokeWidth={2.5}
                        style={{ color: "#07080F" }}
                      />
                    ) : (
                      <span
                        style={{
                          fontFamily: "'Inter',sans-serif",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          color: s.id === currentStep ? "#F5D07A" : "#4A4060",
                        }}
                      >
                        {s.id}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: s.id === currentStep ? 600 : 400,
                      color:
                        s.id === currentStep
                          ? "#F5D07A"
                          : s.id < currentStep
                            ? "#E8B84B"
                            : "#4A4060",
                      letterSpacing: "0.04em",
                      transition: "color 0.3s",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* track + fill */}
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ STEP CONTENT ════════════ */}
      <div
        style={{
          flex: 1,
          maxWidth: "860px",
          margin: "0 auto",
          width: "100%",
          padding: "48px 24px 80px",
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(12px)" : "translateY(0)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        {/* ════ STEP 1: Gender ════ */}
        {currentStep === 1 && (
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(1.5rem,3vw,2rem)",
                fontWeight: 700,
                color: "#F8F3E6",
                marginBottom: "8px",
                textAlign: "center",
              }}
            >
              Who are you dressing?
            </h2>
            <p
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.9rem",
                color: "#7A6E8A",
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              Select to see outfits curated for your style
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                maxWidth: "640px",
                margin: "0 auto",
              }}
              className="flex-col sm:grid"
            >
              {GENDERS.map((g) => (
                <GenderCard
                  key={g.id}
                  gender={g}
                  selected={gender === g.id}
                  onSelect={() => handleGenderSelect(g.id)}
                />
              ))}
            </div>

            {/* or use chatbot */}
            <div style={{ textAlign: "center", marginTop: "36px" }}>
              <p
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.8rem",
                  color: "#7A6E8A",
                  marginBottom: "12px",
                }}
              >
                Prefer a guided experience?
              </p>
              <Link to="/stylebuddy" style={{ textDecoration: "none" }}>
                <button className="btn-ghost" style={{ fontSize: "0.82rem" }}>
                  Chat with StyleBuddy instead
                  <ArrowRight size={13} strokeWidth={2} />
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* ════ STEP 2: Event Type ════ */}
        {currentStep === 2 && (
          <div>
            <button
              onClick={() => goToStep(1)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.82rem",
                color: "#7A6E8A",
                marginBottom: "24px",
                padding: 0,
                outline: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#BFB4D4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#7A6E8A")}
            >
              <ChevronLeft size={15} strokeWidth={2} />
              Back
            </button>

            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(1.5rem,3vw,2rem)",
                fontWeight: 700,
                color: "#F8F3E6",
                marginBottom: "8px",
                textAlign: "center",
              }}
            >
              What's the occasion?
            </h2>
            <p
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.9rem",
                color: "#7A6E8A",
                textAlign: "center",
                marginBottom: "36px",
              }}
            >
              Your event context shapes every recommendation
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
                gap: "14px",
              }}
            >
              {EVENT_TYPES.map((ev) => (
                <EventTypeCard
                  key={ev.id}
                  event={ev}
                  selected={eventType === ev.id}
                  onSelect={() => handleEventSelect(ev.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ════ STEP 3: City + Preferences ════ */}
        {currentStep === 3 && (
          <div>
            <button
              onClick={() => goToStep(2)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.82rem",
                color: "#7A6E8A",
                marginBottom: "24px",
                padding: 0,
                outline: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#BFB4D4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#7A6E8A")}
            >
              <ChevronLeft size={15} strokeWidth={2} />
              Back
            </button>

            {/* Selection summary bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                background: "rgba(232,184,75,0.06)",
                border: "1px solid rgba(232,184,75,0.15)",
                borderRadius: "12px",
                padding: "12px 18px",
                marginBottom: "36px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#7A6E8A",
                }}
              >
                Your choices:
              </span>
              {gender && (
                <span className="badge badge-rose">
                  {gender === "women" ? "Women" : "Men"}
                </span>
              )}
              {eventType && (
                <span className="badge badge-gold">
                  {EVENT_TYPES.find((e) => e.id === eventType)?.label ||
                    eventType}
                </span>
              )}
              <button
                onClick={() => goToStep(1)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.72rem",
                  color: "#7A6E8A",
                  padding: 0,
                  outline: "none",
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#BFB4D4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7A6E8A")}
              >
                <RefreshCw size={11} strokeWidth={2} />
                Change
              </button>
            </div>

            <div
              style={{
                gap: "32px",
                alignItems: "start",
              }}
              className="flex flex-col lg:grid lg:grid-cols-2"
            >
              {/* LEFT: City input */}
              <div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "clamp(1.4rem,2.5vw,1.9rem)",
                    fontWeight: 700,
                    color: "#F8F3E6",
                    marginBottom: "8px",
                  }}
                >
                  Where are you?
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.875rem",
                    color: "#7A6E8A",
                    lineHeight: 1.6,
                    marginBottom: "24px",
                  }}
                >
                  Enter your city — we'll fetch live weather to match your
                  outfit
                </p>

                {/* City input with dropdown */}
                <div style={{ position: "relative", marginBottom: "24px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid",
                      borderColor: cityDropdown
                        ? "rgba(232,184,75,0.45)"
                        : "rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      padding: "12px 16px",
                      transition: "border-color 0.25s, box-shadow 0.25s",
                      boxShadow: cityDropdown
                        ? "0 0 0 3px rgba(232,184,75,0.1)"
                        : "none",
                    }}
                  >
                    <MapPin
                      size={16}
                      strokeWidth={1.8}
                      style={{ color: "#E8B84B", flexShrink: 0 }}
                    />
                    <input
                      type="text"
                      value={cityInput}
                      onChange={(e) => {
                        setCityInput(e.target.value);
                        setCityDropdown(e.target.value.length > 0);
                        if (e.target.value !== city) {
                          setCity("");
                          setFetchWeatherEnabled(false);
                        }
                      }}
                      onFocus={() =>
                        setCityDropdown(cityInput.length > 0 || true)
                      }
                      onBlur={() =>
                        setTimeout(() => setCityDropdown(false), 200)
                      }
                      placeholder="e.g. Lahore, Karachi, Islamabad..."
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#F8F3E6",
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.9375rem",
                      }}
                    />
                    {city && (
                      <CheckCircle2
                        size={16}
                        strokeWidth={2.5}
                        style={{ color: "#00D4B4", flexShrink: 0 }}
                      />
                    )}
                  </div>

                  {/* Dropdown */}
                  {cityDropdown && filteredCities.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 6px)",
                        left: 0,
                        right: 0,
                        background: "rgba(13,15,30,0.98)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(232,184,75,0.18)",
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                        zIndex: 20,
                      }}
                    >
                      {filteredCities.slice(0, 8).map((c) => (
                        <button
                          key={c}
                          onMouseDown={() => handleCitySelect(c)}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "11px 16px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            textAlign: "left",
                            outline: "none",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(232,184,75,0.07)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <MapPin
                            size={13}
                            strokeWidth={2}
                            style={{ color: "#E8B84B", flexShrink: 0 }}
                          />
                          <span
                            style={{
                              fontFamily: "'Inter',sans-serif",
                              fontSize: "0.875rem",
                              color: "inherit",
                            }}
                          >
                            {c}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={!canProceedStep3}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "24px",
                    fontSize: "0.9375rem",
                    padding: "14px",
                    opacity: canProceedStep3 ? 1 : 0.45,
                    cursor: canProceedStep3 ? "pointer" : "not-allowed",
                  }}
                >
                  <Compass size={16} strokeWidth={2.2} />
                  Get My Outfit Recommendations
                </button>
                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.72rem",
                    color: "#7A6E8A",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  No sign-up required
                </p>
              </div>

              {/* ── RIGHT: Weather Preview + Style Preferences ── */}
              <div>
                {/* Weather Preview */}
                <div style={{ marginBottom: "28px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "rgba(232,184,75,0.1)",
                        border: "1px solid rgba(232,184,75,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Thermometer
                        size={13}
                        strokeWidth={2}
                        style={{ color: "#E8B84B" }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#7A6E8A",
                      }}
                    >
                      Live Weather
                    </span>
                  </div>

                  {/* Loading skeleton */}
                  {weatherLoading && (
                    <div
                      style={{
                        borderRadius: "14px",
                        border: "1px solid rgba(232,184,75,0.12)",
                        background: "rgba(255,255,255,0.03)",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {[55, 35, 75].map((w, i) => (
                        <div
                          key={i}
                          className="shimmer-skeleton"
                          style={{
                            height: i === 0 ? "32px" : "14px",
                            borderRadius: "8px",
                            maxWidth: `${w}%`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Live weather card */}
                  {!weatherLoading && weather && (
                    <div
                      style={{
                        borderRadius: "14px",
                        border: `1px solid ${weather.condColor}28`,
                        background: `linear-gradient(135deg, ${weather.condColor}0a 0%, rgba(13,15,30,0.7) 100%)`,
                        padding: "18px 20px",
                        backdropFilter: "blur(16px)",
                      }}
                    >
                      {/* Top row: temp + icon */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          marginBottom: "14px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontFamily: "'Playfair Display',serif",
                              fontSize: "2.6rem",
                              fontWeight: 700,
                              color: "#F8F3E6",
                              lineHeight: 1,
                              marginBottom: "4px",
                            }}
                          >
                            {weather.temp}°C
                          </div>
                          <div
                            style={{
                              fontFamily: "'Inter',sans-serif",
                              fontSize: "0.8125rem",
                              color: weather.condColor,
                              fontWeight: 500,
                            }}
                          >
                            {weather.condition}
                          </div>
                          <div
                            style={{
                              fontFamily: "'Inter',sans-serif",
                              fontSize: "0.72rem",
                              color: "#5A4E6A",
                              marginTop: "3px",
                            }}
                          >
                            {weather.city}
                          </div>
                        </div>
                        <WeatherIcon
                          name={weather.condIcon}
                          size={44}
                          color={weather.condColor}
                        />
                      </div>

                      {/* Stats row */}
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          paddingTop: "12px",
                          borderTop: "1px solid rgba(255,255,255,0.05)",
                          marginBottom: "14px",
                        }}
                      >
                        {[
                          {
                            icon: <Droplets size={11} strokeWidth={2} />,
                            val: `${weather.humidity}%`,
                            label: "Humidity",
                          },
                          {
                            icon: <Wind size={11} strokeWidth={2} />,
                            val: `${weather.wind} km/h`,
                            label: "Wind",
                          },
                          {
                            icon: <Thermometer size={11} strokeWidth={2} />,
                            val: `${weather.feelsLike}°C`,
                            label: "Feels Like",
                          },
                        ].map(({ icon, val, label }) => (
                          <div key={label} style={{ flex: 1 }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                marginBottom: "2px",
                                color: "#7A6E8A",
                              }}
                            >
                              {icon}
                              <span
                                style={{
                                  fontFamily: "'Inter',sans-serif",
                                  fontSize: "0.78rem",
                                  fontWeight: 600,
                                  color: "#BFB4D4",
                                }}
                              >
                                {val}
                              </span>
                            </div>
                            <div
                              style={{
                                fontFamily: "'Inter',sans-serif",
                                fontSize: "0.62rem",
                                color: "#5A4E6A",
                                letterSpacing: "0.04em",
                              }}
                            >
                              {label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Fabric tip */}
                      <div
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          borderRadius: "8px",
                          padding: "10px 12px",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                        }}
                      >
                        <Sun
                          size={13}
                          strokeWidth={2}
                          style={{
                            color: "#E8B84B",
                            flexShrink: 0,
                            marginTop: "1px",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'Inter',sans-serif",
                            fontSize: "0.74rem",
                            color: "#BFB4D4",
                            lineHeight: 1.55,
                          }}
                        >
                          {weather.isHot
                            ? "Opt for breathable fabrics like lawn or cotton to stay cool."
                            : weather.isCold
                              ? "Layer with a shawl or waistcoat — warmth meets elegance."
                              : weather.isRainy
                                ? "Choose shorter kameez hems to stay dry. Avoid heavy embroidery."
                                : "Pleasant conditions — you have full outfit flexibility today."}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Placeholder when no city yet */}
                  {!weatherLoading && !weather && (
                    <div
                      style={{
                        borderRadius: "14px",
                        border: "1px solid rgba(255,255,255,0.06)",
                        background: "rgba(255,255,255,0.02)",
                        padding: "28px 20px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "46px",
                          height: "46px",
                          borderRadius: "12px",
                          background: "rgba(232,184,75,0.07)",
                          border: "1px solid rgba(232,184,75,0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 12px",
                        }}
                      >
                        <CloudSun
                          size={22}
                          strokeWidth={1.6}
                          style={{ color: "#E8B84B" }}
                        />
                      </div>
                      <p
                        style={{
                          fontFamily: "'Inter',sans-serif",
                          fontSize: "0.8rem",
                          color: "#5A4E6A",
                          lineHeight: 1.6,
                        }}
                      >
                        Enter your city above — we'll show live weather to
                        perfectly match your outfit.
                      </p>
                    </div>
                  )}
                </div>

                {/* ── Style Preferences ── */}
                <div
                  style={{
                    borderRadius: "14px",
                    border: "1px solid rgba(124,77,255,0.15)",
                    background: "rgba(124,77,255,0.04)",
                    padding: "18px 20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "rgba(124,77,255,0.12)",
                        border: "1px solid rgba(124,77,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Star
                        size={13}
                        strokeWidth={2}
                        style={{ color: "#A47BFF" }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#7A6E8A",
                      }}
                    >
                      Style Preferences
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.64rem",
                        color: "#5A4E6A",
                        marginLeft: "auto",
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: "100px",
                        padding: "2px 8px",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      Optional
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.775rem",
                      color: "#5A4E6A",
                      marginBottom: "14px",
                      lineHeight: 1.55,
                    }}
                  >
                    Select styles that match your taste — we'll prioritize these
                    in your results.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "7px",
                      marginBottom: "12px",
                    }}
                  >
                    {STYLE_PREFS.map(({ id, label }) => (
                      <button
                        key={id}
                        onClick={() => toggleStylePref(id)}
                        className={`filter-pill${stylePrefs.includes(id) ? " active" : ""}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        {stylePrefs.includes(id) && (
                          <CheckCircle2
                            size={11}
                            strokeWidth={2.5}
                            style={{ flexShrink: 0 }}
                          />
                        )}
                        {label}
                      </button>
                    ))}
                  </div>
                  {stylePrefs.length > 0 ? (
                    <p
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.72rem",
                        color: "#A47BFF",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <CheckCircle2 size={12} strokeWidth={2.5} />
                      {stylePrefs.length} style
                      {stylePrefs.length > 1 ? "s" : ""} selected · results will
                      be tailored
                    </p>
                  ) : (
                    <p
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.72rem",
                        color: "#5A4E6A",
                      }}
                    >
                      No preference? We'll show you everything.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function GenderCard({ gender, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="gender-card"
      style={{ borderColor: selected ? gender.border : "transparent" }}
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{ height: "280px", overflow: "hidden", position: "relative" }}
      >
        <img
          src={gender.image}
          alt={gender.label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            filter: "brightness(0.65)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(7,8,15,0.92) 0%, transparent 70%)",
          }}
        />
        {selected && (
          <div
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#E8B84B,#E8456A)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircle2
              size={13}
              strokeWidth={2.5}
              style={{ color: "#07080F" }}
            />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: gender.gradient,
            opacity: selected ? 1 : 0.4,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px 18px",
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#F8F3E6",
              marginBottom: "5px",
            }}
          >
            {gender.label}
          </h3>
          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.78rem",
              color: "#BFB4D4",
              lineHeight: 1.5,
            }}
          >
            {gender.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function EventTypeCard({ event, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="event-type-card"
      style={{
        borderColor: selected ? event.color + "80" : undefined,
        background: selected ? event.bg : undefined,
        transform: selected || hovered ? "translateY(-3px)" : "translateY(0)",
        position: "relative",
      }}
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: selected ? event.gradient : event.color + "18",
          border: `1px solid ${event.color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 12px",
          transition: "all 0.3s ease",
        }}
      >
        <event.icon
          size={20}
          strokeWidth={1.8}
          style={{ color: selected ? "#07080F" : event.color }}
        />
      </div>
      {selected && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#E8B84B,#E8456A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircle2
            size={11}
            strokeWidth={2.5}
            style={{ color: "#07080F" }}
          />
        </div>
      )}
      <p
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "0.9rem",
          fontWeight: 700,
          color: "#F8F3E6",
          marginBottom: "4px",
          lineHeight: 1.2,
        }}
      >
        {event.label}
      </p>
      <p
        style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: "0.7rem",
          color: "#7A6E8A",
          lineHeight: 1.4,
        }}
      >
        {event.description}
      </p>
    </div>
  );
}
