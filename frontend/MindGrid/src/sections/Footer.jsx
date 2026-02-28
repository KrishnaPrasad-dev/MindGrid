import { Link } from "react-router-dom";
import brainImg from "../assets/brainrababu.gif";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              MindGrid
            </h1>
            <img src={brainImg} alt="Brain" className="w-8 h-8" />
          </div>

          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            Building leaders, coders, and communicators for tomorrow’s world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-purple-400 transition">Home</Link></li>
            <li><Link to="/events" className="hover:text-purple-400 transition">Events</Link></li>
            <li><Link to="/projects" className="hover:text-purple-400 transition">Projects</Link></li>
            <li><Link to="/leaderboard" className="hover:text-purple-400 transition">Leaderboard</Link></li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-white font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/signup" className="hover:text-purple-400 transition">Join Us</Link></li>
            <li><Link to="/profile" className="hover:text-purple-400 transition">My Profile</Link></li>
            <li><Link to="/contributions" className="hover:text-purple-400 transition">Contributions</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-purple-400 transition">Instagram</a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-400 transition">LinkedIn</a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-400 transition">GitHub</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MindGrid. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;