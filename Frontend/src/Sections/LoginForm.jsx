import React, { useRef } from "react";

export default function LoginForm({ onClose, onSwitch, handleLogin }) {
  const loginFormRef = useRef(null);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn">
      <div
        ref={loginFormRef}
        className="relative bg-white rounded-xl shadow-2xl p-8 w-96 animate-slideUp"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✖
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Welcome Back 👋
        </h2>
        <form id="loginDataForm" onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="identifier"
            placeholder="Email or Mobile"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Log in
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={onSwitch}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
