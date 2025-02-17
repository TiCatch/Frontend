import axios from 'axios';

export const authClient = axios.create({
  baseURL: '/api/proxy',
  withCredentials: true,
});

authClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});
