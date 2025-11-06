import React from 'react';
import clubpic from '../assets/clubimg.jpg'

const GlowingCard = ({ title, description }) => {
  return (
    <div className="relative items-center  p-4 h-74 mx-4 w-84 rounded-xl mb-5 bg-gray-900 shadow-lg overflow-hidden cursor-pointer group max-w-md mx-[20px] mt-6">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-25 blur-lg group-hover:opacity-100 transition duration-1000" />
      <div className="relative z-10 text-white text-center">
        <h3 className="text-2xl font-bold mb-1">{title}</h3>
        <p className="text-gray-100 text-md font-mono mb-2">{description}</p>
        <img src={clubpic} className='rounded-xl ' alt="" />
      </div>
    </div>
  );
};

export default GlowingCard;
