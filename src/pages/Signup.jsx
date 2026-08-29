// src/pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (!form.confirm) e.confirm = "Please confirm your password";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match";
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
      const result = signup(form);
      setLoading(false);
      if (result.success) {
        navigate("/browse", { replace: true });
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
          <h1>Sign Up</h1>

          {globalError && (
            <div className="auth-global-error" role="alert">{globalError}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                className={errors.name ? "error" : ""}
                placeholder="Your full name"
                autoComplete="name"
              />
              {errors.name && <p className="form-error" role="alert">{errors.name}</p>}
            </div>

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
              />
              {errors.email && <p className="form-error" role="alert">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange("password")}
                className={errors.password ? "error" : ""}
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
              {errors.password && <p className="form-error" role="alert">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm"
                type="password"
                value={form.confirm}
                onChange={handleChange("confirm")}
                className={errors.confirm ? "error" : ""}
                placeholder="Confirm your password"
                autoComplete="new-password"
              />
              {errors.confirm && <p className="form-error" role="alert">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Sign in.</Link>
          </p>
        </div>
      </main>

      <footer className="auth-footer">
        © {new Date().getFullYear()} MA Streaming. All rights reserved.
      </footer>
    </div>
  );
}
