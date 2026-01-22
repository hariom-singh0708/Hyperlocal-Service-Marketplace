const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err.message));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/search", require("./routes/searchRoutes"));
app.use("/api", require("./routes/bookingRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/", (req,res)=>{
  res.send("Server is Running smoothly by metconnect...!")
})

app.listen(5000, () => console.log("Server running on port 5000"));
