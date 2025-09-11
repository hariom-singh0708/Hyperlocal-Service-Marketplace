const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
  date: String,
  time: String,
  message: String,
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Booking", bookingSchema);
