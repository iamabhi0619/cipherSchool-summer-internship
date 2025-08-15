import { useState, useEffect } from "react";
import axios from "axios";
const IssueBook = () => {
  const [departments] = useState(["EE", "ECE", "CSE", "CE", "ME", "MCA", "MBA"]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [borrowId, setBorrowId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  
  if (!token) {
    console.error("No token found. Please log in.");
  }
  const API_BASE_URL = "http://localhost:5000/api";

  // Fetch all books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/books`);
        setBooks(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Fetch students based on selected department
  const fetchStudents = async (department) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filteredStudents = res.data.filter((student) => student.department === department);
      setStudents(filteredStudents);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  // Fetch borrowed books for the selected student
  const fetchBorrowedBooks = async (studentId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/borrows/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBorrowedBooks(res.data.borrows);
    } catch (err) {
      console.error("Error fetching borrowed books:", err);
      setBorrowedBooks([]);
    }
  };

  // Handle department selection
  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    setStudents([]);
    setSelectedStudent("");
    setBorrowedBooks([]);
    fetchStudents(department);
  };

  // Handle student selection
  const handleStudentChange = (e) => {
    const studentId = e.target.value;
    setSelectedStudent(studentId);
    fetchBorrowedBooks(studentId);
  };

  // Handle book selection & find borrowId
  const handleBookChange = (e) => {
    const bookId = e.target.value;
    const borrow = borrowedBooks.find((b) => b.bookId === bookId);
    setBorrowId(borrow ? borrow._id : "");
  };

  // Handle book return
  const handleReturnBook = async (e) => {
    e.preventDefault();
    if (!borrowId) {
      setError("No matching borrow record found.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/admin/return`, { borrowId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      setBorrowedBooks((prev) => prev.filter((b) => b._id !== borrowId));
      setBorrowId("");
    } catch (err) {
      setError("Error returning book.");
      console.error(err);
    }
  };

  // Get book name from bookId
  const getBookName = (bookId) => {
    const book = books.find((b) => b._id === bookId);
    return book ? `${book.title} - ${book.author}` : "Unknown Book";
  };
    if (loading) {
      console.log(loading);
      
    }
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Return Book</h2>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleReturnBook} className="space-y-4">
        {/* Select Department */}
        <label className="block">
          <span className="text-gray-700">Select Department</span>
          <select
            className="block w-full p-2 border rounded"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            required
          >
            <option value="">Select a department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </label>

        {/* Select Student */}
        <label className="block">
          <span className="text-gray-700">Select Student</span>
          <select
            className="block w-full p-2 border rounded"
            value={selectedStudent}
            onChange={handleStudentChange}
            required
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name} ({student.regdNo})
              </option>
            ))}
          </select>
        </label>

        {/* Select Borrowed Book */}
        <label className="block">
          <span className="text-gray-700">Select Borrowed Book</span>
          <select
            className="block w-full p-2 border rounded"
            onChange={handleBookChange}
            required
          >
            <option value="">Select a book</option>
            {borrowedBooks.length > 0 ? (
              borrowedBooks.map((borrow) => (
                <option key={borrow._id} value={borrow.bookId}>
                  {getBookName(borrow.bookId)}
                </option>
              ))
            ) : (
              <option value="" disabled>No borrowed books</option>
            )}
          </select>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={!borrowId}
        >
          Return Book
        </button>
      </form>
    </div>
  );
};

export default IssueBook;
