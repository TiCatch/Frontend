'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import TicketItem from '@components/myTickets/TicketItem';
import DetailPanel from '@components/myTickets/DetailPanel';
import LevelCount from '@components/myTickets/LevelCount';
import { MyTicket, TicketingLevel } from 'types';
import { useUserInfo } from '@hooks';
import { getHistoryLevels, getTicketsByLevel, getTicketsHistory } from 'api';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Image from 'next/image';
import CommonButton from '@components/button/CommonButton';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

export default function MyPage() {
  const { data: userInfo, isLoading } = useUserInfo();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [totalCnt, setTotalCnt] = useState({ hard: '', normal: '', easy: '' });
  const [page, setPage] = useState(0);
  const [myTickets, setMyTickets] = useState<MyTicket[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [sortType, setSortType] = useState('ticketingTime');
  const [asc, setAsc] = useState(false);
  const [levelFilter, setLevelFilter] = useState<TicketingLevel | null>(null);
  const router = useRouter();

  const CountLoading = dynamic(() => import('@components/Animation/Count'), {
    ssr: false,
  });

  const fetchTickets = useCallback(
    async (page: number) => {
      setLoading(true);
      const sort = `${sortType},${asc ? 'asc' : 'desc'}`;
      try {
        let response;
        // 레벨 필터가 있으면 레벨별 API 사용, 없으면 전체 히스토리 API 사용
        if (levelFilter) {
          response = await getTicketsByLevel(page, 30, sort, levelFilter);
        } else {
          response = await getTicketsHistory(page, 30, sort);
        }

        const { status, data } = response;
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
    [sortType, asc, levelFilter],
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

  const handleTicketClick = (id: number) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const handleClickFilter = (filter: string) => {
    setLevelFilter(null);
    setSelectedId(null);
    if (filter !== sortType) {
      setSortType(filter);
      setAsc(false);
    } else setAsc(!asc);
    setPage(0);
  };

  const handleClickLevel = (level: TicketingLevel) => {
    setSelectedId(null);
    setLevelFilter(levelFilter === level ? null : level);
    setPage(0);
  };

  const handleClickReserve = () => {
    router.push('/ticket/level');
  };

  const addTotalCnt =
    Number(totalCnt.hard) + Number(totalCnt.normal) + Number(totalCnt.easy);

  return (
    <div className="container mx-auto flex min-h-inner-screen flex-col px-8 py-8">
      <section className="container">
        <div className="mb-2 grow break-keep text-2xl font-medium">
          {isLoading ? '로딩 중...' : `${userInfo?.userNickname}님의 티켓`}
        </div>
        <div className="text-m text-gray-500">
          총 {userInfo?.userScore.toLocaleString('ko-KR')}점을 획득했습니다.{' '}
        </div>
        <div className="grid grid-cols-1 gap-6 pb-[32px] pt-[16px] md:grid-cols-3">
          <LevelCount
            cnt={totalCnt.easy}
            total={addTotalCnt}
            level="EASY"
            levelKo="쉬운"
            color="sub-4"
            onClick={() => handleClickLevel('EASY')}
            isActive={levelFilter === 'EASY'}
          />
          <LevelCount
            cnt={totalCnt.normal}
            total={addTotalCnt}
            level="NORMAL"
            levelKo="중간"
            color="sub-3"
            onClick={() => handleClickLevel('NORMAL')}
            isActive={levelFilter === 'NORMAL'}
          />
          <LevelCount
            cnt={totalCnt.hard}
            total={addTotalCnt}
            level="HARD"
            levelKo="어려운"
            color="purple-500"
            onClick={() => handleClickLevel('HARD')}
            isActive={levelFilter === 'HARD'}
          />
        </div>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {myTickets?.map((ticket, index) => (
              <TicketItem
                key={ticket.historyId + '-' + index}
                data-id={ticket.historyId}
                ticket={ticket}
                selected={selectedId === ticket.historyId}
                onClick={() => handleTicketClick(ticket.historyId)}
              />
            ))}

            {hasMore && <div ref={sentinelRef} style={{ height: 20 }} />}
            {loading && (
              <div className="col-span-full flex justify-center py-4">
                <CountLoading />
              </div>
            )}
          </div>
          {/* 상세 패널 */}
          {selectedId && (
            <DetailPanel
              ticket={myTickets?.find((t) => t.historyId === selectedId)!}
              onClose={() => setSelectedId(null)}
            />
          )}
        </section>
      ) : (
        <section className="no-history flex w-full flex-1 flex-col items-center justify-center gap-[16px] py-[48px]">
          <Image
            src="/icons/noTicket.svg"
            alt="no ticket"
            width={80}
            height={80}
          />
          <div className="text-l text-gray-400">예약한 티켓이 없습니다.</div>
          <CommonButton title="예매하기" onClick={handleClickReserve} />
        </section>
      )}
    </div>
  );
}
