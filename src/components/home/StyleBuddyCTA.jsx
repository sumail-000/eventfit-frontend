import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  ArrowRight,
  MapPin,
  Thermometer,
  Send,
  User,
  Mic,
  Paperclip,
  ChevronRight,
} from "lucide-react";

/* ── Mock conversation that plays automatically ── */
const DEMO_CONVERSATION = [
  {
    id: 1,
    role: "bot",
    text: "Assalam-o-Alaikum! I'm **StyleBuddy** — your personal fashion advisor. Which event are you dressing for today?",
    delay: 0,
  },
  {
    id: 2,
    role: "user",
    text: "I have my best friend's wedding this weekend in Lahore!",
    delay: 1400,
  },
  {
    id: 3,
    role: "bot",
    text: "Wonderful! Checking Lahore's weather for this weekend...",
    delay: 2600,
    isTyping: true,
  },
  {
    id: 4,
    role: "weather",
    city: "Lahore",
    temp: 18,
    condition: "Partly Cloudy",
    humidity: 62,
    delay: 3800,
  },
  {
    id: 5,
    role: "bot",
    text: "It's a cool **18°C** in Lahore — perfect wedding weather! Are you attending as a **guest** or are you the **bride/groom**?",
    delay: 5000,
  },
  {
    id: 6,
    role: "user",
    text: "I'm a guest — women's outfit please!",
    delay: 6400,
  },
  {
    id: 7,
    role: "bot",
    text: "Perfect! Based on cool 18°C weather and a wedding occasion, here are my top picks for you 👇",
    delay: 7600,
  },
  {
    id: 8,
    role: "outfit-cards",
    delay: 8800,
    outfits: [
      {
        name: "Emerald Lehenga",
        fabric: "Net · Resham Embroidery",
        image:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80",
        badge: "Weather Perfect",
        badgeColor: "#00D4B4",
      },
      {
        name: "Ruby Gharara",
        fabric: "Pure Silk · Zardozi",
        image:
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=200&q=80",
        badge: "Most Loved",
        badgeColor: "#E8456A",
      },
    ],
  },
];

const QUICK_CHIPS = [
  "Wedding in Lahore",
  "Interview tomorrow",
  "Eid outfit ideas",
  "Casual outing today",
  "Office wear — cold weather",
];

export default function StyleBuddyCTA() {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [typingVisible, setTypingVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [userInput, setUserInput] = useState("");
  const chatEndRef = useRef(null);
  const sectionRef = useRef(null);
  const timerRefs = useRef([]);

  /* ── Play the demo conversation sequence ── */
  const playConversation = () => {
    DEMO_CONVERSATION.forEach((msg) => {
      if (msg.isTyping) {
        const t = setTimeout(() => setTypingVisible(true), msg.delay);
        timerRefs.current.push(t);
        const t2 = setTimeout(() => setTypingVisible(false), msg.delay + 1000);
        timerRefs.current.push(t2);
        return;
      }
      const t = setTimeout(() => {
        setVisibleMessages((prev) => {
          if (prev.find((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      }, msg.delay);
      timerRefs.current.push(t);
    });
  };

  /* ── Start the demo conversation when section enters viewport ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          playConversation();
        }
      },
      { threshold: 0.35 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      timerRefs.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  /* ── Auto scroll chat to bottom — only after messages start appearing ── */
  useEffect(() => {
    if (visibleMessages.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [visibleMessages, typingVisible]);

  const parseBold = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} style={{ color: "#F5D07A", fontWeight: 700 }}>
          {part}
        </strong>
      ) : (
        part
      ),
    );
  };

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "100px 0 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Section background orbs ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          left: "-100px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,77,255,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "5%",
          right: "-60px",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,69,106,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(232,184,75,0.12), transparent)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        <div
          style={{
            gap: "64px",
            alignItems: "center",
          }}
          className="flex flex-col lg:grid lg:grid-cols-2"
        >
          {/* ══════════ LEFT: Copy & features ══════════ */}
          <div>
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(124,77,255,0.08)",
                border: "1px solid rgba(124,77,255,0.25)",
                borderRadius: "100px",
                padding: "6px 16px",
                marginBottom: "28px",
              }}
            >
              {/* live dot */}
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#00D4B4",
                  boxShadow: "0 0 10px #00D4B4",
                  flexShrink: 0,
                  animation: "pulseGold 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "0.84rem",
                  letterSpacing: "0.1em",
                  color: "#A47BFF",
                  textTransform: "uppercase",
                }}
              >
                Meet your fashion advisor
              </span>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#F8F3E6",
                marginBottom: "20px",
              }}
            >
              Chat with{" "}
              <span
                style={{
                  fontStyle: "italic",
                  background:
                    "linear-gradient(135deg, #A47BFF 0%, #7C4DFF 40%, #E8456A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                StyleBuddy
              </span>
              <br />— your personal{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F5D07A, #E8B84B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                outfit guide
              </span>
            </h2>

            {/* Subtext */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "#BFB4D4",
                lineHeight: 1.75,
                maxWidth: "460px",
                marginBottom: "36px",
              }}
            >
              StyleBuddy is a conversational AI assistant that asks you about
              your event, checks your city&apos;s live weather, and recommends
              perfectly-matched outfits — grounded in Pakistani fashion culture.
            </p>

            {/* Feature list */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "40px",
              }}
            >
              {[
                {
                  icon: MessageCircle,
                  title: "Conversational & natural",
                  desc: "Just type like you'd chat with a friend — StyleBuddy understands context.",
                  color: "#A47BFF",
                  bg: "rgba(124,77,255,0.08)",
                  border: "rgba(124,77,255,0.2)",
                },
                {
                  icon: MapPin,
                  title: "Live weather-aware",
                  desc: "Your city's real-time temperature and conditions shape every suggestion.",
                  color: "#E8B84B",
                  bg: "rgba(232,184,75,0.08)",
                  border: "rgba(232,184,75,0.2)",
                },
                {
                  icon: Thermometer,
                  title: "Pakistani culture & brands",
                  desc: "Recommendations include local brands, fabric types and cultural context.",
                  color: "#4DEFE0",
                  bg: "rgba(0,212,180,0.07)",
                  border: "rgba(0,212,180,0.18)",
                },
              ].map(({ icon: Icon, title, desc, color, bg, border }) => (
                <div
                  key={title}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: bg,
                      border: `1px solid ${border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <Icon size={17} strokeWidth={1.8} style={{ color }} />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "#F8F3E6",
                        marginBottom: "3px",
                      }}
                    >
                      {title}
                    </h4>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.83rem",
                        color: "#7A6E8A",
                        lineHeight: 1.6,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick-start chips */}
            <div style={{ marginBottom: "32px" }}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.73rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#7A6E8A",
                  marginBottom: "12px",
                }}
              >
                Try asking StyleBuddy:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {QUICK_CHIPS.map((chip) => (
                  <Link
                    key={chip}
                    to={`/stylebuddy?q=${encodeURIComponent(chip)}`}
                    style={{ textDecoration: "none" }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.78rem",
                        color: "#BFB4D4",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "100px",
                        padding: "6px 14px",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#F5D07A";
                        e.currentTarget.style.borderColor =
                          "rgba(232,184,75,0.3)";
                        e.currentTarget.style.background =
                          "rgba(232,184,75,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#BFB4D4";
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.08)";
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.04)";
                      }}
                    >
                      <ChevronRight
                        size={11}
                        strokeWidth={2.5}
                        style={{ flexShrink: 0 }}
                      />
                      {chip}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <Link to="/stylebuddy" style={{ textDecoration: "none" }}>
                <button className="btn-violet">
                  <MessageCircle size={15} strokeWidth={2.2} />
                  Open StyleBuddy
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#00D4B4",
                      boxShadow: "0 0 8px #00D4B4",
                    }}
                  />
                </button>
              </Link>
              <Link to="/get-outfit" style={{ textDecoration: "none" }}>
                <button className="btn-ghost">
                  Or use the form instead
                  <ArrowRight size={13} strokeWidth={2} />
                </button>
              </Link>
            </div>
          </div>

          {/* ══════════ RIGHT: Live chat preview ══════════ */}
          <div
            style={{
              position: "relative",
            }}
          >
            {/* Glow halo behind the card */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "-24px",
                borderRadius: "32px",
                background:
                  "radial-gradient(ellipse at 60% 40%, rgba(124,77,255,0.18) 0%, transparent 65%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Chat window */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                borderRadius: "24px",
                overflow: "hidden",
                background: "rgba(10, 11, 20, 0.92)",
                backdropFilter: "blur(30px)",
                border: "1px solid rgba(124,77,255,0.25)",
                boxShadow:
                  "0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(124,77,255,0.1)",
              }}
            >
              {/* ── Window chrome / title bar ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(13,15,30,0.8)",
                }}
              >
                {/* Left: Avatar + name */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      position: "relative",
                      width: "38px",
                      height: "38px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #7C4DFF, #E8456A)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 16px rgba(124,77,255,0.4)",
                      flexShrink: 0,
                    }}
                  >
                    <MessageCircle size={17} color="#fff" strokeWidth={2} />
                    {/* online dot */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-2px",
                        right: "-2px",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "#00D4B4",
                        border: "2px solid #0A0B14",
                        boxShadow: "0 0 8px #00D4B4",
                      }}
                    />
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        color: "#F8F3E6",
                        lineHeight: 1.1,
                      }}
                    >
                      StyleBuddy
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.68rem",
                        color: "#00D4B4",
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                      }}
                    >
                      Online · Fashion Advisor
                    </div>
                  </div>
                </div>

                {/* Right: window dots */}
                <div style={{ display: "flex", gap: "6px" }}>
                  {["#E8456A", "#E8B84B", "#00D4B4"].map((c) => (
                    <div
                      key={c}
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: c,
                        opacity: 0.6,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* ── Chat messages area ── */}
              <div
                style={{
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  minHeight: "380px",
                  maxHeight: "420px",
                  overflowY: "auto",
                  scrollbarWidth: "none",
                }}
              >
                {visibleMessages.map((msg) => {
                  if (msg.role === "weather") {
                    return <WeatherChip key={msg.id} msg={msg} />;
                  }
                  if (msg.role === "outfit-cards") {
                    return (
                      <OutfitCardsInChat key={msg.id} outfits={msg.outfits} />
                    );
                  }
                  return (
                    <ChatMessage key={msg.id} msg={msg} parseBold={parseBold} />
                  );
                })}

                {/* Typing indicator */}
                {typingVisible && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      alignSelf: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "linear-gradient(135deg, #7C4DFF, #E8456A)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <MessageCircle size={12} color="#fff" strokeWidth={2} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "12px 12px 12px 4px",
                        padding: "10px 14px",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "#A47BFF",
                            display: "inline-block",
                            animation: "wave 1.2s ease-in-out infinite",
                            animationDelay: `${i * 0.18}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* ── Input bar ── */}
              <div
                style={{
                  padding: "12px 16px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(13,15,30,0.7)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {/* input */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(124,77,255,0.2)",
                    borderRadius: "12px",
                    padding: "9px 14px",
                  }}
                >
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask StyleBuddy anything..."
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#F8F3E6",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.83rem",
                    }}
                  />
                  <Paperclip
                    size={14}
                    strokeWidth={1.8}
                    style={{
                      color: "#7A6E8A",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  />
                  <Mic
                    size={14}
                    strokeWidth={1.8}
                    style={{
                      color: "#7A6E8A",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  />
                </div>

                {/* send button */}
                <Link to="/stylebuddy" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #7C4DFF, #E8456A)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      outline: "none",
                      flexShrink: 0,
                      boxShadow: "0 4px 16px rgba(124,77,255,0.4)",
                      transition: "opacity 0.25s, transform 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.88";
                      e.currentTarget.style.transform = "scale(1.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    aria-label="Open StyleBuddy"
                  >
                    <Send size={15} color="#fff" strokeWidth={2.2} />
                  </button>
                </Link>
              </div>
            </div>

            {/* ── Floating "try me" label ── */}
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(13,15,30,0.92)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(232,184,75,0.25)",
                borderRadius: "100px",
                padding: "6px 18px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                zIndex: 2,
                whiteSpace: "nowrap",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#E8B84B",
                  boxShadow: "0 0 8px #E8B84B",
                }}
              />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  color: "#F5D07A",
                  letterSpacing: "0.08em",
                }}
              >
                Live demo — see StyleBuddy in action
              </span>
            </div>

            {/* ── Floating stat chips ── */}
            <div
              style={{
                position: "absolute",
                bottom: "-18px",
                left: "-20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(13,15,30,0.92)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(0,212,180,0.22)",
                borderRadius: "14px",
                padding: "10px 16px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "9px",
                  background: "rgba(0,212,180,0.12)",
                  border: "1px solid rgba(0,212,180,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <User
                  size={14}
                  strokeWidth={1.8}
                  style={{ color: "#4DEFE0" }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#F8F3E6",
                    lineHeight: 1,
                    marginBottom: "2px",
                  }}
                >
                  10,000+
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.68rem",
                    color: "#7A6E8A",
                    letterSpacing: "0.04em",
                  }}
                >
                  conversations started
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

function ChatMessage({ msg, parseBold }) {
  const isUser = msg.role === "user";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        flexDirection: isUser ? "row-reverse" : "row",
        animation: "fadeUp 0.4s ease forwards",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "8px",
          background: isUser
            ? "linear-gradient(135deg, #E8456A, #7C4DFF)"
            : "linear-gradient(135deg, #7C4DFF, #E8456A)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {isUser ? (
          <User size={12} strokeWidth={2} style={{ color: "#F8F3E6" }} />
        ) : (
          <MessageCircle
            size={12}
            strokeWidth={2}
            style={{ color: "#F8F3E6" }}
          />
        )}
      </div>

      {/* Bubble */}
      <div className={isUser ? "bubble-user" : "bubble-bot"}>
        {parseBold(msg.text)}
      </div>
    </div>
  );
}

/* ── Weather chip ── */
function WeatherChip({ msg }) {
  return (
    <div
      style={{
        alignSelf: "flex-start",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(0,212,180,0.08)",
        border: "1px solid rgba(0,212,180,0.2)",
        borderRadius: "14px",
        padding: "10px 14px",
        animation: "fadeUp 0.4s ease forwards",
      }}
    >
      <Thermometer
        size={15}
        strokeWidth={2}
        style={{ color: "#4DEFE0", flexShrink: 0 }}
      />
      <div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#4DEFE0",
            letterSpacing: "0.04em",
          }}
        >
          {msg.city} — {msg.temp}°C · {msg.condition}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.68rem",
            color: "#7A6E8A",
            marginTop: "2px",
          }}
        >
          Humidity: {msg.humidity}%
        </div>
      </div>
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#00D4B4",
          boxShadow: "0 0 8px #00D4B4",
          marginLeft: "auto",
          flexShrink: 0,
        }}
      />
    </div>
  );
}

/* ── Outfit cards inside chat ── */
function OutfitCardsInChat({ outfits }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        animation: "fadeUp 0.4s ease forwards",
      }}
    >
      {outfits.map((outfit) => (
        <Link
          key={outfit.name}
          to="/get-outfit"
          style={{
            textDecoration: "none",
            flex: "1 1 130px",
            maxWidth: "170px",
          }}
        >
          <div
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              cursor: "pointer",
              transition: "border-color 0.25s, transform 0.25s",
            }}
          >
            <div style={{ position: "relative", height: "110px" }}>
              <img
                src={outfit.image}
                alt={outfit.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "6px",
                  left: "6px",
                  background: `${outfit.badgeColor}25`,
                  border: `1px solid ${outfit.badgeColor}40`,
                  borderRadius: "100px",
                  padding: "2px 8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    color: outfit.badgeColor,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {outfit.badge}
                </span>
              </div>
            </div>
            <div style={{ padding: "8px 10px" }}>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#F8F3E6",
                  marginBottom: "2px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {outfit.name}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.67rem",
                  color: "#7A6E8A",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {outfit.fabric}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
