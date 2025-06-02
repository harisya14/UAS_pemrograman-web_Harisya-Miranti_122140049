// src/hooks/useAuth.js

import api from '../api/axios';

const useAuth = () => {
  const register = async (userData) => {
    try {
      const response = await api.post('/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post('/login', credentials);

      // Simpan seluruh data user & id saja ke localStorage
      if (response.data && response.data.id) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('user_id', response.data.id); // <-- Menyimpan user_id
        console.log('Login successful, user and user_id stored in localStorage');
      }

      return response.data;
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    // Hapus semua item yang terkait auth
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    return api.post('/logout');
  };

  const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error('Failed to parse user from localStorage');
        return null;
      }
    }
    return null;
  };

  const getCurrentUserId = () => {
    const userIdStr = localStorage.getItem('user_id');
    return userIdStr ? parseInt(userIdStr, 10) : null; // Pastikan integer
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem('user');
  };

  return {
    register,
    login,
    logout,
    getCurrentUser,
    getCurrentUserId, // <-- Tambahkan fungsi ini
    isLoggedIn,
  };
};

export default useAuth;