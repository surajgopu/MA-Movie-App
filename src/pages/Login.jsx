// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/browse";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setGlobalError("");
    setLoading(true);

    setTimeout(() => {
      const result = login(form);
      setLoading(false);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setGlobalError(result.error);
      }
    }, 500);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    setGlobalError("");
  };

  return (
    <div className="auth-page">
      <nav className="auth-navbar" aria-label="Auth navigation">
        <Link to="/" className="auth-logo">MA</Link>
      </nav>

      <main className="auth-content">
        <div className="auth-card">
          <h1>Sign In</h1>

          {globalError && (
            <div className="auth-global-error" role="alert">
              {globalError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                className={errors.email ? "error" : ""}
                placeholder="Enter your email"
                autoComplete="email"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p className="form-error" id="email-error" role="alert">{errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange("password")}
                className={errors.password ? "error" : ""}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <p className="form-error" id="password-error" role="alert">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="auth-form-options">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <button type="button" className="auth-forgot">
                Forgot password?
              </button>
            </div>
          </form>

          <p className="auth-switch">
            New to MA?{" "}
            <Link to="/signup">Sign up now.</Link>
          </p>

          <div className="auth-divider">or</div>

          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", textAlign: "center", lineHeight: 1.5 }}>
            This page is protected. Your information is safe with MA.
          </p>
        </div>
      </main>

      <footer className="auth-footer">
        © {new Date().getFullYear()} MA Streaming. All rights reserved.
      </footer>
    </div>
  );
}
