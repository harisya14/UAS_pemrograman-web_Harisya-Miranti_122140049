// src/components/Header.jsx
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Hapus data user dari localStorage dan reset state
    navigate('/login'); // Redirect ke halaman login
  };

  return (
    <header className="bg-gradient-to-r from-red-600 to-yellow-400 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">Mam Kuy</Link>

        <nav className="space-x-4 flex items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'font-semibold underline' : 'hover:underline'
            }
          >
            Beranda
          </NavLink>
          <NavLink
            to="/planner"
            className={({ isActive }) =>
              isActive ? 'font-semibold underline' : 'hover:underline'
            }
          >
            Planner
          </NavLink>

          {isAuthenticated ? (
            <>
              <span className="hidden md:inline-block font-medium">
                Hai, {user?.username || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-1 bg-white text-red-600 rounded hover:bg-gray-100 transition"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'font-semibold underline' : 'hover:underline'
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? 'font-semibold underline' : 'hover:underline'
                }
              >
                Daftar
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;