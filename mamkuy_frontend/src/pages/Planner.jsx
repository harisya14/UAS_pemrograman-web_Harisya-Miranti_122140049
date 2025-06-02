// src/pages/Planner.jsx
import React, { useEffect } from 'react';
import { useMenuMakan } from '../hooks/useMenuMakan';

const Planner = () => {
  const { menus, loading, error, fetchMenus } = useMenuMakan();

  // Fetch menu saat komponen mount
  useEffect(() => {
    fetchMenus();
  }, []);

  // Kelompokkan data berdasarkan hari dan waktu makan
  const groupedMenus = menus.reduce((acc, item) => {
    const { hari, waktu_makan: waktuMakan } = item;
    const resep = item.resep || { nama_resep: 'Resep Tidak Diketahui', id: null };

    if (!acc[hari]) acc[hari] = {};
    if (!acc[hari][waktuMakan]) acc[hari][waktuMakan] = [];
    acc[hari][waktuMakan].push(resep);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Memuat data planner...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Gagal memuat data planner: {error}</p>
      </div>
    );
  }

  if (!menus.length) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Planner Makanan</h1>
        <p className="text-gray-600">Belum ada menu yang ditambahkan ke planner.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Planner Makanan</h1>

      {Object.entries(groupedMenus).map(([hari, jadwal]) => (
        <div key={hari} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{hari}</h2>
          {Object.entries(jadwal).map(([waktuMakan, resepList]) => (
            <div key={waktuMakan} className="ml-4 mb-4">
              <h3 className="text-lg font-medium capitalize">{waktuMakan}</h3>
              <ul className="list-disc ml-6">
                {resepList.map((resep) => (
                  <li key={resep.id} className="mb-2">
                    <span className="font-semibold">{resep.nama_resep}</span> -{' '}
                    {resep.id ? (
                      <a
                        href={`/recipe/${resep.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Lihat Resep
                      </a>
                    ) : (
                      'Resep tidak tersedia'
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Planner;