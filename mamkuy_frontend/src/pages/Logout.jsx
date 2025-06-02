// src/components/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Hapus user dari localStorage dan reset state
    navigate('/login'); // Redirect ke halaman login
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Keluar
    </button>
  );
};

export default LogoutButton;