// src/hooks/useResep.js
import { useState, useEffect } from 'react';
import axios from '../api/axios';

const RESEPS_URL = '/reseps';

export const useResep = () => {
    const [reseps, setReseps] = useState([]);
    const [loading, setLoading] = useState(true); // ubah ke true saat awal
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReseps();
    }, []);

    const fetchReseps = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(RESEPS_URL);
            setReseps(res.data);
        } catch (err) {
            setError('Gagal memuat daftar resep');
            console.error('Error fetching reseps:', err);
        } finally {
            setLoading(false);
        }
    };

    const getResepById = async (id) => {
        try {
            const res = await axios.get(`${RESEPS_URL}/${id}`);
            return res.data;
        } catch (err) {
            setError('Gagal memuat detail resep');
            console.error('Error fetching resep by ID:', err);
            return null;
        }
    };

    return { reseps, loading, error, fetchReseps, getResepById };
};