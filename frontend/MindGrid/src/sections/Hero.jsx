import { useMediaQuery } from 'react-responsive';
import { motion } from "framer-motion";
import { calculateSizes } from '../constants/index.js';
import brainImg from '../assets/brainrababu.gif';
import arrowblk from '../assets/next.png'
import { Link, useNavigate } from "react-router-dom";
import Explore from './Explore.jsx';
import { useEffect, useState } from 'react';
import GlowingCard from '../constants/GlowingCard.jsx';
import clubpic from '../assets/clubimg.jpg'

const Hero = () => {

  


  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section className=" w-full flex flex-col relative overflow-hidden bg-black" id="home">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_2px,transparent_2px),linear-gradient(to_bottom,#80808005_2px,transparent_2px)] bg-[size:14px_24px]" />
        <div className="absolute left-1/2 top-[-10%] h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#ffffff20,#000000)]" />
      </div>

      <div className="relative z-10 w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <motion.p
          initial={{ y: 100, rotate: 45 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans"
        >
          <span className="inline-flex animate-text-gradient font-extrabold bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-5xl text-transparent sm:text-7xl text-center  mt-9 mb-10">
            MindGrid
            <img src={brainImg} className="h-12 w-12 sm:h-20 sm:w-20" alt="Brain" />
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero_tag font-extrabold  text-center text-gray_gradient"
        >
          <span>
            "Building leaders, coders, and <br />
            <span className="block">communicators for tomorrow’s world."
            </span>
          </span>
        </motion.p>
      </div>

      
      
      <div className="flex items-center justify-center bg-black mt-14 sm:mt-[-17%] min-h-auto sm:min-h-screen">

  <Link 
    to='/explore'
    className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
  >
    <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
    <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
      <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
      <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
    </span>
   <span className="relative text-black font-bold inline-flex items-center">
  Explore
  <img className="h-5 w-5 ml-2" src={arrowblk} alt="arr" />
</span>
  </Link>


</div>

<div className='flex relative items-center justify-center'>
        
  <GlowingCard 
  className="relative "
  title="MindGrid Club" 
  description="These are our club members." 
/>
</div>
  
    </section>
  );
};

export default Hero;
