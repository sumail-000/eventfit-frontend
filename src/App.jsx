import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import GetOutfitPage from "./pages/GetOutfitPage";
import ResultsPage from "./pages/ResultsPage";
import StyleBuddyPage from "./pages/StyleBuddyPage";
import EventsPage from "./pages/EventsPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

/* ── Scroll to top on route change ── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* ── Page transition wrapper ── */
function PageWrapper({ children }) {
  const { pathname } = useLocation();
  return (
    <div
      key={pathname}
      style={{
        animation: "fadeIn 0.4s ease forwards",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

/* ── Layout: Navbar + main content + Footer ── */
function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ flex: 1 }}>{children}</div>
      <Footer />
    </>
  );
}

/* ── StyleBuddy layout: Navbar only (no footer — chat takes full height) ── */
function ChatLayout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ flex: 1 }}>{children}</div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* Global toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(13,15,30,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(232,184,75,0.2)",
            color: "#F8F3E6",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            borderRadius: "12px",
            padding: "12px 18px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          },
          success: {
            iconTheme: { primary: "#E8B84B", secondary: "#07080F" },
            style: {
              background: "rgba(13,15,30,0.95)",
              border: "1px solid rgba(232,184,75,0.3)",
              color: "#F8F3E6",
            },
          },
          error: {
            iconTheme: { primary: "#E8456A", secondary: "#07080F" },
            style: {
              background: "rgba(13,15,30,0.95)",
              border: "1px solid rgba(232,69,106,0.3)",
              color: "#F8F3E6",
            },
          },
        }}
      />

      <Routes>
        {/* ── Home ── */}
        <Route
          path="/"
          element={
            <PageWrapper>
              <AppLayout>
                <HomePage />
              </AppLayout>
            </PageWrapper>
          }
        />

        {/* ── Get Outfit (multi-step form) ── */}
        <Route
          path="/get-outfit"
          element={
            <PageWrapper>
              <AppLayout>
                <GetOutfitPage />
              </AppLayout>
            </PageWrapper>
          }
        />

        {/* ── Results ── */}
        <Route
          path="/results"
          element={
            <PageWrapper>
              <AppLayout>
                <ResultsPage />
              </AppLayout>
            </PageWrapper>
          }
        />

        {/* ── StyleBuddy Chat ── */}
        <Route
          path="/stylebuddy"
          element={
            <PageWrapper>
              <ChatLayout>
                <StyleBuddyPage />
              </ChatLayout>
            </PageWrapper>
          }
        />

        {/* ── Events Browse ── */}
        <Route
          path="/events"
          element={
            <PageWrapper>
              <AppLayout>
                <EventsPage />
              </AppLayout>
            </PageWrapper>
          }
        />

        {/* ── About ── */}
        <Route
          path="/about"
          element={
            <PageWrapper>
              <AppLayout>
                <AboutPage />
              </AppLayout>
            </PageWrapper>
          }
        />

        {/* ── Privacy / Terms ── */}
        <Route
          path="/privacy"
          element={
            <PageWrapper>
              <AppLayout>
                <PrivacyPage />
              </AppLayout>
            </PageWrapper>
          }
        />
        <Route
          path="/terms"
          element={
            <PageWrapper>
              <AppLayout>
                <TermsPage />
              </AppLayout>
            </PageWrapper>
          }
        />

        {/* ── 404 ── */}
        <Route
          path="*"
          element={
            <PageWrapper>
              <AppLayout>
                <NotFoundPage />
              </AppLayout>
            </PageWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

/* ─────────────────────────────────────────────
   Placeholder page (for About, Privacy, Terms)
───────────────────────────────────────────── */
function PlaceholderPage({ title }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        paddingTop: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Ambient orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,77,255,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          textAlign: "center",
          padding: "80px 24px",
          position: "relative",
          zIndex: 1,
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        {/* Decorative line */}
        <div
          style={{
            width: "48px",
            height: "3px",
            background: "linear-gradient(90deg, #E8B84B, #E8456A)",
            borderRadius: "2px",
            margin: "0 auto 24px",
          }}
        />

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 800,
            color: "#F8F3E6",
            marginBottom: "14px",
            lineHeight: 1.15,
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "#7A6E8A",
            marginBottom: "36px",
            lineHeight: 1.7,
          }}
        >
          This page is currently being crafted with the same care and detail as
          every EventFit outfit recommendation.
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(232,184,75,0.08)",
            border: "1px solid rgba(232,184,75,0.2)",
            borderRadius: "100px",
            padding: "8px 20px",
            marginBottom: "32px",
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
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              color: "#F5D07A",
              fontWeight: 500,
              letterSpacing: "0.04em",
            }}
          >
            Coming soon
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a href="/" style={{ textDecoration: "none" }}>
            <button className="btn-primary" style={{ fontSize: "0.85rem" }}>
              Back to Home
            </button>
          </a>
          <a href="/get-outfit" style={{ textDecoration: "none" }}>
            <button className="btn-secondary" style={{ fontSize: "0.85rem" }}>
              Find My Outfit
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────
   404 Page
───────────────────────────────────────────── */
function NotFoundPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        paddingTop: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=60"
          alt=""
          aria-hidden
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.15) saturate(0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(124,77,255,0.15) 0%, transparent 65%)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "60px 24px",
          maxWidth: "520px",
          margin: "0 auto",
        }}
      >
        {/* 404 number */}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(5rem, 15vw, 10rem)",
            fontWeight: 800,
            lineHeight: 1,
            background:
              "linear-gradient(135deg, rgba(232,184,75,0.15), rgba(232,69,106,0.1))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "4px",
            userSelect: "none",
          }}
        >
          404
        </div>

        <div
          style={{
            width: "48px",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #E8B84B, transparent)",
            margin: "0 auto 20px",
          }}
        />

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 700,
            color: "#F8F3E6",
            marginBottom: "12px",
          }}
        >
          Outfit not found
        </h2>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.9375rem",
            color: "#BFB4D4",
            lineHeight: 1.7,
            marginBottom: "36px",
          }}
        >
          The page you&apos;re looking for has slipped out of the wardrobe.
          Let&apos;s get you back to exploring EventFit.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a href="/" style={{ textDecoration: "none" }}>
            <button className="btn-primary">Return Home</button>
          </a>
          <a href="/get-outfit" style={{ textDecoration: "none" }}>
            <button className="btn-secondary">Find My Outfit</button>
          </a>
        </div>
      </div>
    </main>
  );
}
