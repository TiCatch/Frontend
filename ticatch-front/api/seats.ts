import { axiosClient } from 'lib';

export const getCheckSeat = async (ticketingId: string, seatKey: string) => {
  try {
    const response = await axiosClient.get(
      `/ticket/seats/${ticketingId}/check/${seatKey}`,
    );

    const { statusCode } = response.data;

    return { status: statusCode };
  } catch (error) {
    throw new Error('좌석데이터 confirm 오류');
  }
};

export const getSectionSeats = async (ticketingId: string, section: string) => {
  try {
    const response = await axiosClient.get(
      `/ticket/seats/${ticketingId}/S${section}`,
    );

    return response.data.data;
  } catch (error) {
    throw new Error('section 좌석 조회 오류');
  }
};

export const getUnreservedSeats = async (
  ticketingId: string,
): Promise<Record<string, number>> => {
  try {
    const response = await axiosClient.get(
      `/ticket/seats/${ticketingId}/unreserved`,
    );

    return response.data.data;
  } catch (error) {
    throw new Error('잔여석 수 조회 오류');
  }
};
