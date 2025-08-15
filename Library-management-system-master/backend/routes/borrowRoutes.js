const express = require("express");
const Borrow = require("../models/Borrow");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all borrow records for a specific student
router.get("/:studentId", auth, async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find all active borrow records for the given student ID
    const borrows = await Borrow.find({ studentId, returnStatus: false }) // Unreturned books only
      .select("_id bookId") // Fetch only borrowId and bookId
      .lean(); // Convert to plain JSON

    if (!borrows.length) {
      return res.status(404).json({ message: "No borrowed books found for this student" });
    }

    res.json({ borrows });
  } catch (error) {
    res.status(500).json({ message: "Error fetching borrow records", error });
  }
});

module.exports = router;
