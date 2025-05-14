import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-600 to-yellow-400 text-white mt-8">
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
        
        {/* Kolom 1 */}
        <div>
          <h2 className="text-lg font-bold mb-2">Mam Kuy</h2>
          <p className="text-white">
            Website to-eat list planner untuk bantu kamu atur menu makan mingguan secara mudah dan praktis.
          </p>
        </div>

        {/* Kolom 2 */}
        <div>
          <h3 className="font-semibold mb-2">Kontak</h3>
          <p>Email: <a href="mailto:support@mamkuy.com" className="hover:underline text-white">support@mamkuy.com</a></p>
          <p>Instagram: <a href="https://instagram.com/mamkuy" className="hover:underline text-white">@mamkuy</a></p>
        </div>
      </div>

      <div className="bg-red-700 text-center py-4 text-xs text-white">
        © {new Date().getFullYear()} Mam Kuy. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
