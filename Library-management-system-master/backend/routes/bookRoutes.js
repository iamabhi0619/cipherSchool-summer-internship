const express = require("express");
const Book = require("../models/Book");
const auth = require("../middleware/auth");

const router = express.Router();

// Add a book (Admin only)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const book = new Book(req.body);
    await book.save();
    res.json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
});

// View available books (Public)
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

// Update a book (Admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedBook) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
});

// Delete a book (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

module.exports = router;
