// To send token to Authorization as header in every request
import axios from 'axios';

const VITE_BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const API = axios.create({
  baseURL: VITE_BACKEND_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});



async function fetchCurrentUser() {
  try {
    console.log(`${VITE_BACKEND_BASE_URL}/users/me`);
    const res = await API.get(`${VITE_BACKEND_BASE_URL}/users/me`);
    return res.data;
  } catch (err) {
    console.error("Token invalid or expired");
    localStorage.removeItem('token');
    return null;
  }
}

const curr_user = await fetchCurrentUser();

export { curr_user };