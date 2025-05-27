import React, { useState, useEffect } from 'react';
import MealCard from '../components/MealCard';
import resepService from '../services/resepService'; // Import service untuk resep
import menuMakanService from '../services/menuMakanService'; // Import service untuk menu makan

const Home = () => {
  const [reseps, setReseps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addMessage, setAddMessage] = useState(''); // Untuk pesan sukses/gagal tambah planner

  // useEffect untuk mengambil data resep dari backend saat komponen dimuat
  useEffect(() => {
    const fetchReseps = async () => {
      try {
        const data = await resepService.getAllReseps(); // Panggil API untuk mendapatkan semua resep
        setReseps(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching reseps:", err);
      }
    };

    fetchReseps();
  }, []); // Array kosong berarti efek ini hanya berjalan sekali (saat mount)

  // Fungsi untuk menangani penambahan resep ke planner
  const handleAddToPlanner = async ({ resepId, hari, waktuMakan }) => {
    // Anda perlu mendapatkan user_id di sini.
    // Misalnya, dari Local Storage setelah user login.
    // Asumsi: userId disimpan di localStorage setelah login.
    const userId = localStorage.getItem('userId'); // [cite: 30]

    if (!userId) {
      alert('Anda harus login untuk menambahkan ke planner!');
      return;
    }

    const menuMakanData = {
      resep_id: resepId,
      hari,
      waktu_makan: waktuMakan,
      user_id: parseInt(userId), // Pastikan user_id adalah integer
      // kategori: 'makanan_utama', // Anda harus memberikan nilai untuk kategori
      // Jika kategori adalah input dari form, tambahkan state dan input di MealCard atau Home
      // Untuk sementara, kita bisa pakai default atau menambahkan input form.
      // Berdasarkan presentasi, Menu Makan memiliki kategori.
      kategori: 'Makanan Utama', // Default kategori, sesuaikan jika ada input di UI
      gambar: `http://localhost:6543/static/images/${resepId}.jpg`, // Contoh: path gambar dari backend
      // Anda mungkin ingin mengambil gambar dari objek resep yang sebenarnya:
      // gambar: reseps.find(r => r.id === resepId)?.gambar || null,
    };

    try {
      const newMenuMakan = await menuMakanService.createMenuMakan(menuMakanData); // Panggil API backend
      setAddMessage(`Resep berhasil ditambahkan ke planner pada ${hari} ${waktuMakan}!`);
      console.log('Menu makan berhasil ditambahkan:', newMenuMakan);
      // Di sini Anda mungkin ingin refresh daftar menu makan di halaman Planner
      // atau memberikan feedback visual lainnya.
    } catch (err) {
      console.error('Gagal menambahkan ke planner:', err);
      setAddMessage(`Gagal menambahkan ke planner: ${err.response?.data?.error || err.message}`);
    } finally {
      // Hapus pesan setelah beberapa detik
      setTimeout(() => setAddMessage(''), 3000);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Memuat resep...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">Error: {error.message}</div>;
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
          <p>Belum ada resep yang tersedia. Silakan tambahkan resep di backend Anda.</p>
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