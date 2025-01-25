import { axiosClient } from 'lib';
import { Level } from 'types';

export const createTicket = async (level: Level, startTime: number) => {
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
