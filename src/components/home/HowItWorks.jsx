import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  CloudSun,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Compass,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: MapPin,
    title: "Enter Your City",
    titleUrdu: "اپنا شہر درج کریں",
    description:
      "Type your Pakistani city — Lahore, Karachi, Islamabad or any of 13+ supported cities. EventFit instantly fetches live weather conditions for your location.",
    detail:
      "We use OpenWeatherMap to pull real-time temperature, humidity, wind speed and current conditions so your outfit recommendation is always weather-accurate.",
    color: "#E8B84B",
    gradient: "linear-gradient(135deg, #E8B84B 0%, #E8456A 100%)",
    glowColor: "rgba(232,184,75,0.3)",
    bgAccent: "rgba(232,184,75,0.06)",
    borderColor: "rgba(232,184,75,0.2)",
    features: [
      "13+ Pakistani cities supported",
      "Real-time weather from OpenWeatherMap",
      "Temperature, humidity & wind data",
    ],
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=700&q=80",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Choose Your Event",
    titleUrdu: "اپنا تقریب منتخب کریں",
    description:
      "Select from 8 event types — weddings, interviews, party nights, Eid celebrations, office wear, casual outings, graduation or dinner dates.",
    detail:
      "Our outfit engine understands the cultural context of each occasion. A shadi requires different attire than a corporate interview — we know the difference.",
    color: "#7C4DFF",
    gradient: "linear-gradient(135deg, #7C4DFF 0%, #00D4B4 100%)",
    glowColor: "rgba(124,77,255,0.3)",
    bgAccent: "rgba(124,77,255,0.06)",
    borderColor: "rgba(124,77,255,0.2)",
    features: [
      "8 distinct event categories",
      "Pakistani cultural context built-in",
      "Men & women outfit sets",
    ],
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80",
  },
  {
    number: "03",
    icon: CloudSun,
    title: "Weather Analysis",
    titleUrdu: "موسم کا تجزیہ",
    description:
      "Our system cross-references your event type with live weather data — temperature range, humidity, rain probability — to filter outfits that are both stylish and practical.",
    detail:
      "Wearing heavy silk embroidery in 38°C Karachi heat? We'll steer you toward breathable lawn and cotton alternatives that still look stunning.",
    color: "#00D4B4",
    gradient: "linear-gradient(135deg, #00D4B4 0%, #7C4DFF 100%)",
    glowColor: "rgba(0,212,180,0.3)",
    bgAccent: "rgba(0,212,180,0.06)",
    borderColor: "rgba(0,212,180,0.2)",
    features: [
      "Fabric suitability scoring",
      "Rain & wind alerts for loose garments",
      "Season-aware recommendations",
    ],
    image: "/images/weather-analysis.png",
  },
  {
    number: "04",
    icon: Layers,
    title: "Get Styled",
    titleUrdu: "اپنا لباس پائیں",
    description:
      "Receive a curated grid of outfit suggestions — complete with high-quality images, fabric details, styling tips, price ranges and brand recommendations.",
    detail:
      "Every recommendation includes Pakistani brand suggestions, accessory tips, makeup/grooming advice and weather-specific notes so you step out fully prepared.",
    color: "#E8456A",
    gradient: "linear-gradient(135deg, #E8456A 0%, #7C4DFF 100%)",
    glowColor: "rgba(232,69,106,0.3)",
    bgAccent: "rgba(232,69,106,0.06)",
    borderColor: "rgba(232,69,106,0.2)",
    features: [
      "Visual outfit cards with HD images",
      "Pakistani brand recommendations",
      "Full styling & accessory tips",
    ],
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];

  return (
    <section
      id="how-it-works"
      style={{
        padding: "100px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── decorative background orbs ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "0",
          right: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,77,255,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "0",
          left: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,184,75,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── horizontal gold rule ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(232,184,75,0.25), transparent)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        {/* ────────── Section header ────────── */}
        <div
          className="text-center mb-16"
          style={{ maxWidth: "560px", margin: "0 auto 64px" }}
        >
          <p className="section-eyebrow mb-3">The Process</p>
          <div className="divider-gold" style={{ margin: "0 auto 20px" }} />
          <h2 className="section-title mb-4">
            How{" "}
            <span
              style={{
                fontStyle: "italic",
                background:
                  "linear-gradient(135deg, #F5D07A, #E8B84B, #E8456A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              EventFit
            </span>{" "}
            works
          </h2>
          <p
            className="section-subtitle"
            style={{ maxWidth: "440px", margin: "0 auto" }}
          >
            Four intelligent steps from your city &amp; event to a perfect,
            weather-matched outfit — in under 60 seconds.
          </p>
        </div>

        {/* ────────── Step tabs ────────── */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "48px",
          }}
        >
          {STEPS.map((s, i) => (
            <button
              key={s.number}
              onClick={() => setActiveStep(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                borderRadius: "100px",
                border: "1px solid",
                borderColor:
                  activeStep === i ? s.color + "60" : "rgba(255,255,255,0.07)",
                background:
                  activeStep === i ? s.bgAccent : "rgba(255,255,255,0.03)",
                cursor: "pointer",
                outline: "none",
                transition: "all 0.3s ease",
                boxShadow:
                  activeStep === i ? `0 4px 20px ${s.glowColor}` : "none",
              }}
            >
              {/* step number */}
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: activeStep === i ? s.color : "#4A4060",
                  letterSpacing: "0.06em",
                  transition: "color 0.3s",
                }}
              >
                {s.number}
              </span>

              {/* divider */}
              <span
                style={{
                  width: "1px",
                  height: "14px",
                  background:
                    activeStep === i
                      ? `${s.color}50`
                      : "rgba(255,255,255,0.08)",
                  transition: "background 0.3s",
                }}
              />

              {/* icon */}
              <s.icon
                size={14}
                strokeWidth={activeStep === i ? 2.2 : 1.8}
                style={{
                  color: activeStep === i ? s.color : "#7A6E8A",
                  transition: "color 0.3s",
                }}
              />

              {/* label */}
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8125rem",
                  fontWeight: activeStep === i ? 600 : 400,
                  color: activeStep === i ? "#F8F3E6" : "#7A6E8A",
                  transition: "color 0.3s",
                  whiteSpace: "nowrap",
                }}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* ────────── Active step detail panel ────────── */}
        <div
          key={activeStep}
          style={{
            gap: "48px",
            alignItems: "center",
            animation: "fadeUp 0.5s ease forwards",
          }}
          className="flex flex-col lg:grid lg:grid-cols-2"
        >
          {/* Left: text */}
          <div>
            {/* step badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "14px",
                  background: step.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 8px 28px ${step.glowColor}`,
                  flexShrink: 0,
                }}
              >
                <step.icon
                  size={20}
                  strokeWidth={1.8}
                  style={{ color: "#fff" }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    color: step.color,
                    textTransform: "uppercase",
                    marginBottom: "2px",
                  }}
                >
                  Step {step.number}
                </div>
              </div>
            </div>

            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
                fontWeight: 700,
                color: "#F8F3E6",
                lineHeight: 1.15,
                marginBottom: "16px",
              }}
            >
              {step.title}
            </h3>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "#BFB4D4",
                lineHeight: 1.75,
                marginBottom: "20px",
              }}
            >
              {step.description}
            </p>

            {/* detail quote */}
            <div
              style={{
                borderLeft: `3px solid ${step.color}`,
                paddingLeft: "18px",
                marginBottom: "28px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                  color: "#9A8DB0",
                  lineHeight: 1.65,
                }}
              >
                {step.detail}
              </p>
            </div>

            {/* feature checklist */}
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                marginBottom: "32px",
              }}
            >
              {step.features.map((feat) => (
                <li
                  key={feat}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <CheckCircle2
                    size={15}
                    strokeWidth={2.5}
                    style={{ color: step.color, flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.875rem",
                      color: "#BFB4D4",
                    }}
                  >
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            {/* nav row */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {activeStep > 0 && (
                <button
                  onClick={() => setActiveStep((p) => p - 1)}
                  className="btn-ghost"
                  style={{ padding: "9px 18px", fontSize: "0.8rem" }}
                >
                  ← Previous
                </button>
              )}
              {activeStep < STEPS.length - 1 ? (
                <button
                  onClick={() => setActiveStep((p) => p + 1)}
                  className="btn-primary"
                  style={{ padding: "10px 22px", fontSize: "0.8rem" }}
                >
                  Next Step
                  <ArrowRight size={13} strokeWidth={2.2} />
                </button>
              ) : (
                <Link to="/get-outfit" style={{ textDecoration: "none" }}>
                  <button
                    className="btn-primary"
                    style={{ padding: "10px 22px", fontSize: "0.8rem" }}
                  >
                    <Compass size={13} strokeWidth={2.2} />
                    Try It Now
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Right: image + feature card */}
          <div style={{ position: "relative" }}>
            {/* Main image */}
            <div
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid",
                borderColor: step.borderColor,
                boxShadow: `0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px ${step.borderColor}`,
                position: "relative",
              }}
            >
              <img
                src={step.image}
                alt={step.title}
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  objectFit: "cover",
                  display: "block",
                  filter: "brightness(0.75) saturate(0.8)",
                }}
              />
              {/* image overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(7,8,15,0.7) 0%, transparent 60%)",
                }}
              />

              {/* gradient bar at top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: step.gradient,
                }}
              />

              {/* step number watermark */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "4rem",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.07)",
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {step.number}
              </div>

              {/* bottom label */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  right: "80px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "#F8F3E6",
                  }}
                >
                  {step.title}
                </span>
              </div>
            </div>

            {/* floating info chip */}
            <div
              style={{
                position: "absolute",
                top: "-16px",
                right: "-16px",
                background: "rgba(13,15,30,0.92)",
                backdropFilter: "blur(16px)",
                border: "1px solid",
                borderColor: step.borderColor,
                borderRadius: "14px",
                padding: "12px 16px",
                boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px ${step.borderColor}`,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  background: step.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <step.icon
                  size={14}
                  strokeWidth={2}
                  style={{ color: "#fff" }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: step.color,
                    letterSpacing: "0.04em",
                    marginBottom: "2px",
                  }}
                >
                  STEP {step.number}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem",
                    color: "#F8F3E6",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.title}
                </div>
              </div>
            </div>

            {/* StyleBuddy shortcut chip */}
            <div
              style={{
                position: "absolute",
                bottom: "-16px",
                left: "-16px",
                background: "rgba(13,15,30,0.92)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(124,77,255,0.3)",
                borderRadius: "14px",
                padding: "12px 16px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#00D4B4",
                  boxShadow: "0 0 10px #00D4B4",
                  flexShrink: 0,
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    color: "#7A6E8A",
                    marginBottom: "2px",
                  }}
                >
                  Prefer to chat?
                </div>
                <Link
                  to="/stylebuddy"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem",
                    color: "#A47BFF",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <MessageCircle size={12} strokeWidth={2} />
                  Ask StyleBuddy instead
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ────────── Step progress dots ────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "56px",
          }}
        >
          {STEPS.map((s, i) => (
            <button
              key={s.number}
              onClick={() => setActiveStep(i)}
              style={{
                width: i === activeStep ? "28px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background:
                  i === activeStep
                    ? s.gradient
                    : i < activeStep
                      ? "rgba(232,184,75,0.3)"
                      : "rgba(255,255,255,0.1)",
                border: "none",
                outline: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.4s ease, background 0.3s ease",
              }}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* ────────── Bottom CTA banner ────────── */}
        <div
          style={{
            marginTop: "80px",
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
            border: "1px solid rgba(232,184,75,0.18)",
          }}
        >
          {/* bg image */}
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=70"
            alt=""
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.18) saturate(0.6)",
            }}
          />
          {/* overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(124,77,255,0.25) 0%, rgba(232,69,106,0.15) 50%, rgba(232,184,75,0.12) 100%)",
            }}
          />
          {/* top accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(90deg, #E8B84B, #E8456A, #7C4DFF)",
            }}
          />

          {/* content */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: "56px 40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(232,184,75,0.1)",
                border: "1px solid rgba(232,184,75,0.25)",
                borderRadius: "100px",
                padding: "6px 16px",
              }}
            >
              <Sparkles
                size={12}
                strokeWidth={2.5}
                style={{ color: "#E8B84B" }}
              />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "0.82rem",
                  letterSpacing: "0.1em",
                  color: "#F5D07A",
                }}
              >
                Ready to get styled?
              </span>
            </div>

            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
                fontWeight: 800,
                color: "#F8F3E6",
                lineHeight: 1.15,
                maxWidth: "520px",
              }}
            >
              Your perfect outfit is{" "}
              <span
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #F5D07A, #E8456A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                60 seconds
              </span>{" "}
              away
            </h3>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "#BFB4D4",
                maxWidth: "400px",
                lineHeight: 1.7,
              }}
            >
              No sign-up needed. Just your city, your event, and your style
              preference.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Link to="/get-outfit" style={{ textDecoration: "none" }}>
                <button className="btn-primary">
                  <Compass size={15} strokeWidth={2.2} />
                  Find My Outfit
                </button>
              </Link>
              <Link to="/stylebuddy" style={{ textDecoration: "none" }}>
                <button className="btn-secondary">
                  <MessageCircle size={14} strokeWidth={2} />
                  Chat with StyleBuddy
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
