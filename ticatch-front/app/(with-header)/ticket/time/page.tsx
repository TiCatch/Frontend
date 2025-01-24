'use client';

import { useSearchParams, useRouter, notFound } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import CommonButton from '@components/button/CommonButton';
import { axiosClient } from 'lib';

export default function TimePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const level = searchParams.get('level');
  const levelImages: { [key: string]: string } = {
    EASY: '/images/EasyCard.svg',
    NORMAL: '/images/NormalCard.svg',
    HARD: '/images/HardCard.svg',
  };

  if (!level || !levelImages[level]) {
    notFound();
  }

  const [startTime, setStartTime] = useState<number>(3);

  const handleClose = () => {
    router.push('/ticket/level');
  };

  const handleSubmit = async () => {
    try {
      const currentTime = new Date();
      currentTime.setMinutes(currentTime.getMinutes() + startTime);
      const ticketingTime = currentTime.toISOString();

      const response = await axiosClient.post('/ticket/new', {
        ticketingLevel: level,
        ticketingTime: ticketingTime,
      });

      if (response.status === 200) {
        console.log('티켓팅 생성 완료');
      } else {
        throw new Error('서버 오류');
      }
    } catch (error) {
      console.log('티켓팅 생성 실패');
    }
  };

  return (
    <div className="flex w-full gap-[56px]">
      <div className="mt-[150px] flex flex-col items-center gap-[104px]">
        <span className="text-2xl font-bold">난이도 선택</span>
        <Image src={levelImages[level]} alt={level} width={309} height={392} />
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
            className="text-5xl">
            -
          </button>
          <div className="flex gap-2 text-5xl">
            <span>{startTime}</span>
            <span>분</span>
          </div>
          <button
            onClick={() => setStartTime((prev) => Math.min(5, prev + 1))}
            className="text-5xl">
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
