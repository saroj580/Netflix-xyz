import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Header from './Header'
import ForgetPassword from './ForgetPassword';
import axios from 'axios'
import { ApiEndPoints } from '../utils/constant';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, setLoading } from '../redux/userSlice';

function Login() {
  const user = useSelector((store) => store.user.user);
  const [isLogin, setIsLogin] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.user.loading);
  

  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    console.log("Login component mounted, user:", user);
    
    // If user is already logged in, redirect to browse
    if (user) {
      console.log("User already logged in, redirecting to browse");
      navigate('/browse', { replace: true });
    }
  }, [user, navigate]);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    fullName: ""
  });

  console.log("API Endpoint:", ApiEndPoints);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getInputData = async(e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    // Reset errors
    setErrors({
      email: "",
      password: "",
      fullName: ""
    });

    console.log("Validating email", email);
    console.log("Email Validation result: ", validateEmail(email));
    
    
   
    if (!validateEmail(email)) {
      setErrors(prev => ({...prev, email: "Please enter a valid email address"}));
      return;
    }
    
    
    if (password.length < 6) {
      setErrors(prev => ({...prev, password: "Password must be at least 6 characters"}));
      return;
    }
    
  
    if (!isLogin && fullName.trim() === "") {
      setErrors(prev => ({...prev, fullName: "Full name is required"}));
      return;
    }

    

    if (isLogin) {
      //login
      try {
        // Trying with hardcoded URL to test
        console.log("Attempting login with direct URL");
        const res = await axios.post("http://localhost:8080/api/v1/user/login", {
          email,
          password
        }, {
          withCredentials: true
        });
        console.log("Login response:", res);
        if (res.data.success) {
          // Dispatch login success action with user data
          dispatch(loginSuccess({
            fullName: res.data.user?.fullName || 'User',
            email: email
          }));
          
          toast.success(res.data.message);
          console.log("Login success, redirecting to browse page");
          navigate('/browse');
        }

      } catch (error) {

        console.log("Login error type:", typeof error);
        console.log("Full error object:", error);

        if (error.response) {
          console.log("Error response:", error.response.data);
          console.log("Status code:", error.response.status);
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Error:", error.message);
        }
        toast.error(error.response.data.message);
      }finally {
        dispatch(setLoading(false)); 
      }

    } else {

      //register
      dispatch(setLoading(true));
      try {
        const res = await axios.post("http://localhost:8080/api/v1/user/register", {
          fullName,
          email,
          password
        });

        console.log("Register response:", res);

        if (res.data.success) {
          toast.success(res.data.message);
          setIsLogin(true);
        }


      } catch (error) {

        console.log("Register error type:", typeof error);
        console.log("Full error object:", error);

        if (error.response) {
          console.log("Error response:", error.response.data);
          console.log("Status code:", error.response.status);
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Error:", error.message);
        }
        toast.error(error.response.data.message);

      } finally {
        dispatch(setLoading(false));
      }
    }
    
    setFullName("");
    setEmail("");
    setPassword("");
  }


  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          className='w-[100vw] h-[100vh]'
          src="https://analyticsindiamag.com/wp-content/uploads/2019/05/apps.55787.9007199266246365.687a10a8-4c4a-4a47-8ec5-a95f70d8852d.jpg"
          alt="netflixBanner"
        />
      </div>

      <div className="absolute inset-0 z-20 flex justify-center items-center top-20">
        {showForgot ? (
          <ForgetPassword onBack={() => setShowForgot(false)} />
        ) : (
          <div className="bg-black opacity-80 p-10 rounded-md w-full max-w-md">
            <h1 className="text-white text-3xl font-bold mb-6">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </h1>
        
            <form className="flex flex-col space-y-4" onSubmit={getInputData}>
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}  
                    placeholder="Full Name"
                    className={`p-3 rounded bg-gray-800 text-white placeholder-gray-400 outline-none w-full ${errors.fullName ? "border border-red-500" : ""}`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
              )}
              <div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // Clear the error when user starts typing
                    if (errors.email) {
                      setErrors(prev => ({...prev, email: ""}));
                    }
                  }}   
                  placeholder="Email or mobile number"
                  className={`p-3 rounded bg-gray-800 text-white placeholder-gray-400 outline-none w-full ${errors.email ? "border border-red-500" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}   
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`p-3 rounded bg-gray-800 text-white placeholder-gray-400 outline-none w-full ${errors.password ? "border border-red-500" : ""}`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded mt-2"
              >
                {`${isLoading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}`}
              </button>
            
              <div className="flex justify-between items-center text-sm text-gray-300 mt-3">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="accent-white" />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </form>
            
            <div className="text-gray-400 mt-6 text-sm">
              {isLogin ? "New to Netflix?" : "Already have an account?"}
              <span
                className="text-white font-medium ml-2 hover:underline cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up now" : "Sign in"}
              </span>
            </div>
          </div>
        )}
      </div>
      


      {/* <form className='absolute flex flex-col items-center  justify-center mx-auto left-0 right-0 p-12 my-36 w-3/9 bg-black opacity-80'>
        <h1 className='text-3xl text-white mb-5 font-bold'>{isLogin ? 'Login' : 'Signup'}</h1>
        <div className='flex flex-col'>
          {
            !isLogin && <input type="text" placeholder='Full Name' className='p-3 my-2 rounded-md bg-gray-800 text-white outline-none'/>
          }
          <input type="email" placeholder='Email or Phone Number' className='p-3 my-2 rounded-md bg-gray-800 text-white outline-none' />
          <input type="password" placeholder='Password' className='p-3 my-2 rounded-md bg-gray-800 text-white outline-none' />
          <p className='text-white'>{isLogin ? 'Already have account ?' : 'New to Netflix ?'} <span className='ml-1 text-blue-900 font-medium cursor-pointer underline'>{ isLogin ? 'Signup' : 'login'}</span></p>
        </div>
      </form> */}

    </div>
  )
}

export default Login
