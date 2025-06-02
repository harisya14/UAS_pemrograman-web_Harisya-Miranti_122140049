// src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../services/authService'; // Pastikan jalur benar

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Untuk ambil dari halaman mana user datang
  const { login } = useAuth(); // Gunakan fungsi login dari authService

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/planner'; // Redirect ke halaman sebelumnya

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userData = await login({ email, password }); // Kirim ke backend via Axios

      // HANYA SIMPAN USER ID SAJA
      if (userData && userData.id) {
        localStorage.setItem('user_id', userData.id); // <-- Simpan user_id saja
        console.log('User ID disimpan:', userData.id);
      }

      console.log('Login sukses');
      navigate(from, { replace: true }); // Arahkan ke halaman sebelumnya
    } catch (err) {
      const message = err.response?.data?.error || 'Login gagal. Email atau password salah.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Masuk ke Mam Kuy</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded transition flex justify-center items-center ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memuat...
              </>
            ) : (
              'Masuk'
            )}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Belum punya akun? <a href="/register" className="text-blue-600 hover:underline">Daftar di sini</a>
        </p>
      </div>
    </div>
  );
};

export default Login;