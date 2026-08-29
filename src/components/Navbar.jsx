// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setProfileOpen(false);
    setMobileOpen(false);
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "MA";

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-left">
          <Link to={user ? "/browse" : "/"} className="navbar-logo" aria-label="MA Home">
            MA
          </Link>

          {user && (
            <ul className="navbar-links">
              <li><NavLink to="/browse">Home</NavLink></li>
              <li><NavLink to="/browse">Movies</NavLink></li>
              <li><NavLink to="/browse">TV Shows</NavLink></li>
              <li><NavLink to="/my-list">My List</NavLink></li>
            </ul>
          )}
        </div>

        <div className="navbar-right">
          {user ? (
            <>
              {/* Search */}
              <div className="navbar-search" ref={searchRef}>
                {searchOpen ? (
                  <form className="search-input-wrap" onSubmit={handleSearch}>
                    <span>🔍</span>
                    <input
                      autoFocus
                      type="search"
                      placeholder="Titles, people, genres..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search movies"
                    />
                  </form>
                ) : (
                  <button
                    className="search-toggle"
                    onClick={() => setSearchOpen(true)}
                    aria-label="Open search"
                  >
                    🔍
                  </button>
                )}
              </div>

              {/* Profile */}
              <div className="profile-menu" ref={profileRef}>
                <button
                  className="profile-trigger"
                  onClick={() => setProfileOpen((p) => !p)}
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                >
                  <div className="profile-avatar" aria-hidden="true">{initials}</div>
                  <span className="profile-caret" aria-hidden="true">
                    {profileOpen ? "▲" : "▼"}
                  </span>
                </button>

                {profileOpen && (
                  <div className="profile-dropdown" role="menu">
                    <div className="profile-dropdown-header">
                      <div className="profile-name">{user.name || "User"}</div>
                      <div className="profile-email">{user.email}</div>
                    </div>
                    <Link
                      to="/profile"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                    >
                      👤 Profile
                    </Link>
                    <Link
                      to="/my-list"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                    >
                      📋 My List
                    </Link>
                    <button
                      className="dropdown-item logout-btn"
                      onClick={handleLogout}
                      role="menuitem"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Hamburger */}
              <button
                className="hamburger"
                onClick={() => setMobileOpen((m) => !m)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <span />
                <span />
                <span />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" style={{ padding: "8px 16px", fontSize: "0.9rem" }}>
                Sign In
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {user && (
        <div className={`mobile-menu${mobileOpen ? " open" : ""}`} role="menu">
          <ul>
            <li><Link to="/browse" onClick={() => setMobileOpen(false)}>Home</Link></li>
            <li><Link to="/browse" onClick={() => setMobileOpen(false)}>Movies</Link></li>
            <li><Link to="/browse" onClick={() => setMobileOpen(false)}>TV Shows</Link></li>
            <li><Link to="/my-list" onClick={() => setMobileOpen(false)}>My List</Link></li>
            <li><Link to="/profile" onClick={() => setMobileOpen(false)}>Profile</Link></li>
            <li>
              <form onSubmit={handleSearch} style={{ padding: "12px 5%" }}>
                <input
                  type="search"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    background: "var(--surface-light)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--text)",
                    fontSize: "0.9rem",
                    fontFamily: "inherit",
                    outline: "none",
                  }}
                  aria-label="Search movies"
                />
              </form>
            </li>
          </ul>
          <button className="mobile-logout" onClick={handleLogout}>
            🚪 Sign Out
          </button>
        </div>
      )}
    </>
  );
}
