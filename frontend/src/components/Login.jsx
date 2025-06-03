import React, { useState } from 'react'
import Header from './Header'
import ForgetPassword from './ForgetPassword';

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getInputData = (e) => {
    e.preventDefault();
    console.log(fullName, email, password);
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
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}  
                  placeholder="Full Name"
                  className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 outline-none"
                />
              )}
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}   
                placeholder="Email or mobile number"
                className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 outline-none"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}   
                type="password"
                placeholder="Password"
                className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 outline-none"
              />

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded mt-2"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
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
