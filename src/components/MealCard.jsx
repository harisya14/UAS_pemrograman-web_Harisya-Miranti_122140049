import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import menuMakanService from '../services/menuMakanService';

const MealCard = ({ resep, onAddToPlanner }) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [hari, setHari] = useState('');
  const [waktuMakan, setWaktuMakan] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getUserId = () => {
    const idStr = localStorage.getItem('user_id');
    return idStr ? parseInt(idStr, 10) : null;
  };

  const handleSubmit = async (e) => {
    // Pastikan hanya satu kali submit
    if (isSubmitting) return;

    e.preventDefault();

    if (!hari.trim()) {
      setError('Harap masukkan hari');
      return;
    }

    if (!waktuMakan.trim()) {
      setError('Harap pilih waktu makan');
      return;
    }

    const userId = getUserId();
    if (!userId) {
      setError('Anda harus login dulu.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const menuMakanData = {
        resep_id: resep.id,
        hari,
        waktu_makan: waktuMakan,
        user_id: userId,
        gambar: resep.gambar || `http://localhost:6543/static/images/${resep.id}.jpg`,
      };

      console.log("Payload dikirim:", menuMakanData); // 🔍 Debugging

      const result = await menuMakanService.createMenuMakan(menuMakanData);

      // Update UI via callback (opsional)
      if (typeof onAddToPlanner === 'function') {
        onAddToPlanner(result);
      }

      setShowForm(false);
      setHari('');
      setWaktuMakan('');
    } catch (err) {
      console.error('Gagal menyimpan ke planner:', err);
      setError(`Gagal menyimpan menu: ${err.response?.data?.error || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative">
      <img
        src={resep.gambar}
        alt={resep.nama_resep}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{resep.nama_resep}</h2>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => navigate(`/recipe/${resep.id}`)}
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
        >
          Lihat Resep
        </button>
        <button
          onClick={() => {
            setShowForm(!showForm);
            // Bersihkan error saat showForm berubah
            if (!showForm) {
              setError('');
              setHari('');
              setWaktuMakan('');
            }
          }}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            showForm ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {showForm ? 'Batal' : 'Tambah ke Planner'}
        </button>
      </div>

      {/* Tampilkan Error */}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

      {/* Form Input */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-3 rounded shadow">
          <div className="mb-3">
            <label className="block text-sm font-medium">Hari</label>
            <input
              type="text"
              value={hari}
              onChange={(e) => setHari(e.target.value)}
              placeholder="Contoh: Senin"
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Waktu Makan</label>
            <select
              value={waktuMakan}
              onChange={(e) => setWaktuMakan(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            >
              <option value="">Pilih waktu</option>
              <option value="sarapan">Sarapan</option>
              <option value="makan siang">Makan Siang</option>
              <option value="makan malam">Makan Malam</option>
            </select>
          </div>

          {/* Pesan error */}
          {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-1 rounded text-white ${
              isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            } transition-colors`}
          >
            {isSubmitting ? 'Memproses...' : 'Simpan ke Planner'}
          </button>
        </form>
      )}
    </div>
  );
};

export default MealCard;