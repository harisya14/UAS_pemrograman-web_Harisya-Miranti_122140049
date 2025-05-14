import React from 'react'
import { useParams } from 'react-router-dom'

// Contoh data resep sementara (mock data)
const mockRecipes = [
  {
    id: 1,
    nama_resep: 'Nasi Goreng',
    kategori: 'Makanan Utama',
    bahan: ['Nasi', 'Telur', 'Kecap', 'Bawang Merah', 'Bawang Putih'],
    langkah_memasak: [
      'Panaskan minyak di wajan.',
      'Tumis bawang merah dan bawang putih.',
      'Masukkan telur, aduk hingga matang.',
      'Tambahkan nasi dan kecap, aduk rata.',
    ],
    gambar: '/images/nasi goreng.jpg',
  },
  {
    id: 2,
    nama_resep: 'Mie Goreng',
    kategori: 'Makanan Utama',
    bahan: ['Mie', 'Kecap', 'Bawang Putih', 'Ketumbar'],
    langkah_memasak: [
      'Rebus mie.',
      'Angkat dan tiriskan mie.',
      'Tumis bawang merah dan bawang putih.',
      'Masukkan mie kedalam tumisan bumbu.',
      'Tambahkan kecap, aduk hingga rata',
    ],
    gambar: '/images/mie goreng.jpg',
  },
  {
    id: 3,
    nama_resep: 'Ayam Bakar',
    kategori: 'Makanan Utama',
    bahan: ['Ayam', 'Bumbu Kecap', 'Bawang Putih', 'Ketumbar'],
    langkah_memasak: [
      'Lumuri ayam dengan bumbu.',
      'Diamkan selama 30 menit.',
      'Bakar ayam di atas bara api atau teflon.',
    ],
    gambar: '/images/ayam bakar.jpg',
  },
]

const RecipeDetail = () => {
  const { id } = useParams()
  const recipe = mockRecipes.find((item) => item.id === parseInt(id))

  if (!recipe) {
    return <p>Resep tidak ditemukan.</p>
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{recipe.nama_resep}</h2>
      <img
        src={recipe.gambar}
        alt={recipe.nama_resep}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="mb-2">
        <strong>Kategori:</strong> {recipe.kategori}
      </p>
      <div className="mb-4">
        <h3 className="font-semibold">Bahan-bahan:</h3>
        <ul className="list-disc list-inside">
          {recipe.bahan.map((bahan, index) => (
            <li key={index}>{bahan}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold">Langkah Memasak:</h3>
        <ol className="list-decimal list-inside">
          {recipe.langkah_memasak.map((langkah, index) => (
            <li key={index}>{langkah}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default RecipeDetail
