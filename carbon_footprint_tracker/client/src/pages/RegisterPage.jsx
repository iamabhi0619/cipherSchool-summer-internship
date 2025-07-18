import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Leaf, Eye, EyeOff, Lock, Mail, User, Shield, XCircle } from "lucide-react";
import api from "../lib/api";
import { toast } from "sonner";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await api.post("/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      const { user, token } = response.data;
      login(token, user);
      navigate("/dashboard");
    } catch (e) {
      console.error("Registration error:", e.response?.data);
      toast.error(e.response?.data?.message || "Registration failed. Please try again.");
      setError(e.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-lavender flex">
      {/* Left Side - Branding & Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy relative overflow-hidden flex-col justify-center items-center text-center">
        <div className="mb-8">
          <div className="bg-mint-green p-4 rounded-3xl shadow-2xl mb-6 inline-block">
            <img src="./logo.svg" alt="Logo" className="h-16 w-16" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Join GreenLog</h1>
          <p className="text-sky-blue text-lg leading-relaxed max-w-md mb-8">
            Start your eco-friendly journey today and make a positive impact on our planet
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 max-w-xs">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-mint-green/20">
            <div className="flex items-center space-x-3">
              <div className="bg-mint-green p-2 rounded-xl">
                <Shield className="h-5 w-5 text-navy" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Secure Account</p>
                <p className="text-sky-blue text-sm">Protected data</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-mint-green/20">
            <div className="flex items-center space-x-3">
              <div className="bg-sky-blue p-2 rounded-xl">
                <Leaf className="h-5 w-5 text-navy" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Track Impact</p>
                <p className="text-sky-blue text-sm">Monitor footprint</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-mint-green/20">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald p-2 rounded-xl">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Community</p>
                <p className="text-sky-blue text-sm">Join eco-warriors</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <div className="inline-flex items-center space-x-3 bg-white rounded-2xl px-6 py-4 shadow-lg">
              <div className="bg-sky-blue p-2 rounded-xl">
                <img src="./logo.svg" alt="Logo" className="h-8 w-8" />
              </div>
              <span className="text-2xl font-bold text-navy">GreenLog</span>
            </div>
          </div>

          {/* Form Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-navy mb-2">Create Account</h2>
            <p className="text-steel-blue">Join the eco-friendly community</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-navy mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-steel-blue" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-sky-blue/20 text-navy rounded-xl focus:outline-none focus:border-forest-green transition-colors placeholder-steel-blue/70"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-steel-blue" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-sky-blue/20 text-navy rounded-xl focus:outline-none focus:border-forest-green transition-colors placeholder-steel-blue/70"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-navy mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-steel-blue" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 bg-white border-2 border-sky-blue/20 text-navy rounded-xl focus:outline-none focus:border-forest-green transition-colors placeholder-steel-blue/70"
                  placeholder="Create password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-blue hover:text-forest-green transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-navy mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-steel-blue" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 bg-white border-2 border-sky-blue/20 rounded-xl text-navy focus:outline-none focus:border-forest-green transition-colors placeholder-steel-blue/70"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-blue hover:text-forest-green transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg flex items-center space-x-2 text-sm">
                <XCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-forest-green hover:bg-emerald disabled:bg-steel-blue/50 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed transform hover:-translate-y-1 cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="text-center mt-6 space-y-3">
            <p className="text-steel-blue text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-forest-green hover:text-emerald transition-colors"
              >
                Sign in
              </Link>
            </p>
            <Link to="/" className="text-steel-blue/60 text-sm hover:text-navy transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
