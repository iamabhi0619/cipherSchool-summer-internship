import React, { useState, useEffect } from "react";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Available Books</h1>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-lg text-red-500">No books available.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {books.map((book) => (
            <li key={book._id} className="p-4 bg-gray-100 rounded-md shadow-md mb-4">
              <p className="text-lg font-semibold">{book.title}</p>
              <p className="text-gray-600">by {book.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Books;
