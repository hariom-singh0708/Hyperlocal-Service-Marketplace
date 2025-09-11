import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../utils/api";

const SearchResults = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const service = queryParams.get("service") || "";
  const location = queryParams.get("location") || "";

  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await API.get("/search/providers", {
          params: { service, location },
        });
        setResults(res.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch providers.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [service, location]);

  const viewProfile = (id) => {
    navigate(`/provider/${id}`);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Search Results</h2>

      <div className="text-center mb-3 text-muted">
        Showing results for <strong>{service || "All Services"}</strong> in{" "}
        <strong>{location || "All Locations"}</strong>
      </div>

      {loading && <p className="text-center">Loading providers...</p>}

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {!loading && results.length === 0 && !error && (
        <p className="text-center text-muted">No providers found.</p>
      )}

      <div className="row">
        {results.map((prov) => (
          <div key={prov._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{prov.name}</h5>
                <p className="card-text">
                  <strong>Location:</strong> {prov.location}
                  <br />
                  <strong>Services:</strong> {prov.services.join(", ")}
                </p>
              </div>
              <div className="card-footer bg-white border-top-0">
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => viewProfile(prov._id)}
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
