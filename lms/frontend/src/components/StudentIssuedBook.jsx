import React, { useEffect, useState } from "react";
import axios from "axios";

const IssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:5000/api/student/borrowed",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIssuedBooks(res.data);
      } catch (error) {
        console.error("Error fetching issued books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssuedBooks();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Issued Books
      </h1>

      {loading ? (
        <p className="text-center text-lg text-gray-600">
          Loading issued books...
        </p>
      ) : issuedBooks.length === 0 ? (
        <p className="text-center text-lg text-red-500">No books issued.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {issuedBooks.map((borrow) => (
            <li
              key={borrow._id}
              className="p-4 bg-gray-100 rounded-md shadow-md mb-4"
            >
              <p className="text-lg font-semibold">{borrow.bookId?.title}</p>
              <p className="text-gray-600">by {borrow.bookId?.author}</p>
              <p
                className={`font-medium mt-2 ${
                  borrow.returnStatus ? "text-green-600" : "text-red-600"
                }`}
              >
                {borrow.returnStatus ? "✔ Returned" : "❌ Not Returned"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IssuedBooks;
