// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import MealCard from '../components/MealCard';
import resepService from '../services/resepService'; // Service resep yang baru
import menuMakanService from '../services/menuMakanService'; // Service menu makan

const Home = () => {
  const [reseps, setReseps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addMessage, setAddMessage] = useState(''); // Untuk pesan sukses/gagal tambah planner

  // Ambil semua resep dari backend saat komponen dimuat
  useEffect(() => {
    const fetchReseps = async () => {
      try {
        const data = await resepService.getAllReseps(); // Menggunakan service yang baru
        setReseps(data);
      } catch (err) {
        console.error("Error fetching reseps:", err);
        setError(err.message || 'Gagal memuat resep');
      } finally {
        setLoading(false);
      }
    };

    fetchReseps();
  }, []);

  // Fungsi untuk menambahkan resep ke planner
  const handleAddToPlanner = async ({ resepId, hari, waktuMakan }) => {
    const userId = localStorage.getItem('user_id');

    if (!userId) {
      alert('Anda harus login untuk menambahkan ke planner!');
      return;
    }

    const menuMakanData = {
      resep_id: resepId,
      hari,
      waktu_makan: waktuMakan,
      user_id: parseInt(userId),
      gambar: `http://localhost:6543/static/images/${resepId}.jpg`, // opsional, sesuaikan jika ada
    };

    try {
      const newMenu = await menuMakanService.createMenuMakan(menuMakanData);
      setAddMessage(`Berhasil ditambahkan ke planner pada ${hari} - ${waktuMakan}`);
      console.log('Menu makan berhasil dibuat:', newMenu);
    } catch (err) {
      setAddMessage(`Gagal menambahkan ke planner: ${err.response?.data?.error || err.message}`);
      console.error('Gagal menambahkan ke planner:', err);
    } finally {
      setTimeout(() => setAddMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Memuat resep...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-500 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Rekomendasi Menu Mingguan</h1>

      {addMessage && (
        <div className={`mb-4 p-3 rounded text-white ${addMessage.startsWith('Gagal') ? 'bg-red-500' : 'bg-green-500'}`}>
          {addMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reseps.length === 0 ? (
          <p className="text-gray-500">Belum ada resep tersedia.</p>
        ) : (
          reseps.map((resep) => (
            <MealCard
              key={resep.id}
              resep={resep}
              onAddToPlanner={handleAddToPlanner}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;