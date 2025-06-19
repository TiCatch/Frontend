import { ArrowBackIos } from '@mui/icons-material';
import { fetchSVG } from '@utils/fetchSVG';
import { getSectionSeats, getUnreservedSeats } from 'api';
import { useCallback, useEffect, useRef, useState } from 'react';

const SectionSeats = ({
  setSelectedSection,
  section,
  setSelectedSeat,
  selectedSeat,
  ticketingId,
}: {
  setSelectedSection: (value: string | null) => void;
  section: string;
  setSelectedSeat: (value: string | null) => void;
  selectedSeat: string | null;
  ticketingId: string;
}) => {
  const svgContainerRef = useRef<HTMLDivElement | null>(null);
  const [seatSVG, setSeatSVG] = useState<string | null>(null);
  const [disabledSeats, setDisabledSeats] = useState<Set<string>>(new Set());
  const [isPageLoading, setIsPageLoading] = useState(true);

  const handleSeatClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as SVGElement;
    if (target.tagName !== 'rect') return;

    const rect = target as SVGRectElement;
    const row = rect.closest('g')?.getAttribute('class');
    const col = rect.getAttribute('class');
    const seatInfo = `S${section}:${row}:${col}`;

    setSelectedSeat(selectedSeat === seatInfo ? null : seatInfo);
  };

  const initializePage = useCallback(async () => {
    setIsPageLoading(true);
    try {
      const [seatData, seatRaw, unreserved] = await Promise.all([
        getSectionSeats(ticketingId, section),
        fetchSVG(
          `https://ticatch-content.s3.ap-southeast-2.amazonaws.com/seat-img/S${section}.svg`,
        ),
        getUnreservedSeats(ticketingId),
      ]);

      const reserved = new Set(
        Object.entries(seatData)
          .filter(([, reserved]) => reserved === true)
          .map(([key]) => key),
      );

      setDisabledSeats(reserved);
      setSeatSVG(seatRaw);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPageLoading(false);
    }
  }, [ticketingId, section]);

  useEffect(() => {
    initializePage();
  }, [initializePage]);

  useEffect(() => {
    if (!svgContainerRef.current || !seatSVG) return;

    const rects = svgContainerRef.current.querySelectorAll('rect');

    rects.forEach((rect) => {
      const row = rect.closest('g')?.getAttribute('class');
      const col = rect.getAttribute('class');
      const seatInfo = `S${section}:${row}:${col}`;

      if (disabledSeats.has(seatInfo)) {
        rect.setAttribute('fill', '#D5D5D5');
        rect.setAttribute('stroke', '#D5D5D5');
        rect.setAttribute('pointer-events', 'none');
      } else if (seatInfo === selectedSeat) {
        rect.setAttribute('fill', '#EBC8FE');
        rect.setAttribute('stroke', '#787878');
      } else {
        rect.setAttribute('fill', '#D587FE');
      }
    });
  }, [seatSVG, disabledSeats, selectedSeat, section]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div>현재 보고계신 구역은 {section} 구역 입니다.</div>
      <div
        className="flex cursor-pointer items-center self-start"
        onClick={() => setSelectedSection(null)}>
        <ArrowBackIos sx={{ fontSize: 16 }} />
        <div className="text-sm">좌석도 전체보기</div>
      </div>
      {isPageLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
        </div>
      ) : (
        <div
          ref={svgContainerRef}
          className="h-full"
          dangerouslySetInnerHTML={{ __html: seatSVG || '' }}
          onClick={handleSeatClick}
        />
      )}
    </div>
  );
};

export default SectionSeats;
