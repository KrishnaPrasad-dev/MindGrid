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
import "react-toastify/ReactToastify.css";
import Contributions from "./sections/Contributions";
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

/** Component for /profile route to redirect to /profile/:id */
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

  return null; // nothing to render
};

const App = () => {
  // --- Restore token once, and block redirect until done ---
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // initial restore on mount
  React.useEffect(() => {
    try {
      const stored =
        typeof window !== "undefined"
          ? localStorage.getItem("token") ||
            localStorage.getItem("jwtToken") ||
            ""
          : "";

      if (stored) {
        const payload = parseJwt(stored);
        setUser(payload || null);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.warn("Auth restore failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // listen for auth changes from same window (custom event) or other windows (storage event)
  React.useEffect(() => {
    const handler = () => {
      try {
        const stored =
          typeof window !== "undefined"
            ? localStorage.getItem("token") ||
              localStorage.getItem("jwtToken") ||
              ""
            : "";

        if (stored) {
          setUser(parseJwt(stored) || null);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.warn("Auth update failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener("auth-change", handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("auth-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  /** Root redirect: wait until loading is done */
  const RootRedirect = () => {
    if (loading)
      return <div style={{ padding: 20, color: "white" }}>Loading...</div>;
    return user ? (
      <Navigate to="/hero" replace />
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <main>
      <Navbar />

      <Routes>
        
        <Route path="/" element={<RootRedirect />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/hero" element={<Hero />} />

        <Route path="/contributions" element={<Contributions />} />

        <Route path="/explore" element={<Explore />} />
        <Route path="/clubmembers" element={<Clubmembers />} />

        {/* profile routes */}
        <Route path="/profile" element={<MyProfileRedirect />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="/editprofile" element={<EditProfile />} />
        

      </Routes>
    </main>
  );
};

export default App;
