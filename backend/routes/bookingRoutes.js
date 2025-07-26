const express = require("express");
const Booking = require("../models/Booking");
const Review = require("../models/Review");
const router = express.Router();

// POST: Create a booking
router.post("/book", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: "Booking created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Booking failed", details: err.message });
  }
});

// POST: Leave a review
router.post("/review/:providerId", async (req, res) => {
  try {
    const { providerId } = req.params;
    const review = new Review({ ...req.body, providerId });
    await review.save();
    res.json({ message: "Review submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Review failed", details: err.message });
  }
});

// GET: Get reviews for a provider
router.get("/reviews/:providerId", async (req, res) => {
  try {
    const reviews = await Review.find({ providerId: req.params.providerId }).populate("userId", "name");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// GET: Bookings for a user
router.get("/bookings/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate("providerId", "name location");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user bookings" });
  }
});

// GET: Bookings for a provider
router.get("/bookings/provider/:providerId", async (req, res) => {
  try {
    const bookings = await Booking.find({ providerId: req.params.providerId }).populate("userId", "name email");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch provider bookings" });
  }
});

// PUT: Update booking status (accept/reject)
router.put("/booking/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: "Booking status updated", updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update booking" });
  }
});

// DELETE: Cancel a booking
router.delete("/bookings/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to cancel booking" });
  }
});




module.exports = router;
