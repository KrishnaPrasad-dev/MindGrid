import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import crown from '../assets/crown.png'
import assist from '../assets/assistant.png'
import treasurer from '../assets/treasure.png'
import remove from '../assets/x-button.png'
import cmpwrk from '../assets/computer-worker.png'

import Profile from './Profile';

import crownvp from '../assets/crownvp.png'
const Clubmembers = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault(); // prevent default anchor behavior if inside <a>
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <Navbar />

      <div className="flex animate-text-gradient font-extrabold bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-5xl text-transparent sm:text-7xl mt-36 items-center justify-center relative mx-auto text-center">
        Club Members
      </div>

      <div className="relative mt-28 px-4">
        <div className="w-full max-w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-950 dark:border-gray-700">
          <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
            Club Members and their roles
          </h5>

          <ul className="my-4 space-y-3">

            <li className="relative">
              <div className="flex items-center justify-between p-3 font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white cursor-pointer">
                
                <Link to='/profile'>
                <p className="ml-2 mr-2">Krishna Prasad</p>
                </Link>
                <div>
                </div>
                <button className='text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                  President
                  <img src={crown} className='ml-2 h-4 w-4' alt="crown" />
                </button>
              </div>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Clubmembers;