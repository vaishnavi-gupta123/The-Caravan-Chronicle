import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3000/api/staff/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.token) {
        localStorage.setItem("staffToken", data.token);
      }

      if (data.staff) {
        localStorage.setItem("staffData", JSON.stringify(data.staff));
      }

      navigate("/staff/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-8">

      <div className="w-full max-w-md">

        {/* Logo and Heading */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-700 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto shadow-lg">
            M
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-5">
            Staff Portal
          </h1>

          <p className="text-gray-500 mt-2">
            Municipal Grievance Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

          <h2 className="text-2xl font-bold text-gray-800">
            Welcome Back!
          </h2>

          <p className="text-gray-500 text-sm mt-2 mb-7">
            Login to manage your assigned complaints.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Staff Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your staff email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
            >
              {loading ? "Logging in..." : "Login to Staff Portal"}
            </button>

          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          © 2026 Municipal Grievance Management System
        </p>

      </div>
    </div>
  );
};

export default StaffLogin;