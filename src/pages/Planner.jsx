import React, { useContext } from 'react'
import { PlannerContext } from '../contexts/PlannerContext'
import resepData from '../data/resepData' // asumsi resep disimpan di file ini

const Planner = () => {
  const { planner } = useContext(PlannerContext)

  // Kelompokkan data berdasarkan hari
  const groupedPlanner = planner.reduce((acc, item) => {
    const { hari, waktuMakan, resepId } = item
    const resep = resepData.find((r) => r.id === resepId)
    if (!acc[hari]) acc[hari] = {}
    if (!acc[hari][waktuMakan]) acc[hari][waktuMakan] = []
    acc[hari][waktuMakan].push(resep)
    return acc
  }, {})

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Planner Makanan</h1>
      {Object.keys(groupedPlanner).length === 0 && (
        <p className="text-gray-500">Belum ada menu yang ditambahkan ke planner.</p>
      )}
      {Object.entries(groupedPlanner).map(([hari, jadwal]) => (
        <div key={hari} className="mb-6">
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
      ))}
    </div>
  )
}

export default Planner
