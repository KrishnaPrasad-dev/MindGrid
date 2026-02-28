import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Example from "../constants/EncryptButton";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./Utils";
import CardSpotlight from "../constants/CardSpotlight";
import Squares from "../constants/Squares";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("All Credentials are required");
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success && jwtToken) {
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("loggedInUser", name || "");

        window.dispatchEvent(new Event("auth-change"));

        handleSuccess(message || "Login successful");
        navigate("/", { replace: true });
      } else if (error) {
        const details =
          error?.details?.[0]?.message || error?.message || "Login failed";
        handleError(details);
      } else {
        handleError(message || "Login failed");
      }
    } catch (err) {
      console.error("login error", err);
      handleError(err?.message || "Login failed");
    }
  };

return (
  <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

    {/* Squares Background */}
    <div className="absolute inset-0 -z-10">
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal"
        borderColor="#5d00ff"
        hoverColor="#ffffff"
      />
    </div>

    {/* Content Wrapper */}
    <div className="relative z-10 w-full flex flex-col items-center px-4">

      {/* Heading */}
      <h1 className="text-5xl sm:text-6xl sm:mt-20 mt-[-60px] font-extrabold text-white text-center mb-10 ">
        LOGIN
      </h1>

      {/* Card */}
      <CardSpotlight>
        <div className="w-full max-w-md p-6">

          <form onSubmit={handleLogin} className="space-y-6">

            <div>
              <label className="text-slate-300 text-sm mt-6 font-medium mb-2 block">
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

            <div className="pt-4">
              <Example buttonText="Login Securely" />
            </div>

            <p className="text-slate-400 text-sm pb-12   text-center">
              Doesn't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-400 font-medium hover:underline ml-1"
              >
                signup here
              </Link>
            </p>

          </form>

          <ToastContainer />
        </div>
      </CardSpotlight>

    </div>
  </section>
);
};
export default Login;
