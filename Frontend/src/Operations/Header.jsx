import React, { useState } from "react";

<<<<<<< HEAD
export default function Header({ toggleLoginForm, currentUser, handleLogout }) {
=======
export default function Header({ toggleLoginForm, toggleRegisterForm }) {
>>>>>>> ujjwal/main
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-30 px-6 md:px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-extrabold text-blue-700 tracking-wide">
        Wagmi
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
<<<<<<< HEAD
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
=======
        <a href="#" className="hover:text-blue-600 transition">
          Home
        </a>
        <a href="#about" className="hover:text-blue-600 transition">
          About
        </a>
        <a href="#services" className="hover:text-blue-600 transition">
          Services
        </a>
        <a href="#contact" className="hover:text-blue-600 transition">
          Contact
        </a>
      </nav>

      {/* Auth Buttons (Desktop) */}
      <div className="hidden md:flex gap-4">
        <button
          id="loginBtn"
          onClick={toggleLoginForm}
          className="px-5 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition"
        >
          Log in
        </button>
        <button
          id="registerBtn"
          onClick={toggleRegisterForm}
          className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700 text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 gap-4 md:hidden">
          <a
            href="#"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#services"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => { toggleLoginForm(); setIsMobileMenuOpen(false); }}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Log in
            </button>
            <button
              onClick={() => { toggleRegisterForm(); setIsMobileMenuOpen(false); }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
          </div>
        </div>
      )}
>>>>>>> ujjwal/main
    </header>
  );
}
