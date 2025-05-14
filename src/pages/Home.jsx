import React from 'react'
import MealCard from '../components/MealCard'

const dummyResep = [
  {
    id: 1,
    nama_resep: 'Nasi Goreng',
    gambar: '/images/nasi goreng.jpg', // Path relatif ke public/images/
  },
  {
    id: 2,
    nama_resep: 'Mie Goreng',
    gambar: '/images/mie goreng.jpg',  // Path relatif ke public/images/
  },
  {
    id: 3,
    nama_resep: 'Ayam Bakar',
    gambar: '/images/ayam bakar.jpg', // Path relatif ke public/images/
  },
]

const Home = () => {
  const handleAddToPlanner = ({ resepId, hari, waktuMakan }) => {
    console.log('Menambahkan ke planner:', {
      resepId,
      hari,
      waktuMakan,
    })

    // Di tahap selanjutnya, kamu bisa menyimpan ke localStorage atau Context API
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Rekomendasi Menu Mingguan</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyResep.map((resep) => (
          <MealCard
            key={resep.id}
            resep={resep}
            onAddToPlanner={handleAddToPlanner}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
