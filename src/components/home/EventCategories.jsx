import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Briefcase,
  Music,
  Star,
  Building2,
  Coffee,
  GraduationCap,
  UtensilsCrossed,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const ICON_MAP = {
  Heart,
  Briefcase,
  Music,
  Star,
  Building2,
  Coffee,
  GraduationCap,
  UtensilsCrossed,
};

const CATEGORIES = [
  {
    id: "wedding",
    label: "Wedding",
    labelUrdu: "شادی",
    sublabel: "Nikah · Barat · Walima",
    icon: "Heart",
    gradient: "linear-gradient(135deg, #E8456A 0%, #7C4DFF 100%)",
    glowColor: "rgba(232,69,106,0.35)",
    borderColor: "rgba(232,69,106,0.3)",
    bgAccent: "rgba(232,69,106,0.07)",
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80",
    outfitCount: 48,
    featured: true,
    tags: ["Formal", "Traditional", "Festive"],
  },
  {
    id: "interview",
    label: "Interview",
    labelUrdu: "انٹرویو",
    sublabel: "Corporate · University",
    icon: "Briefcase",
    gradient: "linear-gradient(135deg, #7C4DFF 0%, #00D4B4 100%)",
    glowColor: "rgba(124,77,255,0.35)",
    borderColor: "rgba(124,77,255,0.3)",
    bgAccent: "rgba(124,77,255,0.07)",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
    outfitCount: 32,
    featured: false,
    tags: ["Professional", "Smart", "Formal"],
  },
  {
    id: "party",
    label: "Party",
    labelUrdu: "پارٹی",
    sublabel: "Dholki · Mehendi · Birthday",
    icon: "Music",
    gradient: "linear-gradient(135deg, #E8B84B 0%, #E8456A 100%)",
    glowColor: "rgba(232,184,75,0.35)",
    borderColor: "rgba(232,184,75,0.3)",
    bgAccent: "rgba(232,184,75,0.07)",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500&q=80",
    outfitCount: 56,
    featured: true,
    tags: ["Semi-Formal", "Festive", "Trendy"],
  },
  {
    id: "eid",
    label: "Eid",
    labelUrdu: "عید",
    sublabel: "Eid-ul-Fitr · Eid-ul-Adha",
    icon: "Star",
    gradient: "linear-gradient(135deg, #00D4B4 0%, #7C4DFF 100%)",
    glowColor: "rgba(0,212,180,0.35)",
    borderColor: "rgba(0,212,180,0.3)",
    bgAccent: "rgba(0,212,180,0.06)",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80",
    outfitCount: 44,
    featured: false,
    tags: ["Festive", "Traditional", "Elegant"],
  },
  {
    id: "formal",
    label: "Office",
    labelUrdu: "دفتر",
    sublabel: "Daily Work · Meetings",
    icon: "Building2",
    gradient: "linear-gradient(135deg, #A47BFF 0%, #E8B84B 100%)",
    glowColor: "rgba(164,123,255,0.35)",
    borderColor: "rgba(164,123,255,0.3)",
    bgAccent: "rgba(164,123,255,0.07)",
    image:
      "https://images.unsplash.com/photo-1573497491765-dccce02b29df?auto=format&fit=crop&w=500&q=80",
    outfitCount: 38,
    featured: false,
    tags: ["Professional", "Daily", "Smart"],
  },
  {
    id: "casual",
    label: "Casual",
    labelUrdu: "کیژول",
    sublabel: "Outing · Shopping · Lunch",
    icon: "Coffee",
    gradient: "linear-gradient(135deg, #FF7A9A 0%, #E8B84B 100%)",
    glowColor: "rgba(255,122,154,0.35)",
    borderColor: "rgba(255,122,154,0.3)",
    bgAccent: "rgba(255,122,154,0.07)",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80",
    outfitCount: 62,
    featured: false,
    tags: ["Casual", "Comfortable", "Everyday"],
  },
  {
    id: "graduation",
    label: "Graduation",
    labelUrdu: "گریجویشن",
    sublabel: "Convocation · Ceremony",
    icon: "GraduationCap",
    gradient: "linear-gradient(135deg, #E8B84B 0%, #7C4DFF 100%)",
    glowColor: "rgba(232,184,75,0.35)",
    borderColor: "rgba(232,184,75,0.3)",
    bgAccent: "rgba(232,184,75,0.07)",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=80",
    outfitCount: 26,
    featured: false,
    tags: ["Semi-Formal", "Celebratory"],
  },
  {
    id: "dinner",
    label: "Dinner",
    labelUrdu: "ڈنر",
    sublabel: "Fine Dining · Date Night",
    icon: "UtensilsCrossed",
    gradient: "linear-gradient(135deg, #E8456A 0%, #E8B84B 100%)",
    glowColor: "rgba(232,69,106,0.35)",
    borderColor: "rgba(232,69,106,0.3)",
    bgAccent: "rgba(232,69,106,0.07)",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=500&q=80",
    outfitCount: 30,
    featured: false,
    tags: ["Elegant", "Evening", "Refined"],
  },
];

export default function EventCategories() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section
      id="event-categories"
      style={{
        padding: "120px 0 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── decorative background elements ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "-120px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,184,75,0.06) 0%, transparent 70%)",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          right: "-80px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,77,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        {/* ── Section header ── */}
        <div style={{ marginBottom: "32px" }}>
          <p className="section-eyebrow mb-3">Browse by Occasion</p>
          <div className="divider-gold mb-5" style={{ marginLeft: 0 }} />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <div style={{ maxWidth: "520px" }}>
              <h2 className="section-title" style={{ maxWidth: "460px" }}>
                Every event,{" "}
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
                  the right outfit
                </span>
              </h2>
              <p className="section-subtitle mt-4">
                From bridal baraat to boardroom interviews — curated Pakistani
                outfit collections for every occasion, season &amp; style
                preference.
              </p>
            </div>
            <div className="flex items-center gap-3" style={{ flexShrink: 0 }}>
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid",
                  borderColor: canScrollLeft
                    ? "rgba(232,184,75,0.4)"
                    : "rgba(255,255,255,0.08)",
                  background: canScrollLeft
                    ? "rgba(232,184,75,0.08)"
                    : "rgba(255,255,255,0.03)",
                  color: canScrollLeft ? "#F5D07A" : "#4A4060",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: canScrollLeft ? "pointer" : "default",
                  transition: "all 0.25s ease",
                  outline: "none",
                }}
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid",
                  borderColor: canScrollRight
                    ? "rgba(232,184,75,0.4)"
                    : "rgba(255,255,255,0.08)",
                  background: canScrollRight
                    ? "rgba(232,184,75,0.08)"
                    : "rgba(255,255,255,0.03)",
                  color: canScrollRight ? "#F5D07A" : "#4A4060",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: canScrollRight ? "pointer" : "default",
                  transition: "all 0.25s ease",
                  outline: "none",
                }}
                aria-label="Scroll right"
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>
              <Link
                to="/events"
                className="btn-secondary"
                style={{ padding: "9px 20px", fontSize: "0.8rem" }}
              >
                All Categories
                <ArrowRight size={13} strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Category count label ── */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            color: "#7A6E8A",
            letterSpacing: "0.04em",
            marginBottom: "16px",
          }}
        >
          {CATEGORIES.length} categories available
        </p>

        {/* ── Scrollable cards row ── */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="scroll-container"
          style={{
            paddingBottom: "20px",
            paddingTop: "8px",
            paddingLeft: "4px",
            paddingRight: "20px",
            gap: "20px",
          }}
        >
          {CATEGORIES.map((cat, index) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              index={index}
              hovered={hoveredId === cat.id}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* ── Mobile "view all" ── */}
        <div className="flex justify-center mt-8 lg:hidden">
          <Link to="/events" className="btn-secondary">
            View All Event Categories
            <ArrowRight size={14} strokeWidth={2.2} />
          </Link>
        </div>

        {/* ── Bottom stats strip ── */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "8", label: "Event Types", accent: "#E8B84B" },
            { value: "336+", label: "Outfit Styles", accent: "#E8456A" },
            { value: "2", label: "Genders Covered", accent: "#A47BFF" },
            { value: "100%", label: "Pakistani Culture", accent: "#4DEFE0" },
          ].map(({ value, label, accent }) => (
            <div
              key={label}
              style={{
                textAlign: "center",
                padding: "22px 16px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "14px",
                transition: "border-color 0.3s, background 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${accent}40`;
                e.currentTarget.style.background = `${accent}08`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.background = "rgba(255,255,255,0.025)";
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 800,
                  color: accent,
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.78rem",
                  color: "#7A6E8A",
                  letterSpacing: "0.04em",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Category card sub-component
───────────────────────────────────────────── */
function CategoryCard({ cat, index, hovered, onHover }) {
  const IconComponent = ICON_MAP[cat.icon] || Star;

  return (
    <Link
      to={`/events?type=${cat.id}`}
      className="scroll-item"
      style={{
        textDecoration: "none",
        display: "block",
        width: "260px",
        flexShrink: 0,
      }}
      onMouseEnter={() => onHover(cat.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          height: "340px",
          border: "1px solid",
          borderColor: hovered ? cat.borderColor : "rgba(255,255,255,0.06)",
          boxShadow: hovered
            ? `0 28px 64px rgba(0,0,0,0.55), 0 0 0 1px ${cat.borderColor}, 0 0 40px ${cat.glowColor}`
            : "0 8px 24px rgba(0,0,0,0.3)",
          transform: hovered
            ? "translateY(-8px) scale(1.02)"
            : "translateY(0) scale(1)",
          transition: "all 0.4s cubic-bezier(.22,.68,0,1.4)",
          cursor: "pointer",
          animationDelay: `${index * 0.07}s`,
        }}
      >
        {/* ── Background image ── */}
        <img
          src={cat.image}
          alt={cat.label}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s ease",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            filter: "brightness(0.55) saturate(0.85)",
          }}
        />

        {/* ── Gradient overlay ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              to top,
              rgba(7,8,15,0.97) 0%,
              rgba(7,8,15,0.65) 40%,
              rgba(7,8,15,0.15) 70%,
              transparent 100%
            )`,
          }}
        />

        {/* ── Top accent bar ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: cat.gradient,
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.35s ease",
          }}
        />

        {/* ── Featured badge ── */}
        {cat.featured && (
          <div
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "rgba(232,184,75,0.15)",
              border: "1px solid rgba(232,184,75,0.35)",
              borderRadius: "100px",
              padding: "4px 10px",
              backdropFilter: "blur(8px)",
            }}
          >
            <Star
              size={9}
              strokeWidth={2.5}
              style={{ color: "#F5D07A", fill: "#F5D07A" }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#F5D07A",
                textTransform: "uppercase",
              }}
            >
              Popular
            </span>
          </div>
        )}

        {/* ── Icon circle ── */}
        <div
          style={{
            position: "absolute",
            top: "18px",
            left: "18px",
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: hovered ? cat.gradient : "rgba(255,255,255,0.08)",
            border: "1px solid",
            borderColor: hovered ? "transparent" : "rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.35s ease",
            boxShadow: hovered ? `0 8px 24px ${cat.glowColor}` : "none",
          }}
        >
          <IconComponent
            size={18}
            strokeWidth={1.8}
            style={{
              color: hovered ? "#07080F" : "#F8F3E6",
              transition: "color 0.3s ease",
            }}
          />
        </div>

        {/* ── Card body (bottom) ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px 18px",
          }}
        >
          {/* Urdu label */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.82rem",
              color: hovered ? "#F5D07A" : "rgba(232,184,75,0.55)",
              letterSpacing: "0.1em",
              marginBottom: "4px",
              transition: "color 0.3s ease",
              direction: "rtl",
              textAlign: "right",
            }}
          >
            {cat.labelUrdu}
          </p>

          {/* Main label */}
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#F8F3E6",
              lineHeight: 1.15,
              marginBottom: "3px",
            }}
          >
            {cat.label}
          </h3>

          {/* Sub-label */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.73rem",
              color: "#7A6E8A",
              letterSpacing: "0.03em",
              marginBottom: "12px",
            }}
          >
            {cat.sublabel}
          </p>

          {/* Tags row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
              marginBottom: "14px",
            }}
          >
            {cat.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.63rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: hovered ? "#F5D07A" : "#7A6E8A",
                  background: hovered
                    ? "rgba(232,184,75,0.1)"
                    : "rgba(255,255,255,0.05)",
                  border: "1px solid",
                  borderColor: hovered
                    ? "rgba(232,184,75,0.25)"
                    : "rgba(255,255,255,0.08)",
                  borderRadius: "4px",
                  padding: "3px 7px",
                  transition: "all 0.3s ease",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom row: count + arrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: "#7A6E8A",
              }}
            >
              <span style={{ color: "#BFB4D4", fontWeight: 600 }}>
                {cat.outfitCount}
              </span>{" "}
              outfits
            </span>

            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: hovered ? cat.gradient : "rgba(255,255,255,0.06)",
                border: "1px solid",
                borderColor: hovered ? "transparent" : "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.35s ease",
                transform: hovered ? "rotate(-45deg)" : "rotate(0deg)",
                boxShadow: hovered ? `0 4px 16px ${cat.glowColor}` : "none",
              }}
            >
              <ArrowRight
                size={13}
                strokeWidth={2.2}
                style={{
                  color: hovered ? "#07080F" : "#7A6E8A",
                  transition: "color 0.3s ease",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
