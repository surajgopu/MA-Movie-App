// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("maUser");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("maUser");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const users = JSON.parse(localStorage.getItem("maUsers") || "[]");
    const found = users.find(
      (u) => u.email === userData.email && u.password === userData.password
    );
    if (found) {
      const { password, ...safeUser } = found;
      localStorage.setItem("maUser", JSON.stringify(safeUser));
      setUser(safeUser);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password." };
  };

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem("maUsers") || "[]");
    if (users.find((u) => u.email === userData.email)) {
      return { success: false, error: "Email already registered." };
    }
    const newUser = { ...userData, id: Date.now(), createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem("maUsers", JSON.stringify(users));
    const { password, ...safeUser } = newUser;
    localStorage.setItem("maUser", JSON.stringify(safeUser));
    setUser(safeUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("maUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
