// src/App.jsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MyListProvider } from "./context/MyListContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { PageLoader } from "./components/Loading";
import "./styles/global.css";

// Lazy load pages for better performance
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Browse = lazy(() => import("./pages/Browse"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const Watch = lazy(() => import("./pages/Watch"));
const Search = lazy(() => import("./pages/Search"));
const MyList = lazy(() => import("./pages/MyList"));
const Profile = lazy(() => import("./pages/Profile"));

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/browse"
          element={<ProtectedRoute><Browse /></ProtectedRoute>}
        />
        <Route
          path="/movie/:id"
          element={<ProtectedRoute><MovieDetails /></ProtectedRoute>}
        />
        <Route
          path="/watch/:id"
          element={<ProtectedRoute><Watch /></ProtectedRoute>}
        />
        <Route
          path="/search"
          element={<ProtectedRoute><Search /></ProtectedRoute>}
        />
        <Route
          path="/my-list"
          element={<ProtectedRoute><MyList /></ProtectedRoute>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MyListProvider>
          <AppRoutes />
        </MyListProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
