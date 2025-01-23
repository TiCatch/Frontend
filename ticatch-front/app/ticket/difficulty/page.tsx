'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DifficultyPage() {
  const router = useRouter();

  const handleSelect = (difficulty: string) => {
    router.push(`/ticket/time?difficulty=${difficulty}`);
  };

  return (
    <div className="flex flex-col items-center gap-[104px]">
      <span className="text-2xl font-bold">난이도 선택</span>

      <div className="flex gap-[56px]">
        <button
          onClick={() => handleSelect('Easy')}
          className="transition-transform hover:scale-105">
          <Image src="/images/EasyCard.svg" alt="Easy" />
        </button>

        <button
          onClick={() => handleSelect('Normal')}
          className="transition-transform hover:scale-105">
          <Image src="/images/NormalCard.svg" alt="Normal" />
        </button>

        <button
          onClick={() => handleSelect('Hard')}
          className="transition-transform hover:scale-105">
          <Image src="/images/HardCard.svg" alt="Hard" />
        </button>
      </div>
    </div>
  );
}
