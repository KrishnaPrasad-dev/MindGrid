import React from "react";
import { useEffect, useState } from "react";
import brainImg from "../assets/brainrababu.gif";
import cls from "../assets/closemenu.png";
import menuuu from "../assets/menuham.png";
import { navLinks } from "../constants/index.js";
import { useNavigate, Link } from "react-router-dom";

const NavItems = ({ onClick = () => { } }) => (
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

/** Parse JWT payload */
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

const getToken = () =>
  localStorage.getItem("token") ||
  localStorage.getItem("jwtToken") ||
  "";



const Navbar = () => {
  // eslint-disable-next-line no-unused-vars
  const [loggedInUser, setLoggedInUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser") || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
    setLoggedInUser("");
    navigate("/login", { replace: true });
  };



  const openMyProfile = () => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("jwtToken") ||
      "";
    const payload = parseJwt(token);
    const userId = payload?._id || payload?.id || payload?.userId || null;

    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      navigate("/login", { replace: true });
    }
  };

  const token = getToken();
  const payload = parseJwt(token);
  const isLoggedIn = !!payload;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-3 c-space">
          {/* Logo */}
          <Link
            to="/hero"
            className="hover:text-neutral-400 font-bold text-white transition-colors inline-flex  text-xl "
          >
            MindGrid
            <img src={brainImg} className="h-7 w-7" alt="Brain" />
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white sm:hidden flex"
            aria-label="Toggle menu"
          >
            <img
              src={isOpen ? cls : menuuu}
              alt="toggle"
              className="filter invert w-5 h-5"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="sm:flex hidden items-center">
            <NavItems />

            {/* Club Members - second */}
            <Link
              to="/clubmembers"
              className="ml-6 text-neutral-400 hover:text-white font-generalsans font-bold nav-li_a"
            >
              Club Members
            </Link>

            <Link
              to="/contributions"
              className="ml-6 text-neutral-400 hover:text-white font-generalsans font-bold nav-li_a"
            >
              Contributions
            </Link>

            {/* Profile - beside Club Members */}
            <button
              onClick={openMyProfile}
              className="ml-6 text-neutral-400 hover:text-white font-generalsans font-bold nav-li_a"
            >
              Profile
            </button>

            {/* Logout (kept unchanged) */}
            {isLoggedIn ? (
  <button
    onClick={handleLogout}
    className="relative inline-flex items-center justify-center px-5 ml-8 py-2 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
  >
    <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
    <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
    <span className="relative">Logout</span>
  </button>
) : (
  <Link
    to="/login"
    className="relative inline-flex items-center justify-center px-5 ml-8 py-2 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
  >
    <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
    <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
    <span className="relative">Login</span>
  </Link>
)}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`nav-sidebar ${isOpen ? "max-h-screen" : "max-h-0"}`}>
        <nav className="p-5 flex flex-col h-full justify-between">
          <div>
            <NavItems onClick={closeMenu} />

            <Link
              to="/clubmembers"
              onClick={closeMenu}
              className=" text-neutral-400 hover:text-white font-generalsans font-bold nav-li_a flex ml-4 mt-6 mb-5 "
            >
              Club Members
            </Link>

            <Link
              to="/contributions"
              onClick={closeMenu}
              className=" text-neutral-400 hover:text-white font-generalsans font-bold nav-li_a flex ml-4 mt-6 mb-5 "
            >
              Contributions
            </Link>

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

          <div className="flex ml-4 mt-6">
            {isLoggedIn ? (
  <button
    onClick={() => {
      closeMenu();
      handleLogout();
    }}
    className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
  >
    <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
    <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
    <span className="relative">Logout</span>
  </button>
) : (
  <Link
    to="/login"
    onClick={closeMenu}
    className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
  >
    <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
    <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
    <span className="relative">Login</span>
  </Link>
)}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
