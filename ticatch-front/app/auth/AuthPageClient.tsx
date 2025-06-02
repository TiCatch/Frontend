'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginWithKakao } from '@hooks';
import Loading from '@app/loading';

interface AuthPageClientProps {
  code: string;
}

const AuthPageClient = ({ code }: AuthPageClientProps) => {
  const router = useRouter();
  const { mutate: loginWithKakao } = useLoginWithKakao();

  useEffect(() => {
    loginWithKakao(code, {
      onSuccess: () => {
        router.push('/');
      },
      onError: (error) => {
        console.log('로그인 실패: ', error);
        router.push('/login');
      },
    });
  }, [code, loginWithKakao, router]);

  return <Loading />;
};

export default AuthPageClient;
