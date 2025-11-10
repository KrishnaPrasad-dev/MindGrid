import React from "react";
import pfp from '../assets/profileblue.jpeg'
import mem from '../assets/group.png'
import pen from '../assets/pen.png'
import github from '../assets/github.png'
import linkedin from '../assets/linkedin.png'
import { Link } from "react-router-dom";


const Profile = ({
  name = "J Krishna Prasad",
  title = "Full Stack Web Developer",
  role = 'Club Member',
  bio = `I am Krishna Prasad from GuruNanak Univeristy , I have a deep love for coding, and it is my true passion that drives me to constantly learn, create, and solve problems through programming.`,
  avatarUrl = "",
  section = "",
  skills = ["Javascript", "React", "Node.js", "MongoDB", "Express", "Html", "css", "Postman","Tailwind CSS"],
  
  
  resumeUrl = "",
  githuburl = "",
  linkedinurl = ""
}) => {
  return (
    <section className="relative min-h-screen w-full mt-12 flex items-center justify-center py-12 px-1  overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute  inset-0 z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />

      {/* Profile Card */}
      <div className="relative w-[90%] bg-gradient-to-br from-gray-900/60 via-gray-950 to-black/90 rounded-2xl shadow-2xl z-10 p-1">

    <div className="flex justify-end mt-1 mr-1 mb-2">
<button className='relative inline-flex h-12 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 '>
      <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
      <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-gray-950 px-2  text-sm font-medium text-gray-50 backdrop-blur-3xl'>
        <div className="flex justify-end  flex-row">
            <Link to='/editprofile' className="text-white mr-2  ml-1">Edit Profile</Link>
            <img src={pen} className="h-5 w-5 mr-1" alt="" />
          </div>
      </span>
    </button>
</div>

        <div className="rounded-2xl bg-gradient-to-b p-8 md:p-12 flex flex-col md:flex-row gap-8">
          
          
          {/* Left Side - Profile Image */}
          <div className="flex-shrink-0 flex items-center justify-center w-full md:w-1/3">
            <div className="relative">
              <img
                src={pfp}
                alt={`${name} avatar`}
                className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover ring-4 ring-indigo-500/40 shadow-lg"
              />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gray-800/70  px-4 py-2 rounded-full  text-md text-gray-200 backdrop-blur">
                CSE-6
              </span>
            </div>
          </div>

          {/* Right Side - Info */}
          <div className="flex-1 text-gray-200">
            <div className="flex flex-col mt-12 sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-white">{name}</h1>
                <p className="mt-3 text-indigo-300 font-medium text-lg md:text-xl">{title}</p>
                <div className="mt-5 text-indigo-300 font-medium text-lg md:text-xl ">
                    <div className="inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-3  font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
  {role}
  <img
                src={mem}
                alt={`${name} avatar`}
                className="ml-2 w-9 h-10 "
              />
</div>
                   </div>
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

            <p className="mt-6 text-gray-300  leading-relaxed  md:text-base">{bio}</p>

            {/* Skills Section */}
            <div className="mt-6">
              <h3 className="text-md text-indigo-200 font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    
                  >
                      <span className='relative inline-block overflow-hidden rounded-full p-[2px]'>
      <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
      <div className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-3 py-1 text-xs font-medium text-gray-50 backdrop-blur-3xl'>
        {s}
      </div> 
    </span>

                    
                  </span>
                ))}
              </div>
            </div>
            

            {/* Footer Section */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              

              <div className="flex gap-3">
                
                <a
                  href={resumeUrl}
                  className="text-md text-indigo-200 font-semibold mb-3"
                >
                  Contact Me
                </a>
              </div>
              </div>
              <div className="mt-4 text-indigo-300 flex flex-row gap-3 font-medium text-lg md:text-xl ">
                <div className="h-11 bg-white w-11 rounded-md border border-2px ">
                    <img src={github} alt="" />
                </div>

                <div className="h-11 bg-white w-11 rounded-md  ">
                    <img src={linkedin} alt="" />
                </div>
                   
                   
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-gray-400 pb-2">
          -------{name}------- 
        </div>
      </div>
    </section>
  );
};

export default Profile;
