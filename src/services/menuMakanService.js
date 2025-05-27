// src/services/menuMakanService.js
import api from '../api/axios';

const menuMakanService = {
  getAllMenuMakans: async () => {
    try {
      const response = await api.get('/menus'); // Sesuai route_name 'get_all_menu_makans'
      return response.data;
    } catch (error) {
      console.error('Error fetching menu makans:', error);
      throw error;
    }
  },

  getMenuMakanById: async (id) => {
    try {
      const response = await api.get(`/menus/${id}`); // Sesuai route_name 'get_menu_makan_by_id'
      return response.data;
    } catch (error) {
      console.error(`Error fetching menu makan with ID ${id}:`, error);
      throw error;
    }
  },

  getMenuMakansByUserId: async (userId) => {
    try {
      const response = await api.get(`/menus/user/${userId}`); // Sesuai route_name 'get_menu_makans_by_user'
      return response.data;
    } catch (error) {
      console.error(`Error fetching menu makans for user ID ${userId}:`, error);
      throw error;
    }
  },

  createMenuMakan: async (menuMakanData) => {
    try {
      const response = await api.post('/menus', menuMakanData); // Sesuai route_name 'create_menu_makan'
      return response.data;
    } catch (error) {
      console.error('Error creating menu makan:', error);
      throw error;
    }
  },

  updateMenuMakan: async (id, menuMakanData) => {
    try {
      const response = await api.put(`/menus/${id}`, menuMakanData); // Sesuai route_name 'update_menu_makan'
      return response.data;
    } catch (error) {
      console.error(`Error updating menu makan with ID ${id}:`, error);
      throw error;
    }
  },

  deleteMenuMakan: async (id) => {
    try {
      const response = await api.delete(`/menus/${id}`); // Sesuai route_name 'delete_menu_makan'
      return response.data;
    } catch (error) {
      console.error(`Error deleting menu makan with ID ${id}:`, error);
      throw error;
    }
  },
};

export default menuMakanService;