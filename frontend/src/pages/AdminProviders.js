import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";

const AdminProviders = () => {
  const [providers, setProviders] = useState([]);

  const fetchProviders = async () => {
    try {
      const res = await API.get("/admin/providers");
      setProviders(res.data);
    } catch {
      toast.error("Failed to load providers");
    }
  };

  const deleteProvider = async (id) => {
    if (!window.confirm("Delete provider?")) return;
    try {
      await API.delete(`/admin/provider/${id}`);
      toast.success("Provider deleted");
      fetchProviders();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title mb-3">All Providers</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.location}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteProvider(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {providers.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No providers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProviders;
