// File: client/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="bg-lightgray text-darktext px-6 py-4 shadow-sm flex items-center justify-between">
            <Link to="/" className='text-2xl font-bold text-royalblue hover:text-cyan transition'>
                Apni site</Link>
            <div className="flex space-x-6 items-center">
                <Link to="/" className='hover:text-cyan transition'>Home</Link>
                <Link to="/offer"className='hover:text-cyan transition'>Offer</Link>
                <Link to="/business"className='hover:text-cyan transition'>Business</Link>
                <Link to="/mytrips"className='hover:text-cyan transition'>My Trips</Link>
            </div>
            <div className='flex space-x-4'>
                <Link to="/login" className='bg-royalblue text-white px-4 py-2 rounded hover:bg-cyan transition'>Login</Link>
                <Link to="/signup" className='border border-royalblue text-royalblue px-4 py-2 rounded hover:bg-amber hover:border-amber hover:text-white transition'>SignUp</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;