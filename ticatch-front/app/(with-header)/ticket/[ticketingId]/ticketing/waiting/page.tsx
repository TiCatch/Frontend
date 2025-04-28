'use client';

import { getWaitingStatus } from 'api';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const CountLoading = dynamic(() => import('@components/Animation/Count'), {
  ssr: false,
});

const WaitingPage = () => {
  const [waitingNumber, setWaitingNumber] = useState<number | null>(null);
  const [initialWaitingNumber, setInitialWaitingNumber] = useState<
    number | null
  >(null);
  const [isWaiting, setIsWaiting] = useState<boolean>(true);
  const params = useParams<{ ticketingId: string }>();
  const router = useRouter();

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

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-[20px] px-[140px] text-center">
      <div className="text-m text-gray-500">공연 제목 공연 제목 공연 제목</div>
      <div className="whitespace-pre-line text-xl font-bold leading-[1.5]">
        {`접속 인원이 많아 대기중입니다.\n 잠시 기다려주세요.`}
      </div>
      <div className="h-[108px] text-5xl font-bold text-purple-500">
        {waitingNumber ? (
          `${waitingNumber > -1 ? waitingNumber : '0'}번째`
        ) : (
          <CountLoading />
        )}
      </div>
      <div className="relative mb-[12px] h-[37px] w-full overflow-hidden rounded-[32px] border-[1px] border-solid border-gray-200 bg-gray-50">
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
