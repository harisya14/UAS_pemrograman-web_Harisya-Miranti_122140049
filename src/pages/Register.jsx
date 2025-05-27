import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService'; // Import service untuk komunikasi dengan backend

const Register = () => {
  const [formData, setFormData] = useState({
    username: '', // Sesuaikan dengan field 'username' di backend UserSchema Anda
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null); // Untuk menampilkan pesan error
  const [message, setMessage] = useState(''); // Untuk menampilkan pesan sukses
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error sebelumnya
    setMessage(''); // Reset pesan sukses sebelumnya

    // Validasi input frontend: Pastikan password cocok
    if (formData.password !== formData.confirmPassword) {
      setError('Kata sandi tidak cocok');
      return;
    }

    try {
      // Data yang akan dikirim ke backend, harus sesuai dengan UserSchema di Pyramid Anda
      const userDataToSend = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      // Panggil API backend untuk membuat user baru
      // Respons dari Axios (yang kita dapatkan dari console.log) menunjukkan
      // bahwa data yang diparse sudah berada langsung di objek 'response',
      // bukan di 'response.data'.
      const response = await userService.createUser(userDataToSend);

      // --- BAGIAN KRUSIAL UNTUK MENYIMPAN KE LOCAL STORAGE ---
      // Log respons dari backend untuk debugging di konsol browser
      // Ini akan mencetak objek data JSON langsung
      console.log('API Response (raw - langsung dari service):', response); 
      // console.log('Response data (ini akan undefined sekarang):', response.data); // Tidak perlu ini lagi

      // Akses ID langsung dari objek 'response', bukan 'response.data'
      // Pastikan objek 'response' ada dan memiliki properti 'id'
      if (response && response.id) { 
        const userId = response.id; // <-- Ambil ID langsung dari 'response'
        localStorage.setItem('userId', userId); // <-- INI CARA MENYIMPAN userId ke localStorage
        
        // Log untuk verifikasi di konsol browser
        console.log('User berhasil didaftarkan, userId disimpan di localStorage:', localStorage.getItem('userId'));
        setMessage('Pendaftaran berhasil! Anda akan diarahkan ke halaman login.');
        
        // Arahkan user ke halaman login setelah pendaftaran berhasil dan userId tersimpan
        navigate('/login'); 
      } else {
        // Jika backend berhasil (status 2xx) tapi tidak mengembalikan ID
        setError('Pendaftaran berhasil, tetapi ID user tidak diterima dari server.');
        // Log objek 'response' langsung untuk melihat mengapa 'id' tidak ada
        console.error('Pendaftaran berhasil, tetapi ID user tidak diterima:', response);
      }

    } catch (err) {
      // Tangani error dari API (misalnya, status 400 Bad Request, 409 Conflict, atau 500 Internal Server Error)
      console.error('Terjadi kesalahan saat mendaftar (catch block):', err.response?.data || err.message || err);
      // Tampilkan pesan error spesifik dari backend jika ada, atau pesan umum
      setError(err.response?.data?.error || 'Terjadi kesalahan saat mendaftar.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Daftar Akun</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {message && <div className="text-green-500 mb-4">{message}</div>}

        <form onSubmit={handleSubmit}>
          {/* Input untuk Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username" // Pastikan nama ini cocok dengan field di formData
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
              required
            />
          </div>

          {/* Input untuk Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email" // Pastikan nama ini cocok dengan field di formData
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
              required
            />
          </div>

          {/* Input untuk Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Kata Sandi
            </label>
            <input
              type="password"
              id="password"
              name="password" // Pastikan nama ini cocok dengan field di formData
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
              required
            />
          </div>

          {/* Input untuk Konfirmasi Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Konfirmasi Kata Sandi
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword" // Pastikan nama ini cocok dengan field di formData
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
  );
};

export default Register;