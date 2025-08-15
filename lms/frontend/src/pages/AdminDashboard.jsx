import Books from "./Books";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/admin/stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-3xl flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-2 text-center tracking-tight">Admin Dashboard</h1>
      <p className="mb-8 text-gray-500 text-lg text-center">Welcome, Admin! Use the quick actions below to manage the library.</p>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mb-10">
          <div className="bg-blue-100 rounded-xl p-6 flex flex-col items-center shadow">
            <span className="text-2xl font-bold text-blue-700">{stats.totalBooks}</span>
            <span className="text-gray-700 mt-2">Total Books</span>
          </div>
          <div className="bg-green-100 rounded-xl p-6 flex flex-col items-center shadow">
            <span className="text-2xl font-bold text-green-700">{stats.totalStudents}</span>
            <span className="text-gray-700 mt-2">Total Students</span>
          </div>
          <div className="bg-yellow-100 rounded-xl p-6 flex flex-col items-center shadow">
            <span className="text-2xl font-bold text-yellow-700">{stats.totalBorrows}</span>
            <span className="text-gray-700 mt-2">Total Borrows</span>
          </div>
          <div className="bg-purple-100 rounded-xl p-6 flex flex-col items-center shadow">
            <span className="text-2xl font-bold text-purple-700">{stats.issuedBooks}</span>
            <span className="text-gray-700 mt-2">Books Issued</span>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-6 justify-center mb-10">
        <Link to="/admin/add-student" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow transition">Add Student</Link>
        <Link to="/admin/add-book" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow transition">Add Book</Link>
        <Link to="/admin/issue-book" className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold shadow transition">Issue Book</Link>
        <Link to="/admin/return-book" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow transition">Return Book</Link>
        <Link to="/admin/students" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow transition">All Students</Link>
        <Link to="/managebooks" className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold shadow transition">Manage Books</Link>
      </div>
      <div className="w-full">
        <Books />
      </div>
    </div>
  );
};

export default AdminDashboard;
