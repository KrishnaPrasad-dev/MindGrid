// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import brainImg from '../assets/brainrababu.gif';
import arrowblk from '../assets/next.png';
import { Link } from "react-router-dom";
import GlowingCard from '../constants/GlowingCard.jsx';
const API_BASE = import.meta.env.VITE_API_URL;


import githubIcon from "../assets/github.png";
import linkedinIcon from "../assets/linkedin.png";
import arrowIcon from "../assets/arrow-up.png";
import featuredIcon from "../assets/featured.png";

const Hero = () => {

  const statsData = [
    { label: "Members", value: 60 },
    { label: "Events Conducted", value: 3 },
    { label: "Projects Built", value: 4 },
  ];

  const [counts, setCounts] = useState(statsData.map(() => 0));
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

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

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/projects`);
        const data = await res.json();

        const onlyFeatured = data.filter(p => p.isFeatured).slice(0, 3);
        setFeaturedProjects(onlyFeatured);
      } catch (err) {
        console.error("Featured fetch error:", err);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchFeatured();
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
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto px-6"
        >
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 
                         rounded-2xl p-6 text-center shadow-xl 
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
    className="max-w-7xl xl:max-w-[1400px] mx-auto px-8"
  >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Upcoming Events
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Hackathon 2025",
                date: "october, 2025",
                description:
                  "A 24-hour coding challenge focused on solving real-world problems using modern web technologies.",
                speaker: "Lead: Dr.Sanjeev Srivastava"

              },

              {
                title: "Logical Programming.",
                date: "Febuary 20, 2026",
                description:
                  "Detailed insights to logical thinking and programming logic.",
                speaker: "Speaker: Dr. Salaria"
              },
              {
                title: "Web Dev Challenge",
                date: "Febuary 10, 2026",
                description:
                  "Mindgrid web development challenge focused on building a full stack web application for mindgrid club.",
                speaker: "Lead: Dr.Sanjeev Srivastava"
              },
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
    className="max-w-7xl xl:max-w-[1400px] mx-auto px-8"
  >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Featured Projects
          </h2>

          {loadingProjects ? (
            <p className="text-center text-gray-400">Loading featured projects...</p>
          ) : featuredProjects.length === 0 ? (
            <p className="text-center text-gray-400">No featured projects yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <div
                  key={project._id}
                  className="bg-transparent border border-white/10 backdrop-blur-md
            p-6 rounded-2xl shadow-xl
            hover:scale-[1.03] transition duration-300
            flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <h2 className="text-2xl font-semibold text-pink-400">
                        {project.title}
                      </h2>

                      <div className="flex items-center gap-2">
                        <h2 className="text-white text-xl font-medium">
                          Featured
                        </h2>
                        <img
                          src={featuredIcon}
                          alt="featured"
                          className="h-6 w-6"
                        />
                      </div>
                    </div>

                    <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.techStack?.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full
                    bg-purple-500/20 text-purple-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Team Members */}
                  {project.teamMembers?.length > 0 && (
                    <div className="mt-6">
                      <p className="text-gray-500 text-xs uppercase tracking-wider">
                        Team Members
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.teamMembers.map((member, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs rounded-full
                      bg-indigo-500/20 text-indigo-300"
                          >
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-8">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>{project.status}</span>
                      <span>{project.progress}%</span>
                    </div>

                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>

                    <div className="mt-6 flex justify-between items-center flex-wrap gap-4">
                      <div className="flex gap-4 flex-wrap">
                        {project.createdBy?.linkedin && (
                          <a
                            href={project.createdBy.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 bg-gray-200 h-11 px-4 rounded-md border shadow-sm hover:scale-105 transition"
                          >
                            <img src={linkedinIcon} alt="linkedin" className="h-6 w-6" />
                            <p className="text-black text-sm font-medium">
                              LinkedIn
                            </p>
                          </a>
                        )}

                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 bg-gray-200 h-11 px-4 rounded-md border shadow-sm hover:scale-105 transition"
                          >
                            <img src={githubIcon} alt="github" className="h-6 w-6" />
                            <p className="text-black text-sm font-medium">
                              GitHub
                            </p>
                          </a>
                        )}
                      </div>

                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer">
                          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none">
                            <span
                              className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] 
                        bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
                            />
                            <span
                              className="inline-flex h-full w-full items-center justify-center 
                        rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl"
                            >
                              Check Live Site
                              <img
                                src={arrowIcon}
                                alt="arrow"
                                className="ml-3 h-4 w-4"
                              />
                            </span>
                          </button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12 mb-16">
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