import React, { useState } from 'react';
import MealCard from '../components/MealCard';
import { useResep } from '../hooks/useResep';
import { useMenuMakan } from '../hooks/useMenuMakan';

const Home = () => {
  const { reseps, loading, error: resepError } = useResep();
  const { createMenu } = useMenuMakan();

  const [addMessage, setAddMessage] = useState('');

  const handleAddToPlanner = async ({ resepId, hari, waktuMakan }) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData?.id;

    if (!userId) {
      setAddMessage('Anda harus login untuk menambahkan ke planner');
      setTimeout(() => setAddMessage(''), 3000);
      return;
    }

    const payload = {
      user_id: parseInt(userId),
      resep_id: parseInt(resepId),
      hari,
      waktu_makan: waktuMakan,
      kategori: 'makanan_utama',
      gambar: null,
    };

    try {
      await createMenu(payload);
      setAddMessage(`Berhasil ditambahkan ke ${hari}, ${waktuMakan}`);
    } catch (err) {
      console.error('Gagal menambahkan ke planner:', err);
      const message =
        err.response?.data?.error ||
        err.message ||
        'Gagal menambahkan ke planner';
      setAddMessage(message);
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

  if (reseps.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Belum ada resep tersedia</h2>
        <p className="text-gray-600">Silakan tambahkan resep di halaman admin atau backend.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Rekomendasi Menu Mingguan</h1>

      {/* Pesan tambah ke planner */}
      {addMessage && (
        <div
          className={`mb-4 p-3 rounded text-white ${
            addMessage.includes('Gagal') ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {addMessage}
        </div>
      )}

      {/* Daftar Resep */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reseps.map((resep) => (
          <MealCard
            key={resep.id}
            resep={resep}
            onAddToPlanner={handleAddToPlanner}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;