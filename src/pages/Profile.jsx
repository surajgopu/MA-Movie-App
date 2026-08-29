// src/pages/Profile.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMyList } from "../context/MyListContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  const { user, logout } = useAuth();
  const { myList } = useMyList();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "MA";

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : "N/A";

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      <Navbar />
      <main style={{ paddingTop: 90, paddingBottom: 60 }}>
        <div style={{ padding: "40px 4%", maxWidth: 800, margin: "0 auto" }}>
          {/* Profile Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginBottom: 40,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 8,
                background: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                fontWeight: 800,
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              {initials}
            </div>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 4 }}>
                {user?.name || "User"}
              </h1>
              <p style={{ color: "var(--text-secondary)" }}>{user?.email}</p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: 4 }}>
                Member since {memberSince}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 16,
              marginBottom: 40,
            }}
          >
            {[
              { label: "Movies in My List", value: myList.length },
              { label: "Plan", value: "Standard" },
              { label: "Quality", value: "HD" },
              { label: "Screens", value: "1" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "20px 16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "var(--primary)",
                    marginBottom: 4,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
            }}
          >
            {[
              { label: "📋 My List", action: () => navigate("/my-list"), sub: `${myList.length} titles saved` },
              { label: "⚙️ Account Settings", action: () => {}, sub: "Manage your account" },
              { label: "🔔 Notification Preferences", action: () => {}, sub: "Manage notifications" },
              { label: "🔒 Privacy & Security", action: () => {}, sub: "Manage your data" },
              { label: "❓ Help Center", action: () => {}, sub: "Get help with MA" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "16px 20px",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid var(--border)",
                  color: "var(--text)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.95rem",
                  textAlign: "left",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-light)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "none"}
              >
                <span>{item.label}</span>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                  {item.sub} ›
                </span>
              </button>
            ))}
          </div>

          {/* Logout */}
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <button
              className="btn btn-primary"
              onClick={handleLogout}
              style={{ padding: "12px 40px" }}
            >
              Sign Out of MA
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
