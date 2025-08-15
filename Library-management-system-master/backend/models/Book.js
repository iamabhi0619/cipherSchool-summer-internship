const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  quantity: { type: Number, required: true }, 
  available: { type: Boolean, default: true }, 
});

module.exports = mongoose.model("Book", BookSchema);
