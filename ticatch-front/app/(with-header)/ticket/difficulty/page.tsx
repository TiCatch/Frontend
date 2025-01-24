'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DifficultyPage() {
  const router = useRouter();

  const handleSelect = (difficulty: string) => {
    router.push(`/ticket/time?difficulty=${difficulty}`);
  };

  return (
    <div className="mt-[150px] flex flex-col items-center gap-[104px]">
      <span className="text-2xl font-bold">난이도 선택</span>

      <div className="flex w-full justify-between">
        <button
          onClick={() => handleSelect('EASY')}
          className="transition-transform hover:scale-105">
          <Image
            src="/images/EasyCard.svg"
            alt="EASY"
            width={309}
            height={392}
          />
        </button>

        <button
          onClick={() => handleSelect('NORMAL')}
          className="transition-transform hover:scale-105">
          <Image
            src="/images/NormalCard.svg"
            alt="NORMAL"
            width={309}
            height={392}
          />
        </button>

        <button
          onClick={() => handleSelect('HARD')}
          className="transition-transform hover:scale-105">
          <Image
            src="/images/HardCard.svg"
            alt="HARD"
            width={309}
            height={392}
          />
        </button>
      </div>
    </div>
  );
}
