// src/hooks/useMenuMakan.js
import { useState, useEffect } from 'react';
import axios from '../api/axios';

const MENU_MAKAN_URL = '/menu-makans';

export const useMenuMakan = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Bantu ambil user.id dari localStorage
    const getUserId = () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;

        try {
            const user = JSON.parse(userStr);
            return user.id;
        } catch (e) {
            console.error('Invalid user in localStorage', e);
            return null;
        }
    };

    // Fetch semua menu saat komponen mount
    const fetchMenus = async () => {
        const userId = getUserId();
        if (!userId) {
            setError('Anda harus login untuk mengakses data ini.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(MENU_MAKAN_URL, {
                headers: {
                    Authorization: `Bearer ${userId}`, // Kirim user_id sebagai token sederhana
                },
            });
            setMenus(res.data);
        } catch (err) {
            console.error('Error fetching menus:', err);
            setError('Gagal memuat menu makan. Silakan coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    // Helper untuk tambah header otomatis
    const getConfigWithAuth = () => {
        const userId = getUserId();
        if (!userId) throw new Error('User tidak ditemukan');

        return {
            headers: {
                Authorization: `Bearer ${userId}`,
            },
        };
    };

    const getMenuById = async (id) => {
        try {
            const res = await axios.get(`${MENU_MAKAN_URL}/${id}`, getConfigWithAuth());
            return res.data;
        } catch (err) {
            setError('Gagal memuat detail menu');
            console.error('Error fetching menu by ID:', err);
            return null;
        }
    };

    const createMenu = async (data) => {
        try {
            const res = await axios.post(MENU_MAKAN_URL, data, getConfigWithAuth());
            setMenus([...menus, res.data]);
            return res.data;
        } catch (err) {
            setError('Gagal menambahkan menu');
            throw err;
        }
    };

    const updateMenu = async (id, data) => {
        try {
            const res = await axios.put(`${MENU_MAKAN_URL}/${id}`, data, getConfigWithAuth());
            setMenus(menus.map((menu) => (menu.id === id ? res.data : menu)));
            return res.data;
        } catch (err) {
            setError('Gagal memperbarui menu');
            throw err;
        }
    };

    const deleteMenu = async (id) => {
        try {
            await axios.delete(`${MENU_MAKAN_URL}/${id}`, getConfigWithAuth());
            setMenus(menus.filter((menu) => menu.id !== id));
        } catch (err) {
            setError('Gagal menghapus menu');
            throw err;
        }
    };

    return {
        menus,
        loading,
        error,
        fetchMenus,
        getMenuById,
        createMenu,
        updateMenu,
        deleteMenu,
    };
};