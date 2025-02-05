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
): Promise<{
  status: number;
  data: TicketingResponse['data'];
  messages: string;
}> => {
  try {
    const response = await axiosClient.get(`/ticket/${ticketingId}`);

    const { statusCode, data, messages } = response.data;

    return { status: statusCode, data, messages };
  } catch (error) {
    throw new Error('티켓 정보를 가져오는 도중 오류가 발생했습니다.');
  }
};

export const updateTicket = async (
  ticketingId: number,
): Promise<{
  status: number;
  data: TicketingResponse['data'];
  messages: string;
}> => {
  try {
    const response = await axiosClient.patch(`/ticket/${ticketingId}`);

    const { statusCode, data, messages } = response.data;

    return { status: statusCode, data, messages };
  } catch (error) {
    throw new Error('티켓 정보를 수정하는 도중 오류가 발생했습니다.');
  }
};
