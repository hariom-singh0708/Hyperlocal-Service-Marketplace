import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";

const ProviderDashboard = () => {
  const providerId = localStorage.getItem("userId");

  const [provider, setProvider] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  const statusColors = {
    pending: "warning",
    accepted: "success",
    rejected: "danger",
  };

  const fetchProvider = async () => {
    try {
      const res = await API.get(`/search/provider/${providerId}`);
      setProvider(res.data);
      setForm(res.data);
    } catch {
      toast.error("Failed to load provider info");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await API.get(`/bookings/provider/${providerId}`);
      setBookings(res.data);
    } catch {
      toast.error("Failed to load bookings");
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/${providerId}`);
      setReviews(res.data);
    } catch {
      toast.error("Failed to load reviews");
    }
  };

  useEffect(() => {
    if (providerId) {
      fetchProvider();
      fetchBookings();
      fetchReviews();
    }
  }, [providerId]);

  const handleStatusChange = async (bookingId, status) => {
    try {
      await API.put(`/booking/${bookingId}/status`, { status });
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch {
      toast.error("Failed to update status");
    }
  };

const handleEditSubmit = async (e) => {
  e.preventDefault();
  try {
    const updated = {
      ...form,
      services: Array.isArray(form.services)
        ? form.services
        : form.services.split(",").map((s) => s.trim()),
    };

    await API.put(`/search/${providerId}`, updated);
    toast.success("Profile updated!");
    setEditing(false);
    fetchProvider();
  } catch (err) {
    console.error("Update error:", err);
    toast.error("Update failed");
  }
};


  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">🛠️ Provider Dashboard</h2>

      {/* === Provider Info & Edit === */}
      <div className="card shadow-sm p-4 mb-5">
        <div className="d-flex justify-content-between align-items-start">
          <h4>👤 Provider Information</h4>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {!editing ? (
          provider && (
            <>
              <p><strong>Name:</strong> {provider.name}</p>
              <p><strong>Email:</strong> {provider.email}</p>
              <p><strong>Phone:</strong> {provider.phone}</p>
              <p><strong>Location:</strong> {provider.location}</p>
              <p><strong>Services:</strong> {provider.services?.join(", ")}</p>
            </>
          )
        ) : (
          <form onSubmit={handleEditSubmit} className="row g-3 mt-2">
            <div className="col-md-6">
              <input
                name="name"
                className="form-control"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
                name="phone"
                className="form-control"
                value={form.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
                name="location"
                className="form-control"
                value={form.location || ""}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
  name="services"
  className="form-control"
  value={Array.isArray(form.services) ? form.services.join(", ") : form.services || ""}
  onChange={(e) => setForm({ ...form, services: e.target.value })}
  placeholder="e.g. Plumber, Electrician"
/>

            </div>
            <div className="col-12 text-end">
              <button className="btn btn-success" type="submit">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>

      {/* === Bookings === */}
      <h4 className="mb-3">📋 Bookings Received</h4>
      {bookings.length === 0 ? (
        <div className="alert alert-info">No bookings yet.</div>
      ) : (
        <div className="row">
          {bookings.map((bk) => (
            <div key={bk._id} className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">👤 {bk.userId?.name || "User"}</h5>
                  <p><strong>Date:</strong> {bk.date} at {bk.time}</p>
                  <p><strong>Message:</strong> {bk.message || "—"}</p>
                  <span className={`badge bg-${statusColors[bk.status] || "secondary"}`}>
                    {bk.status.toUpperCase()}
                  </span>
                </div>
                {bk.status === "pending" && (
                  <div className="card-footer d-flex justify-content-between">
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleStatusChange(bk._id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleStatusChange(bk._id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* === Reviews === */}
      <h4 className="mt-5 mb-3">🌟 My Reviews</h4>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="row">
          {reviews.map((rev) => (
            <div key={rev._id} className="col-md-4 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h6>{rev.userId?.name || "User"}</h6>
                  <p className="mb-1">
                    {Array.from({ length: rev.rating }, (_, i) => (
                      <i key={i} className="fa-solid fa-star text-warning me-1" />
                    ))}
                  </p>
                  <p>{rev.comment}</p>
                  <small className="text-muted">
                    {new Date(rev.date).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;
