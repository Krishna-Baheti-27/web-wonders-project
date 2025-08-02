import { Navigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/Context.jsx";

const AdminRoute = ({ children }) => {
  const { user } = useContext(DataContext);
  const [isAdmin, setIsAdmin] = useState(null); // use null to handle loading

  useEffect(() => {
    if (user?._id) {
      setIsAdmin(user.is_admin);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  if (isAdmin === null) return null; // or a loading spinner

  return isAdmin ? children : <Navigate to="/" />;
};

export { AdminRoute };
