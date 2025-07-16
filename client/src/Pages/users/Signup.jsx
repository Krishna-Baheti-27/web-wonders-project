import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  function handleNameChange(value) {
    setName(value);
  }

  const [email, setEmail] = useState("");
  function handleEmailChange(value) {
    setEmail(value);
  }

  const [password, setPassword] = useState("");
  function handlePasswordChange(value) {
    setPassword(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${VITE_BASE_URL}/users/signup`, data);
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      alert("Check error in console");
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 shadow-xl rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="John Doe"
                onChange={(e) => handleNameChange(e.target.value)}
                value={name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="you@example.com"
                onChange={(e) => handleEmailChange(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="••••••••"
                onChange={(e) => handlePasswordChange(e.target.value)}
                value={password}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Create Account
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/user-login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
