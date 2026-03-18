import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  CheckCircle,
  XCircle,
  Copyright,
  AlertTriangle,
  Scale,
  RefreshCw,
  ChevronDown,
  Mail,
} from "lucide-react";

/* ─────────────────────────────────────────────
   TERMS SECTIONS DATA
───────────────────────────────────────────── */
const SECTIONS = [
  {
    id: "acceptance",
    icon: CheckCircle,
    color: "#E8B84B",
    title: "Acceptance of Terms",
    content: [
      {
        subtitle: "Agreement to These Terms",
        body: "By accessing or using EventFit — the Smart Outfit Recommendation Website — you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue your use of the platform immediately.",
      },
      {
        subtitle: "Who Can Use EventFit",
        body: "EventFit is open to all users without age restrictions for general browsing and outfit recommendations. The platform is designed as an educational Final Year Project and does not involve financial transactions, contracts, or legally binding agreements with users.",
      },
      {
        subtitle: "Modification of Terms",
        body: "These terms may be updated as the EventFit project evolves. We will note the 'Last Updated' date at the top of this page when changes are made. Continued use of EventFit after any modifications constitutes your acceptance of the revised terms.",
      },
    ],
  },
  {
    id: "use",
    icon: CheckCircle,
    color: "#00D4B4",
    title: "Acceptable Use",
    content: [
      {
        subtitle: "Permitted Uses",
        body: "You may use EventFit to browse outfit recommendations, interact with the StyleBuddy chat assistant, save outfit ideas, explore event categories, and obtain weather-based fashion advice. You may use EventFit for personal, educational, or research purposes.",
      },
      {
        subtitle: "Prohibited Activities",
        body: "You agree not to attempt to reverse-engineer, scrape, or systematically download content from EventFit. You must not use the platform to transmit harmful, malicious, or illegal content. Automated bots or scrapers that place excessive load on our servers are not permitted.",
      },
      {
        subtitle: "Respectful Use",
        body: "EventFit is a student-built project representing significant academic effort. We ask that you use it respectfully and report any bugs or issues rather than attempting to exploit them. Constructive feedback is always welcome.",
      },
      {
        subtitle: "No Misrepresentation",
        body: "You agree not to misrepresent EventFit, claim ownership of its design or code, or present it as your own work. Academic or portfolio references to EventFit should appropriately credit the original team.",
      },
    ],
  },
  {
    id: "prohibited",
    icon: XCircle,
    color: "#E8456A",
    title: "Prohibited Conduct",
    content: [
      {
        subtitle: "No Harmful Activity",
        body: "You must not use EventFit in any way that could damage, disable, overburden, or impair the platform's servers or infrastructure. Denial-of-service attacks, injection attacks, or any form of hacking attempt is strictly prohibited.",
      },
      {
        subtitle: "No Unauthorised Access",
        body: "You must not attempt to gain unauthorised access to any portion of EventFit's backend, database, or administrative systems. All such attempts will be treated as a violation of these terms and may be reported to relevant authorities.",
      },
      {
        subtitle: "Intellectual Property Violations",
        body: "Copying, reproducing, or distributing EventFit's source code, designs, outfit data, or written content for commercial purposes without explicit permission is prohibited. See the Intellectual Property section below for full details.",
      },
      {
        subtitle: "Interference with Other Users",
        body: "Since EventFit does not currently have user accounts or social features, direct user-to-user harm is not applicable. However, any future features enabling user interaction will carry a zero-tolerance policy for harassment, abuse, or discriminatory conduct.",
      },
    ],
  },
  {
    id: "ip",
    icon: Copyright,
    color: "#7C4DFF",
    title: "Intellectual Property",
    content: [
      {
        subtitle: "Ownership",
        body: "EventFit — including its design system, source code, outfit recommendation logic, StyleBuddy chat flows, written content, and visual identity — is the intellectual property of its creators: Kinza Bilal, Nida Noor, and Eman Bibi, developed under the supervision of the Department of Computer Science, University of Gujrat.",
      },
      {
        subtitle: "Third-Party Assets",
        body: "Outfit images displayed on EventFit are sourced from Unsplash and are subject to the Unsplash License. Icons are provided by Lucide React under the ISC licence. Google Fonts are used under the Google Fonts Terms of Service. Weather data is provided by OpenWeatherMap under their standard API terms.",
      },
      {
        subtitle: "Open Source Components",
        body: "EventFit is built on open-source technologies including React.js (MIT), Vite (MIT), Tailwind CSS (MIT), Framer Motion (MIT), and others. Their respective licences remain intact and are not affected by these terms.",
      },
      {
        subtitle: "Academic Use",
        body: "Academic institutions, educators, and students may reference EventFit in research, reports, and presentations with appropriate attribution. Citing the project should include the team members' names, institution, and project year.",
      },
    ],
  },
  {
    id: "disclaimer",
    icon: AlertTriangle,
    color: "#E8B84B",
    title: "Disclaimers & Limitations",
    content: [
      {
        subtitle: "Fashion Advice Disclaimer",
        body: "Outfit recommendations provided by EventFit are generated algorithmically based on event type, weather data, and curated fashion data. They are provided for informational and inspirational purposes only. EventFit does not guarantee that any recommendation will be suitable for every individual's body type, cultural context, or personal taste.",
      },
      {
        subtitle: "Weather Data Accuracy",
        body: "Weather information is fetched from OpenWeatherMap in real time and is presented as-is. EventFit does not guarantee the accuracy, completeness, or timeliness of weather data. Always verify current conditions through an authoritative source before making decisions that depend on weather.",
      },
      {
        subtitle: "No Warranty",
        body: "EventFit is provided 'as is' and 'as available' without any warranty of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. As a student project, the platform may experience downtime, bugs, or interruptions.",
      },
      {
        subtitle: "Limitation of Liability",
        body: "To the maximum extent permitted by law, the EventFit team and the University of Gujrat shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, EventFit or its recommendations.",
      },
    ],
  },
  {
    id: "thirdparty",
    icon: RefreshCw,
    color: "#00D4B4",
    title: "Third-Party Links & Services",
    content: [
      {
        subtitle: "External Links",
        body: "EventFit may include links to third-party websites, brands, or services mentioned in outfit descriptions. These links are provided for convenience only. EventFit has no control over the content, privacy policies, or practices of any third-party site and accepts no responsibility for them.",
      },
      {
        subtitle: "Brand Mentions",
        body: "Brand names mentioned in outfit recommendations (e.g., fabric suppliers, clothing retailers) are referenced for informational purposes only. EventFit is not affiliated with, endorsed by, or in any commercial relationship with any brand or retailer mentioned.",
      },
      {
        subtitle: "API Service Terms",
        body: "Your use of weather data via EventFit is subject to OpenWeatherMap's Terms of Service. Your use of images is subject to the Unsplash License. By using EventFit, you implicitly agree to abide by the terms of any third-party services whose data is surfaced through the platform.",
      },
    ],
  },
  {
    id: "governing",
    icon: Scale,
    color: "#E8456A",
    title: "Governing Law & Disputes",
    content: [
      {
        subtitle: "Governing Law",
        body: "These Terms of Service are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan. Any disputes arising from your use of EventFit shall be subject to the jurisdiction of the courts of Gujrat, Punjab, Pakistan.",
      },
      {
        subtitle: "Informal Resolution First",
        body: "Before pursuing any formal legal action, we encourage you to contact the EventFit team directly to attempt to resolve any dispute informally. Most concerns can be addressed quickly and amicably through direct communication.",
      },
      {
        subtitle: "Severability",
        body: "If any provision of these Terms is found to be unenforceable or invalid under applicable law, that provision will be limited or eliminated to the minimum extent necessary so that the remaining Terms remain in full force and effect.",
      },
      {
        subtitle: "Entire Agreement",
        body: "These Terms of Service, together with the Privacy Policy, constitute the entire agreement between you and EventFit regarding your use of the platform and supersede any prior agreements or understandings.",
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

  const rgbMap = {
    "#E8B84B": "232,184,75",
    "#7C4DFF": "124,77,255",
    "#00D4B4": "0,212,180",
    "#E8456A": "232,69,106",
  };
  const rgb = rgbMap[item.color] || "232,184,75";

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
            background: `rgba(${rgb},0.12)`,
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
          <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />

          {item.content.map((block) => (
            <div key={block.subtitle}>
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: item.color,
                  letterSpacing: "0.06em",
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
   MAIN TERMS PAGE
───────────────────────────────────────────── */
export default function TermsPage() {
  const [visible, setVisible] = useState(false);

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
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,69,106,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* ── HERO ── */}
      <section
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
            background: "rgba(232,69,106,0.08)",
            border: "1px solid rgba(232,69,106,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
          }}
        >
          <FileText size={32} style={{ color: "#E8456A" }} />
        </div>

        {/* Eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(232,69,106,0.07)",
            border: "1px solid rgba(232,69,106,0.18)",
            borderRadius: "100px",
            padding: "5px 16px",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              color: "#FF7A9A",
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
          Terms of{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #E8456A, #7C4DFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Service
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
          Plain-language terms for using EventFit responsibly.
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
          These Terms of Service govern your use of the EventFit platform. By
          using EventFit, you agree to these terms. We&apos;ve written them to
          be as clear and readable as possible — no legal jargon where it can
          be avoided.
        </p>
      </section>

      {/* ── QUICK SUMMARY CARDS ── */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto 40px",
          padding: "0 24px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.15s",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          {[
            {
              icon: "✅",
              label: "Free to use",
              color: "#00D4B4",
            },
            {
              icon: "🚫",
              label: "No scraping or bots",
              color: "#E8456A",
            },
            {
              icon: "©",
              label: "Respect our IP",
              color: "#7C4DFF",
            },
            {
              icon: "⚖️",
              label: "Pakistan jurisdiction",
              color: "#E8B84B",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>
                {item.icon}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: item.color,
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
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
          transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
        }}
      >
        {SECTIONS.map((section, i) => (
          <AccordionItem key={section.id} item={section} index={i} />
        ))}

        {/* Contact / navigation block */}
        <div
          style={{
            marginTop: "40px",
            background: "rgba(124,77,255,0.04)",
            border: "1px solid rgba(124,77,255,0.18)",
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
              background: "rgba(124,77,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Mail size={20} style={{ color: "#7C4DFF" }} />
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
              Questions about these terms?
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
              If you have any questions about these Terms of Service, please
              contact the EventFit team through the University of Gujrat,
              Department of Computer Science. We&apos;re happy to clarify
              anything that isn&apos;t clear.
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Link to="/about" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ fontSize: "0.82rem" }}>
                  Meet the Team
                </button>
              </Link>
              <Link to="/privacy" style={{ textDecoration: "none" }}>
                <button
                  className="btn-secondary"
                  style={{ fontSize: "0.82rem" }}
                >
                  Privacy Policy
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
          These Terms of Service apply to the EventFit web application developed
          as a Final Year Project at the University of Gujrat, Pakistan. They
          are subject to change as the project evolves.
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
