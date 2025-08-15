import { useState, useEffect } from "react";
import axios from "axios";

const IssueBook = () => {
  const [departments] = useState(["EE", "ECE", "CSE", "CE", "ME", "MCA", "MBA"]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [students, setStudents] = useState([]);
  const [issue, setIssue] = useState({ studentId: "", bookId: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const API_BASE_URL = "http://localhost:5000/api/admin";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/books");
        console.log("Books fetched:", response.data); // Debugging
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const fetchStudents = async (department) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filteredStudents = res.data.filter((student) => student.department === department);
      setStudents(filteredStudents);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleIssueBook = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/issue`, issue, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      setIssue({ studentId: "", bookId: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Error issuing book");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Issue Book</h2>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleIssueBook} className="space-y-4">
        {/* Select Department */}
        <label className="block">
          <span className="text-gray-700">Select Department</span>
          <select
            className="block w-full p-2 border rounded"
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              fetchStudents(e.target.value);
            }}
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
            value={issue.studentId}
            onChange={(e) => setIssue({ ...issue, studentId: e.target.value })}
            required
          >
            <option value="">Select a student</option>
            {students.length > 0 ? (
              students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} ({student.regdNo})
                </option>
              ))
            ) : (
              <option value="" disabled>No students available</option>
            )}
          </select>
        </label>

        {/* Select Book */}
        <label className="block">
          <span className="text-gray-700">Select Book</span>
          <select
            className="block w-full p-2 border rounded"
            value={issue.bookId}
            onChange={(e) => setIssue({ ...issue, bookId: e.target.value })}
            required
          >
            <option value="">Select a book</option>
            {loading ? (
              <option value="" disabled>Loading books...</option>
            ) : books.length > 0 ? (
              books.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title} - {book.author}
                </option>
              ))
            ) : (
              <option value="" disabled>No books available</option>
            )}
          </select>
        </label>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Issue Book
        </button>
      </form>
    </div>
  );
};

export default IssueBook;
