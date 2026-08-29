// src/components/ErrorMessage.jsx
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        gap: 16,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "3rem" }}>⚠️</div>
      <h3 style={{ fontSize: "1.3rem", color: "var(--text)" }}>
        Something went wrong
      </h3>
      <p style={{ color: "var(--text-secondary)", maxWidth: 400 }}>
        {message || "We couldn't load the content right now. Please try again."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-primary"
          style={{ marginTop: 8 }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
