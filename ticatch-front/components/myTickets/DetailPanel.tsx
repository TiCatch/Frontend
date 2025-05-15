'use client';

import { fetchSVG } from '@utils/fetchSVG';
import { useEffect, useRef, useState } from 'react';
import { MyTicket } from 'types';
import CloseIcon from '@mui/icons-material/Close';

const DetailPanel = ({
  ticket,
  onClose,
  rowIndex,
}: {
  ticket: MyTicket;
  onClose: () => {} | void;
  rowIndex: number;
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [seatSVG, setSeatSVG] = useState<string | null>(null);

  const date = new Date(ticket.ticketingTime);
  const [section, row, col] = ticket.seatInfo
    .split(':')
    .map((el) => el.slice(1));

  const getSeatImage = async (section: string) => {
    const svg = await fetchSVG(
      `https://ticatch-content.s3.ap-southeast-2.amazonaws.com/seat-img/S${section}.svg`,
    );
    setSeatSVG(svg);
  };

  useEffect(() => {
    getSeatImage(section);
  }, [section]);

  useEffect(() => {
    if (!panelRef.current || !seatSVG) return;

    const svgElement = panelRef.current.querySelector('svg');
    if (!svgElement) return;

    const rowGroup = Array.from(svgElement.querySelectorAll('g')).find(
      (g) => g.getAttribute('class') === `R${row}`,
    );
    if (!rowGroup) return;

    const targetRect = Array.from(rowGroup.querySelectorAll('rect')).find(
      (rect) => rect.getAttribute('class') === `C${col}`,
    );
    if (targetRect) {
      targetRect.setAttribute('fill', '#c04cfd');
      targetRect.setAttribute('stroke', '#c04cfd');
    }
  }, [ticket, seatSVG]);

  useEffect(() => {
    if (!panelRef.current) return;
    const positionPanel = () => {
      const gridItems = document.querySelectorAll('.ticket-item');
      if (gridItems.length === 0 || rowIndex < 0) return;
      const rowItems = Array.from(gridItems).filter((item) => {
        if (rowIndex === 0)
          return (
            item.getBoundingClientRect().top ===
            gridItems[0].getBoundingClientRect().top
          );
        let currentRow = 0;
        let lastTop = gridItems[0].getBoundingClientRect().top;
        for (let i = 1; i < gridItems.length; i++) {
          const top = gridItems[i].getBoundingClientRect().top;
          if (Math.abs(top - lastTop) > 5) {
            currentRow++;
            lastTop = top;
          }
          if (currentRow === rowIndex) {
            return Math.abs(item.getBoundingClientRect().top - top) < 5;
          }
        }
        return false;
      });
      if (rowItems.length > 0) {
        const lastInRow = rowItems[rowItems.length - 1];
        const panel = panelRef.current;
        if (panel) {
          panel.style.gridColumn = '1 / -1';
          panel.style.marginTop = '24px';
          panel.style.borderTop = '1px solid #e5e7eb';
          panel.style.padding = '48px 0';
          lastInRow.after(panel);
        }
      }
    };
    setTimeout(positionPanel, 0);
    window.addEventListener('resize', positionPanel);
    return () => window.removeEventListener('resize', positionPanel);
  }, [rowIndex]);

  return (
    <div
      ref={panelRef}
      className="detail-panel relative flex w-full flex-col items-center gap-8 md:flex-row">
      <div className="flex flex-1 flex-col items-center">
        <div
          ref={panelRef}
          className="h-full"
          dangerouslySetInnerHTML={{
            __html: seatSVG || '',
          }}
        />
      </div>
      <div className="min-w-[220px] flex-1">
        <button
          className="absolute right-[16px] top-[8px] z-10 text-gray-400 transition-colors duration-150 hover:text-gray-700"
          onClick={onClose}>
          <CloseIcon />
        </button>
        <h3 className="mb-3 text-lg font-bold">티켓팅 정보</h3>
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="py-1 pr-4 text-gray-500">난이도</td>
              <td>{ticket.ticketingLevel}</td>
            </tr>
            <tr>
              <td className="py-1 pr-4 text-gray-500">티켓팅 시작 시간</td>
              <td>{date.toLocaleString('ko-KR')}</td>
            </tr>

            <tr>
              <td className="py-1 pr-4 text-gray-500">구역</td>
              <td>{section}구역</td>
            </tr>
            <tr>
              <td className="py-1 pr-4 text-gray-500">좌석</td>
              <td>
                {row}열 {col}번
              </td>
            </tr>
            <tr>
              <td className="py-1 pr-4 text-gray-500">점수</td>
              <td>{ticket.ticketingScore}점</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailPanel;
