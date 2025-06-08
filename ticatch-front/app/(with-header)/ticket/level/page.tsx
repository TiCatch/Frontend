'use client';

import LevelCard from '@components/ticketInfo/LevelCard';

export default function LevelPage() {
  return (
    <div className="h-without-header md:h-inner-screen md:h-inner-screen min-w-[370px] overflow-hidden p-[24px] md:min-h-[660px]">
      <div className="relative flex h-full flex-col items-center justify-start gap-[24px] overflow-visible md:gap-0">
        <div className="flex items-center text-center text-xl font-medium leading-[100px] md:text-2xl">
          난이도를 선택하세요.
        </div>
        <div className="flex h-full w-full flex-col items-center gap-[24px] pb-[48px] md:flex-row">
          <LevelCard level="EASY" />
          <LevelCard level="NORMAL" />
          <LevelCard level="HARD" />
        </div>
      </div>
    </div>
  );
}
