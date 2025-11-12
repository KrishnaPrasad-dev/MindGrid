import React from 'react';
import clubpic from '../assets/clubvivid.jpg';

const GlowingCard = ({ title, description }) => {
  return (
    <div className="relative items-center w-full lg:w-[90%] mx-auto  mx-5 p-4 lg:p-8 rounded-xl mb-6 lg:-top-32 bg-gray-900 shadow-lg overflow-hidden cursor-pointer group mt-16">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-25 blur-lg group-hover:opacity-100 transition duration-1000" />
      <div className="relative z-10 text-white text-center">
        <h3 className="text-2xl font-bold  lg:-top-4 relative">{title}</h3>
        <p className="text-gray-100 text-lg font-mono mb-3">{description}</p>
        <img src={clubpic} className="rounded-xl w-full h- object-cover" alt="Club" />
      </div>
    </div>
  );
};

export default GlowingCard;
