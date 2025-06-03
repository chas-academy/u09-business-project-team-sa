import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api/', // or use ENV
//   withCredentials: false // true if you use sessions/cookies
// });

// export default api;