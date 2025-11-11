import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Explore from './sections/Explore';
import Clubmembers from './sections/Clubmembers';
import Signup from './sections/Signup';
import Login from './sections/Login';
import 'react-toastify/ReactToastify.css';
import Profile from './sections/Profile';
import EditProfile from './sections/EditProfile';

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

        {/* ✅ dynamic route */}
        <Route path="/profile/:id" element={<Profile />} />

        {/* optional edit profile page */}
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </main>
  );
};

export default App;
