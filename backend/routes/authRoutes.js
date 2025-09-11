// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");
const Provider = require("../models/Provider");
const { authenticate, authorizeRoles } = require("../middleware/auth");

const SECRET = process.env.JWT_SECRET || "yourSecret";

// Register User
router.post("/register/user", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "Missing required fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, password: hash });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
});

// Register Provider
router.post("/register/provider", async (req, res) => {
  try {
    const { name, email, password, phone, location, services } = req.body;
    if (!name || !email || !password || !location)
      return res.status(400).json({ error: "Missing required fields" });

    const existing = await Provider.findOne({ email });
    if (existing) return res.status(400).json({ error: "Provider already exists" });

    const hash = await bcrypt.hash(password, 10);
    const provider = await Provider.create({
      name,
      email,
      phone,
      location,
      services,
      password: hash,
    });

    res.status(201).json({ message: "Provider registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
});

// Login (User or Provider or Admin)
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role)
      return res.status(400).json({ error: "Missing login details" });

    let userDoc;
    if (role === "user") userDoc = await User.findOne({ email });
    else if (role === "provider") userDoc = await Provider.findOne({ email });
    else if (role === "admin") {
      if (email === "admin1@gmail.com" && password === "12345") {
        const token = jwt.sign({ id: "admin-id", role: "admin" }, SECRET, {
          expiresIn: "1d",
        });
        return res.json({
          token,
          role: "admin",
          user: {
            _id: "admin-id",
            name: "Hariom Singh",
            email: "admin1@gmail.com",
          },
        });
      } else {
        return res.status(401).json({ error: "Invalid admin credentials" });
      }


    }

    if (!userDoc) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, userDoc.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: userDoc._id, role: userDoc.role }, SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, role: userDoc.role, user: { _id: userDoc._id, name: userDoc.name, email: userDoc.email } });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

// Protected route test
router.get("/me", authenticate, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

// Role-based test
router.get("/admin-only", authenticate, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

module.exports = router;
