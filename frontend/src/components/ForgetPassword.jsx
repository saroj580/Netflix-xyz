import React from 'react';

const ForgetPassword = ({ onBack }) => {
  return (
    <div className="bg-black opacity-80 p-10 rounded-md w-full max-w-md text-white">
      <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
      <p className="text-gray-300 mb-4 text-sm">
        Enter your email or phone number and we'll send you instructions to reset your password.
      </p>
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Email or mobile number"
          className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 outline-none"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded"
        >
          Send Reset Link
        </button>
        <button
          type="button"
          onClick={onBack}
          className="text-blue-400 underline hover:text-blue-300 text-sm mt-2"
        >
          Back to Sign In
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
