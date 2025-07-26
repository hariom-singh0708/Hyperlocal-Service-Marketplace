import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import AdminUsers from "./AdminUsers";
import AdminProviders from "./AdminProviders";
import AdminBookings from "./AdminBookings";
import API from "../utils/api";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    API.get("/admin/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to load stats:", err));
  }, []);

  const chartData = {
    labels: ["Users", "Providers", "Bookings"],
    datasets: [
      {
        label: "Total Count",
        data: [stats.userCount || 0, stats.providerCount || 0, stats.bookingCount || 0],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
      },
    ],
  };

  const renderTab = () => {
    switch (activeTab) {
      case "users":
        return <AdminUsers />;
      case "providers":
        return <AdminProviders />;
      case "bookings":
        return <AdminBookings />;
      default:
        return null;
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-bold">Admin Dashboard</h2>

      {/* Stats + Chart side by side */}
      <div className="row mb-4">
        <div className="col-lg-6 mb-4">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h6 className="text-secondary">👤 Users</h6>
                  <h4 className="fw-semibold text-primary">{stats.userCount}</h4>
                </div>
              </div>
            </div>
            <div className="col-12 mb-3">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h6 className="text-secondary">🧰 Providers</h6>
                  <h4 className="fw-semibold text-success">{stats.providerCount}</h4>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h6 className="text-secondary">📦 Bookings</h6>
                  <h4 className="fw-semibold text-warning">{stats.bookingCount}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Overview</h5>
              <Bar data={chartData} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 d-flex justify-content-center gap-2">
        <button
          className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`btn ${activeTab === 'providers' ? 'btn-success' : 'btn-outline-success'}`}
          onClick={() => setActiveTab('providers')}
        >
          Providers
        </button>
        <button
          className={`btn ${activeTab === 'bookings' ? 'btn-warning' : 'btn-outline-warning'}`}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </button>
      </div>

      {/* Render Tab Content */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          {renderTab()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
