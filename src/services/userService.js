// src/services/userService.js
import api from '../api/axios'; // Import instance Axios yang sudah dikonfigurasi

const userService = {
  // Fungsi untuk mendapatkan semua user
  getAllUsers: async () => {
    try {
      const response = await api.get('/users'); // Sesuai route_name 'get_all_users' di backend
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Fungsi untuk mendapatkan user berdasarkan ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`); // Sesuai route_name 'get_user_by_id'
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  },

  // Fungsi untuk membuat user baru (pendaftaran)
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData); // Sesuai route_name 'create_user'
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Fungsi untuk memperbarui user
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData); // Sesuai route_name 'update_user'
      return response.data;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  },

  // Fungsi untuk menghapus user
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`); // Sesuai route_name 'delete_user'
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  },

  // Fungsi untuk login (jika Anda memiliki endpoint login terpisah di backend)
  // Contoh jika backend memiliki /auth/login yang mengembalikan token
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials); // Contoh endpoint autentikasi
      // Jika login sukses, Anda mungkin ingin menyimpan token/userId di sini
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
};

export default userService;