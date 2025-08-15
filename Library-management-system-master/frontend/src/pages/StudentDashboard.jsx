import Books from "./Books";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-3xl flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-2 text-center tracking-tight">Student Dashboard</h1>
      <p className="mb-8 text-gray-500 text-lg text-center">Welcome! Explore available books and manage your issued books below.</p>
      <div className="flex flex-wrap gap-6 justify-center mb-10">
        <Link to="/student/issued-books" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow transition">My Issued Books</Link>
        <Link to="/books" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow transition">Browse Books</Link>
        <Link to="/student/profile" className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold shadow transition">My Profile</Link>
      </div>
      <div className="w-full">
        <Books />
      </div>
    </div>
  );
};

export default StudentDashboard;
