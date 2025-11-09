import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Example from '../constants/EncryptButton';
import {ToastContainer} from 'react-toastify'
import { useState } from 'react';
import { handleError, handleSuccess } from './Utils';
import hero from '../sections/Hero'
import CardSpotlight from '../constants/CardSpotlight';

// ===== ADD THIS: API URL Configuration =====
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
// ============================================

const Login = () => {

  const [loginInfo, setLoginInfo] = useState({
      email: '',
      password: '',
  })

  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name,value} =e.target;
    console.log(name,value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name]= value;
    setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e)=>{
    e.preventDefault();
    const { email , password } = loginInfo;
    if(!email || !password ){
        return handleError('All Credentials are required');
    }try{
        const url = `${API_URL}/auth/login`;
        
        const response = await fetch(url,{
          method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(loginInfo)
        });
        const result = await response.json();
        const {success, message , jwtToken, name , error } = result;
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        if(success){
          handleSuccess(message);
          setTimeout(()=>{
            navigate('/hero')
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

  const handleLogout = (e)=>{
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser');
    
    setTimeout(()=>{
        navigate('/login');
    },500)
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="fixed inset-0 w-screen h-screen bg-slate-950 z-0">
        <div className="absolute bottom-0 left-[-20vw] top-[-10vh] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20vw] top-[-10vh] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.15),rgba(255,255,255,0))]"></div>
      </div>

      <div className='flex animate-text-gradient font-extrabold bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-6xl text-transparent sm:text-7xl  sm:mt-24 mt-[-60px] items-center justify-center relative mx-auto text-center mb-8'>
        LogIn
      </div>
    
      <CardSpotlight >
        <div className="max-w-md  w-[90%] mx-auto rounded-2xl   sm:mt-12 mb-12 p-2  sm:p-2 relative z-10">
          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Email Id</label>
                <input
                  onCha1nge={handleChange}
                  name="email"
                  type="text"
                  className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  value={loginInfo.email}
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
                  value={loginInfo.password}
                />
              </div>
            </div>

            <div className="mt-12">
              <Example buttonText="Login Securely" />
            </div>

            <p className="text-slate-400 text-sm mt-6 text-center">
              Does't have an account?{' '}
              <span className="text-blue-400 font-medium hover:underline ml-1">
                <Link type='submit' to='/signup'>signup here</Link>
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
