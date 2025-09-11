import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import { toast } from "react-toastify";

const renderStars = (count) => {
  return Array.from({ length: 5 }, (_, i) => (
    <i
      key={i}
      className={`fa-star ${i < count ? "fas text-warning" : "far text-muted"}`}
    ></i>
  ));
};

const ProviderProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [bookingData, setBookingData] = useState({ date: "", time: "", message: "" });
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/search/provider/${id}`);
        setProvider(res.data);

        const reviewRes = await API.get(`/reviews/${id}`);
        setReviews(reviewRes.data);
      } catch (err) {
        toast.error("Failed to load provider or reviews");
      }
    };
    fetchData();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Please login to book a provider");

    try {
      await API.post("/book", {
        ...bookingData,
        userId,
        providerId: id,
      });
      toast.success("Booking submitted!");
      setBookingData({ date: "", time: "", message: "" });
    } catch (err) {
      toast.error("Booking failed");
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Please login to leave a review");

    try {
      await API.post(`/review/${id}`, {
        ...reviewData,
        userId,
      });
      toast.success("Review submitted!");

      const res = await API.get(`/reviews/${id}`);
      setReviews(res.data);
      setReviewData({ rating: 5, comment: "" });
    } catch (err) {
      toast.error("Review failed");
    }
  };

  if (!provider) return <div className="text-center py-5">Loading provider...</div>;

  return (
    <div className="container py-5">
      {/* === Provider Info === */}
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h2 className="card-title">{provider.name}</h2>
          <p><strong>Email:</strong> {provider.email}</p>
          <p><strong>Phone:</strong> {provider.phone}</p>
          <p><strong>Location:</strong> {provider.location}</p>
          <p><strong>Services:</strong> {provider.services?.join(", ")}</p>
        </div>
      </div>

      {/* === Booking & Review Section (Side-by-Side) === */}
      <div className="row mb-5">
        {/* Booking Form */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h4 className="card-title mb-4">📅 Book This Provider</h4>
              <form onSubmit={handleBooking} className="row g-3">
                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="time"
                    className="form-control"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12">
                  <textarea
                    className="form-control"
                    placeholder="Message (optional)"
                    rows={3}
                    value={bookingData.message}
                    onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary w-100">Book Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h4 className="card-title mb-4">📝 Leave a Review</h4>
              <form onSubmit={handleReview} className="row g-3">
                <div className="col-md-4">
                  <div className="mb-2">
                    {[1,2,3,4,5].map((star) => (
                      <i
                        key={star}
                        className={`fa-star fa-lg me-1 ${star <= reviewData.rating ? "fas text-warning" : "far text-muted"}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setReviewData({ ...reviewData, rating: star })}
                        onMouseOver={() => setReviewData({ ...reviewData, hoverRating: star })}
                        onMouseLeave={() => setReviewData({ ...reviewData, hoverRating: null })}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-12">
                  <textarea
                    className="form-control"
                    placeholder="Write your review..."
                    rows={3}
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-success w-100">Submit Review</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* === Reviews List === */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-4">⭐ Reviews</h4>
          {reviews.length === 0 && <p className="text-muted">No reviews yet.</p>}
          <div className="row">
            {reviews.map((rev) => (
              <div key={rev._id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="border rounded p-3 h-100 shadow-sm">
                  <strong>{rev.userId?.name || "User"}</strong>
                  <div className="mb-1">{renderStars(rev.rating)}</div>
                  <p className="mb-1">{rev.comment}</p>
                  <small className="text-muted">
                    {new Date(rev.date).toLocaleDateString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
