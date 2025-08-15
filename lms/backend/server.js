const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config.js");

const adminRoutes = require("./routes/adminRoutes.js");
const studentRoutes = require("./routes/studentRoutes.js");
const bookRoutes = require("./routes/bookRoutes.js");
const borrowRoutes = require("./routes/borrowRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());


// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrows", borrowRoutes);

// Serve static files from frontend/dist
const path = require("path");
const frontendDistPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDistPath));

// Catch-all route for React Router (serves index.html for any non-API route)
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ error: "API route not found" });
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
