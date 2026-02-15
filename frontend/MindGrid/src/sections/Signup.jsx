import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Example from '../constants/EncryptButton';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { handleError, handleSuccess } from './Utils';
import CardSpotlight from '../constants/CardSpotlight';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
    rollnumber: ''
  });

  const [checking, setChecking] = useState(false);
  const [memberAllowed, setMemberAllowed] = useState(null); // null = unknown, true/false = result
  const [checkMessage, setCheckMessage] = useState('');
  const navigate = useNavigate();

  // helper to check membership by calling backend /auth/check-member
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

    // Reset membership state if email/rollnumber changed
    if (name === 'email' || name === 'rollnumber') {
      setMemberAllowed(null);
      setCheckMessage('');
    }
  };

  // check membership when email or rollnumber blurs (user finished typing)
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

    // If membership check was run and result is negative, block signup
    if (memberAllowed === false) {
      return handleError(checkMessage || 'You are not allowed to register on this site.');
    }

    try {
      // If check hasn't been performed, run synchronous check once before signup
      if (memberAllowed === null) {
        setChecking(true);
        await checkMembership({ email, rollnumber });
        setChecking(false);
        if (memberAllowed === false) return handleError(checkMessage || 'You are not allowed to register on this site.');
      }

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
        // Joi-style error object
        const details = error?.details?.[0]?.message;
        handleError(details || (message || 'Signup failed'));
      } else {
        handleError(message || 'Signup failed');
      }
      console.log(result);
    } catch (err) {
      console.error(err);
      handleError('Signup request failed. See console for details.');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="fixed inset-0 w-screen h-screen bg-slate-950 z-0">
        <div className="absolute bottom-0 left-[-20vw] top-[-10vh] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20vw] top-[-10vh] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]"></div>
      </div>

      <div className="flex animate-text-gradient font-extrabold bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-6xl text-transparent sm:text-7xl sm:mt-32 mt-[80px] items-center justify-center relative mx-auto text-center mb-8">
        Sign Up
      </div>

      <CardSpotlight>
        <div className="max-w-md  w-[90%] mx-auto rounded-2xl   sm:mt-12 mb-12 p-2  sm:p-2 relative z-10">
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
                    <span className="text-green-400">{checkMessage || 'Allowed to register'}</span>
                  ) : memberAllowed === false ? (
                    <span className="text-red-400">{checkMessage || 'Not allowed to register'}</span>
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
              {/* The Example button probably calls the encrypted submit inside it.
                  Keep behavior: wrap the native submit so the form submits normally. */}
              <Example buttonText="Create an account" />
            </div>

            <p className="text-slate-400 text-sm mt-6 text-center">
              Already have an account?{' '}
              <span className="text-blue-400 font-medium hover:underline ml-1">
                <Link type="submit" to="/login">Login here</Link>
              </span>
            </p>
          </form>
          <ToastContainer />
        </div>
      </CardSpotlight>
    </div>
  );
};

export default Signup;
