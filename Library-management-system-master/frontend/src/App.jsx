import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Install using: npm install jwt-decode
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import StudentProfile from "./pages/StudentProfile";
import ResetPassword from "./pages/ResetPassword";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/Layout";
import AddStudent from "./components/AddStudent";
import AddBook from "./components/AddBook";
import IssueBook from "./components/IssueBook";
import AllStudents from "./pages/AllStudents";
import ReturnBookForm from "./components/ReturnBookForm"; // Import the new component
import StudentIssuedBook from "./components/StudentIssuedBook";
import ManageBooks from "./components/ManageBooks"; // Admin Book Management Page

import ViewStudent from "./pages/ViewStudent"; // ✅ Make sure the path is correct
import EditStudent from './pages/EditStudent';  // Import the EditStudent component

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userData = jwtDecode(token); // Decode JWT safely
        setUser(userData);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token"); // Remove invalid token
      }
    }
  }, []);

  return (
    <Router>
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route path="/" element={
            user?.role === "admin"
              ? <Navigate to="/admin" />
              : user?.role === "student"
                ? <Navigate to="/student" />
                : <LandingPage />
          } />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Books />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/managebooks" element={<ManageBooks />} />
          <Route path="/students/:id" element={<ViewStudent />} />
          <Route path="/students/edit/:id" element={<EditStudent />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/add-student"
            element={user?.role === "admin" ? <AddStudent /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/add-book"
            element={user?.role === "admin" ? <AddBook /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/issue-book"
            element={user?.role === "admin" ? <IssueBook /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/students"
            element={user?.role === "admin" ? <AllStudents /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/return-book"
            element={user?.role === "admin" ? <ReturnBookForm /> : <Navigate to="/login" />}
          />

          {/* Student Routes */}
          <Route
            path="/student"
            element={user?.role === "student" ? <StudentDashboard /> : <Navigate to="/login" />}
          />
          {/* Student issued books */}
          <Route
            path="/student/issued-books"
            element={user?.role === "student" ? <StudentIssuedBook /> : <Navigate to="/login" />}
          />
          <Route path="/student/profile" element={user?.role === "student" ? <StudentProfile /> : <Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
