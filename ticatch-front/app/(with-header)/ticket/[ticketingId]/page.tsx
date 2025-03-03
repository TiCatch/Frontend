'use client';

import { getTicket, updateTicket } from 'api';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { TicketingResponse } from 'types';
import CommonButton from '@components/button/CommonButton';
import { getRemainingTime } from '@utils/getRemainingTime';
import CommonModal from '@components/Modal/CommonModal';

export default function TicketDetailPage() {
  const params = useParams<{ ticketingId: string }>();
  const router = useRouter();
  const [ticket, setTicket] = useState<TicketingResponse['data'] | null>(null);
  const [remainingTime, setRemainingTime] = useState<string>('0:00');
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      getTicket(Number(params.ticketingId)).then(
        ({ status, data, messages }) => {
          if (status === 200 && data) {
            if (data.ticketingStatus === 'CANCELED') {
              router.push('/');
            } else {
              setTicket(data);
            }
          } else {
            console.error(messages);
          }
        },
      );
    }
  }, [params.ticketingId]);

  //티켓팅 취소
  const handleCancelTicket = () => {
    if (params.ticketingId) {
      updateTicket(Number(params.ticketingId)).then(({ status, messages }) => {
        if (status === 200) {
          router.push('/');
        } else {
          console.error(messages);
        }
      });
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  // 시간 update
  useEffect(() => {
    const targetTime = new Date(ticket?.ticketingTime + 'Z').getTime();
    setRemainingTime(getRemainingTime(targetTime));

    const interval = setInterval(() => {
      const updatedTime = getRemainingTime(targetTime);
      setRemainingTime(updatedTime);

      if (updatedTime === '0:00') {
        clearInterval(interval);
        // 가상 요청 시작!
        triggerVirtualUsers();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket]);

  const level = ticket?.ticketingLevel ?? 'EASY';
  const { backgroundColor, levelText } = levelAttribute[level];

  if (!ticket) {
    return null;
  }

  const triggerVirtualUsers = async () => {
    try {
      const res = await fetch(
        `/api/ticket/waiting/${params.ticketingId}/VIRTUAL`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ level }),
        },
      );
    } catch (error) {
      console.log('가상 요청 시작 에러: ', error);
    }
  };

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

            <ul className="mt-4 flex flex-wrap gap-y-4">
              <li className="w-1/2">공연 기간: 2024.12.22 - 2024.12.31</li>
              <li className="w-1/2">공연장: 예술의전당 오페라극장</li>
              <li className="w-1/2">관람 시간: 180분</li>
              <li className="w-1/2">관람 등급: 8세 이상</li>
              <li className="w-1/2">장르: 공연</li>
              <li className="w-1/2">할인 혜택: 없음</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <CommonButton
            title="취소하기"
            backgroundColor="bg-white"
            textColor="text-gray-500"
            borderColor="border-gray-300"
            onClick={() => setIsModalOpen(true)}
          />
          <CommonButton
            title={isTicketingOpen ? '예매하기' : remainingTime}
            backgroundColor={isTicketingOpen ? backgroundColor : 'bg-gray-300'}
            textColor={isTicketingOpen ? 'text-white' : 'text-gray-500'}
            isDisabled={!isTicketingOpen}
            onClick={() => {
              if (isTicketingOpen) {
                window.open(
                  `/ticket/${params.ticketingId}/ticketing/section`,
                  '_blank',
                  'width=950,height=650,top=50,left=50,noopener,noreferrer',
                );
              }
            }}
          />
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="mt-6 rounded-md border">
        <div className="px-2 py-4">상세 정보</div>
        <div className="h-screen w-full bg-gray-300"></div>
      </div>
      {isModalOpen && (
        <CommonModal
          onClose={handleClose}
          onConfirm={handleCancelTicket}
          title="예약하신 티켓팅을 취소하시겠습니까?"
          subtitle="취소한 티켓팅은 되돌릴 수 없습니다."
          confirmButtonText="취소하기"
          cancelButtonText="닫기"
        />
      )}
    </div>
  );
}
