// File: client/src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../context/Context.jsx";

const Navbar = () => {
  const data = useContext(DataContext);
  let isAuthenticated = false;
  if (data.user._id) isAuthenticated = true;

  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-lightgray text-darktext px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo / Site Name */}
        <Link
          to="/"
          className="text-2xl font-bold text-royalblue hover:text-cyan transition"
        >
          Apni site
        </Link>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 group hover:scale-110 transition-transform"
          >
            <div
              className={`w-6 h-0.5 bg-darktext my-1 transition-all duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-darktext my-1 transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-darktext my-1 transition-all duration-300 ease-in-out ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></div>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center text-lg font-sans text-darktext">
          <Link to="/" className="hover:text-cyan text-gray-700 transition">
            Home
          </Link>
          <Link
            to="/live-map"
            className="hover:text-cyan text-gray-700 transition"
          >
            Live Map
          </Link>
          <Link
            to="/my-trips"
            className="hover:text-cyan text-gray-700 transition"
          >
            My Trips
          </Link>
          {/* --- THIS IS THE NEWLY ADDED LINK FOR DESKTOP --- */}
          <Link
            to="/orders"
            className="hover:text-cyan text-gray-700 transition"
          >
            My Orders
          </Link>
          <Link
            to="/parcel"
            className="hover:text-cyan text-gray-700 transition"
          >
            Send a Parcel
          </Link>
          <Link
            to="/contact"
            className="hover:text-cyan text-gray-700 transition"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Auth Button */}
        <div className="hidden md:flex space-x-4">
          <Link
            to={isAuthenticated ? "/user-logout" : "/user-login"}
            className="bg-royalblue text-white px-4 py-2 rounded hover:bg-cyan transition"
          >
            {isAuthenticated ? "Logout" : "Get Started"}
          </Link>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out transform ${
          isOpen
            ? "max-h-screen opacity-100 scale-100 translate-y-0"
            : "max-h-0 opacity-0 scale-95 -translate-y-2"
        }`}
      >
        <div className="flex flex-col mt-4 space-y-2 text-lg font-sans text-darktext">
          <Link
            to="/"
            className="hover:text-cyan text-gray-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/live-map"
            className="hover:text-cyan text-gray-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Live Map
          </Link>
          <Link
            to="/my-trips"
            className="hover:text-cyan text-gray-700 transition"
            onClick={() => setIsOpen(false)}
          >
            My Trips
          </Link>
          <Link
            to="/orders"
            className="hover:text-cyan text-gray-700 transition"
            onClick={() => setIsOpen(false)}
          >
            My Orders
          </Link>
          <Link
            to="/parcel"
            className="hover:text-cyan text-gray-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Send a Parcel
          </Link>
          <Link
            to="/contact"
            className="hover:text-cyan text-gray-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            to={isAuthenticated ? "/user-logout" : "/user-login"}
            className="bg-royalblue text-white px-4 py-2 rounded hover:bg-cyan transition"
            onClick={() => setIsOpen(false)}
          >
            {isAuthenticated ? "Logout" : "Get Started"}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
