import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Brain,
  CloudSun,
  Users,
  Code2,
  Database,
  Zap,
  Shield,
  Globe,
  GraduationCap,
  Star,
  ArrowRight,
  Github,
  Linkedin,
  MapPin,
  Calendar,
  Heart,
  Cpu,
  Layers,
  Wind,
  Image,
  MessageCircle,
} from "lucide-react";

/* ─────────────────────────────────────────────
   TEAM DATA
───────────────────────────────────────────── */
const TEAM = [
  {
    id: 1,
    name: "Kinza Bilal",
    rollNo: "22121519-013",
    role: "Frontend Developer",
    focus: "UI/UX Design & Development",
    description:
      "Crafted the entire EventFit user interface — from the animated hero sections to the multi-step outfit wizard. Responsible for the design system, responsive layouts, and every pixel of the user experience.",
    color: "#E8B84B",
    gradientFrom: "rgba(232,184,75,0.15)",
    gradientTo: "rgba(232,184,75,0.03)",
    borderColor: "rgba(232,184,75,0.25)",
    tags: ["React.js", "CSS", "UI/UX", "Framer Motion"],
    icon: Code2,
    emoji: "🎨",
  },
  {
    id: 2,
    name: "Nida Noor",
    rollNo: "22121519-015",
    role: "Backend Developer",
    focus: "API & Database Integration",
    description:
      "Built the server-side architecture using Node.js and Express. Integrated OpenWeatherMap for live weather data and designed the MongoDB outfit schema powering every recommendation.",
    color: "#7C4DFF",
    gradientFrom: "rgba(124,77,255,0.15)",
    gradientTo: "rgba(124,77,255,0.03)",
    borderColor: "rgba(124,77,255,0.25)",
    tags: ["Node.js", "Express", "MongoDB", "OpenWeatherMap"],
    icon: Database,
    emoji: "⚙️",
  },
  {
    id: 3,
    name: "Eman Bibi",
    rollNo: "22121519-037",
    role: "AI & QA Engineer",
    focus: "Chatbot Logic, Testing & Documentation",
    description:
      "Developed StyleBuddy's conversational logic and outfit recommendation engine. Led all testing & validation phases and authored the complete project documentation and FYP report.",
    color: "#E8456A",
    gradientFrom: "rgba(232,69,106,0.15)",
    gradientTo: "rgba(232,69,106,0.03)",
    borderColor: "rgba(232,69,106,0.25)",
    tags: ["AI Logic", "StyleBuddy", "QA Testing", "Documentation"],
    icon: Brain,
    emoji: "🤖",
  },
];

/* ─────────────────────────────────────────────
   TECH STACK
───────────────────────────────────────────── */
const TECH_STACK = [
  {
    category: "Frontend",
    color: "#E8B84B",
    icon: Layers,
    items: [
      { name: "React.js", desc: "Component-based UI" },
      { name: "Vite", desc: "Lightning-fast builds" },
      { name: "Tailwind CSS", desc: "Utility-first styling" },
      { name: "Framer Motion", desc: "Smooth animations" },
      { name: "React Router", desc: "Client-side routing" },
    ],
  },
  {
    category: "Backend",
    color: "#7C4DFF",
    icon: Cpu,
    items: [
      { name: "Node.js", desc: "JavaScript runtime" },
      { name: "Express.js", desc: "REST API framework" },
      { name: "MongoDB", desc: "NoSQL database" },
      { name: "Mongoose", desc: "ODM for MongoDB" },
      { name: "dotenv", desc: "Env configuration" },
    ],
  },
  {
    category: "APIs & Services",
    color: "#00D4B4",
    icon: Globe,
    items: [
      { name: "OpenWeatherMap", desc: "Live weather data" },
      { name: "Unsplash API", desc: "Outfit imagery" },
      { name: "Lucide React", desc: "Icon library" },
      { name: "React Hot Toast", desc: "Notifications" },
      { name: "Vercel / Render", desc: "Deployment" },
    ],
  },
];

/* ─────────────────────────────────────────────
   MILESTONES
───────────────────────────────────────────── */
const MILESTONES = [
  {
    phase: "Phase 1",
    title: "Requirement Analysis",
    duration: "2 Weeks",
    icon: "📋",
    color: "#E8B84B",
  },
  {
    phase: "Phase 2",
    title: "UI/UX Design",
    duration: "2 Weeks",
    icon: "🎨",
    color: "#E8456A",
  },
  {
    phase: "Phase 3",
    title: "Implementation",
    duration: "6 Weeks",
    icon: "⚙️",
    color: "#7C4DFF",
  },
  {
    phase: "Phase 4",
    title: "Testing & Evaluation",
    duration: "2 Weeks",
    icon: "🧪",
    color: "#00D4B4",
  },
  {
    phase: "Phase 5",
    title: "Documentation & Deployment",
    duration: "2 Weeks",
    icon: "🚀",
    color: "#E8B84B",
  },
];

/* ─────────────────────────────────────────────
   FEATURES
───────────────────────────────────────────── */
const FEATURES = [
  {
    icon: CloudSun,
    title: "Real-Time Weather",
    desc: "Live weather data from OpenWeatherMap ensures every outfit recommendation is climate-appropriate for your city.",
    color: "#00D4B4",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    desc: "Our outfit engine factors in event type, gender, weather conditions, and Pakistani cultural context.",
    color: "#E8B84B",
  },
  {
    icon: MessageCircle,
    title: "StyleBuddy Chat",
    desc: "An AI-powered chatbot guides you through the selection process conversationally in real time.",
    color: "#7C4DFF",
  },
  {
    icon: Image,
    title: "Visual Outfit Gallery",
    desc: "Browse curated outfit cards with fabric details, styling tips, and weather suitability badges.",
    color: "#E8456A",
  },
  {
    icon: Heart,
    title: "Save Favourites",
    desc: "Like and save any outfit recommendation to revisit your wardrobe picks whenever you need them.",
    color: "#E8456A",
  },
  {
    icon: Shield,
    title: "Pakistani Context",
    desc: "All outfits are curated specifically for Pakistani events, culture, climate zones, and local brands.",
    color: "#00D4B4",
  },
];

/* ─────────────────────────────────────────────
   SECTION DIVIDER
───────────────────────────────────────────── */
function SectionDivider({ color = "#E8B84B" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "48px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${color})`,
        }}
      />
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 12px ${color}`,
        }}
      />
      <div
        style={{
          width: "48px",
          height: "1px",
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   TEAM CARD
───────────────────────────────────────────── */
function TeamCard({ member }) {
  const [hovered, setHovered] = useState(false);
  const Icon = member.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? member.gradientFrom : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? member.borderColor : "rgba(255,255,255,0.07)"}`,
        borderRadius: "20px",
        padding: "32px 28px",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 60px ${member.gradientFrom}` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${member.gradientFrom} 0%, transparent 70%)`,
          pointerEvents: "none",
          transition: "opacity 0.35s ease",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {/* Avatar circle */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${member.gradientFrom}, rgba(255,255,255,0.05))`,
            border: `2px solid ${member.borderColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            flexShrink: 0,
            boxShadow: hovered ? `0 0 20px ${member.gradientFrom}` : "none",
            transition: "box-shadow 0.35s ease",
          }}
        >
          {member.emoji}
        </div>

        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#F8F3E6",
              marginBottom: "3px",
            }}
          >
            {member.name}
          </h3>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              color: member.color,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "3px",
            }}
          >
            {member.role}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              color: "#7A6E8A",
              letterSpacing: "0.04em",
            }}
          >
            Roll No: {member.rollNo}
          </div>
        </div>
      </div>

      {/* Focus badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: `rgba(${member.color === "#E8B84B" ? "232,184,75" : member.color === "#7C4DFF" ? "124,77,255" : "232,69,106"},0.1)`,
          border: `1px solid ${member.borderColor}`,
          borderRadius: "100px",
          padding: "4px 12px",
          marginBottom: "16px",
        }}
      >
        <Icon size={11} style={{ color: member.color }} />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            color: member.color,
            fontWeight: 500,
          }}
        >
          {member.focus}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.875rem",
          color: "#BFB4D4",
          lineHeight: 1.75,
          marginBottom: "20px",
        }}
      >
        {member.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {member.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              color: "#7A6E8A",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "6px",
              padding: "3px 10px",
              fontWeight: 500,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURE CARD
───────────────────────────────────────────── */
function FeatureCard({ feature }) {
  const [hovered, setHovered] = useState(false);
  const Icon = feature.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? `rgba(${feature.color === "#E8B84B" ? "232,184,75" : feature.color === "#7C4DFF" ? "124,77,255" : feature.color === "#00D4B4" ? "0,212,180" : "232,69,106"},0.3)` : "rgba(255,255,255,0.07)"}`,
        borderRadius: "16px",
        padding: "24px",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: `rgba(${feature.color === "#E8B84B" ? "232,184,75" : feature.color === "#7C4DFF" ? "124,77,255" : feature.color === "#00D4B4" ? "0,212,180" : "232,69,106"},0.12)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Icon size={20} style={{ color: feature.color }} />
      </div>
      <h4
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: "#F8F3E6",
          marginBottom: "8px",
        }}
      >
        {feature.title}
      </h4>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.84rem",
          color: "#7A6E8A",
          lineHeight: 1.7,
        }}
      >
        {feature.desc}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN ABOUT PAGE
───────────────────────────────────────────── */
export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    const observers = [];
    Object.entries(sectionRefs.current).forEach(([key, el]) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, key]));
          }
        },
        { threshold: 0.1 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const setRef = (key) => (el) => {
    sectionRefs.current[key] = el;
  };

  const isVisible = (key) => visibleSections.has(key);

  return (
    <main
      style={{
        minHeight: "100vh",
        paddingTop: "70px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── HERO SECTION ── */}
      <section
        style={{
          position: "relative",
          padding: "80px 24px 100px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Ambient orbs */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,77,255,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,184,75,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,69,106,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(232,184,75,0.08)",
              border: "1px solid rgba(232,184,75,0.2)",
              borderRadius: "100px",
              padding: "6px 18px",
              marginBottom: "28px",
            }}
          >
            <GraduationCap size={13} style={{ color: "#E8B84B" }} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                color: "#F5D07A",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Final Year Project — University of Gujrat
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#F8F3E6",
              marginBottom: "8px",
            }}
          >
            About{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #E8B84B, #E8456A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              EventFit
            </span>
          </h1>

          {/* Accent subtitle */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              color: "#BFB4D4",
              marginBottom: "24px",
              lineHeight: 1.5,
            }}
          >
            Smart Outfit Recommendation for Every Pakistani Event
          </p>

          {/* Divider */}
          <div
            style={{
              width: "60px",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, #E8B84B, transparent)",
              margin: "0 auto 28px",
            }}
          />

          {/* Description */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "#7A6E8A",
              lineHeight: 1.8,
              maxWidth: "640px",
              margin: "0 auto 40px",
            }}
          >
            EventFit is an intelligent web-based system that helps users choose
            the perfect outfit based on{" "}
            <strong style={{ color: "#BFB4D4" }}>event type</strong>,{" "}
            <strong style={{ color: "#BFB4D4" }}>personal preference</strong>,
            and{" "}
            <strong style={{ color: "#BFB4D4" }}>
              real-time weather conditions
            </strong>{" "}
            — all grounded in Pakistani culture and fashion sensibilities.
          </p>

          {/* CTA buttons */}
          <div
            style={{
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/get-outfit" style={{ textDecoration: "none" }}>
              <button className="btn-primary">Try EventFit</button>
            </Link>
            <Link to="/stylebuddy" style={{ textDecoration: "none" }}>
              <button className="btn-secondary">Chat with StyleBuddy</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MISSION SECTION ── */}
      <section
        ref={setRef("mission")}
        style={{
          padding: "80px 24px",
          maxWidth: "1200px",
          margin: "0 auto",
          opacity: isVisible("mission") ? 1 : 0,
          transform: isVisible("mission")
            ? "translateY(0)"
            : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <SectionDivider color="#E8B84B" />
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#F8F3E6",
              marginBottom: "16px",
            }}
          >
            Our Mission
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "#7A6E8A",
              lineHeight: 1.8,
              maxWidth: "620px",
              margin: "0 auto",
            }}
          >
            To eliminate the everyday stress of deciding what to wear by
            combining fashion intelligence with real-world context — weather,
            event type, and cultural appropriateness.
          </p>
        </div>

        {/* Mission cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {[
            {
              icon: "🎯",
              title: "Event-Aware",
              desc: "From weddings and Eid celebrations to corporate interviews and casual dinners — EventFit knows exactly what each occasion demands.",
              color: "#E8B84B",
            },
            {
              icon: "🌦️",
              title: "Weather-Smart",
              desc: "Live OpenWeatherMap data ensures your outfit is always climate-appropriate for your specific city and current conditions.",
              color: "#00D4B4",
            },
            {
              icon: "🇵🇰",
              title: "Culturally Rooted",
              desc: "Every outfit recommendation is grounded in Pakistani fashion — traditional wear, modern fusion, local brands, and seasonal fabrics.",
              color: "#E8456A",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "18px",
                padding: "32px 28px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
                {item.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#F8F3E6",
                  marginBottom: "10px",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: "#7A6E8A",
                  lineHeight: 1.75,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── KEY FEATURES ── */}
      <section
        ref={setRef("features")}
        style={{
          padding: "80px 24px",
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          opacity: isVisible("features") ? 1 : 0,
          transform: isVisible("features")
            ? "translateY(0)"
            : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <SectionDivider color="#7C4DFF" />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#F8F3E6",
                marginBottom: "16px",
              }}
            >
              What EventFit Does
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "#7A6E8A",
                lineHeight: 1.8,
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              A complete fashion advisory system built for real people attending
              real events in Pakistan.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM SECTION ── */}
      <section
        ref={setRef("team")}
        style={{
          padding: "80px 24px",
          maxWidth: "1200px",
          margin: "0 auto",
          opacity: isVisible("team") ? 1 : 0,
          transform: isVisible("team") ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <SectionDivider color="#E8456A" />
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#F8F3E6",
              marginBottom: "16px",
            }}
          >
            Meet the Team
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "#7A6E8A",
              lineHeight: 1.8,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Three computer science students from the University of Gujrat,
            united by a shared passion for fashion, technology, and
            problem-solving.
          </p>
        </div>

        {/* Supervisor card */}
        <div
          style={{
            background: "rgba(232,184,75,0.04)",
            border: "1px solid rgba(232,184,75,0.2)",
            borderRadius: "16px",
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "48px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(232,184,75,0.12)",
              border: "2px solid rgba(232,184,75,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.3rem",
              flexShrink: 0,
            }}
          >
            🎓
          </div>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.68rem",
                color: "#E8B84B",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "3px",
              }}
            >
              Project Supervisor
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#F8F3E6",
                marginBottom: "2px",
              }}
            >
              Mam Sumbla Munir
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                color: "#7A6E8A",
              }}
            >
              Department of Computer Science · Faculty of Computing &amp; IT ·
              University of Gujrat
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(232,184,75,0.08)",
              border: "1px solid rgba(232,184,75,0.15)",
              borderRadius: "100px",
              padding: "6px 14px",
            }}
          >
            <MapPin size={11} style={{ color: "#E8B84B" }} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                color: "#F5D07A",
                fontWeight: 500,
              }}
            >
              Gujrat, Punjab, Pakistan
            </span>
          </div>
        </div>

        {/* Team grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {TEAM.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section
        ref={setRef("tech")}
        style={{
          padding: "80px 24px",
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          opacity: isVisible("tech") ? 1 : 0,
          transform: isVisible("tech") ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <SectionDivider color="#00D4B4" />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#F8F3E6",
                marginBottom: "16px",
              }}
            >
              Technology Stack
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "#7A6E8A",
                lineHeight: 1.8,
                maxWidth: "520px",
                margin: "0 auto",
              }}
            >
              Built with modern, industry-standard tools chosen for performance,
              scalability, and developer experience.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {TECH_STACK.map((stack) => {
              const StackIcon = stack.icon;
              return (
                <div
                  key={stack.category}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "20px",
                    padding: "28px",
                    transition: "border-color 0.3s ease",
                  }}
                >
                  {/* Category header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "24px",
                      paddingBottom: "16px",
                      borderBottom: `1px solid rgba(255,255,255,0.06)`,
                    }}
                  >
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        background: `rgba(${stack.color === "#E8B84B" ? "232,184,75" : stack.color === "#7C4DFF" ? "124,77,255" : "0,212,180"},0.12)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <StackIcon size={18} style={{ color: stack.color }} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "#F8F3E6",
                      }}
                    >
                      {stack.category}
                    </h3>
                  </div>

                  {/* Items */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {stack.items.map((item) => (
                      <div
                        key={item.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: stack.color,
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.875rem",
                              fontWeight: 600,
                              color: "#F8F3E6",
                            }}
                          >
                            {item.name}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.75rem",
                            color: "#7A6E8A",
                            textAlign: "right",
                          }}
                        >
                          {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROJECT MILESTONES ── */}
      <section
        ref={setRef("milestones")}
        style={{
          padding: "80px 24px",
          maxWidth: "1200px",
          margin: "0 auto",
          opacity: isVisible("milestones") ? 1 : 0,
          transform: isVisible("milestones")
            ? "translateY(0)"
            : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <SectionDivider color="#E8B84B" />
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#F8F3E6",
              marginBottom: "16px",
            }}
          >
            Project Timeline
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "#7A6E8A",
              lineHeight: 1.8,
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            EventFit was developed over a structured 14-week iterative cycle,
            following software engineering best practices.
          </p>
        </div>

        {/* Timeline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
            maxWidth: "700px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Vertical line */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "23px",
              top: "24px",
              bottom: "24px",
              width: "2px",
              background:
                "linear-gradient(180deg, #E8B84B, rgba(232,184,75,0.1))",
            }}
          />

          {MILESTONES.map((m, i) => (
            <div
              key={m.phase}
              style={{
                display: "flex",
                gap: "24px",
                paddingBottom: i < MILESTONES.length - 1 ? "32px" : "0",
                position: "relative",
              }}
            >
              {/* Dot */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: `rgba(${m.color === "#E8B84B" ? "232,184,75" : m.color === "#E8456A" ? "232,69,106" : m.color === "#7C4DFF" ? "124,77,255" : "0,212,180"},0.12)`,
                  border: `2px solid ${m.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  flexShrink: 0,
                  zIndex: 1,
                }}
              >
                {m.icon}
              </div>

              {/* Content */}
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "14px",
                  padding: "18px 22px",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      color: m.color,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {m.phase}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#F8F3E6",
                    }}
                  >
                    {m.title}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "100px",
                    padding: "5px 12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Calendar size={11} style={{ color: "#7A6E8A" }} />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      color: "#7A6E8A",
                      fontWeight: 500,
                    }}
                  >
                    {m.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── UNIVERSITY INFO ── */}
      <section
        ref={setRef("uni")}
        style={{
          padding: "60px 24px",
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          opacity: isVisible("uni") ? 1 : 0,
          transform: isVisible("uni") ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "32px",
            alignItems: "center",
          }}
        >
          {/* University info */}
          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.68rem",
                color: "#E8B84B",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Institution
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#F8F3E6",
                marginBottom: "6px",
              }}
            >
              University of Gujrat
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.84rem",
                color: "#7A6E8A",
                lineHeight: 1.6,
              }}
            >
              Department of Computer Science
              <br />
              Faculty of Computing &amp; Information Technology
              <br />
              Gujrat, Punjab, Pakistan
            </p>
          </div>

          {/* Program info */}
          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.68rem",
                color: "#7C4DFF",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Program
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#F8F3E6",
                marginBottom: "6px",
              }}
            >
              BS Computer Science
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.84rem",
                color: "#7A6E8A",
                lineHeight: 1.6,
              }}
            >
              Final Year Project (FYP)
              <br />
              Session 2022 – 2026
              <br />
              Dated: November 3, 2025
            </p>
          </div>

          {/* Stats */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {[
              { value: "3", label: "Team Members", color: "#E8B84B" },
              { value: "14", label: "Weeks Development", color: "#7C4DFF" },
              { value: "8+", label: "Event Categories", color: "#E8456A" },
              { value: "100+", label: "Outfit Combinations", color: "#00D4B4" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: stat.color,
                    minWidth: "52px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem",
                    color: "#7A6E8A",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section
        ref={setRef("cta")}
        style={{
          padding: "100px 24px",
          textAlign: "center",
          opacity: isVisible("cta") ? 1 : 0,
          transform: isVisible("cta") ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={{ maxWidth: "620px", margin: "0 auto" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "20px",
              background: "rgba(232,184,75,0.1)",
              border: "1px solid rgba(232,184,75,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
            }}
          >
            <Sparkles size={28} style={{ color: "#E8B84B" }} />
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#F8F3E6",
              marginBottom: "16px",
            }}
          >
            Ready to find your perfect outfit?
          </h2>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "1.2rem",
              color: "#BFB4D4",
              marginBottom: "40px",
              lineHeight: 1.7,
            }}
          >
            Tell EventFit your event and city — we&apos;ll handle the rest.
          </p>

          <div
            style={{
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/get-outfit" style={{ textDecoration: "none" }}>
              <button className="btn-primary">Get My Outfit</button>
            </Link>
            <Link to="/stylebuddy" style={{ textDecoration: "none" }}>
              <button className="btn-secondary">Chat with StyleBuddy</button>
            </Link>
            <Link to="/events" style={{ textDecoration: "none" }}>
              <button className="btn-secondary">Browse Events</button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
