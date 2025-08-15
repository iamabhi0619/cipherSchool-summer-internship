import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import {jwtDecode} from "jwt-decode"; // Install using: npm install jwt-decode
import api from "../api";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      let res;
      
      // Try logging in as admin
      try {
        const res = await api.post("/admin/login", { email, password });
        localStorage.setItem("token", res.data.token);
        const userData = jwtDecode(res.data.token);
        setUser(userData);
        if (userData.role === "admin") {
          navigate("/admin");
        } else if (userData.role === "student") {
          navigate("/student");
        } else {
          setError("Invalid role");
        }
      } catch (adminErr) {
        // If admin login fails, try student login
        try {
          const res = await api.post("/student/login", { email, password });
          localStorage.setItem("token", res.data.token);
          const userData = jwtDecode(res.data.token);
          setUser(userData);
          if (userData.role === "admin") {
            navigate("/admin");
          } else if (userData.role === "student") {
            navigate("/student");
          } else {
            setError("Invalid role");
          }
        } catch (studentErr) {
          setError(studentErr.response?.data?.message || "Invalid credentials");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

    return (
      <>
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
          <h2 className="text-3xl font-extrabold mb-2 text-blue-700 tracking-tight">Sign In</h2>
          <p className="mb-6 text-gray-500">Welcome back! Please login to your account.</p>
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}
    <form onSubmit={handleLogin} className="space-y-5 w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
            <div className="text-right mt-2">
              <Link to="/forgot-password" className="text-blue-500 hover:underline text-sm">Forgot password?</Link>
            </div>
          </form>
          <div className="mt-6 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/register" className="text-blue-600 hover:underline font-medium">Register</Link>
          </div>
        </div>
      </>
    );
};

export default Login;
