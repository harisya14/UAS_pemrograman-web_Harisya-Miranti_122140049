// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login, error, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/planner'); // Arahkan ke halaman planner jika login berhasil
    } catch (err) {
      // Error sudah ditangani oleh hook useAuth
      console.error('Login gagal:', err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Masuk ke Mam Kuy</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
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
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded hover:bg-blue-700 transition ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600'
            }`}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Belum punya akun?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;