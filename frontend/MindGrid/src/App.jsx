import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Explore from './sections/Explore';
import Clubmembers from './sections/Clubmembers';
import Signup from './sections/Signup';
import Login from './sections/Login';
import 'react-toastify/ReactToastify.css';
import Profile from './sections/Profile';
import EditProfile from './sections/EditProfile';

/** small helper: parse JWT payload without extra libs */
const parseJwt = (token) => {
  try {
    if (!token) return null;
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
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
      typeof window !== 'undefined'
        ? localStorage.getItem('token') || localStorage.getItem('jwtToken') || ''
        : '';
    const payload = parseJwt(token);
    const userId = payload?._id || payload?.id || payload?.userId || null;
    if (userId) {
      navigate(`/profile/${userId}`, { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return null; // nothing to render, just redirect
};

const App = () => {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/clubmembers" element={<Clubmembers />} />

        {/* Route that redirects the logged-in user to their profile */}
        <Route path="/profile" element={<MyProfileRedirect />} />

        {/* dynamic route for viewing a profile by id */}
        <Route path="/profile/:id" element={<Profile />} />

        {/* optional edit profile page */}
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </main>
  );
};

export default App;
