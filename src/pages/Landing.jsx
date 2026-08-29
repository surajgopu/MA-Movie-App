// src/pages/Landing.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import "../styles/landing.css";

const FEATURES = [
  {
    tag: "Unlimited Entertainment",
    title: "Enjoy on your TV",
    desc: "Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
    icon: "📺",
    reverse: false,
  },
  {
    tag: "Download & Go",
    title: "Download your shows to watch offline",
    desc: "Save your favourites easily and always have something to watch.",
    icon: "📥",
    reverse: true,
  },
  {
    tag: "Watch Everywhere",
    title: "Watch everywhere",
    desc: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
    icon: "📱",
    reverse: false,
  },
  {
    tag: "Family Friendly",
    title: "Create profiles for kids",
    desc: "Send kids on adventures with their favourite characters in a space made just for them — free with your membership.",
    icon: "👨‍👩‍👧‍👦",
    reverse: true,
  },
];

const FAQS = [
  {
    q: "What is MA?",
    a: "MA is a streaming service that offers a wide variety of award-winning movies, TV shows, anime, documentaries, and more on thousands of internet-connected devices.",
  },
  {
    q: "How much does MA cost?",
    a: "Watch MA on your smartphone, tablet, Smart TV, laptop, or streaming device. Plans range from competitive prices. No extra costs, no contracts.",
  },
  {
    q: "Where can I watch?",
    a: "Watch anywhere, anytime. Sign in with your MA account to watch instantly on the web or on any internet-connected device.",
  },
  {
    q: "How do I cancel?",
    a: "MA is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks.",
  },
  {
    q: "What can I watch on MA?",
    a: "MA has an extensive library of feature films, documentaries, TV shows, anime, award-winning originals, and more.",
  },
];

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  if (user) {
    navigate("/browse", { replace: true });
    return null;
  }

  return (
    <div className="landing-page">
      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-bg" />

        <nav className="landing-hero-nav" aria-label="Landing navigation">
          <div className="landing-logo">MA</div>
          <div className="landing-nav-actions">
            <Link to="/login" className="btn btn-primary" style={{ padding: "8px 20px" }}>
              Sign In
            </Link>
          </div>
        </nav>

        <div className="landing-hero-content">
          <div className="landing-hero-eyebrow">🎬 Unlimited Streaming</div>

          <h1 className="landing-hero-title">
            Unlimited movies, shows, and entertainment.
          </h1>

          <p className="landing-hero-subtitle">
            Watch anywhere. Cancel anytime. Ready to watch? Create your account now.
          </p>

          <div className="landing-cta-group">
            <button
              className="landing-cta-primary"
              onClick={() => navigate("/signup")}
            >
              🚀 Get Started
            </button>
            <button
              className="landing-cta-secondary"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>

          <div className="landing-stats">
            <div className="landing-stat">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Movies & Shows</div>
            </div>
            <div className="landing-stat">
              <div className="stat-number">4K</div>
              <div className="stat-label">Ultra HD Quality</div>
            </div>
            <div className="landing-stat">
              <div className="stat-number">190+</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="landing-stat">
              <div className="stat-number">∞</div>
              <div className="stat-label">Devices</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features">
        {FEATURES.map((f, i) => (
          <div key={i} className={`feature-row${f.reverse ? " reverse" : ""}`}>
            <div className="feature-text">
              <div className="feature-tag">{f.tag}</div>
              <h2>{f.title}</h2>
              <p>{f.desc}</p>
            </div>
            <div className="feature-visual">
              <div className="feature-icon-display">{f.icon}</div>
            </div>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="landing-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className={`faq-question${openFaq === i ? " open" : ""}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                {faq.q}
                <span className="faq-icon" aria-hidden="true">+</span>
              </button>
              {openFaq === i && (
                <div className="faq-answer">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta-section">
        <h2>Ready to watch? Join MA today.</h2>
        <p>Watch anywhere. Cancel anytime.</p>
        <button
          className="landing-cta-primary"
          onClick={() => navigate("/signup")}
        >
          🚀 Get Started
        </button>
      </section>

      <Footer />
    </div>
  );
}
