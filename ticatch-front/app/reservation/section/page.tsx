'use client';
import { useEffect, useState } from 'react';
import { fetchSVG } from '@utils/fetchSVG';

export default function SectionPage() {
  const [totalSVG, setTotalSVG] = useState<string | null>(null);

  useEffect(() => {
    const loadSvg = async () => {
      const svg = await fetchSVG(
        'https://ticatch-content.s3.ap-southeast-2.amazonaws.com/seat-img/TOTAL.svg',
      );
      setTotalSVG(svg);
    };

    loadSvg();
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="text-lg font-bold">좌석선택</div>
      <div className="flex min-h-0 flex-grow gap-4">
        {/* 왼쪽 구역 */}
        <div className="-center flex w-2/3 flex-col justify-center rounded bg-gray-50 p-8 shadow-md">
          <div
            className="h-full"
            dangerouslySetInnerHTML={{ __html: totalSVG || '' }}
          />
        </div>

        {/* 오른쪽 구역 */}
        <div className="flex w-1/3 flex-col gap-4 rounded bg-gray-50 p-4 shadow-md">
          <div className="flex justify-center text-gray-600">
            좌석선택 이후 5분이내 결제가 완료되지 않을 시 선택하신 좌석의 선점
            기회를 잃게 됩니다.
          </div>

          <div className="mt-auto w-full">
            <button className="mt-4 w-full rounded-12 bg-primary py-4 text-lg text-white">
              좌석 선택 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
