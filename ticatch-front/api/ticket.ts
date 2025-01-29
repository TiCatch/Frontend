import { axiosClient } from 'lib';
import { TicketingLevel, TicketingResponse } from 'types';

export const createTicket = async (
  level: TicketingLevel,
  startTime: number,
) => {
  const currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() + startTime);
  const ticketingTime = currentTime.toISOString();

  const response = await axiosClient.post('/ticket/new', {
    ticketingLevel: level,
    ticketingTime: ticketingTime,
  });

  if (response.status === 200) {
    console.log('티켓팅 생성 완료');
    return response.data;
  }

  throw new Error('에러 발생');
};

export const getTicket = async (
  ticketingId: number,
): Promise<TicketingResponse['data']> => {
  const response = await axiosClient.get(`/ticket/${ticketingId}`);

  if (response.data.statusCode === 200) {
    return response.data.data;
  }

  if (response.data.statusCode === 441 || response.data.statusCode === 440) {
    throw new Error(response.data.messages);
  }
  throw new Error('에러 발생');
};
