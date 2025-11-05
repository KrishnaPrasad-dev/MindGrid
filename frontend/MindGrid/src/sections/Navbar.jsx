import { useState } from 'react';
import brainImg from '../assets/brainrababu.gif';
import cls from '../assets/closemenu.png';
import menuuu from '../assets/menuham.png';
import { navLinks } from '../constants/index.js';
import React from 'react';


const NavItems = ({ onClick = () => {} }) => (
  <ul className="nav-ul font-bold">
    {navLinks.map((item) => (
      
      <li key={item.id} className="nav-li">
        <a href={item.href} className="nav-li_a" onClick={onClick}>
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="/" className="text-neutral-400 font-bold hover:text-white transition-colors inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-xl text-transparent ">
            MindGrid
          
          <img src={brainImg} className="h-7 w-7 sm:h-7 sm:w-7" alt="Brain" />
</a>
          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu">
            <img src={isOpen ? cls : menuuu} alt="toggle" className=" filter invert w-5 h-5" />

          </button>

          <nav className="sm:flex hidden">
            <NavItems />
          </nav>
        </div>
      </div>

      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
