// src/components/Loading.jsx
import "../styles/global.css";

export function LoadingSpinner({ size = 40 }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
      }}
    >
      <div
        className="spinner"
        style={{ width: size, height: size }}
        role="status"
        aria-label="Loading..."
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--background)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div
        style={{
          fontSize: "2.5rem",
          fontWeight: 900,
          letterSpacing: "-2px",
          color: "var(--primary)",
        }}
      >
        MA
      </div>
      <div className="spinner" />
    </div>
  );
}
