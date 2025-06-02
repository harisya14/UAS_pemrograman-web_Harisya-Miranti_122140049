// src/pages/RecipeDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import resepService from '../services/resepService';

const RecipeDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await resepService.getResepById(id);
        setRecipe(data);
      } catch (err) {
        console.error('Gagal mengambil detail resep:', err);
        setError('Gagal memuat detail resep.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Memuat detail resep...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (!recipe) {
    return <div className="text-center mt-8">Resep tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{recipe.nama_resep}</h2>

      {/* Gambar resep */}
      <img
        src={recipe.gambar}
        alt={recipe.nama_resep}
        className="w-full h-64 object-cover rounded mb-4"
      />

      {/* Kategori */}
      <p className="mb-2">
        <strong>Kategori:</strong> {recipe.kategori || 'Tidak ada kategori'}
      </p>

      {/* Bahan-bahan */}
      <div className="mb-4">
        <h3 className="font-semibold">Bahan-bahan:</h3>
        <ul className="list-disc list-inside pl-4">
          {Array.isArray(recipe.bahan)
            ? recipe.bahan.map((bahan, index) => <li key={index}>{bahan}</li>)
            : <li>{recipe.bahan}</li>
          }
        </ul>
      </div>

      {/* Langkah Memasak */}
      <div>
        <h3 className="font-semibold">Langkah Memasak:</h3>
        <ol className="list-decimal list-inside pl-4">
          {Array.isArray(recipe.langkah_pembuatan)
            ? recipe.langkah_pembuatan.map((langkah, index) => <li key={index}>{langkah}</li>)
            : <li>{recipe.langkah_pembuatan}</li>
          }
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;