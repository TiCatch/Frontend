'use client';

import { enterWaiting, getTicket } from 'api';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { TicketingResponse } from 'types';
import CommonButton from '@components/button/CommonButton';
import { getRemainingTime } from '@utils/getRemainingTime';
import CommonModal from '@components/Modal/CommonModal';
import { useActiveTicket, useUserStatus } from '@hooks';
import ReserveTabContent from '@components/ticketInfo/ReserveTab';
import GuideTabContent from '@components/ticketInfo/GuideTab';
import { levelAttribute, tabs, performanceInfo } from 'constants/ticketingInfo';

export default function TicketDetailPage() {
  const params = useParams<{ ticketingId: string }>();
  const router = useRouter();
  const ticketingId = Number(params.ticketingId);

  const { isLoggedIn, isLoading: isUserLoading } = useUserStatus();
  const { updateTicket, successTicket } = useActiveTicket(
    isLoggedIn && !isUserLoading,
  );

  const [ticket, setTicket] = useState<TicketingResponse['data'] | null>(null);
  const [remainingTime, setRemainingTime] = useState<string>('0:00');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTicketingOpen = remainingTime === '0:00';
  const [activeTab, setActiveTab] = useState<string>('info');

  useEffect(() => {
    const handleStorageChange = async (event: StorageEvent) => {
      if (event.key === 'paymentSuccess' && event.newValue === 'true') {
        const seatInfo = localStorage.getItem('seatInfo') as string;
        await successTicket({ ticketingId, seatInfo });
        router.push('/ticket/complete');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router]);

  // 티켓팅 정보 GET
  useEffect(() => {
    if (!ticketingId) return;

    getTicket(ticketingId).then(({ status, data, messages }) => {
      if (status === 200 && data) {
        if (data.ticketingStatus !== 'CANCELED') {
          setTicket(data);
        }
      } else {
        console.error(messages);
      }
    });
  }, [ticketingId]);

  //티켓팅 취소
  const handleCancelTicket = () => {
    if (ticketingId) {
      updateTicket(ticketingId).then(({ status, messages }) => {
        if (status === 200) {
          router.push('/');
          handleClose();
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

      // 가상 요청 시작! (중복 방지)
      if (updatedTime === '0:01') {
        setTimeout(() => {
          triggerVirtualUsers();
        }, 1000);
      } else if (updatedTime === '0:00') {
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

  const triggerVirtualUsers = async () => {
    try {
      await fetch(`/api/ticket/waiting/${params.ticketingId}/VIRTUAL`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level }),
      });
    } catch (error) {
      console.log('가상 요청 시작 에러: ', error);
    }
  };

  const enterTicketing = async () => {
    try {
      const { status, data } = await enterWaiting(params.ticketingId);
      if (status === 200) {
        const waitingNumber = data.data.waitingNumber as number;
        window.open(
          `/ticket/${params.ticketingId}/ticketing/${waitingNumber > 0 ? 'waiting' : 'section'}`,
          '_blank',
          'width=950,height=650,top=50,left=50,noopener,noreferrer',
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8 py-6">
      <div className="rounded-xl border bg-white p-6 shadow-md">
        <div className="flex gap-8">
          <div className="h-[380px] w-[280px] rounded-lg bg-gray-300" />
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">공연제목 공연제목 공연제목</h2>
              <span
                className={`${backgroundColor} rounded px-1 py-[2px] text-sm text-white`}>
                난이도 {levelText}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-2">
              {performanceInfo.map(({ key, value }, idx) => (
                <div key={idx} className="flex flex-col gap-2 border-b pb-2">
                  <p className="text-gray-500">{key}</p>
                  <p>{value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <CommonButton
                title="취소하기"
                backgroundColor="bg-white"
                textColor="black"
                onClick={() => setIsModalOpen(true)}
                borderColor="black"
              />
              <CommonButton
                title={isTicketingOpen ? '예매하기' : remainingTime}
                backgroundColor={
                  isTicketingOpen ? backgroundColor : 'bg-gray-300'
                }
                textColor={isTicketingOpen ? 'text-white' : 'text-gray-500'}
                isDisabled={!isTicketingOpen}
                onClick={enterTicketing}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border shadow-lg">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 ${
                activeTab === tab.key
                  ? 'border-b-2 border-primary font-bold text-primary'
                  : ''
              }`}
              onClick={() => setActiveTab(tab.key)}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4">
          {activeTab === 'info' && <div className="h-screen bg-gray-300"></div>}
          {activeTab === 'guide' && <GuideTabContent />}
          {activeTab === 'reserve' && <ReserveTabContent />}
        </div>
      </div>

      {isModalOpen && (
        <CommonModal
          onClose={() => setIsModalOpen(false)}
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
