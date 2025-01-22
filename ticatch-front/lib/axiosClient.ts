import { isTokenExpired } from 'api';
import axios from 'axios';
import Router from 'next/router';

const redirectToLogin = async () => {
  await Router.push('/login');
};

export const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    // 토큰 만료
    if (accessToken && isTokenExpired(accessToken)) {
      redirectToLogin();
      return Promise.reject(new Error('Token 만료'));
    }

    // 토큰 유효
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
