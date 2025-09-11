import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const ProviderRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    services: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...form,
        services: form.services.split(",").map((s) => s.trim()),
      };
      const res = await API.post("/auth/register/provider", data);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm p-4">
            <h3 className="mb-4 text-center">🏢 Provider Registration</h3>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-12">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="Location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <input
                  type="text"
                  name="services"
                  className="form-control"
                  placeholder="Services (e.g., plumber, electrician)"
                  value={form.services}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fa-solid fa-${showPassword ? "eye-slash" : "eye"}`}></i>
                  </span>
                </div>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary w-100">
                  Register as Provider
                </button>
              </div>
            </form>

            <p className="text-center mt-3 mb-0">
              Already have an account?{" "}
              <a href="/login" className="text-decoration-none">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderRegister;
