import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Eye,
  Database,
  Cookie,
  Lock,
  UserCheck,
  Mail,
  AlertCircle,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

/* ─────────────────────────────────────────────
   SECTIONS DATA
───────────────────────────────────────────── */
const SECTIONS = [
  {
    id: "collect",
    icon: Database,
    color: "#E8B84B",
    title: "Information We Collect",
    content: [
      {
        subtitle: "Information You Provide",
        body: "When you use EventFit, we collect information you voluntarily provide — including your selected event type, gender preference, city, and style preferences. We do not require account registration or collect personal identification information.",
      },
      {
        subtitle: "Usage Data",
        body: "We automatically collect certain information about how you interact with the platform — such as pages visited, features used, buttons clicked, and time spent. This data is aggregated and anonymised and helps us improve the recommendation experience.",
      },
      {
        subtitle: "Device & Browser Information",
        body: "We may collect basic technical information including your browser type, operating system, screen resolution, and referring URLs. This is standard practice for all web applications and helps ensure compatibility across devices.",
      },
    ],
  },
  {
    id: "use",
    icon: Eye,
    color: "#7C4DFF",
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Outfit Recommendations",
        body: "The primary purpose of collecting event, gender, and city data is to generate personalised outfit recommendations. Your inputs are processed in real time to query our outfit database and weather API — they are not stored beyond your current session unless you explicitly save outfits.",
      },
      {
        subtitle: "Weather Integration",
        body: "Your selected city is sent to the OpenWeatherMap API to retrieve live weather data. EventFit does not store your location or track your physical whereabouts. The city name you type is used solely for fetching weather conditions relevant to your outfit recommendation.",
      },
      {
        subtitle: "Platform Improvement",
        body: "Anonymised, aggregated usage data helps us understand which features are most useful, identify performance issues, and prioritise future development. No individual user is identifiable from this data.",
      },
      {
        subtitle: "No Advertising or Profiling",
        body: "EventFit does not build user profiles, serve targeted advertisements, or share your data with advertising networks. We do not sell, rent, or trade any user data to third parties.",
      },
    ],
  },
  {
    id: "cookies",
    icon: Cookie,
    color: "#00D4B4",
    title: "Cookies & Local Storage",
    content: [
      {
        subtitle: "Session Storage",
        body: "We use browser session storage to temporarily hold your in-progress outfit preferences (event type, city, gender, style prefs) so that navigating between pages does not reset your selections. This data is automatically cleared when you close your browser tab.",
      },
      {
        subtitle: "Local Storage — Saved Outfits",
        body: "When you like or save an outfit, the outfit IDs are stored in your browser's local storage so your saved collection persists across visits. This data never leaves your device and is not transmitted to our servers.",
      },
      {
        subtitle: "Analytics Cookies",
        body: "If analytics are enabled, we use minimal, privacy-respecting cookies to count page visits and feature usage. These cookies contain no personally identifiable information. You can disable cookies through your browser settings at any time.",
      },
      {
        subtitle: "No Third-Party Tracking",
        body: "We do not use Facebook Pixel, Google Ads tracking, or any other third-party behavioural tracking scripts. The only external scripts loaded are Google Fonts (for typography) and Lucide icons (open source).",
      },
    ],
  },
  {
    id: "security",
    icon: Lock,
    color: "#E8456A",
    title: "Data Security",
    content: [
      {
        subtitle: "Minimal Data Collection",
        body: "The best security practice is to not collect sensitive data in the first place. EventFit is designed with a privacy-first architecture — we collect the minimum data necessary to provide outfit recommendations and nothing more.",
      },
      {
        subtitle: "HTTPS Encryption",
        body: "All data transmitted between your browser and EventFit servers is encrypted using HTTPS/TLS. This protects any information sent during API calls and page loads from interception.",
      },
      {
        subtitle: "API Key Security",
        body: "Third-party API keys (OpenWeatherMap, Unsplash) are stored server-side in environment variables and are never exposed to the client/browser. All sensitive credentials are managed through secure backend services.",
      },
      {
        subtitle: "No Password Storage",
        body: "EventFit does not currently require user accounts or passwords. There is no authentication system that could be compromised. If account features are added in future, passwords will be hashed using bcrypt before any storage.",
      },
    ],
  },
  {
    id: "rights",
    icon: UserCheck,
    color: "#E8B84B",
    title: "Your Rights",
    content: [
      {
        subtitle: "Right to Clear Your Data",
        body: "You can clear all locally stored EventFit data (liked outfits, saved preferences) at any time by clearing your browser's local storage and cookies. Instructions vary by browser — typically found under Settings → Privacy → Clear browsing data.",
      },
      {
        subtitle: "Right to Opt Out",
        body: "If analytics are active, you can opt out by enabling 'Do Not Track' in your browser settings. EventFit respects this signal and will not collect usage analytics when it is detected.",
      },
      {
        subtitle: "Right to Information",
        body: "You have the right to know what data EventFit holds about you. Because we store only anonymised session data and local browser storage, there is no user-identifiable data on our servers. We are fully transparent about this.",
      },
      {
        subtitle: "Contacting Us About Privacy",
        body: "If you have any questions, concerns, or requests related to your privacy and our data practices, please reach out to us using the contact information in the footer. We aim to respond to all privacy enquiries within 5 business days.",
      },
    ],
  },
  {
    id: "thirdparty",
    icon: ExternalLink,
    color: "#7C4DFF",
    title: "Third-Party Services",
    content: [
      {
        subtitle: "OpenWeatherMap API",
        body: "EventFit uses the OpenWeatherMap API to fetch real-time weather data for Pakistani cities. When you enter a city name, it is sent to OpenWeatherMap's servers. Their privacy policy governs how they handle this request. EventFit only uses the weather data returned — it does not log your city queries.",
      },
      {
        subtitle: "Unsplash API",
        body: "Outfit images are sourced from Unsplash. When outfit images load, your browser may make requests to Unsplash's CDN servers. Unsplash's privacy policy governs those interactions. EventFit does not pass any user data to Unsplash.",
      },
      {
        subtitle: "Google Fonts",
        body: "We use Google Fonts (Playfair Display, Cormorant Garamond, Inter) hosted on Google's CDN. When these fonts load, Google may receive your IP address as part of a standard font request. You can view Google's privacy policy at fonts.google.com for details.",
      },
      {
        subtitle: "Vercel / Hosting Provider",
        body: "EventFit is hosted on Vercel. Vercel's infrastructure may collect standard server logs including IP addresses and request metadata as part of normal hosting operations. These are governed by Vercel's privacy policy.",
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   ACCORDION ITEM
───────────────────────────────────────────── */
function AccordionItem({ item, index }) {
  const [open, setOpen] = useState(index === 0);
  const Icon = item.icon;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${open ? item.color + "40" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "16px",
        overflow: "hidden",
        transition: "border-color 0.3s ease",
        marginBottom: "12px",
      }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "20px 24px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: `rgba(${
              item.color === "#E8B84B"
                ? "232,184,75"
                : item.color === "#7C4DFF"
                ? "124,77,255"
                : item.color === "#00D4B4"
                ? "0,212,180"
                : "232,69,106"
            },0.12)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={18} style={{ color: item.color }} />
        </div>

        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#F8F3E6",
            flex: 1,
          }}
        >
          {item.title}
        </span>

        <ChevronDown
          size={18}
          style={{
            color: "#7A6E8A",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </button>

      {/* Body */}
      <div
        style={{
          maxHeight: open ? "2000px" : "0",
          overflow: "hidden",
          transition: "max-height 0.5s ease",
        }}
      >
        <div
          style={{
            padding: "0 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.05)",
            }}
          />
          {item.content.map((block) => (
            <div key={block.subtitle}>
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: item.color,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                {block.subtitle}
              </h4>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  color: "#BFB4D4",
                  lineHeight: 1.8,
                }}
              >
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PRIVACY PAGE
───────────────────────────────────────────── */
export default function PrivacyPage() {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        paddingTop: "70px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient orb */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,77,255,0.1) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          padding: "70px 24px 60px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "20px",
            background: "rgba(232,184,75,0.08)",
            border: "1px solid rgba(232,184,75,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
          }}
        >
          <Shield size={32} style={{ color: "#E8B84B" }} />
        </div>

        {/* Eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(232,184,75,0.07)",
            border: "1px solid rgba(232,184,75,0.18)",
            borderRadius: "100px",
            padding: "5px 16px",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              color: "#F5D07A",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Last updated: January 2026
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            fontWeight: 800,
            color: "#F8F3E6",
            marginBottom: "16px",
            lineHeight: 1.1,
          }}
        >
          Privacy{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #E8B84B, #E8456A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Policy
          </span>
        </h1>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            color: "#BFB4D4",
            marginBottom: "20px",
            lineHeight: 1.6,
          }}
        >
          Your privacy matters. Here's exactly what we collect and why.
        </p>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.9rem",
            color: "#7A6E8A",
            lineHeight: 1.8,
            maxWidth: "580px",
            margin: "0 auto",
          }}
        >
          EventFit is a Final Year Project built by students at the University
          of Gujrat. We are committed to handling any data we touch with
          transparency, care, and respect. This policy explains our practices in
          plain language.
        </p>
      </section>

      {/* ── NOTICE BANNER ── */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto 40px",
          padding: "0 24px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.2s",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "14px",
            background: "rgba(0,212,180,0.06)",
            border: "1px solid rgba(0,212,180,0.2)",
            borderRadius: "14px",
            padding: "18px 22px",
          }}
        >
          <AlertCircle
            size={18}
            style={{ color: "#00D4B4", flexShrink: 0, marginTop: "2px" }}
          />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
              color: "#BFB4D4",
              lineHeight: 1.7,
            }}
          >
            <strong style={{ color: "#00D4B4" }}>TL;DR: </strong>
            EventFit stores your outfit preferences only in your own browser.
            We never sell your data. We never require an account. The only
            external service that receives any input from you is OpenWeatherMap
            (to look up weather for the city you type). That's it.
          </p>
        </div>
      </div>

      {/* ── ACCORDION SECTIONS ── */}
      <section
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "0 24px 80px",
          position: "relative",
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
        }}
      >
        {SECTIONS.map((section, i) => (
          <AccordionItem key={section.id} item={section} index={i} />
        ))}

        {/* Contact block */}
        <div
          style={{
            marginTop: "40px",
            background: "rgba(232,184,75,0.04)",
            border: "1px solid rgba(232,184,75,0.18)",
            borderRadius: "16px",
            padding: "32px 28px",
            display: "flex",
            alignItems: "flex-start",
            gap: "18px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "rgba(232,184,75,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Mail size={20} style={{ color: "#E8B84B" }} />
          </div>
          <div style={{ flex: 1, minWidth: "220px" }}>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#F8F3E6",
                marginBottom: "8px",
              }}
            >
              Questions about this policy?
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "#7A6E8A",
                lineHeight: 1.7,
                marginBottom: "16px",
              }}
            >
              Reach out to the EventFit team at the University of Gujrat,
              Department of Computer Science. We&apos;ll respond to any privacy
              questions or concerns promptly.
            </p>
            <div
              style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
            >
              <Link to="/about" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ fontSize: "0.82rem" }}>
                  Meet the Team
                </button>
              </Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                <button
                  className="btn-secondary"
                  style={{ fontSize: "0.82rem" }}
                >
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.78rem",
            color: "#7A6E8A",
            textAlign: "center",
            marginTop: "32px",
            lineHeight: 1.7,
          }}
        >
          This Privacy Policy applies to the EventFit web application developed
          as a Final Year Project at the University of Gujrat. It may be updated
          as the project evolves. Continued use of EventFit after any changes
          constitutes acceptance of the updated policy.
          <br />
          <span style={{ color: "#5A506A" }}>
            © 2026 EventFit — Department of Computer Science, University of
            Gujrat
          </span>
        </p>
      </section>
    </main>
  );
}
