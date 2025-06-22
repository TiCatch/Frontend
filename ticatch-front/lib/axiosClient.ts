import { logoutUser, refreshAccessToken } from 'api';
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

    if (!originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          failedRequests.push(() => resolve(axiosClient(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();

        if (!newAccessToken) throw new Error('No access token returned');

        localStorage.setItem('accessToken', newAccessToken);
        axiosClient.defaults.headers.common['Authorization'] =
          `Bearer ${newAccessToken}`;

        failedRequests.forEach((cb) => cb());
        failedRequests = [];

        return axiosClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        await logoutUser();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        failedRequests = [];
      }
    }

    return Promise.reject(error);
  },
);
