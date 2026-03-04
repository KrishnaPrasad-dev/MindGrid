import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import featuredIcon from "../assets/featured.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Events() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const parseJwt = (token) => {
    try {
      if (!token) return null;
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  };

  const payload = parseJwt(token);
  const userEmail = payload?.email;

  useEffect(() => {

    const fetchEvents = async () => {
      try {

        const res = await fetch(`${API_BASE}/api/events`);

        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        setEvents(data);

      } catch (err) {
        console.error("Events fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

  }, []);

  const toggleFeature = async (id) => {

    try {

      await fetch(`${API_BASE}/api/events/${id}/feature`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const res = await fetch(`${API_BASE}/api/events`);
      const data = await res.json();
      setEvents(data);

    } catch (err) {
      console.error("Feature toggle error:", err);
    }
  };

  return (
    <section className="w-full flex flex-col relative overflow-hidden bg-black min-h-screen">

      {/* SAME HERO BACKGROUND AS PROJECTS */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_2px,transparent_2px),linear-gradient(to_bottom,#80808005_2px,transparent_2px)] bg-[size:14px_24px]" />
        <div className="absolute left-1/2 top-[-10%] h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#ffffff10,#000000)]" />
      </div>

      <div className="relative z-10 w-[90%] max-w-6xl mx-auto mt-32 mb-20">

        {/* SAME HERO HEADING STYLE */}
        <h1
          className="text-4xl md:text-6xl font-extrabold text-center mb-16
          bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe]
          bg-[200%_auto] bg-clip-text text-transparent animate-text-gradient"
        >
          EVENTS
        </h1>

        {/* ADMIN ADD BUTTON */}
        {userEmail === import.meta.env.VITE_ADMIN_EMAIL && (
          <div className="text-center mb-10">
            <Link
              to="/create-event"
              className="bg-gradient-to-r from-purple-500 to-pink-500
              text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              + Add Event
            </Link>
          </div>
        )}

        {/* HERO DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 80, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero_tag font-extrabold text-center text-gray_gradient mb-16"
        >
          <span>
            Innovation happens when curious minds gather. <br />
            <span className="block">Explore. Learn. Build together.</span>
          </span>
        </motion.p>

        {loading ? (
          <p className="text-center text-gray-400">Loading events...</p>

        ) : events.length === 0 ? (

          <p className="text-center text-gray-400">No events yet.</p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {events.map((event) => (

              <div
                key={event._id}
                className="bg-transparent border border-white/10 backdrop-blur-md
                p-8 rounded-2xl shadow-xl
                hover:scale-[1.03] transition duration-300
                flex flex-col justify-between"
              >

                <div>

                  <div className="flex items-start justify-between flex-wrap gap-2">

                    {/* TITLE */}
                    <h2 className="text-2xl font-semibold text-pink-400">
                      {event.title}
                    </h2>

                    {/* FEATURE BADGE */}
                    {event.isFeatured && (
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
                    )}

                  </div>

                  {/* ADMIN FEATURE BUTTON */}
                  {userEmail === import.meta.env.VITE_ADMIN_EMAIL && (
                    <button
                      onClick={() => toggleFeature(event._id)}
                      className="text-md mt-2 py-2 px-2 rounded-xl border border-1px text-yellow-400 hover:text-yellow-300"
                    >
                      {event.isFeatured
                        ? "UnFeature Event"
                        : "Mark as Featured"}
                    </button>
                  )}

                  <p className="text-sm text-pink-400 mt-4">
                    {event.date}
                  </p>

                  <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                    {event.description}
                  </p>

                  {event.speaker && (
                    <div className="mt-6">
                      <p className="text-gray-500 text-xs uppercase tracking-wider">
                        Main Speaker
                      </p>

                      <p className="text-indigo-300 text-sm mt-1">
                        {event.speaker}
                      </p>
                    </div>
                  )}

                  {event.location && (
                    <div className="mt-4">
                      <p className="text-gray-500 text-xs uppercase tracking-wider">
                        Location
                      </p>

                      <p className="text-indigo-300 text-sm mt-1">
                        {event.location}
                      </p>
                    </div>
                  )}

                </div>

                {/* FOOTER */}
                <div className="mt-8 flex justify-between items-center flex-wrap gap-4">

                  {event.registrationLink && (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px]">

                        <span
                          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
                          bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
                        />

                        <span
                          className="inline-flex h-full w-full items-center justify-center
                          rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl"
                        >
                          Register
                        </span>

                      </button>
                    </a>
                  )}

                  {/* EDIT BUTTON */}
                  {payload?.email &&
                    event.createdBy?.email &&
                    payload.email === event.createdBy.email && (

                      <Link
                        to={`/edit-event/${event._id}`}
                        className="text-xl border p-2 rounded-xl text-gray-400 hover:text-white"
                      >
                        Edit →
                      </Link>

                    )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}