import { axiosClient } from 'lib';

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
  asc: string = 'desc',
) => {
  try {
    const response = await axiosClient.get('/history/ticketings', {
      params: { page, size, sort, asc },
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
