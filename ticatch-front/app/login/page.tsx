'use client';

import { useEffect } from 'react';
import { isTokenExpired } from 'api';
import Link from 'next/link';
import Image from 'next/image';

import { logoImage } from '@constants/imagePath';
import { kakaoImage } from '@constants/imagePath';

const LoginPage = () => {
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string;
  const KAKAO_REDIRECT_URI = process.env
    .NEXT_PUBLIC_KAKAO_REDIRECT_URI as string;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && isTokenExpired(accessToken)) {
      localStorage.removeItem('accessToken');
    }
  }, []);

  return (
    <div className="flex h-screen w-full select-none flex-col items-center justify-center gap-[8%]">
      <div className="flex items-end gap-[4px] text-2xl text-gray-500">
        {/* TiCath 로고. 클릭 시 메인으로 이동 */}
        <Link href="/" className="relative mr-[4px] h-[36px] w-[191px]">
          <Image src={logoImage} alt="TiCatch" fill className="object-cover" />
        </Link>
        를 사용하기 위해 로그인하세요
        <div className="mb-[4px] h-[8px] w-[8px] animate-blink rounded-full" />
      </div>
      <div className="text-center text-xs text-gray-300">
        카카오 계정으로 간편 로그인/회원가입
        {/* 카카오 로그인 버튼 */}
        <a
          href={KAKAO_AUTH_URL}
          className="relative mt-[16px] flex h-[80px] w-[480px] items-center rounded-[16px] bg-[#fee500] px-[32px] py-[28px] shadow-simple">
          {/* 카카오 로고 */}
          <Image
            src={kakaoImage}
            alt="kakao icon"
            width={36}
            height={34}
            className="flex-none"
          />
          <div className="flex-1 text-center text-xl text-black">
            카카오로 1초만에 로그인/회원가입
          </div>
          <div className="absolute left-0 top-0 h-[80px] w-[480px] rounded-[16px] bg-blackTip-0.04 opacity-0 transition-opacity duration-200 hover:opacity-100"></div>
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
