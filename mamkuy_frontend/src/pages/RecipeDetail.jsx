// src/pages/RecipeDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useResep } from '../hooks/useResep';

const RecipeDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const { getResepById, error, loading } = useResep();

  const [recipe, setRecipe] = React.useState(null);

  React.useEffect(() => {
    const fetchRecipe = async () => {
      const data = await getResepById(id);
      setRecipe(data);
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Memuat resep...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Gagal memuat resep: {error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Resep tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{recipe.nama_resep}</h2>

      {recipe.gambar && (
        <img
          src={recipe.gambar}
          alt={recipe.nama_resep}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <p className="mb-2">
        <strong>Kategori:</strong> {recipe.kategori || 'Tidak ada kategori'}
      </p>

      <div className="mb-4">
        <h3 className="font-semibold">Bahan-bahan:</h3>
        <ul className="list-disc list-inside">
          {Array.isArray(recipe.bahan)
            ? recipe.bahan.map((bahan, index) => <li key={index}>{bahan}</li>)
            : <li>{recipe.bahan}</li>}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Langkah Memasak:</h3>
        <ol className="list-decimal list-inside">
          {Array.isArray(recipe.langkah_memasak)
            ? recipe.langkah_memasak.map((langkah, index) => <li key={index}>{langkah}</li>)
            : <li>{recipe.langkah_memasak}</li>}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;