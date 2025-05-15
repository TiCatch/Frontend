import { ticketImage } from '@constants/imagePath';
import Image from 'next/image';
import { MyTicket } from 'types';

const NormalTicket = ({
  ticket,
  selected,
}: {
  ticket: MyTicket;
  selected: boolean;
}) => {
  const [section, row, col] = ticket.seatInfo
    .split(':')
    .map((el) => el.slice(1));
  const date = new Date(ticket.ticketingTime);
  return (
    <div
      className={`relative flex cursor-pointer justify-center transition-transform hover:scale-105 ${selected && 'scale-110'}`}>
      <Image
        src={ticketImage.NORMAL}
        width={182}
        height={280}
        alt="Normal ticket image"
      />
      <div className="absolute left-1/2 top-[142px] flex h-[104px] -translate-x-1/2 -translate-y-1/2 flex-col gap-[12px] whitespace-nowrap text-center text-2xl font-bold leading-none text-sub-2">
        {section}구역
        <div>
          {row}열 {col}번
        </div>
        <div className="mt-[46px] flex flex-col gap-[4px]">
          <div className="text-m">{date.toLocaleDateString('ko-KR')}</div>
          <div className="text-m">{date.toLocaleTimeString('ko-KR')}</div>
        </div>
      </div>
    </div>
  );
};

export default NormalTicket;
