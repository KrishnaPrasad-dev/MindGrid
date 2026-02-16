import React, { useEffect, useState } from "react";
import axios from "axios";
import LightPillar from "../constants/LightPillar";

const TREASURER_EMAIL = "itzmekrishna.257@gmail.com";
const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:8080";



const Contributions = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isTreasurer, setIsTreasurer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [amountInput, setAmountInput] = useState("");

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/contributions`);

      setLeaderboard(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.email === TREASURER_EMAIL) {
          setIsTreasurer(true);
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        console.error("Invalid token");
      }
    }

    fetchLeaderboard();
  }, []);

  const handleAddContribution = async () => {
    if (!emailInput || !amountInput) return;

    try {
      await axios.post(`${API_BASE}/api/contributions/add`, {

        email: emailInput,
        amount: amountInput,
      });

      setEmailInput("");
      setAmountInput("");
      setShowModal(false);
      fetchLeaderboard();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: -1 }}>
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="screen"
          quality="medium"
        />
      </div>

     {/* Floating Add Button */}
{isTreasurer && (
  <div
    style={{
      position: "fixed",
      top: window.innerWidth > 768 ? "90px" : "auto",
      bottom: window.innerWidth <= 768 ? "20px" : "auto",
      right: "20px",
      zIndex: 6,
    }}
  >
    <button
      onClick={() => setShowModal(true)}
      style={{
        padding: window.innerWidth > 768 ? "12px 20px" : "10px 16px",
        borderRadius: "50px",
        border: "none",
        cursor: "pointer",
        background: "#5227FF",
        color: "white",
        fontWeight: "600",
        fontSize: "clamp(0.75rem, 2vw, 1rem)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
      }}
    >
      + Add Contribution
    </button>
  </div>
)}


      {/* Main Leaderboard Container */}
      <div
        style={{
          padding: "60px 10px",
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            padding: "30px",
            borderRadius: "15px",
            border: "1px solid white",
            background: "rgba(0, 0, 0, 0.36)",
            backdropFilter: "blur(4px)",
            color: "white",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "clamp(1.6rem, 5vw, 2.5rem)",
              fontWeight: "800",
              letterSpacing: "1px",
            }}
          >
            Contributions Leaderboard
          </h2>

          {leaderboard.map((user, index) => (
            <div
              key={user._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 16px",
                marginBottom: "10px",
                borderRadius: "8px",
                border: "1px solid white",
                background: "rgba(3, 3, 3, 0.72)",
              }}
            >
              <span>
                #{index + 1} {user.name}
              </span>
              <span>₹{user.totalContribution}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "400px",
              padding: "25px",
              borderRadius: "12px",
              background: "black",
            }}
          >
            <h3 style={{ marginBottom: "15px", color: "white" }}>
              Add Contribution
            </h3>

            <input
              type="text"
              placeholder="User Email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <input
              type="number"
              placeholder="Amount"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  background: "#ccc",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleAddContribution}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  background: "#5227FF",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contributions;
