import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Explore from './sections/Explore'
import Clubmembers from './sections/Clubmembers';
import Signup from './sections/Signup';
import Login from './sections/Login';
import 'react-toastify/ReactToastify.css'
import Profile from './sections/Profile';


const App = () => {
  return (
      
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to='/login' />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/Clubmembers" element={<Clubmembers />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </main>
    
  )
}

export default App