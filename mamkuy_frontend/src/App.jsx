import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Planner from './pages/Planner'
import RecipeDetail from './pages/RecipeDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
