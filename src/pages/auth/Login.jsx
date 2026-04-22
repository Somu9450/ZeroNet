import React from "react";
import { Mail, Lock, Eye, Shield } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      {/* Container */}
      <div className="w-full max-w-md">

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Shield />
          </div>
          <h1 className="text-2xl font-bold mt-3 text-gray-900">ZeroNet</h1>
          <p className="text-sm text-gray-500">
            Next-Generation Incident Command
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6">

          <h2 className="text-lg font-semibold text-gray-800">
            System Access
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Enter your credentials to enter the secure network.
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-500 uppercase">
              Email / Mobile
            </label>
            <div className="flex items-center gap-2 mt-1 bg-gray-100 px-3 py-2 rounded-lg">
              <Mail size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="responder@zeronet.gov"
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-gray-500 uppercase">
                Password
              </label>
              <button className="text-xs text-blue-600 hover:underline">
                Forgot Password?
              </button>
            </div>

            <div className="flex items-center gap-2 mt-1 bg-gray-100 px-3 py-2 rounded-lg">
              <Lock size={16} className="text-gray-400" />
              <input
                type="password"
                placeholder="********"
                className="bg-transparent outline-none text-sm w-full"
              />
              <Eye size={16} className="text-gray-400 cursor-pointer" />
            </div>
          </div>

          {/* Remember */}
          <div className="flex items-center gap-2 mb-5">
            <input type="checkbox" />
            <span className="text-xs text-gray-500">
              Remember this terminal
            </span>
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
            Login →
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="text-xs text-gray-400">ALTERNATIVE ACCESS</span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>

          {/* OTP Button */}
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium">
            Switch to OTP
          </button>

        </div>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;