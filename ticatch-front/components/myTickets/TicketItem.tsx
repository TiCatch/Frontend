import { MyTicket } from 'types';
import HardTicket from './HardTicket';
import NormalTicket from './NormalTicket';
import EasyTicket from './EasyTicket';

const TicketItem = ({
  ticket,
  selected,
}: {
  ticket: MyTicket;
  selected: boolean;
}) => {
  switch (ticket.ticketingLevel) {
    case 'HARD':
      return <HardTicket ticket={ticket} selected={selected} />;
    case 'NORMAL':
      return <NormalTicket ticket={ticket} selected={selected} />;
    case 'EASY':
      return <EasyTicket ticket={ticket} selected={selected} />;
    default:
      return null;
  }
};

export default TicketItem;
