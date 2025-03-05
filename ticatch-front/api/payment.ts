import { axiosClient } from 'lib';
export const requestPayment = async (
  name: string,
  totalPrice: number,
): Promise<string> => {
  try {
    const response = await axiosClient.post('/payment/ready', {
      name,
      totalPrice,
    });

    if (response.status === 200 && response.data?.data?.next_redirect_pc_url) {
      return response.data.data.next_redirect_pc_url;
    }

    throw new Error('결제 요청 실패');
  } catch (error) {
    throw new Error('결제 요청 중 오류가 발생했습니다.');
  }
};

export const approvePayment = async (pg_token: string) => {
  try {
    const response = await axiosClient.get(
      `/payment/complete?pg_token=${pg_token}`,
    );

    if (response.status === 200 && response.data?.data) {
      return response.data;
    }

    throw new Error('결제 승인 실패');
  } catch (error) {
    throw new Error('결제 승인 요청 중 오류가 발생했습니다.');
  }
};
