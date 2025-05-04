import { axiosClient } from 'lib';

export const enterWaiting = async (ticketingId: string) => {
  try {
    const response = await axiosClient.get(
      `/ticket/waiting/${ticketingId}/ACTUAL`,
    );

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    throw new Error('대기열 진입에 실패했습니다.');
  }
};

export const getWaitingStatus = async (ticketingId: string) => {
  try {
    const response = await axiosClient.get(
      `/ticket/waiting-status/${ticketingId}`,
    );
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    throw new Error('대기열 정보 가져오기에 실패했습니다.');
  }
};
