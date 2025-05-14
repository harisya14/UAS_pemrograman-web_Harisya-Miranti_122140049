import React, { createContext, useState, useEffect } from 'react'

export const PlannerContext = createContext()

export const PlannerProvider = ({ children }) => {
  const [planner, setPlanner] = useState([])

  // Ambil data planner dari localStorage saat pertama kali load
  useEffect(() => {
    const storedPlanner = localStorage.getItem('planner')
    if (storedPlanner) {
      setPlanner(JSON.parse(storedPlanner))
    }
  }, [])

  // Simpan ke localStorage setiap kali planner berubah
  useEffect(() => {
    localStorage.setItem('planner', JSON.stringify(planner))
  }, [planner])

  const addToPlanner = ({ resepId, hari, waktuMakan }) => {
    const newEntry = { resepId, hari, waktuMakan }
    setPlanner((prev) => [...prev, newEntry])
  }

  return (
    <PlannerContext.Provider value={{ planner, addToPlanner }}>
      {children}
    </PlannerContext.Provider>
  )
}
