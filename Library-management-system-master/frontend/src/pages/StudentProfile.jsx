import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", department: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/student/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setProfile(data);
          setForm({ name: data.name, department: data.department });
        } else {
          setError(data.message || "Failed to load profile");
        }
      } catch (err) {
        setError("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/student/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data.student);
        setMessage("Profile updated successfully!");
        setEdit(false);
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  if (!profile) {
    return (
      <Layout>
        <div className="text-center text-gray-500">Loading profile...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-extrabold mb-2 text-blue-700 tracking-tight">My Profile</h2>
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}
        {message && <div className="text-green-600 text-center mb-2">{message}</div>}
        {!edit ? (
          <div className="w-full space-y-4">
            <div>
              <span className="font-semibold text-gray-700">Name:</span> {profile.name}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Email:</span> {profile.email}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Department:</span> {profile.department}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Registration No:</span> {profile.regdNo}
            </div>
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              onClick={() => setEdit(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="w-full space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              required
            />
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              required
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold transition"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default StudentProfile;
