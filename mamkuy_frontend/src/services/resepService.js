// src/services/resepService.js
import api from '../api/axios';

const resepService = {
  getAllReseps: async () => {
    try {
      const response = await api.get('/reseps'); // Sesuai route_name 'get_all_reseps'
      return response.data;
    } catch (error) {
      console.error('Error fetching reseps:', error);
      throw error;
    }
  },

  getResepById: async (id) => {
    try {
      const response = await api.get(`/reseps/${id}`); // Sesuai route_name 'get_resep_by_id'
      return response.data;
    } catch (error) {
      console.error(`Error fetching resep with ID ${id}:`, error);
      throw error;
    }
  },

  createResep: async (resepData) => {
    try {
      const response = await api.post('/reseps', resepData); // Sesuai route_name 'create_resep'
      return response.data;
    } catch (error) {
      console.error('Error creating resep:', error);
      throw error;
    }
  },

  updateResep: async (id, resepData) => {
    try {
      const response = await api.put(`/reseps/${id}`, resepData); // Sesuai route_name 'update_resep'
      return response.data;
    } catch (error) {
      console.error(`Error updating resep with ID ${id}:`, error);
      throw error;
    }
  },

  deleteResep: async (id) => {
    try {
      const response = await api.delete(`/reseps/${id}`); // Sesuai route_name 'delete_resep'
      return response.data;
    } catch (error) {
      console.error(`Error deleting resep with ID ${id}:`, error);
      throw error;
    }
  },
};

export default resepService;