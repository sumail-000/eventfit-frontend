import { Link } from "react-router-dom";
import {
  Scissors,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  ArrowUpRight,
  Heart,
  ChevronRight,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const FOOTER_LINKS = {
  Discover: [
    { label: "Wedding Outfits", path: "/events?type=wedding" },
    { label: "Interview Looks", path: "/events?type=interview" },
    { label: "Party Wear", path: "/events?type=party" },
    { label: "Eid Collection", path: "/events?type=eid" },
    { label: "Office Attire", path: "/events?type=formal" },
    { label: "Casual Styles", path: "/events?type=casual" },
  ],
  StyleBuddy: [
    { label: "Chat with StyleBuddy", path: "/stylebuddy" },
    { label: "Get Recommendations", path: "/get-outfit" },
    { label: "Weather + Outfit", path: "/get-outfit#weather" },
    { label: "Browse by Gender", path: "/events" },
    { label: "Trending Looks", path: "/#trending" },
  ],
  About: [
    { label: "About EventFit", path: "/about" },
    { label: "How It Works", path: "/#how-it-works" },
    { label: "Our Mission", path: "/about#mission" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
  ],
};

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    icon: Instagram,
    href: "#",
    color: "#E8456A",
    bg: "rgba(232,69,106,0.1)",
    border: "rgba(232,69,106,0.25)",
  },
  {
    label: "Facebook",
    icon: Facebook,
    href: "#",
    color: "#A47BFF",
    bg: "rgba(124,77,255,0.1)",
    border: "rgba(124,77,255,0.25)",
  },
  {
    label: "Twitter / X",
    icon: Twitter,
    href: "#",
    color: "#BFB4D4",
    bg: "rgba(191,180,212,0.08)",
    border: "rgba(191,180,212,0.2)",
  },
  {
    label: "YouTube",
    icon: Youtube,
    href: "#",
    color: "#FF7A9A",
    bg: "rgba(255,122,154,0.1)",
    border: "rgba(255,122,154,0.22)",
  },
];

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
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer
      style={{
        background:
          "linear-gradient(180deg, rgba(7,8,15,0) 0%, #07080F 8%, #0A0B18 100%)",
        borderTop: "1px solid rgba(232,184,75,0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── decorative top glow ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(232,184,75,0.45), transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-120px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "240px",
          background:
            "radial-gradient(ellipse, rgba(232,184,75,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        {/* ─────────────── NEWSLETTER BAND ─────────────── */}
        <div
          style={{
            position: "relative",
            borderRadius: "20px",
            padding: "clamp(28px, 4vw, 48px) clamp(24px, 4vw, 48px)",
            margin: "48px 0 56px",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(124,77,255,0.12) 0%, rgba(232,69,106,0.1) 50%, rgba(232,184,75,0.08) 100%)",
            border: "1px solid rgba(232,184,75,0.2)",
          }}
        >
          {/* background orbs */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "-60px",
              right: "-60px",
              width: "260px",
              height: "260px",
              background:
                "radial-gradient(circle, rgba(232,184,75,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: "-60px",
              left: "-60px",
              width: "220px",
              height: "220px",
              background:
                "radial-gradient(circle, rgba(124,77,255,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* shimmer line */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 10%, rgba(245,208,122,0.4) 50%, transparent 90%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "28px",
            }}
          >
            {/* badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 16px",
                borderRadius: "100px",
                background: "rgba(232,184,75,0.1)",
                border: "1px solid rgba(232,184,75,0.25)",
              }}
            >
              <Sparkles
                size={12}
                style={{ color: "#E8B84B" }}
                strokeWidth={2.2}
              />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  color: "#E8B84B",
                  textTransform: "uppercase",
                }}
              >
                Stay in style
              </span>
            </div>

            {/* heading */}
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 700,
                color: "#F8F3E6",
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Get seasonal style{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F5D07A, #E8456A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                alerts
              </span>
            </h3>

            {/* subtitle */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                color: "#BFB4D4",
                lineHeight: 1.7,
                maxWidth: "520px",
                margin: 0,
              }}
            >
              Receive curated outfit guides for every Pakistani season, event
              calendar updates &amp; exclusive style tips — delivered to your
              inbox.
            </p>

            {/* subscribe form */}
            <div style={{ width: "100%", maxWidth: "480px" }}>
              {subscribed ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    padding: "20px 0",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(135deg, rgba(0,212,180,0.2), rgba(124,77,255,0.15))",
                      border: "1px solid rgba(0,212,180,0.3)",
                    }}
                  >
                    <Heart
                      size={22}
                      style={{ color: "#4DEFE0" }}
                      strokeWidth={2}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "#F8F3E6",
                      margin: 0,
                    }}
                  >
                    You&apos;re on the list!
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.8125rem",
                      color: "#7A6E8A",
                      margin: 0,
                    }}
                  >
                    Watch your inbox for style updates.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} noValidate>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ flex: "1 1 240px", minWidth: "200px" }}>
                      <input
                        type="email"
                        className="input-field"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError("");
                        }}
                        style={{
                          height: "48px",
                          borderRadius: "12px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          fontSize: "0.9rem",
                          textAlign: "center",
                        }}
                      />
                      {emailError && (
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.75rem",
                            color: "#FF7A9A",
                            marginTop: "6px",
                          }}
                        >
                          {emailError}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{
                        height: "48px",
                        padding: "0 28px",
                        borderRadius: "12px",
                        fontSize: "0.85rem",
                        flexShrink: 0,
                      }}
                    >
                      <Send size={14} strokeWidth={2.2} />
                      Subscribe
                    </button>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      color: "#7A6E8A",
                      marginTop: "12px",
                    }}
                  >
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ─────────────── MAIN FOOTER GRID ─────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            paddingBottom: "48px",
          }}
          className="footer-grid"
        >
          {/* ── Brand column ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* Logo */}
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  flexShrink: 0,
                  background:
                    "linear-gradient(135deg, #E8B84B 0%, #E8456A 100%)",
                  boxShadow: "0 4px 18px rgba(232,184,75,0.3)",
                }}
              >
                <Scissors
                  size={19}
                  color="#07080F"
                  strokeWidth={2.2}
                  style={{ transform: "rotate(-45deg)" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.35rem",
                    background:
                      "linear-gradient(135deg, #F5D07A 0%, #E8B84B 55%, #E8456A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  EventFit
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "0.62rem",
                    letterSpacing: "0.18em",
                    color: "rgba(232,184,75,0.5)",
                    textTransform: "uppercase",
                    marginTop: "3px",
                  }}
                >
                  Smart Outfit Advisor
                </span>
              </div>
            </Link>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "#7A6E8A",
                lineHeight: 1.8,
                maxWidth: "340px",
              }}
            >
              Pakistan&apos;s intelligent outfit recommendation platform —
              blending real-time weather intelligence with event-aware fashion
              for every occasion and cultural context.
            </p>

            {/* Contact + Social row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "32px",
                alignItems: "flex-start",
              }}
            >
              {/* Contact info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  {
                    icon: MapPin,
                    text: "University of Gujrat, Punjab, Pakistan",
                    color: "#E8B84B",
                  },
                  {
                    icon: Mail,
                    text: "hello@eventfit.pk",
                    color: "#A47BFF",
                  },
                  {
                    icon: Phone,
                    text: "+92 (055) 000-0000",
                    color: "#4DEFE0",
                  },
                ].map(({ icon: Icon, text, color }) => (
                  <div
                    key={text}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: `${color}15`,
                        border: `1px solid ${color}28`,
                      }}
                    >
                      <Icon size={14} style={{ color }} strokeWidth={1.8} />
                    </div>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.8125rem",
                        color: "#BFB4D4",
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {SOCIAL_LINKS.map(
                ({ label, icon: Icon, href, color, bg, border }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      borderRadius: "12px",
                      background: bg,
                      border: `1px solid ${border}`,
                      color,
                      textDecoration: "none",
                      transition: "transform 0.25s, box-shadow 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = `0 8px 20px ${color}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <Icon size={16} strokeWidth={1.8} />
                  </a>
                ),
              )}
            </div>
          </div>

          {/* ── Link columns ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
            }}
            className="footer-links-grid"
          >
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <div style={{ marginBottom: "20px" }}>
                  <h4
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#E8B84B",
                      marginBottom: "10px",
                    }}
                  >
                    {heading}
                  </h4>
                  {/* gold rule */}
                  <div
                    style={{
                      width: "28px",
                      height: "2px",
                      background:
                        "linear-gradient(90deg, #E8B84B, transparent)",
                      borderRadius: "2px",
                    }}
                  />
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {links.map(({ label, path }) => (
                    <li key={label}>
                      <Link
                        to={path}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.8125rem",
                          color: "#7A6E8A",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#F5D07A";
                          const arrow =
                            e.currentTarget.querySelector(".link-arrow");
                          if (arrow) {
                            arrow.style.opacity = "1";
                            arrow.style.transform = "translate(2px, -2px)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#7A6E8A";
                          const arrow =
                            e.currentTarget.querySelector(".link-arrow");
                          if (arrow) {
                            arrow.style.opacity = "0";
                            arrow.style.transform = "translate(0, 0)";
                          }
                        }}
                      >
                        <ChevronRight
                          size={11}
                          strokeWidth={2.5}
                          style={{
                            color: "rgba(232,184,75,0.4)",
                            flexShrink: 0,
                          }}
                        />
                        <span>{label}</span>
                        <ArrowUpRight
                          size={11}
                          strokeWidth={2}
                          className="link-arrow"
                          style={{
                            opacity: 0,
                            transition: "opacity 0.2s, transform 0.2s",
                            flexShrink: 0,
                          }}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ─────────────── CITIES ROW ─────────────── */}
        <div
          style={{
            padding: "20px 0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px 14px",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#E8B84B",
                flexShrink: 0,
                background: "rgba(232,184,75,0.08)",
                padding: "4px 14px",
                borderRadius: "100px",
                border: "1px solid rgba(232,184,75,0.15)",
              }}
            >
              Available in
            </span>
            {CITIES.map((city, i) => (
              <span
                key={city}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <Link
                  to={`/get-outfit?city=${city.toLowerCase()}`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem",
                    color: "#7A6E8A",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#BFB4D4")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#7A6E8A")
                  }
                >
                  {city}
                </Link>
                {i < CITIES.length - 1 && (
                  <span
                    style={{
                      width: "3px",
                      height: "3px",
                      borderRadius: "50%",
                      background: "rgba(232,184,75,0.25)",
                      display: "inline-block",
                    }}
                  />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* ─────────────── BOTTOM BAR ─────────────── */}
        <div
          style={{
            padding: "20px 0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px 32px",
          }}
        >
          {/* copyright */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.775rem",
              color: "#4A4060",
              textAlign: "center",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()}{" "}
            <span style={{ color: "#7A6E8A" }}>EventFit</span> — University of
            Gujrat Final Year Project. All rights reserved.
          </p>

          {/* separator dot */}
          <span
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "rgba(232,184,75,0.2)",
            }}
            className="bottom-dot"
          />

          {/* made with */}
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              color: "#4A4060",
              margin: 0,
            }}
          >
            Crafted with
            <Heart
              size={11}
              strokeWidth={2.5}
              style={{ color: "#E8456A", fill: "#E8456A" }}
            />
            for Pakistani fashion
          </p>

          {/* separator dot */}
          <span
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "rgba(232,184,75,0.2)",
            }}
            className="bottom-dot"
          />

          {/* university tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 14px",
              borderRadius: "8px",
              background: "rgba(232,184,75,0.06)",
              border: "1px solid rgba(232,184,75,0.12)",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#E8B84B",
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                color: "rgba(232,184,75,0.6)",
                letterSpacing: "0.04em",
              }}
            >
              CS Dept · UOG · BS 2022
            </span>
          </div>
        </div>
      </div>

      {/* ─── CSS for responsive footer grid ─── */}
      <style>{`
        .footer-grid {
          grid-template-columns: 1fr !important;
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1.1fr 1.5fr !important;
            gap: 48px !important;
          }
        }
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1.15fr 1.6fr !important;
            gap: 64px !important;
          }
        }
        .footer-links-grid {
          grid-template-columns: 1fr 1fr !important;
        }
        @media (min-width: 640px) {
          .footer-links-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        .bottom-dot {
          display: none;
        }
        @media (min-width: 640px) {
          .bottom-dot {
            display: inline-block;
          }
        }
      `}</style>
    </footer>
  );
}
