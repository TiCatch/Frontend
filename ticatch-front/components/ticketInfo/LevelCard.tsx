'use client';

import { TicketingLevel } from 'types';
import Image from 'next/image';
import { levelImage } from '@constants/imagePath';
import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useRouter } from 'next/navigation';

import { useActiveTicket, useAuthStatus } from '@hooks';
import CommonButton from '@components/button/CommonButton';
import { useMediaQuery } from 'hooks/useMediaQuery';

export default function LevelCard({ level }: { level: TicketingLevel }) {
  const { data: isLoggedIn, isLoading: isUserLoading } = useAuthStatus();
  const { activeTicket, createTicket } = useActiveTicket(
    isLoggedIn && !isUserLoading,
  );
  const isMobile = useMediaQuery('(max-width: 640px)', false);

  const bgClassMap: Record<TicketingLevel, string> = {
    EASY: 'bg-sub-4-50',
    NORMAL: 'bg-sub-3-50',
    HARD: 'bg-purple-200',
  };

  const textClassMap: Record<TicketingLevel, string> = {
    EASY: 'text-sub-4-100',
    NORMAL: 'text-sub-2',
    HARD: 'text-sub-6',
  };
  const router = useRouter();

  const [startTime, setStartTime] = useState<number>(30);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    if (activeTicket || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const ticketData = await createTicket({
        level,
        startTime,
      });
      const ticketingId = ticketData.data.ticketingId;

      router.push(`/ticket/${ticketingId}`);
    } catch (error) {
      console.error('티켓팅 생성 중 문제가 발생했습니다.', error);
    } finally {
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  };

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

  const { backgroundColor } = levelAttribute[level];

  return (
    <div className="group h-full w-full min-w-[170px] max-w-[500px] [perspective:1000px] md:h-[392px]">
      <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(-180deg)]">
        {/* 앞면 */}
        <div
          className={`absolute inset-0 rounded-3xl p-[24px] shadow-simple ${bgClassMap[level]} [backface-visibility:hidden]`}>
          <div className="absolute left-0 top-0 z-0 h-full w-full rounded-3xl opacity-50 shadow-glass backdrop-blur-glass" />
          <div className="z-3 relative flex h-full grow flex-row items-center justify-around md:flex-col md:gap-[0.1vw]">
            <div className="relative aspect-square h-[100%] md:w-[70%]">
              <Image
                src={levelImage[level]}
                alt="EASY"
                layout="fill"
                objectFit="contain"
                className="block"
                style={{
                  filter:
                    'drop-shadow(0px 23.4667px 46.9333px rgba(51,49,28,0.25))',
                }}
              />
            </div>
            <div
              className={`min-w-[159px] text-center text-[3rem] font-bold ${textClassMap[level]} md:min-w-[265px] md:text-3xl [@media(max-width:340px)]:hidden [@media(max-width:460px)]:min-w-[100px] [@media(max-width:460px)]:text-xl`}>
              {level}
            </div>
          </div>
        </div>

        {/* 뒷면 */}
        <div
          className={`absolute inset-0 rounded-3xl ${bgClassMap[level]} p-[24px] shadow-simple [backface-visibility:hidden] [transform:rotateY(180deg)]`}>
          <div className="absolute left-0 top-0 z-0 h-full w-full rounded-3xl bg-abs-white opacity-50 shadow-glass backdrop-blur-glass" />
          <div className="z-3 relative flex h-full flex-col items-center justify-start md:justify-center md:gap-4">
            <div
              className={`flex flex-1 items-center whitespace-nowrap md:mt-[32px] md:mt-[8px] ${isMobile ? 'text-m' : 'text-l'} font-semibold text-abs-black`}>
              시간을 선택하세요.
            </div>
            <div className="flex h-full w-full flex-[3] flex-row items-center justify-around md:flex-col md:justify-center">
              <div
                className={`${textClassMap[level]} mt-1/2 flex gap-6 text-2xl font-bold md:text-4xl`}>
                <button
                  onClick={() =>
                    setStartTime((prev) => Math.max(10, prev - 10))
                  }
                  className={`${startTime === 10 && 'cursor-none opacity-50'}`}
                  disabled={startTime === 10}>
                  <RemoveIcon />
                </button>
                {startTime}s
                <button
                  onClick={() =>
                    setStartTime((prev) => Math.min(50, prev + 10))
                  }
                  className={`${startTime === 50 && 'cursor-none opacity-50'}`}
                  disabled={startTime === 50}>
                  <AddIcon />
                </button>
              </div>
              <div className="md:mb-[16px] md:mt-auto">
                <CommonButton
                  title={isMobile ? '예약' : '예약하기'}
                  onClick={handleSubmit}
                  backgroundColor={backgroundColor}
                  type={isMobile ? 'small' : undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
