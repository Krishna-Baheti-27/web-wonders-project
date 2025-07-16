import axios from 'axios';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const API = axios.create({
  baseURL: VITE_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;