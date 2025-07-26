import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";

const statusColors = {
  pending: "warning",
  accepted: "success",
  rejected: "danger",
};

const UserProfile = () => {
  const userId = localStorage.getItem("userId");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Optional: Get user info from localStorage
  const userInfo = {
    name: localStorage.getItem("name") || "User",
    email: localStorage.getItem("email") || "Not available",
    role: localStorage.getItem("role") || "user",
  };

  const fetchBookings = async () => {
    try {
      const res = await API.get(`/bookings/user/${userId}`);
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to load bookings");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const cancelBooking = async (bookingId) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      setLoading(true);
      await API.delete(`/bookings/${bookingId}`);
      toast.success("Booking cancelled successfully");
      fetchBookings(); // Refresh booking list
    } catch (err) {
      toast.error("Cancellation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      {/* === Profile Info === */}
      <div className="mb-4 p-4 bg-light rounded shadow-sm">
        <h3 className="mb-2"><i className="fa fa-user"></i> Welcome, {userInfo.name}</h3>
        <p className="mb-1"><strong>Email:</strong> {userInfo.email}</p>
        <p className="mb-0"><strong>Role:</strong> {userInfo.role}</p>
      </div>

      {/* === Bookings Section === */}
      <h4 className="mb-3">📅 My Bookings</h4>

      {bookings.length === 0 ? (
        <p className="text-muted">You have no bookings yet.</p>
      ) : (
        <div className="row">
          {bookings.map((bk) => (
            <div key={bk._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{bk.providerId?.name || "Provider"}</h5>
                  <p className="mb-1"><strong>Date:</strong> {bk.date} at {bk.time}</p>
                  <p className="mb-1"><strong>Message:</strong> {bk.message || "—"}</p>
                  <p className="mb-3">
                    <strong>Status:</strong>{" "}
                    <span className={`badge bg-${statusColors[bk.status] || "secondary"}`}>
                      {bk.status.toUpperCase()}
                    </span>
                  </p>
                  {/* Cancel Button (only if pending) */}
                  {bk.status === "pending" && (
                    <button
                      className="btn btn-outline-danger mt-auto"
                      onClick={() => cancelBooking(bk._id)}
                      disabled={loading}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
