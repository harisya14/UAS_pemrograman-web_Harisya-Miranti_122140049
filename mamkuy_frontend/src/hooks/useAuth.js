// src/hooks/useAuth.js
import { useState } from 'react';
import axios from '../api/axios';

const AUTH_URL = '/login'; // Sesuaikan jika endpoint login berbeda
const REGISTER_URL = '/register'; // Sesuaikan sesuai route backend

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

// useAuth.js
const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
        const res = await axios.post(AUTH_URL, { email, password });
        
            // Simpan data user
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            return res.data;
        return res.data;
    } catch (err) {
        const message = err.response?.data?.error || 'Login gagal';
        setError(message);
        throw new Error(message);
    } finally {
        setLoading(false);
    }
};

    const register = async (username, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(REGISTER_URL, { username, email, password });
            const userData = res.data;

            localStorage.setItem('token', 'authenticated');
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return userData;
        } catch (err) {
            const message = err.response?.data?.errors?.email?.[0] || 'Register gagal';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const isAuthenticated = !!localStorage.getItem('token');

    return { user, loading, error, login, register, logout, isAuthenticated };
};