import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Example from "../constants/EncryptButton";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { handleError, handleSuccess } from "./Utils";
import CardSpotlight from "../constants/CardSpotlight";

// ===== ADD THIS: API URL Configuration =====
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
// ============================================

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("All Credentials are required");
    }
    try {
      const url = `${API_URL}/auth/login`;

      // optional: measure timings (comment out if not needed)
      const start = performance.now();

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const fetchDone = performance.now();
      const result = await response.json();
      const jsonDone = performance.now();
      console.log(
        "login timings (ms): fetch:",
        (fetchDone - start).toFixed(1),
        "json:",
        (jsonDone - fetchDone).toFixed(1),
        "total:",
        (jsonDone - start).toFixed(1),
      );

      const { success, message, jwtToken, name, error } = result;

      if (success && jwtToken) {
        // only store token after successful login
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("jwtToken", jwtToken); // set both keys for safety
        localStorage.setItem("loggedInUser", name || "");

        // 🔔 notify the app that auth state changed (so App.jsx updates immediately)
        window.dispatchEvent(new Event("auth-change"));

        handleSuccess(message || "Login successful");
        // navigate immediately to root; App.jsx will see the auth-change and update
        navigate("/", { replace: true });
        return;
      } else if (error) {
        const details =
          error?.details?.[0]?.message || error?.message || "Login failed";
        handleError(details);
      } else {
        handleError(message || "Login failed");
      }

      console.log("login result:", result);
    } catch (err) {
      console.error("login error", err);
      handleError(err?.message || String(err));
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="fixed inset-0 w-screen h-screen bg-slate-950 z-0">
        <div className="absolute bottom-0 left-[-20vw] top-[-10vh] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20vw] top-[-10vh] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]"></div>
      </div>

      <div className="flex animate-text-gradient font-extrabold bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-6xl text-transparent sm:text-7xl  sm:mt-24 mt-[-60px] items-center justify-center relative mx-auto text-center mb-8">
        LogIn
      </div>

      <CardSpotlight>
        <div className="max-w-md  w-[90%] mx-auto rounded-2xl   sm:mt-12 mb-12 p-2  sm:p-2 relative z-10">
          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  Email Id
                </label>
                <input
                  onChange={handleChange}
                  name="email"
                  type="text"
                  className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  value={loginInfo.email}
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  value={loginInfo.password}
                />
              </div>

              
            </div>

            <div className="mt-12">
              {/* Example is your custom button component — it should trigger form submit */}
              <Example buttonText="Login Securely" />
            </div>

            <p className="text-slate-400 text-sm mt-6 text-center">
              Does't have an account?{" "}
              <span className="text-blue-400 font-medium hover:underline ml-1">
                <Link type="submit" to="/signup">
                  signup here
                </Link>
              </span>
            </p>
          </form>
          <ToastContainer />
        </div>
      </CardSpotlight>
    </div>
  );
};

export default Login;
