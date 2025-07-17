import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Login";
  })
  const VITE_BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

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
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${VITE_BACKEND_BASE_URL}/users/login`,
        data
      );
      if (response.status === 200) {
        response.data && localStorage.setItem("token", response.data.token);
        location.href = "/";
      }
    } catch (error) {
      const res = error.response;
      if (res && res.status === 400) {
        // form validation errors
        alert(
          "Validation error: " +
            res.data.errors.map((err) => err.msg).join(", ")
        );
      } else if (res && res.status === 401) {
        // for invalid email or password
        alert(res.data.error);
      } else console.log("Error:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 shadow-xl rounded-3xl max-w-md w-full" data-aos="zoom-in-up" data-aos-duration="1000">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4">
          <div data-aos="zoom-in-up" data-aos-duration="1500">
            <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="you@example.com"
              onChange={(e) => handleEmailChange(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4" data-aos="zoom-in-up" data-aos-duration="2000">
            <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
            onClick={(e) => {
              handleSubmit(e);
            }}
          data-aos="zoom-in-up" data-aos-duration="2500">
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4"data-aos="zoom-in-up" data-aos-duration="3000">
          Don’t have an account?{" "}
          <Link to="/user-signup" className="text-blue-600 hover:underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
