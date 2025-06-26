import { MyTicket, TicketingLevel } from 'types';
import HardTicket from './HardTicket';
import NormalTicket from './NormalTicket';
import EasyTicket from './EasyTicket';

const TicketItem = ({
  ticket,
  selected,
  onClick,
}: {
  ticket: MyTicket;
  selected: boolean;
  onClick: () => void;
}) => {
  const getBorderColor = (level: TicketingLevel) => {
    switch (level) {
      case 'EASY':
        return 'border-sub-4';
      case 'NORMAL':
        return 'border-sub-3';
      case 'HARD':
        return 'border-purple-500';
      default:
        return 'border-gray-500';
    }
  };

  const getBackgroundColor = (level: TicketingLevel) => {
    switch (level) {
      case 'EASY':
        return 'bg-sub-4-50';
      case 'NORMAL':
        return 'bg-sub-3-50';
      case 'HARD':
        return 'bg-purple-300';
      default:
        return 'bg-gray-300';
    }
  };

  const [section, row, col] = ticket.seatInfo
    .split(':')
    .map((el) => el.slice(1));

  const date = new Date(ticket.ticketingTime);
  return (
    <div
      className={`relative cursor-pointer overflow-hidden rounded-md border-2 ${getBorderColor(ticket.ticketingLevel)} h-auto transform shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
      onClick={onClick}>
      <div
        className={`absolute left-0 top-0 w-full px-2 py-1 text-abs-black ${getBackgroundColor(ticket.ticketingLevel)} text-center text-xs font-medium`}>
        {ticket.ticketingLevel}
      </div>
      <div className="flex flex-col items-center px-4 pb-4 pt-8">
        <div className="mt-3 text-xl font-bold text-gray-700">
          {section}구역
        </div>
        <div className="mb-1 text-xl font-bold text-gray-700">
          {row}열 {col}번
        </div>
        <div className="mb-2 text-center text-s font-medium text-gray-600">
          {date.toLocaleDateString('ko-KR')} <br className="hidden xl:block" />{' '}
          {date.toLocaleTimeString('ko-KR')}
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
