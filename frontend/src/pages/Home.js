import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import API from "../utils/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css"
import { motion } from "framer-motion";


const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const services = [
  { name: "Electrician", icon: "bi-lightning-fill", description: "Wiring, lighting & electrical repairs" },
  { name: "Plumber", icon: "bi-tools", description: "Leak fixes, installations, fittings" },
  { name: "Cleaner", icon: "bi-bucket", description: "Home, kitchen, and deep cleaning" },
  { name: "AC Repair", icon: "bi-snow", description: "Cooling issues, gas refill, servicing" },
  { name: "Carpenter", icon: "bi-hammer", description: "Furniture making & repairs" },
  { name: "TV Repair", icon: "bi-tv", description: "LCD/LED TV repair & installation" },
  { name: "Internet Setup", icon: "bi-wifi", description: "WiFi, router and connection setup" },
  { name: "Car Wash", icon: "bi-car-front-fill", description: "Exterior & interior car cleaning" },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } },
  ],
};

const Home = () => {
  const [formData, setFormData] = useState({ service: "", location: "" });
  const [topProviders, setTopProviders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopProviders = async () => {
      try {
        const { data } = await API.get("/search/top?limit=8");
        setTopProviders(data);
      } catch (err) {
        console.error("Failed to load top providers", err);
      }
    };
    fetchTopProviders();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const { service, location } = formData;
    if (!service.trim()) return alert("Please enter a service.");
    navigate(`/results?service=${encodeURIComponent(service)}&location=${encodeURIComponent(location)}`);
  };

  const updateField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main>
      {/* ===== Hero Section ===== */}
      <section className="vh-100 d-flex align-items-center justify-content-center text-white text-center" style={{
        background: `linear-gradient(0deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('https://plus.unsplash.com/premium_photo-1667761634654-7fcf176434b8?q=80&w=1137&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover no-repeat`
      }}>
        <motion.div
          className="px-4"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 className="display-3 fw-bold mb-3" variants={fadeInUp}>
            Find Trusted Local Pros
          </motion.h1>
          <motion.p className="lead mb-5" variants={fadeInUp}>
            From home repairs to cleaning, book the best in your neighborhood.
          </motion.p>
          <motion.form
            className="row gx-2 justify-content-center"
            onSubmit={handleSearch}
            aria-label="Search Form"
            variants={fadeInUp}
          >
            <div className="col-lg-4 mb-3">
              <input
                type="text"
                name="service"
                placeholder="Service e.g. Electrician, Plumber etc."
                className="form-control form-control-lg rounded-pill"
                value={formData.service}
                onChange={updateField}

              />
            </div>
            <div className="col-lg-4 mb-3">
              <input
                type="text"
                name="location"
                placeholder="Location e.g. Bengaluru, Lucknow etc."
                className="form-control form-control-lg rounded-pill"
                value={formData.location}
                onChange={updateField}
              />
            </div>
            <div className="col-lg-2">
              <button type="submit" className="btn btn-warning btn-lg rounded-pill w-100 shadow-lg">Search</button>
            </div>
          </motion.form>
          <motion.div className="d-flex flex-wrap justify-content-center gap-2 mt-3" variants={fadeInUp}>
            {services.slice(0, 6).map((s, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/results?service=${s.name}`)}
                className="btn btn-outline-light rounded-pill px-3 py-1 d-flex align-items-center gap-2"
                aria-label={`Find ${s.name}`}
              >
                <i className={`bi ${s.icon}`}></i>
                <span>{s.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>



      </section>

      {/* ===== Services Section ===== */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Our Popular Services</h2>
          <div className="row g-4">
            {services.map((s, i) => (
              <div key={i} className="col-md-4 col-lg-3">
                <article className="card h-100 text-center border-0 shadow p-3 hover-zoom"
                  onClick={() => navigate(`/results?service=${s.name}`)}
                  style={{ cursor: 'pointer' }}
                  aria-label={s.name}
                >
                  <div className="text-primary mb-3">
                    <i className={`bi ${s.icon}`} style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h5 className="fw-bold">{s.name}</h5>
                  <p className="text-muted small">{s.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Top Providers Carousel ===== */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Top-Rated Professionals</h2>
          {topProviders.length > 0 ? (
            <Slider {...sliderSettings}>
              {topProviders.map((p) => (
                // <div key={p._id} className="px-2">
                //   <div className="card shadow-sm h-100">
                //     <img
                //       // src={p.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=0D8ABC&color=fff`}

                //       src={p.avatar || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 8)}.jpg`}


                //       alt={p.name}
                //       className="card-img-top"
                //       loading="lazy"
                //       style={{ height: "200px", objectFit: "cover" }}
                //     />
                //     <div className="card-body text-center d-flex flex-column">
                //       <h5 className="card-title mb-1">{p.name}</h5>
                //       <p className="text-muted small">{p.location}</p>
                //       <p className="small text-truncate mb-3">{p.services?.join(", ")}</p>
                //       <button
                //         className="btn btn-sm btn-primary mt-auto"
                //         onClick={() => navigate(`/provider/${p._id}`)}
                //       >
                //         View Profile
                //       </button>
                //     </div>
                //   </div>
                // </div>
                <div key={p._id} className="px-2 fade-in">
                  <div className="card shadow-sm h-100 hover-zoom">
                    <img
                      src={p.avatar || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 8)}.jpg`}
                      alt={p.name}
                      className="card-img-top"
                      loading="lazy"
                      style={{ height: "200px", objectFit: "cover", transition: "0.3s ease" }}
                    />
                    <div className="card-body text-center d-flex flex-column">
                      <h5 className="card-title mb-1">{p.name}</h5>
                      <p className="text-muted small">{p.location}</p>
                      <p className="small text-truncate mb-3">{p.services?.join(", ")}</p>
                      <button
                        className="btn btn-sm btn-primary mt-auto btn-animated"
                        onClick={() => navigate(`/provider/${p._id}`)}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>

              ))}
            </Slider>
          ) : (
            <p className="text-center">Loading top professionals...</p>
          )}
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">What Clients Say</h2>
          <div className="row g-4">
            {[
              { text: "Great plumber! Arrived on time and did a fantastic job.", name: "Anita K." },
              { text: "Electrician fixed my wiring fast and affordably.", name: "Rakesh M." },
              { text: "Superb cleaning service. My home has never looked better.", name: "Sonia P." },
            ].map((t, i) => (
              <div className="col-md-4" key={i}>
                <div className="card h-100 border-0 shadow-lg p-4">
                  <p className="fst-italic">“{t.text}”</p>
                  <p className="fw-bold text-end mb-0">– {t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How We Work ===== */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">How We Work</h2>
          <div className="row text-center g-4">
            {[
              { icon: "bi-search", step: "1. Search & Select", desc: "Choose the service and location you need." },
              { icon: "bi-calendar-check", step: "2. Book Instantly", desc: "Pick a professional and schedule your time." },
              { icon: "bi-wrench-adjustable", step: "3. Get the Job Done", desc: "Sit back and let our trusted pros handle it." },
              { icon: "bi-shield-lock", step: "4. Pay Securely", desc: "Pay online or after service completion." },
            ].map((item, i) => (
              <div className="col-md-3" key={i}>
                <div className="card h-100 shadow-sm p-4">
                  <div className="text-primary mb-3">
                    <i className={`bi ${item.icon}`} style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h5 className="fw-bold">{item.step}</h5>
                  <p className="text-muted small">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ===== FAQ ===== */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <div className="accordion" id="faqAccordion">
            {[
              { q: "How do I book?", a: "Search, select provider, pick schedule, confirm." },
              { q: "Are payments secure?", a: "Yes, we use industry-standard encryption." },
              { q: "Can I reschedule?", a: "Yes, up to 12 hours before appointment." },
            ].map((item, idx) => (
              <div className="accordion-item" key={idx}>
                <h2 className="accordion-header" id={`heading${idx}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${idx}`}
                    aria-expanded="false"
                    aria-controls={`collapse${idx}`}
                  >
                    {item.q}
                  </button>
                </h2>
                <div
                  id={`collapse${idx}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${idx}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Call to Action ===== */}
      <section className="py-5 text-center" style={{ background: "url('/images/join-bg.jpg') center/cover" }}>
        <div className="container bg-dark bg-opacity-50 p-5 rounded">
          <h2 className="text-white mb-3">Are You a Service Provider?</h2>
          <p className="text-white mb-4">Join our network to get more clients and grow your business.</p>
          <button
            className="btn btn-warning btn-lg rounded-pill"
            onClick={() => navigate("/register/provider")}
          >
            Register Now
          </button>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-dark text-light py-4 text-center">
        <div className="container">
          <p className="mb-1">Hyperlocal Services</p>
          <small>&copy; {new Date().getFullYear()} All rights reserved.</small>
        </div>
      </footer>
    </main>
  );
};

export default Home;
