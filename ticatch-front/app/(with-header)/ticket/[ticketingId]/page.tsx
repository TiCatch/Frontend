'use client';

import { enterWaiting, getTicket } from 'api';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { TicketingLevel, TicketingResponse } from 'types';
import CommonButton from '@components/button/CommonButton';
import { getRemainingTime } from '@utils/getRemainingTime';
import CommonModal from '@components/Modal/CommonModal';
import { useActiveTicket, useUserStatus } from '@hooks';
import ReserveTabContent from '@components/ticketInfo/ReserveTab';
import GuideTabContent from '@components/ticketInfo/GuideTab';
import InfoTabContent from '@components/ticketInfo/InfoTab';
import { levelAttribute, tabs } from 'constants/ticketingInfo';
import { detailContentByLevel } from '@constants/ticketDetail';
import { concertImage } from '@constants/imagePath';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TimerIcon from '@mui/icons-material/Timer';

export default function TicketDetailPage() {
  const params = useParams<{ ticketingId: string }>();
  const router = useRouter();
  const ticketingId = Number(params.ticketingId);

  const { isLoggedIn, isLoading: isUserLoading } = useUserStatus();
  const { updateTicket, successTicket } = useActiveTicket(
    isLoggedIn && !isUserLoading,
  );

  const ticketWindowRef = useRef<Window | null>(null);
  const [ticket, setTicket] = useState<TicketingResponse['data'] | null>(null);
  const [remainingTime, setRemainingTime] = useState<string>('0:00');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTicketingOpen = remainingTime === '0:00';
  const [activeTab, setActiveTab] = useState<string>('info');

  const ticketDetails = [
    {
      title: '공연 기간',
      text: '2024.12.22 - 2024.12.31',
      icon: <CalendarTodayIcon />,
    },
    {
      title: '공연 시간',
      text: '180분',
      icon: <AccessTimeIcon />,
    },
    {
      title: '공연 장소',
      text: '180분',
      icon: <LocationOnIcon />,
    },
    {
      title: '연령 제한',
      text: '만 7세 이상',
      icon: <GroupsIcon />,
    },
    {
      title: '장르',
      text: '콘서트',
      icon: <MusicNoteIcon />,
    },
    {
      title: '할인 정보',
      text: '없음',
      icon: <LocalOfferIcon />,
    },
  ];

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
          triggerVirtualUsers(0, params.ticketingId, level);
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

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const triggerVirtualUsers = async (
    batchIndex: number = 0,
    ticketingId: string,
    level: TicketingLevel,
    userType: string = 'VIRTUAL',
  ) => {
    try {
      const res = await fetch(
        `/api/ticket/waiting/${ticketingId}/${userType}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ level, batchIndex }),
        },
      );

      const data = await res.json();

      if (data.done) {
        console.log('모든 배치 완료 또는 442 에러로 중단');
        return;
      }

      console.log(`다음 배치로 이동: ${data.nextBatch}`);
      await delay(1000);

      await triggerVirtualUsers(
        data.nextBatch,
        data.ticketingId,
        data.level,
        data.userType,
      );
    } catch (error) {
      console.log('가상 요청 시작 에러: ', error);
    }
  };

  const enterTicketing = async () => {
    try {
      const { status, data } = await enterWaiting(params.ticketingId);
      if (status === 200) {
        const waitingNumber = data.data.waitingNumber as number;
        if (ticketWindowRef.current && !ticketWindowRef.current.closed) {
          ticketWindowRef.current.close();
        }
        ticketWindowRef.current = window.open(
          `/ticket/${params.ticketingId}/ticketing/${waitingNumber > 0 ? 'waiting' : 'section'}`,
          'ticketing-page',
          'width=950,height=650,top=50,left=50',
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const content = detailContentByLevel[level];

  return (
    <div>
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="mb-6 md:mb-0 md:w-1/3 md:pr-6">
            <div className="relative overflow-hidden rounded-md pb-[140%] shadow-md">
              <img
                src={concertImage[level]}
                alt="콘서트 이미지"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          </div>
          <div className="flex flex-col md:w-2/3">
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-3">
                <h1 className="break-keep text-2xl font-bold">
                  {content.title}
                </h1>
                <span
                  className={`${backgroundColor} h-[31px] min-w-[85px] break-keep rounded-full px-3 py-1 text-justify text-xs font-medium text-white`}>
                  난이도 {levelText}
                </span>
              </div>
              <p className="text-s text-gray-600">{content.description}</p>
            </div>
            <div className="mb-8 rounded-xl bg-gray-50 p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {ticketDetails.map((detail, index) => {
                  return (
                    <div
                      className="flex items-start items-center gap-4"
                      key={index}>
                      <i className="w-8 text-purple-700">{detail.icon}</i>
                      <div className="text-gray-500">
                        <div className="text-xs">{detail.title}</div>
                        <div className="text-s text-black">{detail.text}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-auto flex flex-col justify-end gap-5 md:flex-row">
              <CommonButton
                title="취소하기"
                backgroundColor="bg-white"
                textColor="text-gray-500"
                borderColor="border-gray-300"
                onClick={() => setIsModalOpen(true)}
                icon={<HighlightOffIcon />}
              />
              <CommonButton
                title={isTicketingOpen ? '예매하기' : remainingTime}
                backgroundColor={
                  isTicketingOpen ? backgroundColor : 'bg-gray-300'
                }
                textColor={isTicketingOpen ? 'text-white' : 'text-gray-500'}
                isDisabled={!isTicketingOpen}
                icon={
                  isTicketingOpen ? <ConfirmationNumberIcon /> : <TimerIcon />
                }
                onClick={() => {
                  if (isTicketingOpen) {
                    enterTicketing();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-6 rounded-lg bg-white shadow-md">
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

        <div className="p-6">
          {activeTab === 'info' && <InfoTabContent level={level} />}
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
