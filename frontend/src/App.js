import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegister from "./pages/UserRegister";
import ProviderRegister from "./pages/ProviderRegister";
import Login from "./pages/Login";
import Dashboard from "./pages/ProviderDashboard";
import UserProfile from "./pages/UserProfile";
import AdminPanel from "./pages/AdminPanel";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import ProviderProfile from "./pages/ProviderProfile";
import SearchResults from "./pages/SearchResults"; // adjust path if needed


const App = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/provider/:id" element={<ProviderProfile />} />
        <Route path="/register/user" element={<UserRegister />} />
        <Route path="/register/provider" element={<ProviderRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/results" element={<SearchResults />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["provider"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
