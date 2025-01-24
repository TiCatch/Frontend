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
    // 임시 엑세스토큰
    // const accessToken =
    //   'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJib2F6NDFAbmF2ZXIuY29tIiwiYXV0aCI6IlVTRVIiLCJleHAiOjE3Mzc3MDc4OTR9.K1iWRehuFVXPuDzOq-DIsflIujEGwVg1tYUCSa7VRTONDVsdXVAOf70U7GcRHtUPFicuI10QpnyOCJWiLCfa1Q';
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
