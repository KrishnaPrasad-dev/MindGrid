import React from 'react';
import Navbar from './Navbar';
import clubmem from '../assets/team.png';
import events from '../assets/event-list.png';
import { Link } from 'react-router-dom';

const Explore = () => {
  return (
    <div>
      <Navbar />

      {/* Title */}
      <div className='flex animate-text-gradient font-extrabold bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-6xl text-transparent sm:text-7xl  sm:mt-24 mt-[-60px] items-center justify-center relative mx-auto text-center mb-8'>
        Explore Page
      </div>

      {/* Section wrapper: subtle gray background to differentiate grids */}
      <section
        className="c-space p-6 sm:p-8 md:p-10 lg:p-12 min-h-screen "
        id="explore"
      >
        <div className="max-w-7xl mx-auto">

          {/* Responsive grid: 1 col on small, 2 on md, 3 on xl */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">

            {/* Large left block (spans 2 columns on xl) */}
            <div className="xl:col-span-2 flex flex-col">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-1 bg-gray-900/40 border border-gray-700 rounded-lg p-6">
                  <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-4xl">Club Members</h2>
                  <p className="mt-6 mb-6 text-gray-100 text-lg sm:text-xl max-w-prose">
                    "Want to see who’s part of the club? Here’s a quick look at the members and what they’re all about."
                  </p>

                  {/* Image container: keep image sizes but prevent overflow on small screens */}
                  <div className="w-full flex items-center justify-center">
                    <img
                      src={clubmem}
                      alt="Club Members"
                      className="relative w-auto max-w-full h-auto sm:h-72 md:h-80 lg:h-[300px] object-contain rounded-lg"
                    />
                  </div>

                  {/* Button */}
                  <div className='flex justify-center items-center'>
                  <div className="mt-6 flex  justify-center sm:justify-start">
                    <Link to="/clubmembers" className="relative inline-block">
                      <span className="relative px-20 py-3 font-semibold text-white rounded-lg group inline-flex">
                        <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 rounded-lg"></span>
                        <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen rounded-lg"></span>
                        <span className="relative">View  Members</span>
                      </span>
                    </Link>
                  </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Events */}
            <div className="flex flex-col">
              <div className="bg-gray-900/40 border border-gray-700 rounded-lg p-6 h-full">
                <h3 className="text-white font-bold text-3xl sm:text-4xl">Events</h3>
                <p className="mt-6 mb-6 text-gray-100 text-lg sm:text-xl max-w-prose">
                  "Check out the vibrant moments from our club events! Through the images gallery..."
                </p>

                {/* Keep the event image size but keep it responsive: fixed h-64 w-64 on larger screens, but won't overflow on small screens */}
                <div className="flex items-center justify-center">
                  <img
                    src={events}
                    alt="Events"
                    className="h-64 w-64 max-w-full object-contain rounded-lg"
                  />
                </div>

                <div className="mt-8 flex justify-center">
                  <a href="#_" className="relative inline-block">
                    <span className="relative px-12 py-3 font-semibold text-white rounded-lg group inline-flex">
                      <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 rounded-lg"></span>
                      <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen rounded-lg"></span>
                      <span className="relative">View Events</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>

           

          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;
