import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logout/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({
          refresh: sessionStorage.getItem('refresh_token'),
        }),
      });

      if (!response.ok) throw new Error("Logout failed");


      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      sessionStorage.removeItem('user');

      navigate('/'); 
    } catch (err) {
      console.error('❌ Logout failed:', err);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-5 py-2 border border-red-600 text-red-600 font-medium rounded-lg hover:bg-red-600 hover:text-white transition"
    >
      Logout
    </button>
  );
}
