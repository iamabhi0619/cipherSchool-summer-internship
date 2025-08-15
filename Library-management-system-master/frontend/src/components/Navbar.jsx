import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">Book-Store</h2>
      <ul className="flex gap-6">
        <li>
          <Link to="/books" className="hover:text-gray-300">Books</Link>
        </li>

        {user ? (
          <>
            {user.role === "admin" && (
              <>
                <li>
                  <Link to="/admin" className="hover:text-gray-300">Admin Dashboard</Link>
                </li>
                <li>
                  <Link to="/admin/students" className="hover:text-gray-300">All Students</Link>
                </li>
                <li>
                  <Link to="/admin/add-student" className="hover:text-gray-300">Add Student</Link>
                </li>
                <li>
                  <Link to="/admin/add-book" className="hover:text-gray-300">Add Book</Link>
                </li>
                <li>
                  <Link to="/admin/issue-book" className="hover:text-gray-300">Issue Book</Link>
                </li>
                <li>
                  <Link to="/admin/return-book" className="hover:text-gray-300">Return Book</Link>
                </li>
              </>
            )}

            {user.role === "student" && (
              <>
                <li>
                  <Link to="/student" className="hover:text-gray-300">Student Dashboard</Link>
                </li>
                <li>
                  <Link to="student/issued-books" className="hover:text-gray-300">My Issued Books</Link>
                </li>
              </>
            )}

            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
