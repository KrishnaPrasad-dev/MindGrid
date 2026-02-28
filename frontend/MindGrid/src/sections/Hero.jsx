// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import brainImg from '../assets/brainrababu.gif';
import arrowblk from '../assets/next.png';
import { Link } from "react-router-dom";
import GlowingCard from '../constants/GlowingCard.jsx';

const Hero = () => {

  const statsData = [
    { label: "Members", value: 150 },
    { label: "Events Conducted", value: 25 },
    { label: "Projects Built", value: 40 },
  ];

  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const duration = 1200;
    const stepTime = 20;

    statsData.forEach((stat, index) => {
      let start = 0;
      const increment = stat.value / (duration / stepTime);

      const timer = setInterval(() => {
        start += increment;

        if (start >= stat.value) {
          start = stat.value;
          clearInterval(timer);
        }

        setCounts(prev => {
          const updated = [...prev];
          updated[index] = Math.floor(start);
          return updated;
        });
      }, stepTime);
    });
  }, []);

  return (
    <section className="w-full flex flex-col relative overflow-hidden bg-black" id="home">

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_2px,transparent_2px),linear-gradient(to_bottom,#80808005_2px,transparent_2px)] bg-[size:14px_24px]" />
        <div className="absolute left-1/2 top-[-10%] h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#ffffff15,#000000)]" />
      </div>

      {/* Main Title Section */}
      <div className="relative z-10 w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <motion.p
          initial={{ y: 100, rotate: 45 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans"
        >
          <span className="inline-flex animate-text-gradient font-extrabold bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-5xl text-transparent sm:text-7xl text-center mt-9 mb-10">
            MindGrid
            <img src={brainImg} className="h-12 w-12 sm:h-20 sm:w-20 ml-3" alt="Brain" />
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero_tag font-extrabold text-center text-gray_gradient"
        >
          <span>
            "Building leaders, coders, and <br />
            <span className="block">communicators for tomorrow’s world."</span>
          </span>
        </motion.p>
      </div>

      {/* Explore Button */}
      <div className="flex items-center justify-center bg-black mt-14 sm:mt-[-17%] sm:min-h-screen">
        <Link 
          to='/explore'
          className="relative inline-flex items-center justify-center lg:px-6 lg:mt-12 lg:py-3 p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
        >
          <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md"></span>
          <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180">
            <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
            <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
          </span>
          <span className="relative text-black font-bold lg:text-3xl text-xl inline-flex items-center">
            Explore
            <img className="h-5 w-5 lg:h-7 lg:w-7 ml-2" src={arrowblk} alt="arr" />
          </span>
        </Link>
      </div>

      <div className='flex relative items-center justify-center'>
        <GlowingCard 
          className="relative"
          title="MindGrid Club" 
          description="These are our club members." 
        />
      </div>

      <div className="relative z-10 w-full mt-12  mb-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto px-6"
        >
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 
                         rounded-2xl p-8 text-center shadow-xl 
                         hover:scale-105 transition duration-300"
            >
              <h2 className="text-4xl sm:text-5xl font-extrabold 
                             bg-gradient-to-r from-purple-400 to-pink-500 
                             bg-clip-text text-transparent">
                {counts[index]}+
              </h2>
              <p className="text-gray-400 mt-3 text-lg">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

     {/* Upcoming Events Preview */}
<div className="relative z-10 w-full mt-16">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="max-w-6xl mx-auto px-6"
  >
    <h2 className="text-3xl font-bold text-white mb-12 text-center">
      Upcoming Events
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {[
        {
          title: "Hackathon 2026",
          date: "March 12, 2026",
          description:
            "A 24-hour coding challenge focused on solving real-world problems using modern web technologies.",
          speaker: "Guest Mentor: Ravi Kumar"
        },
        {
          title: "Web Dev Bootcamp",
          date: "April 2, 2026",
          description:
            "An intensive hands-on workshop covering React, APIs, and deployment strategies.",
          speaker: "Lead: Krishna Prasad"
        },
        {
          title: "AI Workshop",
          date: "May 15, 2026",
          description:
            "Explore machine learning basics, model building, and real-world AI applications.",
          speaker: "Speaker: Dr. Ananya Rao"
        }
      ].map((event, index) => (
        <div
          key={index}
          className="bg-white/5 border border-white/10 backdrop-blur-md 
                     p-6 rounded-2xl hover:scale-[1.03] transition 
                     flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-semibold text-purple-400">
              {event.title}
            </h3>

            <p className="text-sm text-pink-400 mt-1">
              {event.date}
            </p>

            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              Main Speaker
            </p>

            <p className="text-purple-300 text-sm mt-1">
              {event.speaker}
            </p>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-12">
      <Link
        to="/events"
        className="text-indigo-400 hover:underline text-lg"
      >
        View All Events →
      </Link>
    </div>
  </motion.div>
</div>


{/* Featured Projects Preview */}
<div className="relative z-10 w-full mt-20">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="max-w-6xl mx-auto px-6"
  >
    <h2 className="text-3xl font-bold text-white mb-12 text-center">
      Featured Projects
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {[
        {
          name: "MindGrid Portal",
          tech: "MERN Stack",
          description:
            "A centralized platform for managing club members, events, and contributions.",
          members: ["Krishna", "Rahul", "Ananya"]
        },
        {
          name: "Event Tracker",
          tech: "Node + MongoDB",
          description:
            "Tracks attendance, registrations, and participation analytics for all events.",
          members: ["Kiran", "Megha"]
        },
        {
          name: "Leaderboard System",
          tech: "React + Express",
          description:
            "Gamified ranking system based on contributions, projects, and event activity.",
          members: ["Arjun", "Sneha", "Vishal"]
        }
      ].map((project, index) => (
        <div
          key={index}
          className="bg-white/5 border border-white/10 backdrop-blur-md 
                     p-6 rounded-2xl hover:scale-[1.03] transition 
                     flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-semibold text-pink-400">
              {project.name}
            </h3>

            <p className="text-sm text-purple-300 mt-1">
              {project.tech}
            </p>

            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              Team Members
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {project.members.map((member, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full 
                             bg-purple-500/20 text-purple-300"
                >
                  {member}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-12">
      <Link
        to="/projects"
        className="text-indigo-400 hover:underline text-lg"
      >
        View All Projects →
      </Link>
    </div>
  </motion.div>
</div>

    </section>
  );
};

export default Hero;