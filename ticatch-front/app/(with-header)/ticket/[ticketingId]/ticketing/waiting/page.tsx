'use client';

import { getWaitingStatus } from 'api';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import MainAd from '@components/Ad/MainAd';
import { detailContentByLevel } from 'constants/ticketDetail';
import { useTicketingContext } from '../TicketingContext';

const CountLoading = dynamic(() => import('@components/Animation/Count'), {
  ssr: false,
});

const WaitingPage = () => {
  const [waitingNumber, setWaitingNumber] = useState<number | null>(null);
  const [initialWaitingNumber, setInitialWaitingNumber] = useState<
    number | null
  >(null);
  const [isWaiting, setIsWaiting] = useState<boolean>(true);
  const [showNumber, setShowNumber] = useState<number | null>(null); // 사용자에게 보여줄 대기숫자
  const params = useParams<{ ticketingId: string }>();
  const router = useRouter();
  const { level } = useTicketingContext();

  const { title } = detailContentByLevel[level];

  const checkWaitingStatus = async () => {
    try {
      const data = await getWaitingStatus(params.ticketingId);

      if (data.status === 200) {
        setWaitingNumber(data.data.data.waitingNumber); // 상태 업데이트

        // 대기열 통과 (-1)인 경우 새 창을 열고 현재 창 닫기
        if (data.data.data.waitingNumber === -1 && isWaiting) {
          setIsWaiting(false);
          router.push(`/ticket/${params.ticketingId}/ticketing/section`);
        }
      }
    } catch (error) {
      console.log('대기열 상태 확인 실패: ', error);
    }
  };

  // 최초 실행 시 대기열 상태 확인
  useEffect(() => {
    checkWaitingStatus();
  }, []); // 최초 실행 시만 실행

  // 대기열 상태 주기적으로 확인 (1초마다)
  useEffect(() => {
    if (waitingNumber !== null && waitingNumber > 0) {
      if (!initialWaitingNumber) {
        setInitialWaitingNumber(waitingNumber);
      }
      const interval = setInterval(() => {
        checkWaitingStatus();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [waitingNumber, isWaiting]); // waitingNumber가 변경될 때마다 실행

  const progress = initialWaitingNumber
    ? Math.max(
        0,
        ((initialWaitingNumber - waitingNumber!) / initialWaitingNumber) * 100,
      )
    : 0;

  const getShowNumber = (num: number) => {
    const multiplier = 130;
    return Math.floor(Math.random() * multiplier) + num * multiplier;
  };

  useEffect(() => {
    if (waitingNumber !== null && waitingNumber > -1) {
      setShowNumber(getShowNumber(waitingNumber));
      console.log('new number');
    }
  }, [waitingNumber]);

  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-center gap-[20px] whitespace-nowrap px-[96px] py-0 text-center md:px-[140px]">
      <div className="absolute right-1/2 top-0 translate-x-1/2 py-2">
        <MainAd />
      </div>
      <div className="text-s text-gray-500 md:text-m">{title}</div>
      <div className="text-l font-bold leading-[1.5] md:text-xl">
        접속 인원이 많아 대기중입니다. <br />
        잠시 기다려주세요.
      </div>
      <div className="text-4xl font-bold text-purple-500 md:h-[108px] md:text-5xl">
        {waitingNumber ? (
          `${waitingNumber > -1 ? showNumber : '0'}번째`
        ) : (
          <CountLoading />
        )}
      </div>
      <div className="relative mb-[12px] h-[20px] w-full min-w-[296px] max-w-[640px] overflow-hidden rounded-[32px] border-[1px] border-solid border-gray-200 bg-gray-50 md:h-[37px]">
        <div
          className="h-full bg-purple-500 transition-all duration-500"
          style={{ width: `${progress}%` }}></div>
      </div>
      <ul className="list-disc text-left text-xs leading-[1.6] text-gray-500">
        <li>잠시만 기다려주시면 다음 단계로 안전하게 자동 접속합니다. </li>
        <li>새로 고침 하시면 순번이 뒤로 밀리니 주의해주세요. </li>
      </ul>
    </div>
  );
};

export default WaitingPage;
