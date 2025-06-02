import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MealCard = ({ resep, onAddToPlanner }) => {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [hari, setHari] = useState('')
  const [waktuMakan, setWaktuMakan] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (hari && waktuMakan) {
      onAddToPlanner({ resepId: resep.id, hari, waktuMakan })
      setShowForm(false)
      setHari('')
      setWaktuMakan('')
    }
  }

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
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Lihat Resep
        </button>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {showForm ? 'Batal' : 'Tambah ke Planner'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-3 rounded shadow">
          <div className="mb-2">
            <label className="block text-sm font-medium">Hari:</label>
            <input
              type="text"
              value={hari}
              onChange={(e) => setHari(e.target.value)}
              placeholder="Contoh: Senin"
              className="w-full px-2 py-1 rounded border border-gray-300"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Waktu Makan:</label>
            <select
              value={waktuMakan}
              onChange={(e) => setWaktuMakan(e.target.value)}
              className="w-full px-2 py-1 rounded border border-gray-300"
              required
            >
              <option value="">Pilih waktu</option>
              <option value="Sarapan">Sarapan</option>
              <option value="Makan Siang">Makan Siang</option>
              <option value="Makan Malam">Makan Malam</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-green-600 text-white py-1 rounded hover:bg-green-700"
          >
            Simpan ke Planner
          </button>
        </form>
      )}
    </div>
  )
}

export default MealCard
