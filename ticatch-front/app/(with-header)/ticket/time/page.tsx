'use client';

import { useSearchParams, useRouter, notFound } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import CommonButton from '@components/button/CommonButton';
import { axiosClient } from 'lib';
import { levelImage } from '@constants/imagePath';
import { Level } from 'types';
import { createTicket } from 'api';

export default function TimePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const level = searchParams.get('level') as Level;

  if (!level) {
    notFound();
  }

  const [startTime, setStartTime] = useState<number>(3);

  const handleClose = () => {
    router.push('/ticket/level');
  };

  const handleSubmit = async () => {
    try {
      await createTicket(level, startTime);
    } catch (error) {
      console.error('티켓팅 생성 중 문제가 발생했습니다.', error);
    }
  };

  return (
    <div className="flex w-full gap-[56px]">
      <div className="mt-[150px] flex flex-col items-center gap-[104px]">
        <span className="text-2xl font-bold">난이도 선택</span>
        <Image src={levelImage[level]} alt={level} width={309} height={392} />
      </div>
      <div
        className="mt-[50px] flex-grow bg-gray-50"
        style={{ height: 'calc(100vh - 114px)' }}>
        <button className="pl-[16px] pt-[16px]" onClick={handleClose}>
          <Image
            src="/icons/CloseIcon.svg"
            alt="close"
            width={24}
            height={24}
          />
        </button>
        <p className="pt-[60px] text-center text-2xl font-bold">
          시작 시간 선택
        </p>
        <div className="flex w-full items-center justify-between px-[113px] pt-[200px]">
          <button
            onClick={() => setStartTime((prev) => Math.max(1, prev - 1))}
            className={`text-5xl ${startTime === 1 && 'cursor-not-allowed opacity-50'}`}
            disabled={startTime === 1}>
            -
          </button>
          <div className="flex gap-2 text-5xl">
            <span className="text-sub-4">{startTime}</span>
            <span>분</span>
          </div>
          <button
            onClick={() => setStartTime((prev) => Math.min(5, prev + 1))}
            className={`text-5xl ${startTime === 5 && 'cursor-not-allowed opacity-50'}`}
            disabled={startTime === 5}>
            +
          </button>
        </div>
        <div className="flex justify-end pr-[113px] pt-[180px]">
          <CommonButton
            title="예약하기"
            onClick={handleSubmit}
            backgroundColor="bg-sub-4"
          />
        </div>
      </div>
    </div>
  );
}
