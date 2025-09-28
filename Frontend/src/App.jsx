import React, { useState, useEffect, useRef } from "react";
import Header from "./Operations/Header";
import Footer from "./Operations/Footer";
import LoginForm from "./Sections/LoginForm";
import RegisterForm from "./Sections/RegisterForm";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const loginFormRef = useRef(null);
  const registerFormRef = useRef(null);

  const toggleLoginForm = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
  };

  const toggleRegisterForm = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };


  const fetchCurrentUser = async () => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      setCurrentUser(null);
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/current_user/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Not logged in");
      const data = await response.json();
      setCurrentUser(data);
    } catch (err) {
      setCurrentUser(null);
      console.log("User not logged in");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const identifier = form.identifier.value.trim();
    const password = form.password.value.trim();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: identifier, password }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      sessionStorage.setItem("access_token", data.access);
      sessionStorage.setItem("refresh_token", data.refresh);

      alert(`🎉 Welcome back, ${data.username || data.email}!`);
      form.reset();
      setShowLogin(false);
      fetchCurrentUser();
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };


  const handleLogout = async () => {
  const refreshToken = sessionStorage.getItem("refresh_token"); 
  if (!refreshToken) {
    alert("Yoy are Logged out successfully!✅😊");
    setCurrentUser(null);
    return;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logout/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Logout failed");

    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    setCurrentUser(null);
    alert("✅😊 Logged out successfully!");
  } catch (err) {
    console.error(err);
    alert("❌ Logout failed: " + err.message);
  }
};

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const userData = {
      username: form.username.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value.trim(),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/register/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed");

      alert("✅ Registration successful! You can now log in.");
      form.reset();
      setShowRegister(false);
      setShowLogin(true);
    } catch (err) {
      alert(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative font-sans">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/BackgroundImage.gif')" }}
      ></div>
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header
          toggleLoginForm={toggleLoginForm}
          currentUser={currentUser}
          handleLogout={handleLogout}
        />

        {/* Login Modal */}
        {showLogin && (
          <LoginForm
            ref={loginFormRef}
            onClose={() => setShowLogin(false)}
            onSwitch={toggleRegisterForm}
            handleLogin={handleLogin}
          />
        )}

        {/* Register Modal */}
        {showRegister && (
          <RegisterForm
            ref={registerFormRef}
            onClose={() => setShowRegister(false)}
            handleRegister={handleRegister}
          />
        )}

        {/* Hero Section */}
        <main className="flex-1 px-6 py-16 md:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-5xl font-extrabold text-white leading-tight">
                Identify Cattle & Buffalo Breeds <br />
                <span className="text-blue-400">using AI</span>
              </h1>
              <p className="text-lg text-gray-200 leading-relaxed">
                Upload your image and our AI-powered model will identify Indian
                cattle and buffalo breeds with lightning speed ⚡.
              </p>
              <button
                onClick={() => document.getElementById("imageInput").click()}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
              >
                Upload Image 📤
              </button>
            </div>
            <div className="md:w-1/2">
              <img
                src="cattle.jpg"
                alt="Cattle and Buffalo"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Upload Section */}
          <div
            className="mt-16 border-2 border-dashed border-gray-400 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 transition bg-white shadow-sm"
            onClick={() => document.getElementById("imageInput").click()}
          >
            <p className="text-lg text-gray-600">
              📤 Drag & drop or click to upload <br />
              <span className="text-gray-500 text-sm">
                Supported formats: JPG, PNG, BMP, WEBP
              </span>
            </p>
            <input type="file" id="imageInput" accept="image/*" hidden />
            <div className="mt-6 text-sm text-gray-500">
              Powered by{" "}
              <a href="#" className="text-blue-600 font-semibold">
                Wagmi
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

