const express = require("express");
const User = require("../models/User");
const Provider = require("../models/Provider");
const Booking = require("../models/Booking");
const { authenticate, requireAdmin } = require("../middleware/auth");
const router = express.Router();

// Get all users
router.get("/users", authenticate, requireAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Get all providers
router.get("/providers", authenticate, requireAdmin, async (req, res) => {
  const providers = await Provider.find().select("-password");
  res.json(providers);
});

// Get all bookings
router.get("/bookings", authenticate, requireAdmin, async (req, res) => {
  const bookings = await Booking.find()
    .populate("userId", "name")
    .populate("providerId", "name");
  res.json(bookings);
});

// Delete user
router.delete("/user/:id", authenticate, requireAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// Delete provider
router.delete("/provider/:id", authenticate, requireAdmin, async (req, res) => {
  await Provider.findByIdAndDelete(req.params.id);
  res.json({ message: "Provider deleted" });
});


router.get("/stats", authenticate, requireAdmin, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const providerCount = await Provider.countDocuments();
    const bookingCount = await Booking.countDocuments();
    res.json({ userCount, providerCount, bookingCount });
  } catch {
    res.status(500).json({ error: "Failed to load stats" });
  }
});

module.exports = router;
