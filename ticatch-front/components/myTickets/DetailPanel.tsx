'use client';

import { fetchSVG } from '@utils/fetchSVG';
import { useEffect, useRef, useState } from 'react';
import { MyTicket, TicketingLevel } from 'types';
import CloseIcon from '@mui/icons-material/Close';
import selectTotalSVG from '@utils/selectTotalSVG';

const DetailPanel = ({
  ticket,
  onClose,
}: {
  ticket: MyTicket;
  onClose: () => {} | void;
}) => {
  const svgContainerRef = useRef<HTMLDivElement | null>(null);

  const [seatSVG, setSeatSVG] = useState<string | null>(null);
  const [totalSeatSVG, setTotalSeatSVG] = useState<string | null>(null);

  const date = new Date(ticket.ticketingTime);
  const [section, row, col] = ticket.seatInfo
    .split(':')
    .map((el) => el.slice(1));

  const getSeatImage = async (section: string) => {
    const [seatSvgData, totalSvgData] = await Promise.all([
      fetchSVG(
        `https://ticatch-content.s3.ap-southeast-2.amazonaws.com/seat-img/S${section}.svg`,
      ),
      fetchSVG(
        'https://ticatch-content.s3.ap-southeast-2.amazonaws.com/seat-img/TOTAL.svg',
      ),
    ]);
    setSeatSVG(seatSvgData);
    setTotalSeatSVG(totalSvgData);
  };

  useEffect(() => {
    getSeatImage(section);
  }, [section]);

  useEffect(() => {
    if (!svgContainerRef.current || !seatSVG) return;

    const rects = svgContainerRef.current.querySelectorAll('rect');

    rects.forEach((rect) => {
      const row = rect.closest('g')?.getAttribute('class');
      const col = rect.getAttribute('class');
      const seatInfo = `S${section}:${row}:${col}`;

      if (seatInfo === ticket.seatInfo) {
        rect.setAttribute('fill', '#D587FE');
      } else {
        rect.setAttribute('fill', '#D5D5D5');
        rect.setAttribute('stroke', '#D5D5D5');
        rect.setAttribute('pointer-events', 'none');
      }
    });
  }, [seatSVG]);

  const getBackgroundColor = (level: TicketingLevel) => {
    switch (level) {
      case 'EASY':
        return 'bg-sub-4';
      case 'NORMAL':
        return 'bg-sub-3';
      case 'HARD':
        return 'bg-purple-500';
      default:
        return 'bg-gray-300';
    }
  };

  const ticketInformation = {
    난이도: ticket.ticketingLevel,
    시간:
      date.toLocaleDateString('ko-KR') + ' ' + date.toLocaleTimeString('ko-KR'),
    구역: `${section}구역`,
    행: `${row}행`,
    번: `${col}열`,
    점수: `${ticket.ticketingScore}점`,
  };

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-blackTip-0.6">
      <div className="mx-3 max-h-[90dvh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-lg bg-white shadow-xl">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-4">
          <h2 className="pl-2 text-xl font-bold text-gray-800">티켓 정보</h2>
          <button
            className="cursor-pointer whitespace-nowrap text-gray-500 hover:text-gray-700"
            onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 좌석 이미지 */}
            <div className="relative">
              <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-gray-50 p-4">
                <h3 className="mb-3 w-full pl-2 text-left text-l font-medium text-gray-700">
                  좌석 정보
                </h3>
                <div className="flex flex-col gap-6">
                  {totalSeatSVG && (
                    <div
                      className="h-full"
                      dangerouslySetInnerHTML={{
                        __html: selectTotalSVG(totalSeatSVG, section) || '',
                      }}
                    />
                  )}
                  <div
                    ref={svgContainerRef}
                    className="h-full"
                    dangerouslySetInnerHTML={{
                      __html: seatSVG || '',
                    }}
                  />
                </div>
                <div className="mt-4 text-center text-s text-gray-600">
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <div className="h-3 w-3 rounded-sm bg-purple-500"></div>
                    <span>선택한 좌석</span>
                  </div>
                  <p className="font-bold text-gray-700">
                    {section}구역 {row}열 {col}번
                  </p>
                </div>
              </div>
            </div>

            {/* 티켓 정보 */}
            <div className="mb-4">
              <div
                className={`my-4 inline-block rounded-full px-3 py-1 text-s font-medium ${getBackgroundColor(ticket.ticketingLevel)} text-abs-white`}>
                {ticket.ticketingLevel}
              </div>
              <div className="space-y-5 pl-2">
                {Object.entries(ticketInformation).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">{label}</span>
                    <span className="font-medium text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
              {/* todo: 결과 공유 버튼 만들기 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
