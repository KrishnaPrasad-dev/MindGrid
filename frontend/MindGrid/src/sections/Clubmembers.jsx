import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import pfpblu from "../assets/profileblue.jpeg";

import presidentIcon from "../assets/crown.png";
import vicePresidentIcon from "../assets/vice.png";
import secretaryIcon from "../assets/secretary.png";
import treasurerIcon from "../assets/treasure-chest.png";
import coordinatorIcon from "../assets/programming (1).png";
import skillsIcon from "../assets/project-management.png";
import defaultIcon from "../assets/member.png";
import CommIcon from "../assets/conversation.png";

// Normalize role safely
const getRoleIcon = (role) => {
  if (!role) return defaultIcon;

  const r = role.toLowerCase().replace(/-/g, " ").replace(/\s+/g, " ").trim();

  if (r === "president") return presidentIcon;
  if (r === "vice president") return vicePresidentIcon;
  if (r === "secretary") return secretaryIcon;
  if (r === "treasurer") return treasurerIcon;
  if (r === "project coordinator") return coordinatorIcon;
  if (r === "skills coordinator") return skillsIcon;
  if (r === "skills lead communication") return CommIcon;

  return defaultIcon;
};

const Clubmembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError(null);

      try {
        const token =
          localStorage.getItem("token") ||
          localStorage.getItem("jwtToken") ||
          sessionStorage.getItem("token");

        

        const res = await axios.get(`${API_URL}/members`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.data.success) {
          throw new Error(res.data.message || "Failed to fetch members");
        }

        setMembers(res.data.members || []);
      } catch (err) {
        console.error("❌ Error fetching members:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Network error while fetching members",
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
        <div className="w-full max-w-full p-4 border border-slate-700 rounded-lg shadow-sm sm:p-6 bg-slate-950/70 ">
          <h5 className="mb-3 text-base font-semibold md:text-xl text-white">
            Club Members and their roles
          </h5>

          {loading ? (
            <div className="py-8 text-center text-white">Loading members…</div>
          ) : error ? (
            <div className="py-8 text-center text-red-500">Error: {error}</div>
          ) : members.length === 0 ? (
            <div className="py-8 text-center text-white">No members found.</div>
          ) : (
            <ul className="my-4 space-y-4">
              {members.map((member) => (
                <li key={member._id}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 font-bold rounded-lg bg-slate-900 backdrop-blur-xl border border-slate-700/90">
                    {/* LEFT SIDE (Profile + Name) */}
                    <Link
                      to={`/profile/${member._id}`}
                      className="flex items-center gap-3 w-full sm:w-auto"
                    >
                      <img
                        src={member.profilePic || pfpblu}
                        className="rounded-full h-8 w-8 sm:h-10 sm:w-10 object-cover"
                        alt="Profile"
                      />

                      <p className="text-white text-md sm:text-lg leading-tight break-words">
                        {member.name}
                      </p>
                    </Link>

                    {/* ROLE BADGE */}
                    <div
                      className="
    flex items-center justify-center
    min-w-[160px] sm:min-w-[220px]
    min-h-[52px]
    px-4
    rounded-xl
    bg-sky-600
    text-white
    text-md sm:text-base
    font-semibold
    text-center
    break-words
    transition
    hover:scale-[1.03]
  "
                    >
                      <span className="leading-snug">
                        {member.role || "Member"}
                      </span>

                      {getRoleIcon(member.role) && (
                        <img
                          src={getRoleIcon(member.role)}
                          className="ml-2 h-8 w-8 flex-shrink-0"
                          alt="role icon"
                        />
                      )}
                    </div>
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
