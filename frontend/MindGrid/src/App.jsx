import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Explore from "./sections/Explore";
import Clubmembers from "./sections/Clubmembers";
import Signup from "./sections/Signup";
import Login from "./sections/Login";
import Profile from "./sections/Profile";
import EditProfile from "./sections/EditProfile";
import Contributions from "./sections/Contributions";
import "react-toastify/ReactToastify.css";
import Footer from "./sections/Footer";
import EditProject from "./sections/EditProject";
import Projects from "./sections/Projects";
import ScrollToTop from "../src/sections/ScrollToTop";

/** small helper: parse JWT payload without extra libs */
const parseJwt = (token) => {
  try {
    if (!token) return null;
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(decoded)));
  } catch {
    return null;
  }
};

/** Protected Route Wrapper */
const ProtectedRoute = ({ children }) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") ||
      localStorage.getItem("jwtToken") ||
      ""
      : "";

  const payload = parseJwt(token);

  if (!payload) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/** Redirect /profile → /profile/:id */
const MyProfileRedirect = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token") ||
        localStorage.getItem("jwtToken") ||
        ""
        : "";

    const payload = parseJwt(token);
    const userId = payload?._id || payload?.id || payload?.userId || null;

    if (userId) {
      navigate(`/profile/${userId}`, { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return null;
};

const App = () => {
  return (
    <main className="min-h-screen text-white">
      <Navbar />
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/clubmembers" element={<Clubmembers />} />
        <Route path="/contributions" element={<Contributions />} />


        {/* Protected Routes */}
        <Route
          path="/profile/:id"
          element={<Profile />}
        />

        <Route path="/profile" element={<MyProfileRedirect />} />

        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editprofile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-project"
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-project/:projectId"
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          }
        />


        <Route path="/projects" element={<Projects />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;