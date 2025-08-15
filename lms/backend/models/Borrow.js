const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  borrowDate: { type: Date, default: Date.now },
  returnDate: Date,
  returnStatus: { type: Boolean, default: false }, 
});

module.exports = mongoose.model("Borrow", BorrowSchema);
