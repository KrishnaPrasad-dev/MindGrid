// src/sections/Navbar.jsx
import { useEffect, useState } from 'react';
import brainImg from '../assets/brainrababu.gif';
import cls from '../assets/closemenu.png';
import menuuu from '../assets/menuham.png';
import { navLinks } from '../constants/index.js';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const NavItems = ({ onClick = () => {} }) => (
  <ul className="nav-ul font-bold">
    {navLinks.map((item) => (
      <li key={item.id} className="nav-li">
        <Link to="/hero">
          <span className="nav-li_a" onClick={onClick}>
            {item.name}
          </span>
        </Link>
      </li>
    ))}
  </ul>
);

/** Parse JWT payload (no dependency) */
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

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // keep for any UI that displays username; prefer JWT for id
    setLoggedInUser(localStorage.getItem('loggedInUser') || '');
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loggedInUser');
    // immediate UI update
    setLoggedInUser('');
    navigate('/login', { replace: true });
  };

  // Navigate to logged-in user's profile using JWT
  const openMyProfile = () => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('token') || localStorage.getItem('jwtToken') || ''
        : '';
    const payload = parseJwt(token);
    const userId = payload?._id || payload?.id || payload?.userId || null;
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      // not logged in or invalid token
      navigate('/login', { replace: true });
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-3  c-space">
          {/* Use Link instead of anchor to avoid full reloads */}
          <Link
            to="/hero"
            className="text-neutral-400 font-bold hover:text-white transition-colors inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-xl text-transparent "
          >
            MindGrid
            <img src={brainImg} className="h-7 w-7 sm:h-7 sm:w-7" alt="Brain" />
          </Link>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
          >
            <img src={isOpen ? cls : menuuu} alt="toggle" className=" filter invert w-5 h-5" />
          </button>

          <nav className="sm:flex hidden">
            <NavItems />
            {/* Profile now navigates programmatically to the logged-in user's profile */}
            <button
              onClick={openMyProfile}
              className="ml-5 text-neutral-400 hover:text-white font-generalsans font-bold nav-li_a"
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="relative inline-flex items-center justify-center px-5 ml-7 py-2 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
              <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
              <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
              <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
              <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
              <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
              <span className="relative">Logout</span>
            </button>
          </nav>
        </div>
      </div>

      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5 flex flex-col h-full justify-between">
          {/* Top section with NavItems and Profile */}
          <div>
            <NavItems onClick={closeMenu} />

            {/* Profile button in mobile menu -> uses same logic */}
            <button
              onClick={() => {
                closeMenu();
                openMyProfile();
              }}
              className="ml-5 mt-3 text-neutral-400 hover:text-white font-generalsans font-bold nav-li_a"
            >
              Profile
            </button>
          </div>

          {/* Bottom section with Logout */}
          <div className="flex ml-4 mt-6">
            <button
              onClick={() => {
                closeMenu();
                handleLogout();
              }}
              className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
              <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
              <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
              <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
              <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
              <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
              <span className="relative">Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
