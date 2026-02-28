import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Example from '../constants/EncryptButton';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { handleError, handleSuccess } from './Utils';
import CardSpotlight from '../constants/CardSpotlight';
import Squares from '../constants/Squares';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
    rollnumber: ''
  });

  const [checking, setChecking] = useState(false);
  const [memberAllowed, setMemberAllowed] = useState(null);
  const [checkMessage, setCheckMessage] = useState('');
  const navigate = useNavigate();

  const checkMembership = async ({ email, rollnumber }) => {
    if (!email && !rollnumber) {
      setMemberAllowed(null);
      setCheckMessage('');
      return;
    }
    try {
      setChecking(true);
      setMemberAllowed(null);
      const url = new URL(`${API_URL}/auth/check-member`);
      if (email) url.searchParams.set('email', email);
      if (rollnumber) url.searchParams.set('rollnumber', rollnumber);

      const res = await fetch(url.toString(), { method: 'GET', headers: { Accept: 'application/json' } });
      const body = await res.json().catch(() => ({ allowed: false }));
      if (res.ok) {
        setMemberAllowed(Boolean(body.allowed));
        setCheckMessage(body.message || (body.allowed ? 'Allowed to register' : 'Not allowed to register'));
      } else {
        setMemberAllowed(false);
        setCheckMessage(body.message || 'Not allowed to register');
      }
    } catch (err) {
      console.error('Membership check failed', err);
      setMemberAllowed(false);
      setCheckMessage('Membership check failed — try again later');
    } finally {
      setChecking(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignUpInfo = { ...signupInfo };
    copySignUpInfo[name] = value;
    setSignupInfo(copySignUpInfo);

    if (name === 'email' || name === 'rollnumber') {
      setMemberAllowed(null);
      setCheckMessage('');
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (name === 'email' || name === 'rollnumber') {
      checkMembership({ email: signupInfo.email, rollnumber: signupInfo.rollnumber });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, rollnumber } = signupInfo;
    if (!name || !email || !password || !rollnumber) {
      return handleError('All Credentials are required');
    }

    if (memberAllowed === false) {
      return handleError(checkMessage || 'You are not allowed to register on this site.');
    }

    try {
      const url = `${API_URL}/auth/signup`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo)
      });

      const result = await response.json().catch(() => ({}));
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message || 'Signup successful');
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details || (message || 'Signup failed'));
      } else {
        handleError(message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      handleError('Signup request failed. See console for details.');
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

      <div className="relative z-10 w-full flex flex-col items-center">

        <div className="flex text-5xl font-extrabold 
          text-white
          sm:text-7xl sm:mt-32  text-center mb-8">
          SIGNUP
        </div>

        <CardSpotlight>
          <div className="max-w-md w-[90%] mx-auto rounded-2xl sm:mt-12 mb-12 p-2 sm:p-2 relative z-10">
            <form onSubmit={handleSignup}>
              <div className="space-y-6">
                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">Name</label>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="name"
                    type="text"
                    className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="Enter Your Name"
                    value={signupInfo.name}
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">Email Id</label>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    type="text"
                    className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="Enter email"
                    value={signupInfo.email}
                  />
                  <div className="mt-2 text-sm">
                    {checking ? (
                      <span className="text-yellow-300">Checking membership...</span>
                    ) : memberAllowed === true ? (
                      <span className="text-green-400">{checkMessage}</span>
                    ) : memberAllowed === false ? (
                      <span className="text-red-400">{checkMessage}</span>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">Password</label>
                  <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="Enter password"
                    value={signupInfo.password}
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">Roll Number</label>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="rollnumber"
                    type="text"
                    className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="Enter Your Roll Number"
                    value={signupInfo.rollnumber}
                  />
                </div>
              </div>

              <div className="mt-12">
                <Example buttonText="Create an account" />
              </div>

              <p className="text-slate-400 text-sm mt-6 text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-400 font-medium hover:underline ml-1">
                  Login here
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

export default Signup;