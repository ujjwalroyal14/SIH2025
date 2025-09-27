import React from "react";

export default function RegisterForm({ onClose, handleRegister }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-xl shadow-2xl p-8 w-96">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✖
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Register 📝
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="username"           
            placeholder="Username"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"             
            placeholder="Email"
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
