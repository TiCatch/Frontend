'use client';

import LevelCard from '@components/ticketInfo/LevelCard';

export default function LevelPage() {
  return (
    <div className="h-without-header-ad min-w-[370px] overflow-hidden p-[16px] md:h-inner-screen md:min-h-[660px] md:p-[24px]">
      <div className="relative flex h-full flex-col items-center justify-start gap-[24px] overflow-visible md:gap-0">
        <div className="flex items-center text-center text-xl font-medium md:text-2xl md:leading-[100px]">
          난이도를 선택하세요.
        </div>
        <div className="flex h-full w-full flex-col items-center gap-[24px] md:flex-row md:pb-[48px]">
          <LevelCard level="EASY" />
          <LevelCard level="NORMAL" />
          <LevelCard level="HARD" />
        </div>
      </div>
    </div>
  );
}
