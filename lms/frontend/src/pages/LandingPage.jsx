import React from "react";

const LandingPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <h1 className="text-5xl font-extrabold text-blue-700 mb-4">Welcome to the Library Management System</h1>
    <p className="text-lg text-gray-600 mb-8 max-w-xl">
      Manage your library with ease. Students can browse and borrow books, while admins can manage inventory and users—all in a modern, secure web app.
    </p>
    <div className="flex gap-4">
      <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Login</a>
      <a href="/register" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">Register</a>
    </div>
  </div>
);

export default LandingPage;
