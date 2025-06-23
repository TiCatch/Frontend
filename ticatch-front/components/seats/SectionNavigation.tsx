import { fetchSVG } from '@utils/fetchSVG';
import selectTotalSVG from '@utils/selectTotalSVG';
import { getUnreservedSeats } from 'api';
import { useEffect, useState } from 'react';

const SectionNavigation = ({
  selectedSection,
  setSelectedSection,
  ticketingId,
}: {
  selectedSection: string;
  setSelectedSection: (value: string | null) => void;
  ticketingId: string;
}) => {
  const [totalSVG, setTotalSVG] = useState<string | null>(null);
  const [unreservedSeats, setUnreservedSeats] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const getSectionNavigation = async () => {
      const unreserved = await getUnreservedSeats(ticketingId);
      const totalRaw = await fetchSVG(
        'https://ticatch-content.s3.ap-southeast-2.amazonaws.com/seat-img/TOTAL.svg',
      );
      setUnreservedSeats(unreserved);
      setTotalSVG(selectTotalSVG(totalRaw!, selectedSection));
    };
    getSectionNavigation();
  }, [selectedSection]);

  const handleSectionClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as SVGElement;
    const targetClass = target.getAttribute('class');

    if (target.tagName === 'path' && targetClass && targetClass !== 'STAGE') {
      if (targetClass === selectedSection) return;
      setSelectedSection(targetClass);
    }
  };

  const entries = Object.entries(unreservedSeats).map(([key, value]) => {
    return { key: key.replace(/^S/, ''), value };
  });

  const letterEntries = entries.filter(({ key }) => isNaN(Number(key)));
  letterEntries.sort((a, b) => a.key.localeCompare(b.key));

  const numberEntries = entries
    .filter(({ key }) => !isNaN(Number(key)))
    .sort((a, b) => Number(a.key) - Number(b.key));

  const sortedEntries = [...letterEntries, ...numberEntries];

  return (
    <div className="flex h-full w-full flex-col">
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
          key={selectedSection}
        />
      )}

      {sortedEntries.length > 0 && (
        <div className="flex min-h-20 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto rounded border border-gray-200 p-2 text-sm text-gray-600">
            {sortedEntries.map(({ key, value }) => {
              const isCurrent = key === selectedSection;

              return (
                <div
                  key={key}
                  onClick={
                    isCurrent ? undefined : () => setSelectedSection(key)
                  }
                  className={`flex justify-between px-2 py-1 transition ${
                    isCurrent
                      ? 'cursor-not-allowed text-gray-400'
                      : 'cursor-pointer hover:bg-gray-100'
                  }`}>
                  <span className="inline-block w-12 text-right">
                    {key} 구역
                  </span>
                  <span>{value}석 남음</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionNavigation;
