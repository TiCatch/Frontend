import { axiosClient } from 'lib';

export const requestPayment = async (
  name: string,
  totalPrice: number,
): Promise<{ tid: string; next_redirect_pc_url: string }> => {
  try {
    const response = await axiosClient.post('/payment/ready', {
      name,
      totalPrice,
    });

    if (
      response.status === 200 &&
      response.data?.data?.tid &&
      response.data?.data?.next_redirect_pc_url
    ) {
      const { tid, next_redirect_pc_url } = response.data.data;
      return { tid, next_redirect_pc_url };
    }

    throw new Error('결제 요청 실패');
  } catch (error) {
    console.error('❌ 결제 요청 오류:', error);
    throw new Error('결제 요청 중 오류가 발생했습니다.');
  }
};

export const approvePayment = async (pg_token: string) => {
  try {
    const tid = localStorage.getItem('tid');

    const response = await axiosClient.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/complete?tid=${tid}&pg_token=${pg_token}`,
    );

    if (response.status === 200 && response.data?.data) {
      return response.data;
    }

    throw new Error('결제 승인 실패');
  } catch (error) {
    console.error(error);
    throw new Error('결제 승인 요청 중 오류가 발생했습니다.');
  }
};
