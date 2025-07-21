const express = require("express");
const Provider = require("../models/Provider");
const router = express.Router();

// Search providers by service or location
router.get("/providers", async (req, res) => {
  try {
    const { service, location } = req.query;
    const query = {};

    if (service) query.services = { $regex: service, $options: "i" };
    if (location) query.location = { $regex: location, $options: "i" };

    const providers = await Provider.find(query).select("-password");

    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: "Failed to search providers", details: err.message });
  }
});

// Get provider by ID
router.get("/provider/:id", async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id).select("-password");
    if (!provider) return res.status(404).json({ error: "Provider not found" });
    res.json(provider);
  } catch (err) {
    res.status(500).json({ error: "Failed to get provider", details: err.message });
  }
});


// Route: GET /providers/top?limit=8
router.get("/top", async (req, res) => {
  const limit = parseInt(req.query.limit) || 8;
  const providers = await Provider.aggregate([{ $sample: { size: limit } }]);
  res.json(providers);
});


// PUT /provider/:id - Update provider profile
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone, location, services } = req.body;

  try {
    const updated = await Provider.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(location && { location }),
        ...(services && { services }),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Provider not found" });

    res.json({ message: "Profile updated successfully", provider: updated });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Failed to update provider" });
  }
});

module.exports = router;
