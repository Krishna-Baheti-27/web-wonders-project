import React from 'react'
import { Navigate } from 'react-router-dom';

const Logout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
  return (<Navigate to="/user-login" />);
}

export default Logout