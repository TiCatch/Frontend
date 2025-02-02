'use client';

import { getTicket } from 'api';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { TicketingResponse } from 'types';
import CommonButton from '@components/button/CommonButton';

export default function TicketDetailPage() {
  const params = useParams<{ ticketingId: string }>();
  const [ticket, setTicket] = useState<TicketingResponse['data'] | null>(null);
  const [remainingTime, setRemainingTime] = useState<string>('0:00');
  const isTicketingOpen = remainingTime === '0:00';

  const levelAttribute = {
    EASY: {
      backgroundColor: 'bg-sub-4',
      levelText: '하',
    },
    NORMAL: {
      backgroundColor: 'bg-sub-3',
      levelText: '중',
    },
    HARD: {
      backgroundColor: 'bg-primary',
      levelText: '상',
    },
  };

  // 티켓팅 정보 GET
  useEffect(() => {
    if (params.ticketingId) {
      getTicket(Number(params.ticketingId))
        .then(setTicket)
        .catch(console.error);
    }
  }, [params.ticketingId]);

  // 남은시간 계산 함수
  const calculateRemainingTime = (targetTime: number) => {
    const now = Date.now();
    const timeDiffMs = Math.max(0, targetTime - now);

    if (timeDiffMs === 0) return '0:00';

    const minutes = Math.floor(timeDiffMs / 1000 / 60);
    const seconds = Math.floor((timeDiffMs / 1000) % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // 시간 update
  useEffect(() => {
    const targetTime = new Date(ticket?.ticketingTime + 'Z').getTime();
    setRemainingTime(calculateRemainingTime(targetTime));

    const interval = setInterval(() => {
      const updatedTime = calculateRemainingTime(targetTime);
      setRemainingTime(updatedTime);

      if (updatedTime === '0:00') {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket]);

  const level = ticket?.ticketingLevel ?? 'EASY';
  const { backgroundColor, levelText } = levelAttribute[level];

  if (!ticket) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col gap-6 rounded-md border p-6">
        <div className="flex gap-6">
          {/* 이미지 */}
          <div className="w-[180px] rounded-md bg-gray-300"></div>

          {/* 공연 정보 */}
          <div className="w-full">
            <h2 className="text-xl">공연 제목</h2>
            <span className={`${backgroundColor} text-white`}>
              난이도 {levelText}
            </span>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <p>
                <span>공연 기간:</span> 2024.12.22 - 2024.12.31
              </p>
              <p>
                <span>공연장:</span> 예술의전당 오페라극장
              </p>
              <p>
                <span>관람 시간:</span> 180분
              </p>
              <p>
                <span>관람 등급:</span> 8세 이상
              </p>
              <p>
                <span>장르:</span> 공연
              </p>
              <p>
                <span>할인 혜택:</span> 없음
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <CommonButton
            title="취소하기"
            backgroundColor="bg-white"
            textColor="text-gray-500"
            borderColor="border-gray-300"
            onClick={() => console.log('티켓팅 삭제 API연결')}
          />
          <CommonButton
            title={isTicketingOpen ? '예매하기' : remainingTime}
            backgroundColor={isTicketingOpen ? backgroundColor : 'bg-gray-300'}
            textColor={isTicketingOpen ? 'text-white' : 'text-gray-500'}
            isDisabled={!isTicketingOpen}
            onClick={() => {
              console.log('예매하기 API연결');
            }}
          />
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="mt-6 rounded-md border">
        <div className="px-2 py-4">상세 정보</div>
        <div className="h-screen w-full bg-gray-300"></div>
      </div>
    </div>
  );
}
