import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Sun,
  Cloud,
  CloudRain,
  CloudSun,
  Snowflake,
  CloudFog,
  ChevronRight,
  ArrowLeft,
  SlidersHorizontal,
  Heart,
  BookmarkPlus,
  Share2,
  Star,
  CheckCircle2,
  Tag,
  Shirt,
  Lightbulb,
  MessageCircle,
  RefreshCw,
  TrendingUp,
  X,
  Filter,
} from "lucide-react";
import { WOMEN_OUTFITS, MEN_OUTFITS, EVENT_TYPES } from "../data/outfits";
import { fetchWeather, fetchOutfitRecommendations, mapWeatherForResults } from "../services/api";

/* ── Weather icon helper ── */
function WeatherIcon({ id, size = 28, color = "#F5D07A" }) {
  const props = { size, strokeWidth: 1.6, style: { color } };
  switch (id) {
    case "sunny":
      return <Sun {...props} />;
    case "partly_cloudy":
      return <CloudSun {...props} />;
    case "cloudy":
      return <Cloud {...props} />;
    case "rainy":
      return <CloudRain {...props} />;
    case "drizzle":
      return <CloudRain {...props} />;
    case "stormy":
      return <CloudRain {...props} />;
    case "foggy":
      return <CloudFog {...props} />;
    case "cold":
      return <Snowflake {...props} />;
    case "hot":
      return <Thermometer {...props} />;
    default:
      return <CloudSun {...props} />;
  }
}

/* ── Formality levels for filter ── */
const FORMALITY_FILTERS = [
  { id: "all", label: "All" },
  { id: "ultra-formal", label: "Ultra Formal" },
  { id: "formal", label: "Formal" },
  { id: "semi-formal", label: "Semi-Formal" },
  { id: "casual", label: "Casual" },
];

const STYLE_FILTERS = [
  { id: "all", label: "All Styles" },
  { id: "traditional", label: "Traditional" },
  { id: "semi-traditional", label: "Semi-Traditional" },
  { id: "fusion", label: "Fusion" },
  { id: "western-formal", label: "Western" },
  { id: "smart-casual", label: "Smart Casual" },
  { id: "festive", label: "Festive" },
  { id: "casual", label: "Casual" },
];

/* ─────────────────────────────────────────────
   MAIN RESULTS PAGE
───────────────────────────────────────────── */
export default function ResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const gender = searchParams.get("gender") || "women";
  const eventId = searchParams.get("event") || "wedding";
  const city = searchParams.get("city") || "Lahore";

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [formalityFilter, setFormalityFilter] = useState("all");
  const [styleFilter, setStyleFilter] = useState("all");
  const [likedIds, setLikedIds] = useState(new Set());
  const [savedIds, setSavedIds] = useState(new Set());
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [backendOutfits, setBackendOutfits] = useState(null);

  /* ── Fetch weather from backend ── */
  useEffect(() => {
    let cancelled = false;
    setWeatherLoading(true);

    (async () => {
      try {
        const raw = await fetchWeather(city);
        if (cancelled) return;
        if (raw) {
          setWeather(mapWeatherForResults(raw));
        }
      } catch { /* fallback: weather stays null */ }
      if (!cancelled) setWeatherLoading(false);
    })();

    return () => { cancelled = true; };
  }, [city]);

  /* ── Fetch outfits from backend ── */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const styles = new URLSearchParams(window.location.search).get("styles") || "";
        const outfits = await fetchOutfitRecommendations({
          gender, event: eventId, city,
          weatherMood: weather?.outfitMood || "",
          styles,
        });
        if (!cancelled && outfits.length > 0) setBackendOutfits(outfits);
      } catch { /* fallback to local data */ }
    })();

    return () => { cancelled = true; };
  }, [gender, eventId, city, weather]);

  /* ── Use backend outfits if available, else fall back to local data ── */
  const localOutfits = gender === "men" ? MEN_OUTFITS : WOMEN_OUTFITS;
  const sourceOutfits = backendOutfits || localOutfits;

  const filtered = sourceOutfits.filter((o) => {
    if (o.event !== eventId) return false;
    if (formalityFilter !== "all" && o.formality !== formalityFilter)
      return false;
    if (styleFilter !== "all" && o.style !== styleFilter) return false;
    return true;
  });

  const displayed =
    filtered.length > 0
      ? filtered
      : backendOutfits
        ? backendOutfits
        : localOutfits.filter((o) => o.gender === gender).slice(0, 4);

  const eventInfo = EVENT_TYPES.find((e) => e.id === eventId);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const toggleSave = (id, e) => {
    e.stopPropagation();
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
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
          right: "-100px",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(232,184,75,0.07) 0%,transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: "10%",
          left: "-80px",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(124,77,255,0.07) 0%,transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ════════════ TOP BAR ════════════ */}
        <div
          style={{
            background: "rgba(7,8,15,0.7)",
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(232,184,75,0.1)",
          }}
        >
          <div className="section-container" style={{paddingTop:"20px",paddingBottom:"20px"}}>
            {/* breadcrumb */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "16px",
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
              <Link
                to="/get-outfit"
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.76rem",
                  color: "#7A6E8A",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#BFB4D4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7A6E8A")}
              >
                Get Outfit
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
                Results
              </span>
            </div>

            {/* title row */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontStyle: "italic",
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    color: "#E8B84B",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  Outfit Recommendations
                </p>
                <h1
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "clamp(1.5rem,3vw,2.2rem)",
                    fontWeight: 800,
                    color: "#F8F3E6",
                    lineHeight: 1.1,
                  }}
                >
                  {eventInfo?.label || eventId} —{" "}
                  <span
                    style={{
                      fontStyle: "italic",
                      background: "linear-gradient(135deg,#F5D07A,#E8456A)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {city}
                  </span>
                </h1>
                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.84rem",
                    color: "#7A6E8A",
                    marginTop: "6px",
                  }}
                >
                  Showing{" "}
                  <strong style={{ color: "#BFB4D4" }}>
                    {displayed.length}
                  </strong>{" "}
                  outfit
                  {displayed.length !== 1 ? "s" : ""} for{" "}
                  <strong style={{ color: "#BFB4D4" }}>{gender}</strong> ·{" "}
                  weather-matched for{" "}
                  <strong style={{ color: "#BFB4D4" }}>{city}</strong>
                </p>
              </div>

              {/* action buttons */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={() => navigate("/get-outfit")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "9px 18px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    color: "#BFB4D4",
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    outline: "none",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "#F8F3E6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "#BFB4D4";
                  }}
                >
                  <ArrowLeft size={14} strokeWidth={2} />
                  New Search
                </button>

                <Link to="/stylebuddy" style={{ textDecoration: "none" }}>
                  <button
                    className="btn-violet"
                    style={{ fontSize: "0.8rem", padding: "9px 18px" }}
                  >
                    <MessageCircle size={13} strokeWidth={2} />
                    Ask StyleBuddy
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="section-container" style={{paddingTop:"32px",paddingBottom:"32px"}}>
          <div
            style={{
              gap: "32px",
            }}
            className="flex flex-col lg:grid lg:grid-cols-[300px_1fr]"
          >
            {/* ════════════ LEFT SIDEBAR ════════════ */}
            <aside>
              {/* ── Weather Widget ── */}
              <div
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(0,212,180,0.2)",
                  marginBottom: "20px",
                  position: "relative",
                }}
              >
                {/* top gradient bar */}
                <div
                  style={{
                    height: "3px",
                    background: "linear-gradient(90deg,#00D4B4,#7C4DFF)",
                  }}
                />

                <div
                  style={{
                    background:
                      "linear-gradient(135deg,rgba(0,212,180,0.07),rgba(124,77,255,0.05))",
                    backdropFilter: "blur(16px)",
                    padding: "20px",
                  }}
                >
                  {/* header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "'Inter',sans-serif",
                          fontSize: "0.67rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#4DEFE0",
                          marginBottom: "3px",
                        }}
                      >
                        Live Weather
                      </p>
                      <p
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: "#F8F3E6",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <MapPin
                          size={13}
                          strokeWidth={2}
                          style={{ color: "#E8B84B" }}
                        />
                        {city}
                      </p>
                    </div>
                    {!weatherLoading && weather && (
                      <div
                        style={{
                          width: "52px",
                          height: "52px",
                          borderRadius: "14px",
                          background: `${weather.condition.iconColor}15`,
                          border: `1px solid ${weather.condition.iconColor}30`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <WeatherIcon
                          id={weather.condition.id}
                          size={24}
                          color={weather.condition.iconColor}
                        />
                      </div>
                    )}
                  </div>

                  {weatherLoading ? (
                    <WeatherSkeleton />
                  ) : weather ? (
                    <>
                      {/* main temp */}
                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-end",
                            gap: "8px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Playfair Display',serif",
                              fontSize: "3rem",
                              fontWeight: 800,
                              color: "#F8F3E6",
                              lineHeight: 1,
                            }}
                          >
                            {weather.temperature.current}°
                          </span>
                          <div style={{ paddingBottom: "6px" }}>
                            <span
                              style={{
                                fontFamily: "'Inter',sans-serif",
                                fontSize: "0.78rem",
                                color: weather.condition.iconColor,
                                fontWeight: 600,
                                display: "block",
                                marginBottom: "2px",
                              }}
                            >
                              {weather.condition.label}
                            </span>
                            <span
                              style={{
                                fontFamily: "'Inter',sans-serif",
                                fontSize: "0.7rem",
                                color: "#7A6E8A",
                              }}
                            >
                              Feels like {weather.temperature.feelsLike}°C
                            </span>
                          </div>
                        </div>

                        {/* hi/lo */}
                        <div
                          style={{
                            display: "flex",
                            gap: "12px",
                            marginTop: "8px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Inter',sans-serif",
                              fontSize: "0.75rem",
                              color: "#FF7A9A",
                            }}
                          >
                            ↑ {weather.temperature.high}°
                          </span>
                          <span
                            style={{
                              fontFamily: "'Inter',sans-serif",
                              fontSize: "0.75rem",
                              color: "#4DEFE0",
                            }}
                          >
                            ↓ {weather.temperature.low}°
                          </span>
                          <span
                            style={{
                              fontFamily: "'Cormorant Garamond',serif",
                              fontStyle: "italic",
                              fontSize: "0.75rem",
                              color: "#E8B84B",
                            }}
                          >
                            {weather.seasonLabel?.en} · {city}
                          </span>
                        </div>
                      </div>

                      {/* metrics grid */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          gap: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        {[
                          {
                            icon: Droplets,
                            label: "Humidity",
                            value: `${weather.humidity}%`,
                            color: "#4DEFE0",
                          },
                          {
                            icon: Wind,
                            label: "Wind",
                            value: `${weather.windSpeed} km/h`,
                            color: "#A47BFF",
                          },
                          {
                            icon: Eye,
                            label: "Visibility",
                            value: `${weather.visibility} km`,
                            color: "#E8B84B",
                          },
                          // eslint-disable-next-line no-unused-vars
                        ].map(({ icon: Icon, label, value, color }) => (
                          <div
                            key={label}
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.06)",
                              borderRadius: "10px",
                              padding: "10px 8px",
                              textAlign: "center",
                            }}
                          >
                            <Icon
                              size={14}
                              strokeWidth={1.8}
                              style={{ color, marginBottom: "4px" }}
                            />
                            <div
                              style={{
                                fontFamily: "'Inter',sans-serif",
                                fontSize: "0.72rem",
                                fontWeight: 600,
                                color: "#F8F3E6",
                                marginBottom: "2px",
                              }}
                            >
                              {value}
                            </div>
                            <div
                              style={{
                                fontFamily: "'Inter',sans-serif",
                                fontSize: "0.62rem",
                                color: "#7A6E8A",
                                letterSpacing: "0.04em",
                              }}
                            >
                              {label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Temp category badge */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "7px",
                          background: `${weather.tempCategory.color}18`,
                          border: `1px solid ${weather.tempCategory.color}35`,
                          borderRadius: "8px",
                          padding: "7px 12px",
                          marginBottom: "14px",
                          width: "100%",
                        }}
                      >
                        <Thermometer
                          size={13}
                          strokeWidth={2}
                          style={{
                            color: weather.tempCategory.color,
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <span
                            style={{
                              fontFamily: "'Inter',sans-serif",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              color: weather.tempCategory.color,
                              display: "block",
                            }}
                          >
                            {weather.tempCategory.label} Weather
                          </span>
                          <span
                            style={{
                              fontFamily: "'Inter',sans-serif",
                              fontSize: "0.68rem",
                              color: "#7A6E8A",
                            }}
                          >
                            {weather.tempCategory.tip}
                          </span>
                        </div>
                      </div>

                      {/* Clothing alerts */}
                      {weather.clothingAlert?.length > 0 && (
                        <div>
                          {weather.clothingAlert.slice(0, 2).map((alert, i) => (
                            <div
                              key={i}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                marginBottom: "7px",
                              }}
                            >
                              <Lightbulb
                                size={12}
                                strokeWidth={2.5}
                                style={{
                                  color: "#E8B84B",
                                  flexShrink: 0,
                                  marginTop: "2px",
                                }}
                              />
                              <p
                                style={{
                                  fontFamily: "'Inter',sans-serif",
                                  fontSize: "0.73rem",
                                  color: "#BFB4D4",
                                  lineHeight: 1.5,
                                }}
                              >
                                {alert}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <p
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.83rem",
                        color: "#7A6E8A",
                        textAlign: "center",
                        padding: "16px 0",
                      }}
                    >
                      Could not load weather data.
                    </p>
                  )}
                </div>
              </div>

              {/* ── Your Selection Card ── */}
              <div
                style={{
                  borderRadius: "16px",
                  border: "1px solid rgba(232,184,75,0.15)",
                  background: "rgba(232,184,75,0.04)",
                  padding: "18px",
                  marginBottom: "20px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#E8B84B",
                    marginBottom: "14px",
                  }}
                >
                  Your Selection
                </p>
                {[
                  {
                    label: "Gender",
                    value: gender === "men" ? "Men" : "Women",
                  },
                  { label: "Event", value: eventInfo?.label || eventId },
                  { label: "City", value: city },
                  { label: "Outfits", value: `${displayed.length} found` },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: "9px",
                      marginBottom: "9px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.76rem",
                        color: "#7A6E8A",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.76rem",
                        fontWeight: 600,
                        color: "#BFB4D4",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}

                <Link to="/get-outfit" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "7px",
                      padding: "9px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "8px",
                      color: "#BFB4D4",
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.78rem",
                      cursor: "pointer",
                      outline: "none",
                      transition: "all 0.25s",
                      marginTop: "4px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(232,184,75,0.08)";
                      e.currentTarget.style.color = "#F5D07A";
                      e.currentTarget.style.borderColor =
                        "rgba(232,184,75,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.04)";
                      e.currentTarget.style.color = "#BFB4D4";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.08)";
                    }}
                  >
                    <RefreshCw size={12} strokeWidth={2} />
                    Start Over
                  </button>
                </Link>
              </div>

              {/* ── Filters Panel ── */}
              <div
                style={{
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.025)",
                  padding: "18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "18px",
                  }}
                >
                  <SlidersHorizontal
                    size={14}
                    strokeWidth={2}
                    style={{ color: "#E8B84B" }}
                  />
                  <p
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#E8B84B",
                    }}
                  >
                    Filter Results
                  </p>
                </div>

                {/* Formality filter */}
                <div style={{ marginBottom: "20px" }}>
                  <p
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "#BFB4D4",
                      marginBottom: "10px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Formality Level
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {FORMALITY_FILTERS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFormalityFilter(f.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          background:
                            formalityFilter === f.id
                              ? "rgba(232,184,75,0.1)"
                              : "transparent",
                          border: "1px solid",
                          borderColor:
                            formalityFilter === f.id
                              ? "rgba(232,184,75,0.3)"
                              : "transparent",
                          color:
                            formalityFilter === f.id ? "#F5D07A" : "#7A6E8A",
                          fontFamily: "'Inter',sans-serif",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          outline: "none",
                          textAlign: "left",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          if (formalityFilter !== f.id) {
                            e.currentTarget.style.background =
                              "rgba(255,255,255,0.04)";
                            e.currentTarget.style.color = "#BFB4D4";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formalityFilter !== f.id) {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#7A6E8A";
                          }
                        }}
                      >
                        <div
                          style={{
                            width: "14px",
                            height: "14px",
                            borderRadius: "50%",
                            border: "1.5px solid",
                            borderColor:
                              formalityFilter === f.id ? "#E8B84B" : "#4A4060",
                            background:
                              formalityFilter === f.id
                                ? "#E8B84B"
                                : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 0.2s",
                          }}
                        >
                          {formalityFilter === f.id && (
                            <div
                              style={{
                                width: "5px",
                                height: "5px",
                                borderRadius: "50%",
                                background: "#07080F",
                              }}
                            />
                          )}
                        </div>
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style filter */}
                <div>
                  <p
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "#BFB4D4",
                      marginBottom: "10px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Style Preference
                  </p>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                  >
                    {STYLE_FILTERS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setStyleFilter(f.id)}
                        className={`filter-pill ${styleFilter === f.id ? "active" : ""}`}
                        style={{ fontSize: "0.72rem", padding: "5px 12px" }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* ════════════ RIGHT: OUTFIT GRID ════════════ */}
            <div>
              {/* Result count bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.83rem",
                    color: "#7A6E8A",
                  }}
                >
                  Showing{" "}
                  <strong style={{ color: "#BFB4D4" }}>
                    {displayed.length}
                  </strong>{" "}
                  outfit
                  {displayed.length !== 1 ? "s" : ""}
                  {filtered.length !== displayed.length && (
                    <span style={{ color: "#E8B84B" }}>
                      {" "}
                      · best match shown
                    </span>
                  )}
                </p>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <TrendingUp
                    size={13}
                    strokeWidth={2}
                    style={{ color: "#E8B84B" }}
                  />
                  <span
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.75rem",
                      color: "#7A6E8A",
                    }}
                  >
                    Sorted by relevance
                  </span>
                </div>
              </div>

              {/* Outfit cards */}
              {displayed.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 24px" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 18px",
                    }}
                  >
                    <Filter
                      size={22}
                      strokeWidth={1.5}
                      style={{ color: "#4A4060" }}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#F8F3E6",
                      marginBottom: "8px",
                    }}
                  >
                    No outfits match your filters
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.875rem",
                      color: "#7A6E8A",
                      marginBottom: "20px",
                    }}
                  >
                    Try adjusting the formality or style filter
                  </p>
                  <button
                    onClick={() => {
                      setFormalityFilter("all");
                      setStyleFilter("all");
                    }}
                    className="btn-secondary"
                    style={{ fontSize: "0.82rem" }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {displayed.map((outfit) => (
                    <OutfitCard
                      key={outfit.id}
                      outfit={outfit}
                      onClick={() => setSelectedOutfit(outfit)}
                      liked={likedIds.has(outfit.id)}
                      saved={savedIds.has(outfit.id)}
                      onLike={(e) => toggleLike(outfit.id, e)}
                      onSave={(e) => toggleSave(outfit.id, e)}
                      weather={weather}
                    />
                  ))}
                </div>
              )}

              {/* ── StyleBuddy CTA strip ── */}
              {displayed.length > 0 && (
                <div
                  style={{
                    marginTop: "48px",
                    borderRadius: "20px",
                    border: "1px solid rgba(164,123,255,0.2)",
                    background:
                      "linear-gradient(135deg,rgba(124,77,255,0.06),rgba(232,69,106,0.04))",
                    padding: "32px 28px",
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <p
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#A47BFF",
                        marginBottom: "6px",
                      }}
                    >
                      Need more guidance?
                    </p>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "#F8F3E6",
                        marginBottom: "6px",
                      }}
                    >
                      Chat with StyleBuddy
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.8rem",
                        color: "#7A6E8A",
                        lineHeight: 1.5,
                      }}
                    >
                      Describe your event in detail and get a conversational
                      outfit recommendation.
                    </p>
                  </div>
                  <Link
                    to={`/stylebuddy?q=${encodeURIComponent(`${eventInfo?.label || eventId} outfit for ${gender} in ${city}`)}`}
                    style={{ textDecoration: "none" }}
                  >
                    <button
                      className="btn-violet"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <MessageCircle size={14} strokeWidth={2} />
                      Open StyleBuddy
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ DETAIL MODAL ════════════ */}
      {selectedOutfit && (
        <OutfitDetailModal
          outfit={selectedOutfit}
          onClose={() => setSelectedOutfit(null)}
          liked={likedIds.has(selectedOutfit.id)}
          saved={savedIds.has(selectedOutfit.id)}
          onLike={(e) => toggleLike(selectedOutfit.id, e)}
          onSave={(e) => toggleSave(selectedOutfit.id, e)}
        />
      )}
    </main>
  );
}

/* ─────────────────────────────────────────────
   WEATHER SKELETON
───────────────────────────────────────────── */
function WeatherSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {[120, 80, 90, 60].map((w, i) => (
        <div
          key={i}
          className="shimmer-skeleton"
          style={{
            height: i === 0 ? "48px" : "14px",
            width: `${w}%`,
            borderRadius: "8px",
            maxWidth: "100%",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   OUTFIT CARD
───────────────────────────────────────────── */
function OutfitCard({
  outfit,
  onClick,
  liked,
  saved,
  onLike,
  onSave,
  weather,
}) {
  const [hovered, setHovered] = useState(false);

  const accentColor =
    outfit.badgeType === "gold"
      ? "#E8B84B"
      : outfit.badgeType === "rose"
        ? "#E8456A"
        : outfit.badgeType === "violet"
          ? "#7C4DFF"
          : outfit.badgeType === "teal"
            ? "#00D4B4"
            : "#E8B84B";

  const accentBorder = accentColor + "40";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "18px",
        overflow: "hidden",
        border: `1px solid ${hovered ? accentBorder : "rgba(255,255,255,0.07)"}`,
        background: hovered ? `${accentColor}08` : "rgba(255,255,255,0.03)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.4)` : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          height: "200px",
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
            filter: "brightness(0.78)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(7,8,15,0.88) 0%, transparent 55%)",
          }}
        />

        {/* Badge + actions */}
        <div
          style={{
            position: "absolute",
            top: "11px",
            left: "11px",
            right: "11px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: accentColor,
              background: `${accentColor}18`,
              border: `1px solid ${accentBorder}`,
              borderRadius: "6px",
              padding: "3px 8px",
              backdropFilter: "blur(10px)",
            }}
          >
            {outfit.badge}
          </span>
          <div style={{ display: "flex", gap: "5px" }}>
            <button
              onClick={onLike}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: liked
                  ? "rgba(232,69,106,0.25)"
                  : "rgba(7,8,15,0.65)",
                border: `1px solid ${liked ? "rgba(232,69,106,0.5)" : "rgba(255,255,255,0.15)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                outline: "none",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              <Heart
                size={11}
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
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: saved
                  ? "rgba(232,184,75,0.2)"
                  : "rgba(7,8,15,0.65)",
                border: `1px solid ${saved ? "rgba(232,184,75,0.4)" : "rgba(255,255,255,0.15)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                outline: "none",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              <BookmarkPlus
                size={11}
                strokeWidth={2}
                style={{ color: saved ? "#E8B84B" : "#BFB4D4" }}
              />
            </button>
          </div>
        </div>

        {/* Trending pill */}
        {outfit.trending && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "rgba(232,184,75,0.15)",
              border: "1px solid rgba(232,184,75,0.3)",
              borderRadius: "100px",
              padding: "2px 8px",
              backdropFilter: "blur(8px)",
            }}
          >
            <TrendingUp
              size={8}
              strokeWidth={2.5}
              style={{ color: "#E8B84B" }}
            />
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.58rem",
                fontWeight: 700,
                color: "#F5D07A",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Trending
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div
        style={{
          padding: "14px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Style tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "7px",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.62rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: accentColor,
            }}
          >
            {outfit.style?.replace(/-/g, " ")}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={9}
                strokeWidth={s <= Math.floor(outfit.rating) ? 0 : 1.5}
                style={{
                  color: s <= Math.round(outfit.rating) ? "#E8B84B" : "#2A2240",
                  fill: s <= Math.floor(outfit.rating) ? "#E8B84B" : "none",
                }}
              />
            ))}
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.62rem",
                color: "#7A6E8A",
                marginLeft: "3px",
              }}
            >
              {outfit.rating}
            </span>
          </div>
        </div>

        <h3
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "#F8F3E6",
            lineHeight: 1.25,
            marginBottom: "5px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {outfit.name}
        </h3>

        <p
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "0.7rem",
            color: "#7A6E8A",
            marginBottom: "10px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {outfit.fabric}
        </p>

        {/* Weather tip if available */}
        {weather && outfit.weatherTip && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "6px",
              marginBottom: "10px",
            }}
          >
            <Lightbulb
              size={11}
              strokeWidth={2.2}
              style={{ color: "#E8B84B", flexShrink: 0, marginTop: "1px" }}
            />
            <p
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.68rem",
                color: "#BFB4D4",
                lineHeight: 1.45,
              }}
            >
              {outfit.weatherTip}
            </p>
          </div>
        )}

        {/* Price */}
        <div
          style={{
            marginTop: "auto",
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
              fontSize: "0.72rem",
              fontWeight: 700,
              color: accentColor,
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
              padding: "3px 8px",
            }}
          >
            <Eye size={10} strokeWidth={2} style={{ color: "#BFB4D4" }} />
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.62rem",
                color: "#BFB4D4",
              }}
            >
              Details
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   OUTFIT DETAIL MODAL
───────────────────────────────────────────── */
function OutfitDetailModal({ outfit, onClose, liked, saved, onLike, onSave }) {
  if (!outfit) return null;

  const accentColor =
    outfit.badgeType === "gold"
      ? "#E8B84B"
      : outfit.badgeType === "rose"
        ? "#E8456A"
        : outfit.badgeType === "violet"
          ? "#7C4DFF"
          : outfit.badgeType === "teal"
            ? "#00D4B4"
            : "#E8B84B";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(13,15,30,0.98)",
          border: `1px solid ${accentColor}30`,
          borderRadius: "24px",
          overflow: "hidden",
          maxWidth: "800px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: `0 40px 100px rgba(0,0,0,0.65)`,
        }}
      >
        {/* Accent top bar */}
        <div
          style={{
            height: "3px",
            background: `linear-gradient(90deg,${accentColor},transparent)`,
          }}
        />

        <div
          className="flex flex-col md:grid md:grid-cols-2"
        >
          {/* Image side */}
          <div style={{ position: "relative", minHeight: "340px" }}>
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
                  "linear-gradient(135deg,rgba(7,8,15,0.25) 0%,transparent 60%)",
              }}
            />
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
              <X size={14} strokeWidth={2.5} style={{ color: "#BFB4D4" }} />
            </button>
            {outfit.trending && (
              <div
                style={{
                  position: "absolute",
                  bottom: "14px",
                  left: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "rgba(232,184,75,0.15)",
                  border: "1px solid rgba(232,184,75,0.35)",
                  borderRadius: "100px",
                  padding: "4px 10px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <TrendingUp
                  size={10}
                  strokeWidth={2.5}
                  style={{ color: "#E8B84B" }}
                />
                <span
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    color: "#F5D07A",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Trending
                </span>
              </div>
            )}
          </div>

          {/* Info side */}
          <div
            style={{
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Badge + actions */}
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
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: accentColor,
                  background: `${accentColor}18`,
                  border: `1px solid ${accentColor}40`,
                  borderRadius: "6px",
                  padding: "4px 10px",
                }}
              >
                {outfit.badge}
              </span>
              <div style={{ display: "flex", gap: "7px" }}>
                <button
                  onClick={onLike}
                  style={{
                    width: "33px",
                    height: "33px",
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
                    size={13}
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
                    width: "33px",
                    height: "33px",
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
                    size={13}
                    strokeWidth={2}
                    style={{ color: saved ? "#E8B84B" : "#BFB4D4" }}
                  />
                </button>
              </div>
            </div>

            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(1.1rem,2vw,1.45rem)",
                fontWeight: 800,
                color: "#F8F3E6",
                lineHeight: 1.2,
                marginBottom: "8px",
              }}
            >
              {outfit.name}
            </h2>

            {/* Stars */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginBottom: "14px",
              }}
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={12}
                  strokeWidth={s <= Math.floor(outfit.rating) ? 0 : 1.5}
                  style={{
                    color:
                      s <= Math.round(outfit.rating) ? "#E8B84B" : "#2A2240",
                    fill: s <= Math.floor(outfit.rating) ? "#E8B84B" : "none",
                  }}
                />
              ))}
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.72rem",
                  color: "#BFB4D4",
                  marginLeft: "4px",
                }}
              >
                {outfit.rating}
              </span>
            </div>

            {/* Meta chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginBottom: "14px",
              }}
            >
              {[
                { icon: Tag, val: outfit.fabric },
                { icon: Shirt, val: outfit.style?.replace(/-/g, " ") },
                { icon: CheckCircle2, val: outfit.formality },
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
                    style={{ color: accentColor }}
                  />
                  <span
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "0.7rem",
                      color: "#BFB4D4",
                    }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.82rem",
                color: "#BFB4D4",
                lineHeight: 1.65,
                marginBottom: "14px",
              }}
            >
              {outfit.description}
            </p>

            {/* Tips */}
            <div
              style={{
                background: `${accentColor}10`,
                border: `1px solid ${accentColor}30`,
                borderRadius: "12px",
                padding: "13px",
                marginBottom: "13px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "8px",
                }}
              >
                <Lightbulb
                  size={12}
                  strokeWidth={2}
                  style={{ color: accentColor }}
                />
                <span
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: accentColor,
                  }}
                >
                  Styling Tips
                </span>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                {outfit.tips?.map((tip, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "7px",
                    }}
                  >
                    <ChevronRight
                      size={11}
                      strokeWidth={2.5}
                      style={{
                        color: accentColor,
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.75rem",
                        color: "#BFB4D4",
                        lineHeight: 1.5,
                      }}
                    >
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            {outfit.brands && (
              <div style={{ marginBottom: "14px" }}>
                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#7A6E8A",
                    marginBottom: "7px",
                  }}
                >
                  Available at
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {outfit.brands.map((b) => (
                    <span
                      key={b}
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "0.7rem",
                        color: "#BFB4D4",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "6px",
                        padding: "3px 9px",
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}

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
                    fontSize: "0.62rem",
                    color: "#7A6E8A",
                    marginBottom: "2px",
                  }}
                >
                  Price Range
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: accentColor,
                  }}
                >
                  {outfit.priceRange}
                </p>
              </div>
              <button
                onClick={onClose}
                className="btn-secondary"
                style={{ fontSize: "0.8rem", padding: "9px 18px" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
