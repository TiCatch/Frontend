'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import TicketItem from '@components/myTickets/TicketItem';
import DetailPanel from '@components/myTickets/DetailPanel';
import LevelCount from '@components/myTickets/LevelCount';
import { MyTicket } from 'types';
import { useUserStatus } from '@hooks';
import { getHistoryLevels, getTicketsHistory } from 'api';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Image from 'next/image';
import CommonButton from '@components/button/CommonButton';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

export default function MyPage() {
  const { userInfo } = useUserStatus();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [totalCnt, setTotalCnt] = useState({ hard: '', normal: '', easy: '' });
  const gridRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [myTickets, setMyTickets] = useState<MyTicket[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [sortType, setSortType] = useState('ticketingTime');
  const [asc, setAsc] = useState(false);
  const router = useRouter();

  const CountLoading = dynamic(() => import('@components/Animation/Count'), {
    ssr: false,
  });

  const fetchTickets = useCallback(
    async (page: number) => {
      setLoading(true);
      const sort = `${sortType},${asc ? 'asc' : 'desc'}`;
      try {
        const { status, data } = await getTicketsHistory(page, 20, sort);
        if (status === 200) {
          setMyTickets((prev) =>
            page === 0 ? data.content : [...prev, ...data.content],
          );
          setHasMore(data.page.number < data.page.totalPages - 1);
        }
      } catch (error) {
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [sortType, asc],
  );

  useEffect(() => {
    fetchTickets(page);
  }, [page, fetchTickets, sortType, asc]);

  // 난이도별 카운트 불러오기
  useEffect(() => {
    const getLevel = async () => {
      try {
        const { status, data } = await getHistoryLevels();
        if (status === 200) {
          setTotalCnt({
            hard: data?.hardCount,
            normal: data?.normalCount,
            easy: data?.easyCount,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLevel();
  }, []);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: '400px 0px 400px 0px',
        threshold: 0,
      },
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  const handleTicketClick = (id: number) => {
    setSelectedId(id === selectedId ? null : id);
  };

  // 선택된 티켓의 행 번호 찾기
  const getSelectedTicketRowIndex = () => {
    if (!selectedId || !gridRef.current) return -1;

    const items = gridRef.current.querySelectorAll('.ticket-item');
    const selectedItem = Array.from(items).find(
      (item) => item.getAttribute('data-id') === selectedId.toString(),
    );
    if (!selectedItem) return -1;

    const selectedTop = selectedItem.getBoundingClientRect().top;
    let rowIndex = 0;
    let lastTop = -1;

    for (let i = 0; i < items.length; i++) {
      const top = items[i].getBoundingClientRect().top;
      if (i > 0 && Math.round(Math.abs(top - lastTop)) > 0) {
        rowIndex++;
      }
      if (Math.round(Math.abs(top - selectedTop)) === 0) {
        return rowIndex;
      }
      lastTop = top;
    }
    return -1;
  };

  const handleClickFilter = (filter: string) => {
    setSelectedId(null);
    if (filter !== sortType) {
      setSortType(filter);
      setAsc(false);
    } else setAsc(!asc);
    setPage(0);
  };

  const handleClickReserve = () => {
    router.push('/ticket/level');
  };

  return (
    <>
      <div className="container mx-auto flex h-[calc(100vh-64px)] flex-col px-4 py-8">
        {/* 티켓 요약 섹션 */}
        <section className="mb-[24px] flex min-h-[100px] w-[100%] items-center rounded-xl border border-gray-200 px-[24px]">
          <div className="grow break-keep text-xl">
            {userInfo?.userNickname}님의 티켓
          </div>
          <LevelCount cnt={totalCnt.hard} level="상" color="purple-500" />
          <LevelCount cnt={totalCnt.normal} level="중" color="sub-3" />
          <LevelCount cnt={totalCnt.easy} level="하" color="sub-4" />
        </section>
        {myTickets.length > 0 || loading ? (
          <section className="ticket-history">
            <div className="mb-[24px] flex justify-end gap-[16px] filter">
              <button
                className={`flex content-center gap-[4px] text-2xs ${sortType === 'ticketingTime' ? 'text-purple-500 hover:text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => handleClickFilter('ticketingTime')}>
                시간 순
                {sortType === 'ticketingTime' &&
                  (asc ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />)}
              </button>
              <button
                className={`flex content-center gap-[4px] text-2xs ${sortType === 'ticketingScore' ? 'text-purple-500 hover:text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => handleClickFilter('ticketingScore')}>
                난이도 순
                {sortType === 'ticketingScore' &&
                  (asc ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />)}
              </button>
            </div>

            <div
              ref={gridRef}
              className="relative grid grid-cols-[repeat(auto-fill,minmax(182px,1fr))] gap-6 pb-[32px]">
              {myTickets?.map((ticket, index) => (
                <div
                  key={ticket.historyId + '-' + index}
                  data-id={ticket.historyId}
                  className="ticket-item cursor-pointer"
                  onClick={() => handleTicketClick(ticket.historyId)}>
                  <TicketItem
                    ticket={ticket}
                    selected={selectedId === ticket.historyId}
                  />
                </div>
              ))}

              {/* 상세 패널 */}
              {selectedId && (
                <DetailPanel
                  ticket={myTickets?.find((t) => t.historyId === selectedId)!}
                  onClose={() => setSelectedId(null)}
                  rowIndex={getSelectedTicketRowIndex()}
                />
              )}
              {hasMore && <div ref={sentinelRef} style={{ height: 20 }} />}
              {loading && (
                <div className="col-span-full flex justify-center py-4">
                  <CountLoading />
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="no-history flex w-full flex-1 flex-col items-center justify-center gap-[24px]">
            <Image
              src="/icons/noTicket.svg"
              alt="no ticket"
              width={160}
              height={161}
            />
            <div className="text-l text-gray-400">예약한 티켓이 없습니다.</div>
            <CommonButton title="예매하기" onClick={handleClickReserve} />
          </section>
        )}
      </div>
    </>
  );
}
