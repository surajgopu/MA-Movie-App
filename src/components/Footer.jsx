// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "../styles/footer.css";

const LINKS = [
  "FAQ",
  "Help Center",
  "Account",
  "Media Center",
  "Investor Relations",
  "Jobs",
  "Cookie Preferences",
  "Privacy",
  "Terms of Use",
  "Corporate Information",
  "Contact Us",
  "Speed Test",
];

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-top">
        <p className="footer-contact">
          Questions?{" "}
          <a href="mailto:contact@ma-streaming.com">Contact us.</a>
        </p>

        <div className="footer-links">
          {LINKS.map((link) => (
            <Link key={link} to="#">
              {link}
            </Link>
          ))}
        </div>

        <button className="footer-lang-btn" aria-label="Change language">
          🌐 English
        </button>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">MA</div>
        <p className="footer-copyright">
          © {new Date().getFullYear()} MA Streaming. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
