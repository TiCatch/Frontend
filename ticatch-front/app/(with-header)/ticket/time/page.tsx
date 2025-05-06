'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import Image from 'next/image';
import CommonButton from '@components/button/CommonButton';
import { levelImage } from '@constants/imagePath';
import { TicketingLevel } from 'types';
import { useActiveTicket, useUserStatus } from '@hooks';
import queryClient from 'providers/queryClient';

function TimeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { isLoggedIn, isLoading: isUserLoading } = useUserStatus();
  const { createTicket } = useActiveTicket(isLoggedIn && !isUserLoading);

  const level = searchParams.get('level') as TicketingLevel;
  const levelAttribute = {
    EASY: {
      backgroundColor: 'bg-sub-4',
      textColor: 'text-sub-4',
    },
    NORMAL: {
      backgroundColor: 'bg-sub-3',
      textColor: 'text-sub-3',
    },
    HARD: {
      backgroundColor: 'bg-primary',
      textColor: 'text-primary',
    },
  };

  const { backgroundColor, textColor } = levelAttribute[level];

  if (!level) {
    router.push('/ticket/level');
    return null;
  }

  const [startTime, setStartTime] = useState<number>(3);

  const handleClose = () => {
    router.push('/ticket/level');
  };

  // 티켓팅 생성
  const handleSubmit = async () => {
    try {
      const ticketData = await createTicket({
        level,
        startTime,
      });
      const ticketingId = ticketData.data.ticketingId;

      router.push(`/ticket/${ticketingId}`);
    } catch (error) {
      console.error('티켓팅 생성 중 문제가 발생했습니다.', error);
    }
  };

  return (
    <div className="flex w-full gap-[56px]">
      <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-[104px]">
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
        <p className="pt-[70px] text-center text-2xl font-bold">
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
            <span className={textColor}>{startTime}</span>
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
            backgroundColor={backgroundColor}
          />
        </div>
      </div>
    </div>
  );
}

export default function TimePage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <TimeContent />
    </Suspense>
  );
}
