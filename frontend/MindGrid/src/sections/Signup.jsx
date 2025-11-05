import React from 'react';
import { Link } from 'react-router-dom';
import Example from '../constants/EncryptButton';
import {ToastContainer} from 'react-toastify'
import { useState } from 'react';

const Signup = () => {

  const [signupInfo, setSignupInfo] = useState({
      name: '',
      email: '',
      password: '',
      rollnumber: '',
      role: ''
  })

  const handleChange = (e)=>{
    const {name,value} =e.target;
    console.log(name,value);
    const copySignUpInfo = { ...signupInfo };
    copySignUpInfo[name]= value;
    setSignupInfo(copySignUpInfo);
  }

  const handleSignup = (e)=>{
    e.preventDefault();
    
  }
  


  return (

    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* BACKGROUND, covers viewport */}
      <div className="fixed inset-0 w-screen h-screen bg-slate-950 z-0">
        <div className="absolute bottom-0 left-[-20vw] top-[-10vh] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20vw] top-[-10vh] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]"></div>
      </div>

      <div className='flex animate-text-gradient font-extrabold bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-3xl  text-transparent sm:text-5xl mt-32 items-center justify-center relative mx-auto text-center'>
  Sign Up
</div>
    

      <div className="max-w-md w-full mx-auto border border-gray-300 dark:bg-gray-950 rounded-2xl mt-16 mb-24  p-8 bg-white bg-opacity-90 relative z-10">

        


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

          <p className="text-slate-600 text-sm mt-6 text-center">
            Already have an account?{' '}
            <span className="text-blue-600 font-medium hover:underline ml-1">
              <Link type='submit'  to='/login'>Login here</Link>
            </span>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
