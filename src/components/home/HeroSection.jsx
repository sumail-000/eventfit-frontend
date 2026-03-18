import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  MapPin,
  CloudSun,
  ChevronDown,
  ArrowRight,
  Thermometer,
  Wind,
  Droplets,
  Play,
  TrendingUp,
  Users,
  Award,
  Zap,
} from "lucide-react";

/* ─── Floating outfit preview cards data ─── */
const FLOATING_CARDS = [
  {
    id: 1,
    label: "Wedding Barat",
    tag: "This Weekend",
    tagColor: "#E8456A",
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80",
    badge: "Ultra Formal",
    badgeColor: "#E8B84B",
    city: "Lahore",
    temp: "18°C",
    animClass: "card-float-1",
  },
  {
    id: 2,
    label: "Corporate Interview",
    tag: "Tomorrow",
    tagColor: "#A47BFF",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    badge: "Professional",
    badgeColor: "#7C4DFF",
    city: "Islamabad",
    temp: "22°C",
    animClass: "card-float-2",
  },
  {
    id: 3,
    label: "Dholki Night",
    tag: "Tonight",
    tagColor: "#E8B84B",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=300&q=80",
    badge: "Semi-Formal",
    badgeColor: "#00D4B4",
    city: "Karachi",
    temp: "29°C",
    animClass: "card-float-3",
  },
];

/* ─── Stats ─── */
const STATS = [
  { icon: TrendingUp, value: "500+", label: "Outfit Styles", color: "#E8B84B" },
  { icon: Users, value: "10K+", label: "Happy Users", color: "#E8456A" },
  { icon: Award, value: "8", label: "Event Types", color: "#A47BFF" },
  { icon: MapPin, value: "13+", label: "Pakistani Cities", color: "#4DEFE0" },
];

/* ─── Hero images carousel ─── */
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
];

export default function HeroSection() {
  const [activeImg, setActiveImg] = useState(0);
  const [cityInput, setCityInput] = useState("");
  const [eventType, setEventType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ── image carousel ── */
  useEffect(() => {
    const t = setInterval(() => {
      setActiveImg((i) => (i + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  /* ── entrance animation trigger ── */
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const next = document.getElementById("how-it-works");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        paddingTop: "70px",
      }}
    >
      {/* ══════════════ BACKGROUND LAYERS ══════════════ */}

      {/* Image carousel bg */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            transition: "opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: i === activeImg ? 1 : 0,
          }}
        >
          <img
            src={src}
            alt=""
            aria-hidden
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 20%",
              filter: "brightness(0.22) saturate(0.7)",
            }}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: `
            radial-gradient(ellipse 75% 65% at 70% 35%, rgba(7,8,15,0) 0%, rgba(7,8,15,0.65) 65%),
            linear-gradient(180deg,
              rgba(7,8,15,0.55) 0%,
              rgba(7,8,15,0.25) 35%,
              rgba(7,8,15,0.20) 55%,
              rgba(7,8,15,0.92) 88%,
              rgba(7,8,15,1)    100%
            )
          `,
        }}
      />

      {/* Animated ambient orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,184,75,0.14) 0%, transparent 70%)",
          zIndex: 1,
          animation: "float 7s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          right: "2%",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,77,255,0.12) 0%, transparent 70%)",
          zIndex: 1,
          animation: "float 9s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "15%",
          left: "40%",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,69,106,0.10) 0%, transparent 70%)",
          zIndex: 1,
          animation: "float 11s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <div
        className="relative flex-1 section-container"
        style={{
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "0",
          paddingTop: "clamp(60px, 10vh, 110px)",
          paddingBottom: "80px",
        }}
      >
        <div
          className="lg:grid"
          style={{
            gridTemplateColumns: "1fr 420px",
            gap: "48px",
            alignItems: "center",
          }}
        >
          {/* ── LEFT: Copy ── */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{
                background: "rgba(232,184,75,0.08)",
                border: "1px solid rgba(232,184,75,0.22)",
                borderRadius: "100px",
                padding: "6px 14px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              }}
            >
              <Zap size={12} strokeWidth={2.5} style={{ color: "#E8B84B" }} />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "0.82rem",
                  letterSpacing: "0.1em",
                  color: "#F5D07A",
                }}
              >
                Pakistan&apos;s Smart Fashion Advisor
              </span>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#00D4B4",
                  boxShadow: "0 0 8px #00D4B4",
                  flexShrink: 0,
                }}
              />
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
                fontWeight: 800,
                lineHeight: 1.07,
                color: "#F8F3E6",
                marginBottom: "24px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
              }}
            >
              Dress{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #F5D07A 0%, #E8B84B 40%, #E8456A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                perfectly
              </span>
              <br />
              for every
              <br />
              <span
                style={{
                  fontStyle: "italic",
                  background:
                    "linear-gradient(135deg, #A47BFF 0%, #7C4DFF 50%, #E8456A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                occasion.
              </span>
            </h1>

            {/* Sub-copy */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                color: "#BFB4D4",
                lineHeight: 1.75,
                maxWidth: "500px",
                marginBottom: "28px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
              }}
            >
              Tell us your event and city. We&apos;ll check the live weather and
              recommend the{" "}
              <span style={{ color: "#F5D07A", fontWeight: 500 }}>
                perfect Pakistani outfit
              </span>{" "}
              — for men and women — whether it&apos;s a shadi, interview, Eid,
              or a dholki night.
            </p>

            {/* ── Quick Search Bar ── */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s",
                marginBottom: "28px",
                position: "relative",
                zIndex: 50,
              }}
            >
              <div
                className="flex flex-col sm:flex-row gap-3"
                style={{
                  background: "rgba(13,15,30,0.75)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(232,184,75,0.2)",
                  borderRadius: "14px",
                  padding: "8px",
                  maxWidth: "540px",
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(232,184,75,0.05)",
                }}
              >
                {/* City input */}
                <div
                  className="flex-1 flex items-center"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    minWidth: 0,
                    borderRadius: "12px",
                    padding: "10px 18px",
                    gap: "12px",
                  }}
                >
                  <MapPin
                    size={18}
                    strokeWidth={1.8}
                    style={{ color: "#E8B84B", flexShrink: 0 }}
                  />
                  <input
                    type="text"
                    placeholder="Your city (e.g. Lahore)"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#F8F3E6",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                      width: "100%",
                    }}
                  />
                </div>

                {/* Event select */}
                <div
                  ref={dropdownRef}
                  className="relative flex-1 flex items-center"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    minWidth: 0,
                    cursor: "pointer",
                    borderRadius: "12px",
                    padding: "10px 18px",
                    gap: "12px",
                  }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <CloudSun
                    size={18}
                    strokeWidth={1.8}
                    style={{ color: "#A47BFF", flexShrink: 0 }}
                  />
                  <div
                    style={{
                      color: eventType ? "#F8F3E6" : "#7A6E8A",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                      width: "100%",
                      userSelect: "none",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {eventType || "Select event type"}
                  </div>
                  <ChevronDown
                    size={15}
                    style={{
                      color: "#7A6E8A",
                      flexShrink: 0,
                      transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease"
                    }}
                  />

                  {/* Custom Dropdown Menu */}
                  {isDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        marginTop: "8px",
                        background: "rgba(13,15,30,0.95)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(232,184,75,0.2)",
                        borderRadius: "12px",
                        padding: "8px",
                        zIndex: 50,
                        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      {[
                        "Wedding / Shadi",
                        "Interview",
                        "Party / Mehendi",
                        "Eid / Festival",
                        "Formal / Office",
                        "Casual / Outing",
                        "Graduation",
                        "Dinner / Date",
                      ].map((opt) => (
                        <div
                          key={opt}
                          onClick={(e) => {
                            e.stopPropagation();
                            setEventType(opt);
                            setIsDropdownOpen(false);
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(164,123,255,0.15)";
                            e.currentTarget.style.color = "#A47BFF";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#F8F3E6";
                          }}
                          style={{
                            padding: "8px 12px",
                            borderRadius: "8px",
                            color: "#F8F3E6",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Link
                  to={`/get-outfit${
                    cityInput || eventType
                      ? `?city=${encodeURIComponent(cityInput)}&event=${encodeURIComponent(eventType)}`
                      : ""
                  }`}
                  style={{ textDecoration: "none", flexShrink: 0 }}
                >
                  <button
                    className="btn-primary"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "10px",
                      fontSize: "0.8125rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Compass size={14} strokeWidth={2.2} />
                    Get Outfit
                  </button>
                </Link>
              </div>
            </div>

            {/* ── CTA row ── */}
            <div
              className="flex flex-wrap items-center gap-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
                transition:
                  "opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s",
                marginBottom: "32px",
              }}
            >
              <Link to="/stylebuddy" style={{ textDecoration: "none" }}>
                <button className="btn-violet" style={{ fontSize: "0.85rem" }}>
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#00D4B4",
                      boxShadow: "0 0 8px #00D4B4",
                    }}
                  />
                  Chat with StyleBuddy
                </button>
              </Link>

              <button
                className="btn-ghost"
                style={{ fontSize: "0.85rem" }}
                onClick={scrollToNext}
              >
                <Play
                  size={13}
                  strokeWidth={2.5}
                  style={{ fill: "currentColor" }}
                />
                How it works
              </button>
            </div>

            {/* ── Stats row ── */}
            <div
              className="flex flex-wrap gap-5"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.8s ease 0.7s",
              }}
            >
              {STATS.map(({ icon: Icon, value, label, color }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity 0.6s ease ${0.7 + i * 0.1}s, transform 0.6s ease ${0.7 + i * 0.1}s`,
                  }}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "10px",
                      background: `${color}18`,
                      border: `1px solid ${color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} strokeWidth={2} style={{ color }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "#F8F3E6",
                        lineHeight: 1,
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.7rem",
                        color: "#7A6E8A",
                        marginTop: "2px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Floating outfit cards ── */}
          <div
            className="hidden lg:flex flex-col gap-4 relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s",
            }}
          >
            {/* Live weather pill */}
            <div
              style={{
                alignSelf: "flex-end",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(0,212,180,0.08)",
                border: "1px solid rgba(0,212,180,0.22)",
                borderRadius: "100px",
                padding: "7px 16px",
                marginBottom: "4px",
              }}
            >
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#00D4B4",
                  boxShadow: "0 0 10px #00D4B4",
                  animation: "pulseGold 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  color: "#4DEFE0",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                Live weather-matched recommendations
              </span>
            </div>

            {/* Outfit preview cards */}
            {FLOATING_CARDS.map((card, i) => (
              <OutfitPreviewCard key={card.id} card={card} index={i} />
            ))}

            {/* Decorative bottom hint */}
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "0.78rem",
                color: "rgba(232,184,75,0.4)",
                textAlign: "center",
                letterSpacing: "0.08em",
                marginTop: "4px",
              }}
            >
              Updated with real-time weather data
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════ SCROLL INDICATOR ══════════════ */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          opacity: isVisible ? 0.7 : 0,
          transition: "opacity 1s ease 1.2s",
          cursor: "pointer",
        }}
        onClick={scrollToNext}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: "rgba(232,184,75,0.6)",
            textTransform: "uppercase",
          }}
        >
          Explore
        </span>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          style={{
            color: "rgba(232,184,75,0.5)",
            animation: "float 2.5s ease-in-out infinite",
          }}
        />
      </div>

      {/* ══════════════ IMAGE CAROUSEL DOTS ══════════════ */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          right: "40px",
          zIndex: 3,
          display: "flex",
          gap: "6px",
        }}
      >
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            style={{
              width: i === activeImg ? "20px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background:
                i === activeImg
                  ? "linear-gradient(90deg, #E8B84B, #E8456A)"
                  : "rgba(255,255,255,0.2)",
              border: "none",
              outline: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.4s ease, background 0.3s ease",
            }}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Floating outfit preview card sub-component
───────────────────────────────────────────── */
function OutfitPreviewCard({ card, index }) {
  const [hovered, setHovered] = useState(false);

  const delays = [0, 1.5, 3];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        background: "rgba(13,15,30,0.75)",
        backdropFilter: "blur(20px)",
        border: "1px solid",
        borderColor: hovered
          ? "rgba(232,184,75,0.35)"
          : "rgba(255,255,255,0.07)",
        borderRadius: "16px",
        padding: "12px",
        cursor: "pointer",
        transition: "all 0.35s cubic-bezier(.22,.68,0,1.2)",
        transform: hovered
          ? "translateX(-6px) scale(1.02)"
          : "translateX(0) scale(1)",
        boxShadow: hovered
          ? "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(232,184,75,0.1)"
          : "0 8px 24px rgba(0,0,0,0.3)",
        animation: `float ${7 + index * 2}s ease-in-out infinite`,
        animationDelay: `${delays[index]}s`,
      }}
    >
      {/* Outfit image */}
      <div
        style={{
          width: "60px",
          height: "76px",
          borderRadius: "10px",
          overflow: "hidden",
          flexShrink: 0,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <img
          src={card.image}
          alt={card.label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        />
      </div>

      {/* Card details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* top row */}
        <div
          className="flex items-center justify-between gap-2 mb-1.5"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            marginBottom: "6px",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: card.tagColor,
              background: `${card.tagColor}18`,
              border: `1px solid ${card.tagColor}30`,
              borderRadius: "100px",
              padding: "2px 8px",
            }}
          >
            {card.tag}
          </span>
          {/* weather mini */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Thermometer
              size={11}
              strokeWidth={2}
              style={{ color: "#F5D07A" }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                color: "#BFB4D4",
              }}
            >
              {card.temp}
            </span>
          </div>
        </div>

        {/* outfit name */}
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#F8F3E6",
            lineHeight: 1.25,
            marginBottom: "6px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {card.label}
        </p>

        {/* bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* city */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <MapPin size={11} strokeWidth={2} style={{ color: "#BFB4D4" }} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                color: "#BFB4D4",
              }}
            >
              {card.city}
            </span>
          </div>

          {/* badge */}
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              color: card.badgeColor,
              background: `${card.badgeColor}18`,
              border: `1px solid ${card.badgeColor}30`,
              borderRadius: "100px",
              padding: "2px 8px",
              whiteSpace: "nowrap",
            }}
          >
            {card.badge}
          </span>
        </div>
      </div>
    </div>
  );
}
