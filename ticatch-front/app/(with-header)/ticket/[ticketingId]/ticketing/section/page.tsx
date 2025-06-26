'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TotalSeats from '@components/seats/TotalSeats';
import SectionSeats from '@components/seats/SectionSeats';
import SectionNavigation from '@components/seats/SectionNavigation';
import { getCheckSeat } from 'api';
import MainAd from '@components/Ad/MainAd';
import SideAd from '@components/Ad/SideAd';
import { useTicketingContext } from '../TicketingContext';

export default function SectionPage() {
  const { ticketingId } = useTicketingContext();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setSelectedSeat(null);
  }, [selectedSection]);

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
        setReloadKey((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatSeatInfo = (seatInfo: string): string => {
    const [section, row, col] = seatInfo.split(':');
    const sectionNum = section.replace('S', '');
    const rowNum = row.replace('R', '');
    const colNum = col.replace('C', '');
    return `${sectionNum}구역 ${rowNum}행 ${colNum}번`;
  };

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="text-lg font-bold">좌석선택</div>
      <div className="flex justify-center">
        <MainAd />
      </div>
      <div className="flex min-h-0 flex-grow flex-col gap-4 md:flex-row">
        {/* 왼쪽 구역 */}
        <div className="flex w-full flex-col items-center justify-center rounded bg-gray-50 p-4 shadow-md md:w-2/3">
          {!selectedSection ? (
            <TotalSeats setSelectedSection={setSelectedSection} />
          ) : (
            <SectionSeats
              key={`${selectedSection}-${reloadKey}-seats`}
              setSelectedSection={setSelectedSection}
              section={selectedSection}
              setSelectedSeat={setSelectedSeat}
              selectedSeat={selectedSeat}
              ticketingId={ticketingId}
            />
          )}
        </div>

        {/* 오른쪽 구역 */}
        <div className="flex h-full w-full flex-col gap-4 rounded bg-gray-50 p-4 shadow-md md:w-1/3">
          {selectedSection === null && (
            <div className="flex justify-center">
              <div className="w-[250px] max-w-full">
                <SideAd />
              </div>
            </div>
          )}

          {selectedSection && (
            <div className="order-3 mt-10 min-h-0 flex-1 md:order-1 md:mt-0">
              <SectionNavigation
                key={`${selectedSection}-${reloadKey}-nav`}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
                ticketingId={ticketingId}
              />
            </div>
          )}

          <div className="order-1 w-full md:order-2 md:mt-auto">
            <div className="mt-4 text-center">
              <div className="mb-2 min-h-[28px] text-lg font-semibold">
                {selectedSeat
                  ? `선택한 좌석: ${formatSeatInfo(selectedSeat)}`
                  : ''}
              </div>
              <div className="text-sm leading-relaxed tracking-tight text-gray-600">
                좌석 선택 이후 <strong>5분 이내 결제</strong>가 완료되지 않으면
                <br />
                선택하신 좌석의 선점 기회를 잃게 됩니다.
              </div>
            </div>
            <div className="order-2 pt-4 md:order-3">
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
    </div>
  );
}
