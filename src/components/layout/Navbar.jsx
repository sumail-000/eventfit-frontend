import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Scissors,
  Menu,
  X,
  ChevronDown,
  Compass,
  MessageCircle,
  LayoutGrid,
  Home,
  Sparkles,
} from "lucide-react";

const NAV_LINKS = [
  {
    label: "Home",
    path: "/",
    icon: Home,
    exact: true,
  },
  {
    label: "Get Outfit",
    path: "/get-outfit",
    icon: Compass,
    exact: false,
  },
  {
    label: "Events",
    path: "/events",
    icon: LayoutGrid,
    exact: false,
    dropdown: [
      { label: "Wedding / Shadi", path: "/events?type=wedding" },
      { label: "Interview", path: "/events?type=interview" },
      { label: "Party / Mehendi", path: "/events?type=party" },
      { label: "Eid / Festival", path: "/events?type=eid" },
      { label: "Formal / Office", path: "/events?type=formal" },
      { label: "Casual / Outing", path: "/events?type=casual" },
      { label: "Graduation", path: "/events?type=graduation" },
      { label: "Dinner / Date", path: "/events?type=dinner" },
    ],
  },
  {
    label: "StyleBuddy",
    path: "/stylebuddy",
    icon: MessageCircle,
    exact: false,
    highlight: true,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── close mobile menu on route change ── */
  useEffect(() => {
    setMobileOpen(false); // eslint-disable-line -- intentional reset on navigation
    setActiveDropdown(null);
  }, [location.pathname]);

  /* ── lock body scroll when mobile nav open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleDropdownToggle = (label) =>
    setActiveDropdown((prev) => (prev === label ? null : label));

  return (
    <>
      {/* ─────────────────────── NAVBAR BAR ─────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(7, 8, 15, 0.88)"
            : "rgba(7, 8, 15, 0.45)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: scrolled
            ? "1px solid rgba(232,184,75,0.18)"
            : "1px solid rgba(255,255,255,0.05)",
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.45)" : "none",
        }}
      >
        <nav className="section-container">
          <div className="flex items-center justify-between h-[68px]">
            {/* ── LOGO ── */}
            <Link
              to="/"
              className="flex items-center gap-3 group no-underline"
              style={{ textDecoration: "none" }}
            >
              {/* Icon mark */}
              <div
                className="relative flex items-center justify-center w-9 h-9 rounded-lg overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #E8B84B 0%, #E8456A 100%)",
                  boxShadow: "0 4px 16px rgba(232,184,75,0.35)",
                }}
              >
                <Scissors
                  size={18}
                  color="#07080F"
                  strokeWidth={2.2}
                  style={{ transform: "rotate(-45deg)" }}
                />
                {/* corner accent */}
                <span
                  className="absolute top-0 right-0 w-2 h-2 rounded-bl-full"
                  style={{ background: "rgba(7,8,15,0.25)" }}
                />
              </div>

              {/* Word mark */}
              <div className="flex flex-col leading-none">
                <span
                  className="font-display text-xl tracking-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
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
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    color: "rgba(232,184,75,0.6)",
                    textTransform: "uppercase",
                    marginTop: "1px",
                  }}
                >
                  Smart Outfit Advisor
                </span>
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <ul
              className="hidden lg:flex items-center gap-8 list-none m-0 p-0"
            >
              {NAV_LINKS.map((link) => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    link.dropdown && setActiveDropdown(link.label)
                  }
                  onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
                >
                  {link.highlight ? (
                    /* ── StyleBuddy CTA pill ── */
                    <NavLink to={link.path} style={{ textDecoration: "none" }}>
                      {({ isActive }) => (
                        <span
                          className="flex items-center gap-2 rounded-xl transition-all duration-300"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.8125rem",
                            letterSpacing: "0.03em",
                            padding: "10px 20px",
                            background: isActive
                              ? "linear-gradient(135deg, #7C4DFF, #E8456A)"
                              : "rgba(124,77,255,0.12)",
                            border: "1px solid",
                            borderColor: isActive
                              ? "transparent"
                              : "rgba(124,77,255,0.35)",
                            color: isActive ? "#fff" : "#A47BFF",
                            boxShadow: isActive
                              ? "0 4px 20px rgba(124,77,255,0.4)"
                              : "none",
                          }}
                        >
                          <MessageCircle size={14} strokeWidth={2} />
                          StyleBuddy
                          {/* live dot */}
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: "#00D4B4",
                              boxShadow: "0 0 6px #00D4B4",
                              animation: "pulseGold 2s infinite",
                            }}
                          />
                        </span>
                      )}
                    </NavLink>
                  ) : link.dropdown ? (
                    /* ── Dropdown trigger ── */
                    <>
                      <button
                        className="flex items-center gap-2 rounded-xl transition-all duration-200 cursor-pointer"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.8125rem",
                          fontWeight: 500,
                          letterSpacing: "0.025em",
                          color:
                            activeDropdown === link.label
                              ? "#F5D07A"
                              : "#BFB4D4",
                          background: activeDropdown === link.label ? "rgba(232,184,75,0.1)" : "transparent",
                          border: "1px solid",
                          borderColor: activeDropdown === link.label ? "rgba(232,184,75,0.35)" : "transparent",
                          padding: "10px 20px",
                          outline: "none",
                        }}
                      >
                        <link.icon size={15} strokeWidth={1.8} style={{ opacity: activeDropdown === link.label ? 1 : 0.7 }} />
                        {link.label}
                        <ChevronDown
                          size={12}
                          strokeWidth={2.5}
                          style={{
                            transition: "transform 0.25s ease",
                            transform:
                              activeDropdown === link.label
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            opacity: 0.6,
                          }}
                        />
                      </button>

                      {/* Dropdown Panel */}
                      <div
                        className="absolute top-full left-0 mt-3 rounded-2xl overflow-hidden"
                        style={{
                          width: "220px",
                          background: "rgba(10,12,24,0.98)",
                          backdropFilter: "blur(24px) saturate(180%)",
                          WebkitBackdropFilter: "blur(24px) saturate(180%)",
                          border: "1px solid rgba(232,184,75,0.2)",
                          boxShadow:
                            "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)",
                          opacity: activeDropdown === link.label ? 1 : 0,
                          transform:
                            activeDropdown === link.label
                              ? "translateY(0) scale(1)"
                              : "translateY(-6px) scale(0.98)",
                          pointerEvents:
                            activeDropdown === link.label ? "auto" : "none",
                          transformOrigin: "top left",
                          transition: "opacity 0.2s ease, transform 0.2s ease",
                        }}
                      >
                        {/* dropdown header */}
                        <div
                          style={{
                            padding: "10px 14px 8px",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.68rem",
                              fontWeight: 600,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "rgba(232,184,75,0.5)",
                            }}
                          >
                            Browse Events
                          </span>
                        </div>
                        <div style={{ padding: "6px" }}>
                          {link.dropdown.map((item, i) => (
                            <Link
                              key={i}
                              to={item.path}
                              className="flex items-center gap-2.5 rounded-lg no-underline transition-all duration-150"
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.8125rem",
                                color: "#BFB4D4",
                                textDecoration: "none",
                                padding: "8px 10px",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(232,184,75,0.1)";
                                e.currentTarget.style.color = "#F5D07A";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "#BFB4D4";
                              }}
                            >
                              <span
                                style={{
                                  width: "5px",
                                  height: "5px",
                                  borderRadius: "50%",
                                  background:
                                    "linear-gradient(135deg, #E8B84B, #E8456A)",
                                  flexShrink: 0,
                                }}
                              />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* ── Regular nav link ── */
                    <NavLink
                      to={link.path}
                      end={link.exact}
                      style={{ textDecoration: "none" }}
                    >
                      {({ isActive }) => (
                        <span
                          className="flex items-center gap-2 rounded-xl transition-all duration-200"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.8125rem",
                            fontWeight: isActive ? 500 : 400,
                            letterSpacing: "0.025em",
                            color: isActive ? "#F5D07A" : "#BFB4D4",
                            background: isActive ? "rgba(232,184,75,0.1)" : "transparent",
                            border: "1px solid",
                            borderColor: isActive ? "rgba(232,184,75,0.35)" : "transparent",
                            padding: "10px 20px",
                          }}
                        >
                          <link.icon
                            size={15}
                            strokeWidth={isActive ? 2 : 1.8}
                            style={{ opacity: isActive ? 1 : 0.7 }}
                          />
                          {link.label}
                        </span>
                      )}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            {/* ── DESKTOP CTA ── */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/get-outfit" style={{ textDecoration: "none" }}>
                <button
                  className="btn-primary"
                  style={{ padding: "9px 22px", fontSize: "0.8rem" }}
                >
                  <Compass size={14} strokeWidth={2.2} />
                  Find My Outfit
                </button>
              </Link>
            </div>

            {/* ── MOBILE HAMBURGER ── */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-250"
              style={{
                background: mobileOpen
                  ? "rgba(232,184,75,0.12)"
                  : "rgba(255,255,255,0.05)",
                border: "1px solid",
                borderColor: mobileOpen
                  ? "rgba(232,184,75,0.3)"
                  : "rgba(255,255,255,0.08)",
                color: mobileOpen ? "#F5D07A" : "#BFB4D4",
                outline: "none",
                cursor: "pointer",
              }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? (
                <X size={20} strokeWidth={2} />
              ) : (
                <Menu size={20} strokeWidth={2} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ─────────────────────── MOBILE DRAWER ─────────────────────── */}
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-all duration-400"
        style={{
          background: "rgba(7,8,15,0.7)",
          backdropFilter: "blur(8px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 w-[300px] lg:hidden flex flex-col transition-all duration-400"
        style={{
          background: "rgba(10, 11, 22, 0.98)",
          backdropFilter: "blur(30px)",
          borderLeft: "1px solid rgba(232,184,75,0.18)",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.7)",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid rgba(232,184,75,0.1)" }}
        >
          <div className="flex flex-col leading-none">
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                background:
                  "linear-gradient(135deg, #F5D07A, #E8B84B, #E8456A)",
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
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                color: "rgba(232,184,75,0.5)",
                textTransform: "uppercase",
              }}
            >
              Smart Outfit Advisor
            </span>
          </div>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-all"
            style={{
              background: "rgba(232,69,106,0.1)",
              border: "1px solid rgba(232,69,106,0.25)",
              color: "#FF7A9A",
              cursor: "pointer",
              outline: "none",
            }}
            onClick={() => setMobileOpen(false)}
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              {link.dropdown ? (
                <>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color:
                        activeDropdown === link.label ? "#F5D07A" : "#BFB4D4",
                      background:
                        activeDropdown === link.label
                          ? "rgba(232,184,75,0.08)"
                          : "transparent",
                      border: "none",
                      cursor: "pointer",
                      outline: "none",
                      textAlign: "left",
                    }}
                    onClick={() => handleDropdownToggle(link.label)}
                  >
                    <link.icon size={16} strokeWidth={1.8} />
                    <span className="flex-1">{link.label}</span>
                    <ChevronDown
                      size={14}
                      strokeWidth={2}
                      style={{
                        transition: "transform 0.25s",
                        transform:
                          activeDropdown === link.label
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        color:
                          activeDropdown === link.label ? "#E8B84B" : "#7A6E8A",
                      }}
                    />
                  </button>

                  {/* Sub-items */}
                  <div
                    style={{
                      maxHeight: activeDropdown === link.label ? "400px" : "0",
                      overflow: "hidden",
                      transition:
                        "max-height 0.35s cubic-bezier(.22,.68,0,1.2)",
                    }}
                  >
                    <div className="ml-6 mt-1 space-y-0.5 pb-2">
                      {link.dropdown.map((item, i) => (
                        <Link
                          key={i}
                          to={item.path}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-lg no-underline transition-all"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.8rem",
                            color: "#7A6E8A",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#F5D07A";
                            e.currentTarget.style.background =
                              "rgba(232,184,75,0.06)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#7A6E8A";
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <span
                            className="w-1 h-1 rounded-full"
                            style={{
                              background: "rgba(232,184,75,0.4)",
                              flexShrink: 0,
                            }}
                          />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <NavLink
                  to={link.path}
                  end={link.exact}
                  style={{ textDecoration: "none" }}
                >
                  {({ isActive }) => (
                    <span
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: isActive ? 600 : 400,
                        color: link.highlight
                          ? isActive
                            ? "#fff"
                            : "#A47BFF"
                          : isActive
                            ? "#F5D07A"
                            : "#BFB4D4",
                        background: link.highlight
                          ? isActive
                            ? "linear-gradient(135deg, #7C4DFF, #E8456A)"
                            : "rgba(124,77,255,0.1)"
                          : isActive
                            ? "rgba(232,184,75,0.1)"
                            : "transparent",
                        border: "1px solid",
                        borderColor: link.highlight
                          ? isActive
                            ? "transparent"
                            : "rgba(124,77,255,0.2)"
                          : isActive
                            ? "rgba(232,184,75,0.2)"
                            : "transparent",
                        display: "flex",
                      }}
                    >
                      <link.icon size={16} strokeWidth={isActive ? 2 : 1.8} />
                      <span className="flex-1">{link.label}</span>
                      {link.highlight && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: "#00D4B4",
                            boxShadow: "0 0 6px #00D4B4",
                          }}
                        />
                      )}
                      {isActive && !link.highlight && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: "#E8B84B" }}
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* Drawer footer CTA */}
        <div
          className="px-4 pb-6 pt-4 space-y-3"
          style={{ borderTop: "1px solid rgba(232,184,75,0.1)" }}
        >
          <Link
            to="/get-outfit"
            className="block"
            style={{ textDecoration: "none" }}
          >
            <button
              className="btn-primary w-full justify-center"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Compass size={15} strokeWidth={2.2} />
              Find My Perfect Outfit
            </button>
          </Link>
          <p
            className="text-center"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "0.72rem",
              color: "rgba(232,184,75,0.4)",
              letterSpacing: "0.06em",
            }}
          >
            Dress smart. Own the moment.
          </p>
        </div>
      </div>
    </>
  );
}
