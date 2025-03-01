'use client';
import { fetchSVG } from '@utils/fetchSVG';
import { use, useEffect, useState, useRef } from 'react';
import { ArrowBackIos } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { getCheckSeat, getSectionSeats } from 'api';

interface SeatsPageProps {
  params: Promise<{ sectionId: string; ticketingId: string }>;
}

export default function SeatsPage({ params }: SeatsPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { sectionId, ticketingId } = resolvedParams;
  const [seatSVG, setSeatSVG] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [disabledSeats, setDisabledSeats] = useState<Set<string>>(new Set());
  const svgContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadSvg = async () => {
      const svg = await fetchSVG(
        `https://ticatch-content.s3.ap-southeast-2.amazonaws.com/seat-img/S${sectionId}.svg`,
      );
      setSeatSVG(svg);
    };

    loadSvg();
  }, []);

  useEffect(() => {
    const fetchDisabledSeats = async () => {
      try {
        const seats = await getSectionSeats(ticketingId, sectionId);
        const reservedSeats = new Set(Object.keys(seats));
        setDisabledSeats(reservedSeats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDisabledSeats();
  }, [ticketingId, sectionId]);

  useEffect(() => {
    if (!svgContainerRef.current) return;

    const rects = svgContainerRef.current.querySelectorAll('rect');

    rects.forEach((rect) => {
      const row = rect.closest('g')?.getAttribute('class');
      const col = rect.getAttribute('class');
      const seatInfo = `S${sectionId}:${row}:${col}`;

      if (disabledSeats.has(seatInfo)) {
        rect.setAttribute('fill', '#a5a5a5');
        rect.setAttribute('pointer-events', 'none');
      } else if (seatInfo === selectedSeat) {
        rect.setAttribute('fill', '#C04CFD');
      } else {
        rect.setAttribute('fill', 'transparent');
      }
    });
  }, [selectedSeat, disabledSeats]);

  const handleSeatClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!svgContainerRef.current) return;

    const target = event.target as SVGElement;

    if (target.tagName !== 'rect') {
      return;
    }

    const clickedRect = target as SVGRectElement;
    const rowGroup = clickedRect.closest('g');
    const row = rowGroup?.getAttribute('class');
    const col = clickedRect.getAttribute('class');
    const seatInfo = `S${sectionId}:${row}:${col}`;

    if (selectedSeat === seatInfo) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat(seatInfo);
    }
  };

  const handleConfirmSeat = async () => {
    if (!selectedSeat) return;
    try {
      const seatData = await getCheckSeat(ticketingId, selectedSeat);
      if (seatData.status === 200) {
        router.push(`/ticket/${ticketingId}/ticketing/payment`);
      } else if (seatData.status === 450) {
        alert('이미 선점된 좌석입니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="text-lg font-bold">좌석선택</div>
      <div className="flex min-h-0 flex-grow gap-4">
        {/* 왼쪽 구역 */}
        <div className="flex w-2/3 flex-col items-center justify-center gap-4 rounded bg-gray-50 p-8 shadow-md">
          <div>현재 보고계신 구역은 S{sectionId} 구역 입니다.</div>

          <div
            className="flex cursor-pointer items-center self-start"
            onClick={() =>
              router.push(`/ticket/${ticketingId}/ticketing/section`)
            }>
            <ArrowBackIos sx={{ fontSize: 16 }} />
            <div className="text-sm">좌석도 전체보기</div>
          </div>

          <div
            ref={svgContainerRef}
            className="h-full"
            dangerouslySetInnerHTML={{ __html: seatSVG || '' }}
            onClick={handleSeatClick}
          />
        </div>

        {/* 오른쪽 구역 */}
        <div className="flex w-1/3 flex-col gap-4 rounded bg-gray-50 p-8 shadow-md">
          <div className="flex justify-center text-sm text-gray-600">
            좌석선택 이후 5분 이내 결제가 완료되지 않을 시 선택하신 좌석의 선점
            기회를 잃게 됩니다.
          </div>

          {selectedSeat && (
            <div className="text-center text-lg font-semibold">
              선택한 좌석: {selectedSeat}
            </div>
          )}

          <div className="mt-auto w-full">
            <button
              className={`mt-4 w-full rounded-12 py-4 text-lg text-white transition ${selectedSeat ? 'cursor-pointer bg-primary' : 'cursor-not-allowed bg-gray-300'}`}
              disabled={!selectedSeat}
              onClick={handleConfirmSeat}>
              좌석 선택 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
