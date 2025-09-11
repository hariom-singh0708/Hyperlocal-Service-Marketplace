import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { toast } from 'react-toastify';

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      // Token expired
      localStorage.clear();
      toast.error("Session expired. Please log in again.");
      return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      return <Navigate to="/login" />;
    }

    return children;
  } catch (error) {
    localStorage.clear();
    toast.error("Invalid session. Please log in again.");
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
