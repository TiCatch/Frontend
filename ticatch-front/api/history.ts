import { axiosClient } from 'lib';
import { TicketingLevel } from 'types';

export const getHistoryLevels = async () => {
  try {
    const response = await axiosClient.get('/history/levels');
    return {
      status: response.status,
      data: response.data?.data,
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getTicketsHistory = async (
  page: number,
  size: number,
  sort: string,
) => {
  try {
    const response = await axiosClient.get('/history/ticketings', {
      params: { page, size, sort },
    });
    console.log(response);
    return {
      status: response.status,
      data: response.data?.data,
      pageInfo: response.data?.data.page,
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getTicketsByLevel = async (
  page: number,
  size: number,
  sort: string,
  ticketingLevel: TicketingLevel,
) => {
  try {
    const response = await axiosClient.get('/history/ticketingsByLevels', {
      params: { page, size, sort, ticketingLevel },
    });
    return {
      status: response.status,
      data: response.data?.data,
      pageInfo: response.data?.data.page,
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};
