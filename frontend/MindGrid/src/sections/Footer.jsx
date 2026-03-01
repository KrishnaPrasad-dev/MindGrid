import { Link } from "react-router-dom";
import brainImg from "../assets/brainrababu.gif";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 mt-16 relative z-20">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid gap-10 
                        grid-cols-1 
                        md:grid-cols-3 
                        items-start">

          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-bold 
                             bg-gradient-to-r from-purple-400 to-pink-500 
                             bg-clip-text text-transparent">
                MindGrid
              </h1>
              <img src={brainImg} alt="Brain" className="w-8 h-8" />
            </div>

            <p className="text-gray-400 mt-4 text-sm leading-relaxed 
                          max-w-xs mx-auto md:mx-0">
              Building leaders, coders, and communicators 
              for tomorrow’s world.
            </p>
          </div>


          {/* Quick Links + Explore Wrapper */}
          <div className="grid grid-cols-2 gap-8 text-center md:text-left">

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                Quick Links
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link to="/" className="hover:text-purple-400 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="hover:text-purple-400 transition">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-purple-400 transition">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="hover:text-purple-400 transition">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                Explore
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link to="/signup" className="hover:text-purple-400 transition">
                    Join Us
                  </Link>
                </li>
                <li>
                  <Link to="/profile/6991847d329bfc4bb0a5aa0e" className="hover:text-purple-400 transition">
                    Admin Profile
                  </Link>
                </li>
                <li>
                  <Link to="/contributions" className="hover:text-purple-400 transition">
                    Contributions
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5 text-center text-gray-500 text-xs sm:text-sm">
        © {new Date().getFullYear()} MindGrid. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;