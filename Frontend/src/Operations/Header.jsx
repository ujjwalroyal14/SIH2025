
import React, { useState } from "react";

export default function Header({ toggleLoginForm, currentUser, handleLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-30 px-6 md:px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-extrabold text-blue-700 tracking-wide">
        Wagmi
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
        <a href="#" className="hover:text-blue-600 transition">Home</a>
        <a href="#about" className="hover:text-blue-600 transition">About</a>
        <a href="#services" className="hover:text-blue-600 transition">Services</a>
        <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
      </nav>

      {/* Auth Buttons (Desktop) */}
      <div className="hidden md:flex">
        {currentUser ? (
          <button
            onClick={handleLogout}
            className="px-5 py-2 border border-red-600 text-red-600 font-medium rounded-lg hover:bg-red-600 hover:text-white transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={toggleLoginForm}
            className="px-5 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            Log in
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center gap-4 relative">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700 text-2xl"
        >
          ☰
        </button>

        {isMobileMenuOpen && (
          <div className="absolute right-0 top-16 bg-white shadow-md rounded-lg py-4 px-6 flex flex-col gap-3 w-40">
            <a href="#" className="hover:text-blue-600 transition">Home</a>
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#services" className="hover:text-blue-600 transition">Services</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact</a>

            {currentUser ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition mt-2"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={toggleLoginForm}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition mt-2"
              >
                Log in
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

