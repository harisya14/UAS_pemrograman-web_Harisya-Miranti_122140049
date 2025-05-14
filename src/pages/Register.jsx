import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validasi input
    if (formData.password !== formData.confirmPassword) {
      setError('Kata sandi tidak cocok')
      return
    }

    try {
      // Kirim data registrasi ke API (mock sementara)
      // Misalnya, ganti dengan API call saat backend sudah siap
      console.log('Data registrasi:', formData)
      
      // Simulasi berhasil
      navigate('/login') // Setelah sukses, redirect ke halaman login
    } catch (error) {
      setError('Terjadi kesalahan saat mendaftar')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Daftar Akun</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Kata Sandi
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Konfirmasi Kata Sandi
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
              required
            />
          </div>

          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600">
            Daftar
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Sudah punya akun?{' '}
            <a href="/login" className="text-blue-500 hover:text-blue-700">
              Masuk di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
