import React, { useState } from "react";

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="relative w-[850px] h-[500px] bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Sliding Blue Panel */}
        <div
          className={`absolute top-0 h-full w-1/2 bg-blue-500 text-white p-10 transition-all duration-700 ease-in-out z-30
            ${isLogin ? "left-1/2 rounded-l-[30%]" : "left-0 rounded-r-[30%]"}
          `}
        >
          <div className="flex flex-col justify-center h-full text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isLogin ? "Hello, Welcome!" : "Welcome Back!"}
            </h2>
            <p className="mb-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-500 transition"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </div>
        </div>

        {/* Forms Container */}
        <div className="absolute top-0 left-0 w-full h-full flex">
          {/* Login Form */}
          <div
            className={`absolute flex flex-col items-center justify-center left-0 w-1/2 h-full p-10 transition-all duration-700 ease-in-out
              ${isLogin ? "opacity-100 z-20" : "opacity-0 z-10"}
            `}
          >
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 mb-4 bg-gray-100 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-2 bg-gray-100 rounded"
            />
            <p className="text-sm text-right mb-4 text-gray-500">
              Forgot password?
            </p>
            <button className="w-full bg-blue-500 text-white py-2 rounded-full mb-4 hover:bg-blue-600 transition">
              Login
            </button>
          </div>

          {/* Register Form */}
          <div
            className={`absolute flex flex-col items-center justify-center right-0 w-1/2 h-full p-10 transition-all duration-700 ease-in-out
              ${!isLogin ? "opacity-100 z-20" : "opacity-0 z-10"}
            `}
          >
            <h2 className="text-2xl font-bold mb-6">Registration</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 mb-4 bg-gray-100 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-4 bg-gray-100 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-4 bg-gray-100 rounded"
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded-full mb-4 hover:bg-blue-600 transition">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialButton({ icon }) {
  return (
    <button className="w-10 h-10 bg-white rounded shadow hover:bg-gray-100 transition text-sm font-bold">
      {icon}
    </button>
  );
}
