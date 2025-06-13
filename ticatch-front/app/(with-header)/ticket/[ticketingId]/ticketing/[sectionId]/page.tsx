'use client';

import { use, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowBackIos } from '@mui/icons-material';
import { fetchSVG } from '@utils/fetchSVG';
import { getCheckSeat, getSectionSeats, getUnreservedSeats } from 'api';
import Loading from '@app/loading';
import selectTotalSVG from '@utils/selectTotalSVG';

interface SeatsPageProps {
  params: Promise<{ sectionId: string; ticketingId: string }>;
}

export default function SeatsPage({ params }: SeatsPageProps) {
  const { sectionId, ticketingId } = use(params);
  const router = useRouter();

  const [seatSVG, setSeatSVG] = useState<string | null>(null);
  const [totalSVG, setTotalSVG] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [disabledSeats, setDisabledSeats] = useState<Set<string>>(new Set());
  const [unreservedSeats, setUnreservedSeats] = useState<
    Record<string, number>
  >({});
  const [isPageLoading, setIsPageLoading] = useState(true);

  const svgContainerRef = useRef<HTMLDivElement | null>(null);

  const initializePage = useCallback(async () => {
    setIsPageLoading(true);
    try {
      const [seatData, seatRaw, totalRaw, unreserved] = await Promise.all([
        getSectionSeats(ticketingId, sectionId),
        fetchSVG(
          `https://ticatch-content.s3.ap-southeast-2.amazonaws.com/seat-img/S${sectionId}.svg`,
        ),
        fetchSVG(
          'https://ticatch-content.s3.ap-southeast-2.amazonaws.com/seat-img/TOTAL.svg',
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
      setTotalSVG(selectTotalSVG(totalRaw!, sectionId));
      setUnreservedSeats(unreserved);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPageLoading(false);
    }
  }, [ticketingId, sectionId]);

  useEffect(() => {
    initializePage();
  }, [initializePage]);

  useEffect(() => {
    if (!svgContainerRef.current || !seatSVG) return;

    const rects = svgContainerRef.current.querySelectorAll('rect');

    rects.forEach((rect) => {
      const row = rect.closest('g')?.getAttribute('class');
      const col = rect.getAttribute('class');
      const seatInfo = `S${sectionId}:${row}:${col}`;

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
  }, [seatSVG, disabledSeats, selectedSeat, sectionId]);

  const handleSeatClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as SVGElement;
    if (target.tagName !== 'rect') return;

    const rect = target as SVGRectElement;
    const row = rect.closest('g')?.getAttribute('class');
    const col = rect.getAttribute('class');
    const seatInfo = `S${sectionId}:${row}:${col}`;

    setSelectedSeat((prev) => (prev === seatInfo ? null : seatInfo));
  };

  const handleSectionClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as SVGElement;
    const targetClass = target.getAttribute('class');

    if (target.tagName === 'path' && targetClass && targetClass !== 'STAGE') {
      if (targetClass === sectionId) return;
      router.push(`/ticket/${ticketingId}/ticketing/${targetClass}`);
    }
  };

  const handleConfirmSeat = async () => {
    if (!selectedSeat) return;
    try {
      const res = await getCheckSeat(ticketingId, selectedSeat);
      if (res.status === 200) {
        router.push(
          `/ticket/${ticketingId}/ticketing/payment?seat=${selectedSeat}`,
        );
      } else if (res.status === 450) {
        alert('이미 선점된 좌석입니다.');
        setSelectedSeat(null);
        await initializePage();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isPageLoading) return <Loading />;

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="text-lg font-bold">좌석선택</div>
      <div className="flex min-h-0 flex-grow gap-4">
        <div className="flex w-2/3 flex-col items-center justify-center gap-4 rounded bg-gray-50 p-4 shadow-md">
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

        <div className="flex w-1/3 flex-col rounded bg-gray-50 p-4 shadow-md">
          {totalSVG && (
            <div className="mb-2 text-center text-sm font-semibold">
              다른 구역 선택
            </div>
          )}
          {totalSVG && (
            <div
              className="mb-4 cursor-pointer"
              dangerouslySetInnerHTML={{ __html: totalSVG }}
              onClick={handleSectionClick}
              key={sectionId}
            />
          )}

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 overflow-y-auto rounded border border-gray-200 p-2 text-sm text-gray-600">
              {Object.entries(unreservedSeats).map(([id, count]) => {
                const numericId = id.replace(/^S/, '');
                const isCurrent = numericId === sectionId;

                return (
                  <div
                    key={id}
                    onClick={
                      isCurrent
                        ? undefined
                        : () =>
                            router.push(
                              `/ticket/${ticketingId}/ticketing/${numericId}`,
                            )
                    }
                    className={`flex justify-between px-2 py-1 transition ${
                      isCurrent
                        ? 'cursor-not-allowed text-gray-400'
                        : 'cursor-pointer hover:bg-gray-100'
                    }`}>
                    <span>{id} 구역</span>
                    <span>{count}석 남음</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-center">
              <div className="mb-2 min-h-[28px] text-lg font-semibold">
                {selectedSeat ? `선택한 좌석: ${selectedSeat}` : ''}
              </div>
              <div className="text-sm leading-relaxed tracking-tight text-gray-600">
                좌석 선택 이후 <strong>5분 이내 결제</strong>가 완료되지 않으면
                <br />
                선택하신 좌석의 선점 기회를 잃게 됩니다.
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              className={`w-full rounded-12 py-4 text-lg text-white transition ${
                selectedSeat
                  ? 'cursor-pointer bg-primary'
                  : 'cursor-not-allowed bg-gray-300'
              }`}
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
