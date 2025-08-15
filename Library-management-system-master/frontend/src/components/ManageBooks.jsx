import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateBook = async (e) => {
    e.preventDefault();
    if (!title || !author) {
      setError("Both title and author are required.");
      return;
    }

    if (editId) {
      // Update existing book
      try {
        await axios.put(`http://localhost:5000/api/books/${editId}`, {
          title,
          author,
        });
        setBooks(
          books.map((book) =>
            book._id === editId ? { ...book, title, author } : book
          )
        );
        setSuccess("Book updated successfully!");
        resetForm();
      } catch (err) {
        console.error("Error updating book:", err);
        setError("Failed to update book.");
      }
    } else {
      // Add new book
      try {
        const response = await axios.post("http://localhost:5000/api/books", {
          title,
          author,
        });
        setBooks([...books, response.data]);
        setSuccess("Book added successfully!");
        resetForm();
      } catch (err) {
        console.error("Error adding book:", err);
        setError("Failed to add book.");
      }
    }
  };

  const handleEdit = (book) => {
    setEditId(book._id);
    setTitle(book.title);
    setAuthor(book.author);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
  
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(books.filter((book) => book._id !== id));
      if (editId === id) resetForm();
    } catch (err) {
      console.error("Error deleting book:", err);
      setError("Failed to delete book.");
    }
  };
  
  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setEditId(null);
    setError("");
    setSuccess("");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Books</h1>

      <form onSubmit={handleAddOrUpdateBook} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {editId ? "Update Book" : "Add Book"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-lg text-red-500">No books available.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {books.map((book) => (
            <li
              key={book._id}
              className="p-4 bg-gray-100 rounded-md shadow-md mb-4 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{book.title}</p>
                <p className="text-gray-600">by {book.author}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageBooks;
