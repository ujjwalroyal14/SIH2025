import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Wagmi AI</h2>
          <p className="text-sm leading-relaxed">
            AI-powered cattle & buffalo breed identification platform.
            Simplifying agriculture with technology 🚀.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm">📞 +91 9693411884</p>
          <p className="text-sm">📧 support@wagmiai.com</p>
          <p className="text-sm">📍 Kolkata, West Bengal, India</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a
              href="https://wa.me/+919693411884"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-400"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Wagmi AI. All rights reserved.
      </div>
    </footer>
  );
}
