'use client';

import { loginWithKakao } from 'api';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface AuthPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

const AuthPage = async ({ searchParams }: AuthPageProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      const params = await searchParams;
      const code = params?.code ?? '';
      try {
        await loginWithKakao(code);
        router.push('/');
      } catch (error) {
        console.log('로그인 실패: ', error);
        router.push('/login');
      }
    };
    handleLogin();
  }, [router]);

  // TODO: 로딩 스피너 도입
  return <div>로그인 중</div>;
};

export default AuthPage;
