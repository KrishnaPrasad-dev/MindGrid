import React from 'react'
import Navbar from './Navbar'
import clubmem from '../assets/team.png'
import events from '../assets/event-list.png'
import { Link } from "react-router-dom";
import Clubmembers from './Clubmembers';

const Explore = () => {
  return (
    <div>
        <Navbar />

       <div className='flex animate-text-gradient font-extrabold bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-5xl text-transparent sm:text-7xl mt-36 items-center justify-center relative mx-auto text-center'>
  Explore page
</div>


       <section className="c-space mt-36 p-11 min-h-screen" id="explore">
  <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">

    <div className="xl:col-span-2 xl:row-span-3">
      <div className="grid-container min-h-64 sm:min-h-72 md:min-h-80 xl:h-full">
        <span className='flex flex-row'>
        <div>
            <div className='text-white font-bold text-4xl'>Club Members</div>
            <p className='mt-16 mb-5 text-white  text-2xl w-[95%]'>"Want to see who’s part of the club? Here’s a quick look at the members and what they’re all about."</p>

      
              <Link to="/clubmembers">
  <span className="relative ml-1 flex px-6 py-3 font-bold text-white rounded-lg group cursor-pointer">
    <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
    <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
    <span className="relative">View Members</span>
  </span>
</Link>

        </div>
        <div>
          <img src={clubmem} className='h-62 w-62 relative ' alt="" />
          
        </div>
        </span> 
        
      </div>
    </div>




        <div className="col-span-1 xl:row-span-4">
      <div className="grid-container min-h-80 sm:min-h-96 md:min-h-[440px] xl:h-full">

        <div>
          <div className='text-white font-bold text-4xl'>
            Events
          </div>
          <p className='mt-16 mb-5 text-white  text-2xl w-[95%]'>"Check out the vibrant moments from our club events! Through the images gallery...</p>
          <span><img src={events}  className='h-64 w-64 relative' alt="" /></span>

          <span className='relative left-[20%] mt-6 flex '><a href="#_" className="relative  px-6 py-3 font-bold text-white rounded-lg group">
    <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
    <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
    <span className="relative">View Events</span></a></span>

        </div>

      </div>
    </div>






    <div className="col-span-1 xl:row-span-3">
      <div className="grid-container min-h-64 sm:min-h-72 md:min-h-80 xl:h-full text-white">
        Comming sooonnn
      </div>
    </div>

    <div className="col-span-1 xl:row-span-3">
      <div className="grid-container min-h-64 sm:min-h-72 md:min-h-80 xl:h-full text-white">
        Comming sooonnn
      </div>
    </div>

    <div className="xl:col-span-1 xl:row-span-2">
      <div className="grid-container min-h-48 sm:min-h-56 md:min-h-64 xl:h-full text-white">
        comming sooonn
      </div>
    </div>

  </div>
</section>



    </div>    
  )
}

export default Explore
