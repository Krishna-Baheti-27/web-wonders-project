
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const CustomAlert = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full relative animate-fadeIn">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <div className="text-red-500 text-3xl mb-2">&#9888;</div>
          <p className="text-gray-800 text-center mb-4">{message}</p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold transition"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const Signup = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Signup";
  }) 
  const VITE_BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

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

  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${VITE_BACKEND_BASE_URL}/users/signup`,
        data
      );
      if (response.status === 201) {
        response.data && localStorage.setItem("token", response.data.token);
        location.href = "/";
      }
    } catch (error) {
      const res = error.response;
      if (res && res.status === 400) {
        setAlertMessage(
          "Validation error: " + res.data.errors.map((err) => err.msg).join(", ")
        );
        setIsAlertVisible(true);
      } else console.log("Error:", error);
    }
  }

  return (
    <>
      <div className={`min-h-screen bg-gray-100 flex items-center justify-center px-4 transition-all duration-300 ${isAlertVisible ? "blur-sm" : ""}`}id = "signup">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 shadow-xl rounded-3xl grid grid-cols-1 gap-4" data-aos="zoom-in-up">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form className="space-y-4">
              <div data-aos="zoom-in-up">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="John Doe"
                  onChange={(e) => handleNameChange(e.target.value)}
                  value={name}
                />
              </div>
              <div data-aos="zoom-in-up">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="you@example.com"
                  onChange={(e) => handleEmailChange(e.target.value)}
                  value={email}
                />
              </div>
              <div data-aos="zoom-in-up">
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
              data-aos="zoom-in-up">
                Create Account
              </button>
            </form>
            <p className="text-sm text-center mt-4" data-aos="zoom-in-up">
              Already have an account?{" "}
              <Link to="/user-login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <CustomAlert message={alertMessage} isVisible={isAlertVisible} onClose={() => setIsAlertVisible(false)} />
    </>
  );
};

export default Signup;
