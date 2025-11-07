import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Example from '../constants/EncryptButton';
import {ToastContainer} from 'react-toastify'
import { useState } from 'react';
import { handleError, handleSuccess } from './Utils';
import CardSpotlight from '../constants/CardSpotlight';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';


const Signup = () => {

  const [signupInfo, setSignupInfo] = useState({
      name: '',
      email: '',
      password: '',
      rollnumber: '',
      role: ''
  })

  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name,value} =e.target;
    console.log(name,value);
    const copySignUpInfo = { ...signupInfo };
    copySignUpInfo[name]= value;
    setSignupInfo(copySignUpInfo);
  }

  const handleSignup = async (e)=>{
    e.preventDefault();
    const { name , email , password , rollnumber, role} = signupInfo;
    if(!name || !email || !password || !rollnumber || !role){
        return handleError('All Credentials are required');
    }try{
        // ===== UPDATED: Use API_URL variable instead of hardcoded localhost =====
        const url = `${API_URL}/auth/signup`;
        // =======================================================================
        
        const response = await fetch(url,{
          method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(signupInfo)
        });
        const result = await response.json();
        const {success, message, error } =result;
        if(success){
          handleSuccess(message);
          setTimeout(()=>{
            navigate('/login')
          },1000)
        }else if(error){
          const details = error?.details[0].message;
          handleError(details); 
        }
        else if (!success){
          handleError(message);
        }
        console.log(result)
    }catch(err){
        handleError(err);
    }   
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="fixed inset-0 w-screen h-screen bg-slate-950 z-0">
        <div className="absolute bottom-0 left-[-20vw] top-[-10vh] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20vw] top-[-10vh] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]"></div>
      </div>

      <div className='flex animate-text-gradient font-extrabold bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-6xl text-transparent sm:text-7xl  sm:mt-32 mt-[80px] items-center justify-center relative mx-auto text-center mb-8'>
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
                  name="email"
                  type="text"
                  className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  value={signupInfo.email}
                />
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
                  name="rollnumber"
                  type="text"
                  className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter Your Roll Number"
                  value={signupInfo.rollnumber}
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Role</label>
                <input
                  onChange={handleChange}
                  name="role"
                  type="text"
                  className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter Your Role"
                  value={signupInfo.role}
                />
              </div>
            </div>

            <div className="mt-12">
              <Example buttonText="Create an account" />
            </div>

            <p className="text-slate-400 text-sm mt-6 text-center">
              Already have an account?{' '}
              <span className="text-blue-400 font-medium hover:underline ml-1">
                <Link type='submit' to='/login'>Login here</Link>
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
