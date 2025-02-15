import { refreshAccessToken } from 'api';
import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

let isRefreshing = false;
let failedRequests: (() => void)[] = [];

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 500 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<void>((resolve) => {
          failedRequests.push(() => resolve(axiosClient(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        localStorage.setItem('accessToken', newAccessToken);
        axiosClient.defaults.headers.common['Authorization'] =
          `Bearer ${newAccessToken}`;

        failedRequests.forEach((cb) => cb());
        failedRequests = [];

        return axiosClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
