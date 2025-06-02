// src/services/resepService.js

import api from '../api/axios';

const resepService = {
  // --- GET ALL RESEPS ---
  getAllReseps: async () => {
    try {
      console.log('Fetching semua resep...');
      const response = await api.get('/reseps');
      console.log('Berhasil ambil data resep:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching semua resep:', error.message);
      throw error;
    }
  },

  // --- GET SINGLE RESEP BY ID ---
  getResepById: async (id) => {
    try {
      console.log(`Fetching resep dengan ID: ${id}`);
      const response = await api.get(`/reseps/${id}`);
      console.log('Detail resep:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching resep dengan ID ${id}:`, error.message);
      throw error;
    }
  },

  // --- CREATE NEW RESEP ---
  createResep: async (resepData) => {
    try {
      console.log('Membuat resep baru:', resepData);
      const response = await api.post('/reseps', resepData);
      console.log('Resep berhasil dibuat:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error saat membuat resep:', error.message);
      throw error;
    }
  },

  // --- UPDATE RESEP ---
  updateResep: async (id, resepData) => {
    try {
      console.log(`Memperbarui resep ID ${id} dengan data:`, resepData);
      const response = await api.put(`/reseps/${id}`, resepData);
      console.log('Resep berhasil diperbarui:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error saat memperbarui resep ID ${id}:`, error.message);
      throw error;
    }
  },

  // --- DELETE RESEP ---
  deleteResep: async (id) => {
    try {
      console.log(`Menghapus resep dengan ID: ${id}`);
      const response = await api.delete(`/reseps/${id}`);
      console.log('Resep berhasil dihapus:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error saat menghapus resep ID ${id}:`, error.message);
      throw error;
    }
  },
};

export default resepService;