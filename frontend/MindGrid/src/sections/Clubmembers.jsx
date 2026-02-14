import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import crown from "../assets/crown.png";
import pfpblu from "../assets/profileblue.jpeg";

const Clubmembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  


const API_URL = import.meta.env.VITE_API_URL; 
  // ✅ Fetch all club members (protected route)
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get token from localStorage
        const token =
          localStorage.getItem("token") ||
          localStorage.getItem("jwtToken") ||
          sessionStorage.getItem("token");

        if (!token) {
          setError("You must be logged in to view members.");
          setLoading(false);
          return;
        }
const res = await axios.get(
  `${API_URL}/members`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


        if (!res.data.success) {
          throw new Error(res.data.message || "Failed to fetch members");
        }

        setMembers(res.data.members || []);
      } catch (err) {
        console.error("❌ Error fetching members:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Network error while fetching members"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Page Title */}
      <div className="flex animate-text-gradient font-extrabold bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-5xl text-transparent sm:text-7xl mt-20 items-center justify-center relative mx-auto text-center">
        Club Members
      </div>

      {/* Members List */}
      <div className="relative mt-12 px-4">
        <div className="w-full max-w-full p-4  border border-slate-700  rounded-lg shadow-sm sm:p-6 bg-indigo-900/70
">
          <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
            Club Members and their roles    
          </h5>

          {loading ? (
            <div className="py-8 text-center text-white">Loading members…</div>
          ) : error ? (
            <div className="py-8 text-center text-red-500">Error: {error}</div>
          ) : members.length === 0 ? (
            <div className="py-8 text-center text-white">No members found.</div>
          ) : (
            <ul className="my-4 space-y-3">
              {members.map((member) => (
                <li key={member._id}>
                  <div className="flex items-center justify-between p-3 font-bold text-gray-900 rounded-lg  dark:text-white cursor-pointer  bg-slate-900 backdrop-blur-xl border border-slate-700/90
">
                    <div className="flex ml-1 mr-1 sm:ml-2 sm:mr-2 relative">
                      <Link
                        to={`/profile/${member._id}`}
                        className="flex items-center gap-2 sm:gap-3"
                      >
                        <img
                          src={member.profilePic || pfpblu}
                          className="rounded-full h-6 w-6 sm:h-7 sm:w-7"
                          alt="Profile"
                        />
                        <p className="sm:text-lg">{member.name}</p>
                      </Link>
                    </div>

                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-3 py-2.5 sm:px-5 sm:py-2.5 sm:text-base inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      {member.role || "Member"}
                      <img src={crown} className="ml-2 h-4 w-4" alt="crown" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clubmembers;
