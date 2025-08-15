import { useState } from "react";
import api from "../api";

const AddBook = () => {
  const [book, setBook] = useState({ title: "", author: "", quantity: 1 });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  // API_BASE_URL is now managed in src/api.js

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/admin/books`, book, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      setBook({ title: "", author: "", quantity: 1 });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding book");
      setMessage("");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      {message && <p className="text-green-600 bg-green-100 p-2 rounded-md">{message}</p>}
      {error && <p className="text-red-600 bg-red-100 p-2 rounded-md">{error}</p>}

      <form onSubmit={handleAddBook} className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Book Title"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Author"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Quantity"
          value={book.quantity}
          onChange={(e) => setBook({ ...book, quantity: e.target.value })}
          required
          min="1"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
