// models/Provider.js
const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  location: String,
  services: [String],
  role: { type: String, default: "provider" },
});

module.exports = mongoose.model("Provider", providerSchema);
