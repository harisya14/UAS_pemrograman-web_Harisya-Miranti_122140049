// src/api/axios.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:6543'; // sesuaikan dengan backend Anda

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 👈 Pastikan ini ada
});

export default instance;