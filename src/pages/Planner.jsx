import React, { useEffect, useState } from 'react';
import useAuth from '../services/authService';
import menuMakanService from '../services/menuMakanService';

const Planner = () => {
  const { getCurrentUserId } = useAuth();
  const [planner, setPlanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlannerData = async () => {
      const userId = getCurrentUserId();

      if (!userId) {
        setError('Silakan login dulu.');
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching planner untuk user ID: ${userId}`);
        const data = await menuMakanService.getMenuMakansByUserId(userId);

        console.log('Data planner:', data); // 🔍 Debugging
        setPlanner(data || []);
      } catch (err) {
        console.error('Gagal ambil data planner:', err);
        setError('Gagal memuat data planner.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlannerData();
  }, [getCurrentUserId]);

  // Kelompokkan data berdasarkan hari
  const groupedPlanner = planner.reduce((acc, item) => {
    const { hari, waktu_makan: waktuMakan, resep } = item;

    // Validasi apakah semua field tersedia
    if (!hari || !waktuMakan || !resep) {
      console.warn("Data tidak lengkap:", item);
      return acc;
    }

    if (!acc[hari]) acc[hari] = {};
    if (!acc[hari][waktuMakan]) acc[hari][waktuMakan] = [];

    acc[hari][waktuMakan].push(resep);
    return acc;
  }, {});

  if (loading) {
    return <div className="text-center mt-8">Memuat planner...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Planner Makanan</h1>

      {Object.keys(groupedPlanner).length === 0 ? (
        <p className="text-gray-500">Belum ada menu yang ditambahkan ke planner.</p>
      ) : (
        Object.entries(groupedPlanner).map(([hari, jadwal]) => (
          <div key={hari} className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">{hari}</h2>

            {Object.entries(jadwal).map(([waktuMakan, resepList]) => (
              <div key={waktuMakan} className="ml-4 mb-4">
                <h3 className="text-lg font-medium capitalize">{waktuMakan}</h3>
                <ul className="list-disc ml-6">
                  {resepList.map((resep) => (
                    <li key={resep.id} className="mb-2">
                      <span className="font-semibold">{resep.nama_resep}</span> -{' '}
                      <a
                        href={`/recipe/${resep.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Lihat Resep
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Planner;