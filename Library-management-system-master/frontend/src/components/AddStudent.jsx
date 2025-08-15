import { useState } from "react";
import axios from "axios";

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    regdNo: "",
  });

  const departments = ["EE", "ECE", "CSE", "CE", "ME", "MCA", "MBA"];
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const API_BASE_URL = "http://localhost:5000/api/admin";

  const handleAddStudent = async (e) => {
    e.preventDefault();
    // console.log(student);
    try {
      const res = await axios.post(`${API_BASE_URL}/students`, student, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      setStudent({
        name: "",
        email: "",
        password: "",
        department: "",
        regdNo: "",
      });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding student");
      setMessage("");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add Student</h2>

      {message && <p className="text-green-600 bg-green-100 p-2 rounded-md">{message}</p>}
      {error && <p className="text-red-600 bg-red-100 p-2 rounded-md">{error}</p>}

      <form onSubmit={handleAddStudent} className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Name"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={student.password}
          onChange={(e) => setStudent({ ...student, password: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />

        {/* Department Dropdown */}
        <select
          value={student.department}
          onChange={(e) => setStudent({ ...student, department: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Registration Number"
          value={student.regdNo}
          onChange={(e) => setStudent({ ...student, regdNo: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
