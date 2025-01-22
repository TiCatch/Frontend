'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithKakao } from 'api';

interface AuthPageClientProps {
  code: string;
}

const AuthPageClient = ({ code }: AuthPageClientProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      try {
        await loginWithKakao(code);
        router.push('/');
      } catch (error) {
        console.log('로그인 실패: ', error);
        router.push('/login');
      }
    };
    handleLogin();
  }, [code, router]);

  return <div>로그인 중...</div>;
};

export default AuthPageClient;
