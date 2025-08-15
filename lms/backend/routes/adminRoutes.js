
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Book = require("../models/Book");
const Borrow = require("../models/Borrow");
const auth = require("../middleware/auth");
const { sendConfirmationEmail } = require("../utils/emailService");
const mongoose = require('mongoose');

const router = express.Router();

// Admin dashboard stats
router.get("/stats", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
    const totalBooks = await Book.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalBorrows = await Borrow.countDocuments();
    const issuedBooks = await Borrow.countDocuments({ returnStatus: false });
    res.json({ totalBooks, totalStudents, totalBorrows, issuedBooks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ message: "Admin authenticated", token });
  }
  return res.status(401).json({ message: "Invalid credentials" });
});

// Get all students (Admin only)
router.get("/students", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    // Fetch all students
    const students = await User.find({ role: "student" }).select("-password").lean(); // Exclude password

    // Fetch borrow details for each student
    for (let student of students) {
      const borrows = await Borrow.find({ studentId: student._id, returnStatus: false })
        .populate("bookId", "title author"); // Include book details

      student.borrowedBooks = borrows; // Attach borrowed books to student object
    }

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});


// Example in routes/admin.js or routes/students.js



router.get('/students/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await User.findById(studentId); // Make sure you're using the correct model
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Add a new student (Admin only)
router.post("/students", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, email, password, department, regdNo } = req.body;

    // 🔍 Check if email already exists
    const existingStudent = await User.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student with this email already exists" });
    }


  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  const student = new User({ name, email, password: hashedPassword, department, regdNo, role: "student" });
  await student.save();
  await sendConfirmationEmail(email, name, email, "<hidden>"); // Do not send plain password

    res.json({ message: "Student added successfully", student });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Error adding student", error });
  }
});



// Add a new book (Admin only)
router.post("/books", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const book = new Book(req.body);
    await book.save();
    res.json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
});

// Issue a book to a student (Admin only)
router.post("/issue", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const { studentId, bookId } = req.body;
    const book = await Book.findById(bookId);
    if (!book || book.quantity <= 0) return res.status(400).json({ message: "Book not available" });

    book.quantity -= 1;
    await book.save();

    const borrow = new Borrow({ studentId, bookId });
    await borrow.save();

    res.json({ message: "Book issued successfully", borrow });
  } catch (error) {
    res.status(500).json({ message: "Error issuing book", error });
  }
});

// Return a book (Admin only)
router.post("/return", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const { borrowId } = req.body;
    const borrow = await Borrow.findById(borrowId);
    if (!borrow || borrow.returnStatus) return res.status(400).json({ message: "Invalid borrow record" });

    borrow.returnStatus = true;
    borrow.returnDate = new Date();
    await borrow.save();

    const book = await Book.findById(borrow.bookId);
    if (book) {
      book.quantity += 1;
      await book.save();
    }

    res.json({ message: "Book returned successfully", borrow });
  } catch (error) {
    res.status(500).json({ message: "Error returning book", error });
  }
});

// Update a student's details (Admin only)
router.put('/students/:id', auth, async (req, res) => {
  const studentId = req.params.id;
  const { name, email, department, regdNo } = req.body;

  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.name = name || student.name;
    student.email = email || student.email;
    student.department = department || student.department;
    student.regdNo = regdNo || student.regdNo;

    await student.save();

    res.json({ message: 'Student updated successfully', student });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//to delete users
// DELETE: Delete a student by ID (Admin only)
router.delete("/students/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Deleting student with ID:", id);  // Ensure ID is received correctly

    // Check if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    // Attempt to delete the student by ID
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error while deleting" });
  }
});


module.exports = router;
