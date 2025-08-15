import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const ResetPassword = () => {
  const [form, setForm] = useState({ email: "", token: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/student/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset password");
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-extrabold mb-2 text-blue-700 tracking-tight">Reset Password</h2>
        <p className="mb-6 text-gray-500 text-center">Enter your email, the token you received, and your new password.</p>
        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          />
          <input
            name="token"
            placeholder="Reset Token"
            value={form.token}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          />
          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
          {message && <div className="text-green-600 text-center">{message}</div>}
          {error && <div className="text-red-500 text-center">{error}</div>}
        </form>
      </div>
    </Layout>
  );
};

export default ResetPassword;
