
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Borrow = require("../models/Borrow");
const Book = require("../models/Book");
const auth = require("../middleware/auth");
const crypto = require("crypto");
const { sendConfirmationEmail } = require("../utils/emailService");

const router = express.Router();

// Get current student's profile
router.get("/profile", auth, async (req, res) => {
  try {
    const student = await User.findById(req.user.id).select("-password -resetToken -resetTokenExpiry");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
});

// Update current student's profile
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, department } = req.body;
    const student = await User.findById(req.user.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    if (name) student.name = name;
    if (department) student.department = department;
    await student.save();
    res.json({ message: "Profile updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
});

// Request password reset (send email with token)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const student = await User.findOne({ email, role: "student" });
    if (!student) return res.status(404).json({ message: "Student not found" });
    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    student.resetToken = token;
    student.resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 min expiry
    await student.save();
    // Send email (reuse confirmation email for demo)
    await sendConfirmationEmail(email, student.name, email, `Reset your password using this token: ${token}`);
    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Error sending reset email", error });
  }
});

// Reset password using token
router.post("/reset-password", async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    if (!email || !token || !newPassword) return res.status(400).json({ message: "All fields required" });
    const student = await User.findOne({ email, role: "student", resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
    if (!student) return res.status(400).json({ message: "Invalid or expired token" });
    const bcrypt = require('bcrypt');
    student.password = await bcrypt.hash(newPassword, 10);
    student.resetToken = undefined;
    student.resetTokenExpiry = undefined;
    await student.save();
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
});

// Student registration route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, department, regdNo } = req.body;
    if (!name || !email || !password || !department || !regdNo) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if email already exists
    const existingStudent = await User.findOne({ email, role: "student" });
    if (existingStudent) {
      return res.status(400).json({ message: "Student with this email already exists" });
    }
    // Hash password
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new User({ name, email, password: hashedPassword, department, regdNo, role: "student" });
    await student.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Error registering student", error });
  }
});

// Student login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by email
    const student = await User.findOne({ email, role: "student" });
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Check password using bcrypt
    const bcrypt = require('bcrypt');
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Get all available books
router.get("/books", auth, async (req, res) => {
  try {
    const books = await Book.find({ quantity: { $gt: 0 } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

// Get books borrowed by a student
router.get("/borrowed", auth, async (req, res) => {
  try {
    const borrows = await Borrow.find({ studentId: req.user.id, returnStatus: false }).populate("bookId", "title author");
    res.json(borrows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching borrowed books", error });
  }
});

module.exports = router;
