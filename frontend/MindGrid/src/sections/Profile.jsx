import React from "react";
import pfp from '../assets/profileblue.jpeg'

const Profile = ({
  name = "Krishna Prasad",
  title = "Full Stack Web Developer",
  role = 'club member',
  bio = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus ultricies. Sed vel aliquet libero.`,
  avatarUrl = "", // Default image file path
  skills = ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
  
  resumeUrl = "#",
  socials = {
    github: "#",
    linkedin: "#",
    twitter: "#",
  },
}) => {
  return (
    <section className="relative min-h-screen w-full mt-12 flex items-center justify-center py-12 px-1  overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />

      {/* Profile Card */}
      <div className="relative w-[90%] bg-gradient-to-br from-gray-800/60 via-gray-900 to-black/60 rounded-2xl shadow-2xl z-10 p-1">
        <div className="rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 p-8 md:p-12 flex flex-col md:flex-row gap-8">
          
          {/* Left Side - Profile Image */}
          <div className="flex-shrink-0 flex items-center justify-center w-full md:w-1/3">
            <div className="relative">
              <img
                src={pfp}
                alt={`${name} avatar`}
                className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover ring-4 ring-indigo-500/40 shadow-lg"
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gray-800/70 px-3 py-1 rounded-full text-xs text-gray-200 backdrop-blur">
                Available for hire
              </span>
            </div>
          </div>

          {/* Right Side - Info */}
          <div className="flex-1 text-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-white">{name}</h1>
                <p className="mt-1 text-indigo-300 font-medium text-lg md:text-xl">{title}</p>
                <p className="mt-1 text-indigo-300 font-medium text-lg md:text-xl">{role}</p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={resumeUrl}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white text-sm shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v12m0 0l4-4m-4 4l-4-4M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6" />
                  </svg>
                  <span>Resume</span>
                </a>
              </div>
            </div>

            <p className="mt-6 text-gray-300 leading-relaxed text-sm md:text-base">{bio}</p>

            {/* Skills Section */}
            <div className="mt-6">
              <h3 className="text-sm text-indigo-200 font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full bg-gray-800/50 text-xs text-gray-100 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Section */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              

              <div className="flex gap-3">
                <a
                  href={`mailto:hello@example.com`}
                  className="px-4 py-2 rounded-lg bg-transparent border border-gray-700 hover:border-indigo-500 transition text-sm text-gray-200"
                >
                  Message
                </a>
                <a
                  href={resumeUrl}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-sm text-white"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-gray-400 pb-2">
          Designed with ❤️ • Tailwind CSS
        </div>
      </div>
    </section>
  );
};

export default Profile;
