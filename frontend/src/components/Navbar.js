import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container-fluid px-4">
        {/* Brand */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <i className="fa-solid fa-house me-2 text-primary"></i>
          <span>Hyperlocal-Services</span>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="mainNavbar"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible */}
        <div className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`} id="mainNavbar">
          <div className="ms-auto d-flex align-items-center gap-2 flex-wrap">
            {token && (
              <span className="fw-semibold me-2 text-dark">
                <i className="fa-solid fa-user-tie me-1"></i> Welcome, <span className="text-primary">{name}</span>
              </span>
            )}

            {!token && (
              <>
                <Link to="/register/user" className="btn btn-outline-primary">
                  <i className="fa-solid fa-user-plus me-2"></i>User Register
                </Link>
                <Link to="/register/provider" className="btn btn-outline-secondary">
                  <i className="fa-solid fa-briefcase me-2"></i>Provider Register
                </Link>
                <Link to="/login" className="btn btn-outline-success">
                  <i className="fa-solid fa-right-to-bracket me-2"></i>Login
                </Link>
              </>
            )}

            {token && role === "user" && (
              <Link to="/profile" className="btn btn-outline-success">
                <i className="fa-solid fa-user-circle me-2"></i>Profile
              </Link>
            )}

            {token && role === "provider" && (
              <Link to="/dashboard" className="btn btn-outline-warning">
                <i className="fa-solid fa-gauge-high me-2"></i>Dashboard
              </Link>
            )}

            {token && role === "admin" && (
              <Link to="/admin" className="btn btn-outline-danger">
                <i className="fa-solid fa-shield-halved me-2"></i>Admin Panel
              </Link>
            )}

            {token && (
              <button className="btn btn-danger" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket me-2"></i>Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
