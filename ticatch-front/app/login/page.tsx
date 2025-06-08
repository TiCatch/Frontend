'use client';

import { useEffect } from 'react';
import { isTokenExpired, logoutUser } from 'api';
import Link from 'next/link';
import Image from 'next/image';
import { logoImage, kakaoImage } from '@constants/imagePath';

const LoginPage = () => {
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string;
  const KAKAO_REDIRECT_URI = process.env
    .NEXT_PUBLIC_KAKAO_REDIRECT_URI as string;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && isTokenExpired(accessToken)) {
      logoutUser();
    }
  }, []);

  return (
    <div className="flex h-dvh w-full select-none flex-col items-center justify-center gap-[3%] whitespace-nowrap p-[24px]">
      <div className="flex flex-col items-center gap-[4px] pb-[24px]">
        <Link
          href="/"
          className="relative mb-[32px] aspect-square w-[191px] overflow-hidden">
          <Image
            src={logoImage}
            alt="TiCatch"
            fill
            className="object-cover object-left"
          />
        </Link>
        <div className="text-center text-xl/10 font-medium text-gray-700">
          당신의 티켓팅 실력을 보여주세요.
        </div>
      </div>
      <div className="text-center text-xs text-gray-300">
        카카오 계정으로 간편 로그인/회원가입
        {/* 카카오 로그인 버튼 */}
        <a
          href={KAKAO_AUTH_URL}
          className="relative mt-[16px] flex h-[70px] w-[372px] min-w-[300px] max-w-[calc(100dvw-32px)] items-center rounded-[16px] bg-[#fee500] px-[40px] py-[28px] shadow-simple">
          {/* 카카오 로고 */}
          <Image
            src={kakaoImage}
            alt="kakao icon"
            width={36}
            height={34}
            className="flex-none"
          />
          <div className="ml-[12px] flex-1 text-center text-l text-black">
            카카오로 계속하기
          </div>
          <div className="absolute left-0 top-0 h-[70px] w-[372px] min-w-[300px] max-w-[calc(100dvw-32px)] rounded-[16px] bg-blackTip-0.04 opacity-0 transition-opacity duration-200 hover:opacity-100"></div>
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
