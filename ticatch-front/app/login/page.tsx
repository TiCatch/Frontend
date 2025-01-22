'use client';

import { useEffect } from 'react';
import { isTokenExpired } from 'api';

const LoginPage = () => {
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string;
  const KAKAO_REDIRECT_URI = process.env
    .NEXT_PUBLIC_KAKAO_REDIRECT_URI as string;

  const KAKAO_AUTH_URL = `http://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && isTokenExpired(accessToken)) {
      console.warn('만료된 토큰 발견. localStorage 정리 중...');
      localStorage.removeItem('accessToken');
    }
  }, []);

  return (
    <div>
      <a href={KAKAO_AUTH_URL}>로그인 버튼</a>
    </div>
  );
};

export default LoginPage;
