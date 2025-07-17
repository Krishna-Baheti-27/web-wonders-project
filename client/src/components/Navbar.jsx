// File: client/src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from "../context/Context.jsx";
import { useEffect } from 'react';
const Navbar = () => {
    const data = useContext(DataContext);
    let isAuthenticated = false;
    if (data.user._id) isAuthenticated = true;
    return (
        <nav className="bg-lightgray text-darktext px-6 py-4 shadow-sm flex items-center justify-between" data-aos="fade-down" data-aos-duration="2000">
            <Link to="/" className='text-2xl font-bold text-royalblue hover:text-cyan transition'>
                Apni site</Link>
            <div className="flex space-x-6 items-center text-lg font-sans text-darktext">
                <Link to="/" className='hover:text-cyan text-gray-700 transition'>Home</Link>
                <Link to="/live-map"className='hover:text-cyan text-gray-700 transition'>Live Map</Link>
                <Link to="/my-trips"className='hover:text-cyan text-gray-700 transition'>My Trips</Link>
                <Link to="/parcel"className='hover:text-cyan text-gray-700 transition'>Send a Parcel</Link>
                <Link to="/contact"className='hover:text-cyan text-gray-700 transition'>Contact</Link>
            </div>
            <div className='flex space-x-4'>
                <Link to={isAuthenticated ? "/user-logout" : "/user-login"} className='bg-royalblue text-white px-4 py-2 rounded hover:bg-cyan transition'>{isAuthenticated ? "Logout" : "Get Started"}</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;