'use client';
import { levelImage } from '@constants/imagePath';
import Image from 'next/image';
import { TicketingLevel } from 'types';

const LevelCount = ({
  cnt,
  total,
  level,
  levelKo,
  color,
  onClick,
  isActive,
}: {
  cnt: string;
  total: number;
  level: TicketingLevel;
  levelKo: string;
  color: string;
  onClick?: () => void;
  isActive?: boolean;
}) => {
  return (
    <div
      className={`rounded-lg border-l-4 border-${color} transform cursor-pointer bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${isActive ? '-translate-y-1 shadow-md' : 'shadow-sm'}`}
      onClick={onClick}>
      <div className="itemscente mb-4 flex justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-700">{level}</h3>
          <p className="text-s text-gray-500">{levelKo} 난이도</p>
        </div>
        <div
          className={`bg-${color} relative flex h-12 w-12 items-center justify-center rounded-full`}>
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
      </div>
      <div className="flex items-end">
        <span className="text-3xl font-bold text-gray-700">
          {cnt ? cnt : 0}
        </span>
        <span className="mb-3 ml-2 text-gray-500">tickets</span>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
        <div
          className={`bg-${color} h-2 rounded-full`}
          style={
            total ? { width: `${(Number(cnt) / total) * 100}%` } : { width: 0 }
          }></div>
      </div>
      <p className="mt-2 text-s text-gray-600">
        전체 티켓의 {total ? Math.round((Number(cnt) / total) * 100) : 0}%
      </p>
    </div>
  );
};

export default LevelCount;
