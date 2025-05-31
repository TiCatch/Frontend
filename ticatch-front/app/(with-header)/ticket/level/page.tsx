'use client';

import { TicketingLevel } from 'types';
import LevelCard from '@components/ticketInfo/LevelCard';

export default function LevelPage() {
  return (
    <div className="h-[calc(100dvh-64px)] min-w-[370px] overflow-hidden p-[24px] md:h-[calc(100dvh-64px)] md:min-h-[660px]">
      <div className="relative flex h-full flex-col items-center justify-start gap-[24px] overflow-visible md:flex-row">
        <div className="text-center text-xl font-medium md:absolute md:bottom-[85%] md:left-1/2 md:translate-x-[-50%] md:text-2xl">
          난이도를 선택하세요.
        </div>
        <LevelCard level="EASY" />
        <LevelCard level="NORMAL" />
        <LevelCard level="HARD" />
      </div>
    </div>
  );
}
