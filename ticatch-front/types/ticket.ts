export type TicketingLevel = 'EASY' | 'NORMAL' | 'HARD';

export type TicketingStatus = 'WAITING' | 'CANCELED' | 'COMPLETED';

export interface TicketingResponse {
  statusCode: number;
  messages: string;
  developerMessage: string;
  timestamp: string;
  data: {
    ticketingId: number;
    userId: number;
    ticketingLevel: TicketingLevel;
    ticketingTime: string;
    ticketingStatus: TicketingStatus;
  };
}
