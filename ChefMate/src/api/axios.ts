import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Load from environment
  withCredentials: true // If you're using cookies/session-based auth
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;