import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const popularServices = [
  { name: "Electrician", icon: "fa-bolt", color: "text-warning" },
  { name: "Plumber", icon: "fa-faucet", color: "text-primary" },
  { name: "Cleaner", icon: "fa-broom", color: "text-success" },
  { name: "AC Repair", icon: "fa-snowflake", color: "text-info" },
  { name: "Carpenter", icon: "fa-hammer", color: "text-danger" },
  { name: "Sweeper", icon: "fa-broom", color: "text-danger" },
];

const Home = () => {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [topProviders, setTopProviders] = useState([]);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = `?service=${encodeURIComponent(service)}&location=${encodeURIComponent(location)}`;
    navigate(`/results${query}`);
  };

  const handleBrowseService = (serviceName) => {
    const query = `?service=${encodeURIComponent(serviceName)}&location=${encodeURIComponent(location)}`;
    navigate(`/results${query}`);
  };

  const viewProfile = (id) => {
    navigate(`/provider/${id}`);
  };

  useEffect(() => {
    const fetchTopProviders = async () => {
      try {
        const res = await API.get("/search/top?limit=8");
        setTopProviders(res.data);
      } catch (err) {
        console.error("Failed to load top providers.");
      }
    };
    fetchTopProviders();
  }, []);

  return (
    <div className="container py-5">
      {/* ===== Search Section ===== */}
      <div ref={formRef} className="mb-5">
        <h2 className="mb-4 text-center">🔍 Find Local Service Providers</h2>
        <form onSubmit={handleSearch} className="row g-3 justify-content-center">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Service (e.g., electrician)"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Location (e.g., Delhi)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* ===== Popular Services Section ===== */}
      <h2 className="mb-4 text-center">🔥 Popular Services</h2>
      <div className="row g-4 mb-5">
        {popularServices.map((svc) => (
          <div key={svc.name} className="col-md-4">
            <div className="card h-100 shadow-sm text-center">
              <div className="card-body">
                <i className={`fa-solid ${svc.icon} fa-2x mb-3 ${svc.color}`}></i>
                <h5 className="card-title">{svc.name}</h5>
              </div>
              <div className="card-footer bg-white border-top-0">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleBrowseService(svc.name)}
                >
                  Browse Providers
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Top Providers Section ===== */}
      <h2 className="text-center my-5">🏆 Our Top Service Providers</h2>
      {topProviders.length === 0 ? (
        <p className="text-center text-muted">No top providers available yet.</p>
      ) : (
        <div className="row g-4">
          {topProviders.map((prov) => (
            <div key={prov._id} className="col-md-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{prov.name}</h5>
                  <p className="card-text">
                    <strong>Location:</strong> {prov.location || "N/A"}
                    <br />
                    <strong>Services:</strong> {prov.services?.join(", ") || "Not listed"}
                  </p>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <button
                    className="btn btn-outline-success w-100"
                    onClick={() => viewProfile(prov._id)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
