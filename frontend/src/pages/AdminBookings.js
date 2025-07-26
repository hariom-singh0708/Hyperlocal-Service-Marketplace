import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/admin/bookings")
      .then((res) => setBookings(res.data))
      .catch(() => toast.error("Failed to load bookings"));
  }, []);

  return (
    <div className="container">
      <h3 className="mb-4">All Bookings</h3>
      <div className="table-responsive shadow-sm">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">User</th>
              <th scope="col">Provider</th>
              <th scope="col">Date & Time</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((bk) => (
              <tr key={bk._id}>
                <td>{bk.userId?.name || "—"}</td>
                <td>{bk.providerId?.name || "—"}</td>
                <td>{new Date(bk.date).toLocaleDateString()} {bk.time}</td>
                <td>
                  <span className={`badge text-bg-${
                    bk.status === 'pending' ? 'secondary' :
                    bk.status === 'accepted' ? 'primary' :
                    bk.status === 'rejected' ? 'danger' :
                    bk.status === 'completed' ? 'success' : 'light'
                  }`}> {bk.status.charAt(0).toUpperCase() + bk.status.slice(1)} </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
