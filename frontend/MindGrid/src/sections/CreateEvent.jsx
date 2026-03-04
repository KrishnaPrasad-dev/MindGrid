import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import InputSpotlightBorder from "../constants/InputSpotlightBorder";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = import.meta.env.VITE_API_URL;

export default function CreateEvent() {

  const { eventId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(eventId);

  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    speaker: "",
    location: "",
    registrationLink: ""
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // ===============================
  // LOAD EVENT (EDIT MODE)
  // ===============================
  useEffect(() => {

    if (!isEditMode) return;

    const fetchEvent = async () => {

      try {

        setLoading(true);

        const res = await fetch(`${API_BASE}/api/events/${eventId}`);

        if (!res.ok) {
          throw new Error("Failed to load event");
        }

        const data = await res.json();

        setEvent({
          title: data.title || "",
          description: data.description || "",
          date: data.date || "",
          speaker: data.speaker || "",
          location: data.location || "",
          registrationLink: data.registrationLink || ""
        });

      } catch (err) {

        console.error(err);
        toast.error("Unable to load event");

      } finally {

        setLoading(false);

      }

    };

    fetchEvent();

  }, [eventId, isEditMode]);

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================
  const handleChange = (e) => {

    const { name, value } = e.target;

    setEvent((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  // ===============================
  // HANDLE SUBMIT
  // ===============================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const url = isEditMode
        ? `${API_BASE}/api/events/${eventId}`
        : `${API_BASE}/api/events`;

      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(event)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Save failed");
      }

      toast.success(
        isEditMode
          ? "Event updated successfully!"
          : "Event created successfully!"
      );

      setTimeout(() => {
        navigate("/events");
      }, 800);

    } catch (err) {

      console.error("Submit error:", err);
      toast.error(err.message || "Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-12 overflow-hidden">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />

      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden w-[90%]">

        {/* GLOW EFFECT */}
        <div className="fixed inset-0 w-screen h-screen bg-slate-950 z-0">
          <div className="absolute bottom-0 left-[-20vw] top-[-10vh] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]" />
          <div className="absolute bottom-0 right-[-20vw] top-[-10vh] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]" />
        </div>

        {/* TITLE */}
        <div className="flex animate-text-gradient font-extrabold bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-4xl md:text-6xl text-transparent mt-[80px] items-center justify-center relative mx-auto text-center mb-8">
          {isEditMode ? "Edit Event" : "Create Event"}
        </div>

        {/* CARD */}
        <div className="w-full md:w-[90%] mx-auto rounded-2xl sm:mt-12 mb-12 p-8 relative z-10 bg-slate-700/40 backdrop-blur-md shadow-xl">

          <form onSubmit={handleSubmit} className="space-y-6">

            <InputSpotlightBorder
              inputProps={{
                name: "title",
                value: event.title,
                onChange: handleChange
              }}
              placeholder="Event Title"
            />

            <textarea
              name="description"
              value={event.description}
              onChange={handleChange}
              placeholder="Event Description"
              className="w-full rounded-md border border-gray-800 bg-gray-950 px-4 py-3 text-gray-100 outline-none focus:border-indigo-500 h-32 resize-none"
            />

            <InputSpotlightBorder
              inputProps={{
                name: "date",
                value: event.date,
                onChange: handleChange
              }}
              placeholder="Event Date"
            />

            <InputSpotlightBorder
              inputProps={{
                name: "speaker",
                value: event.speaker,
                onChange: handleChange
              }}
              placeholder="Speaker"
            />

            <InputSpotlightBorder
              inputProps={{
                name: "location",
                value: event.location,
                onChange: handleChange
              }}
              placeholder="Location"
            />

            <InputSpotlightBorder
              inputProps={{
                name: "registrationLink",
                value: event.registrationLink,
                onChange: handleChange
              }}
              placeholder="Registration Link"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              {loading
                ? "Saving..."
                : isEditMode
                ? "Update Event"
                : "Create Event"}
            </button>

          </form>

          <ToastContainer position="bottom-right" />

        </div>
      </div>
    </section>
  );
}