import { LoginResponse } from 'types';
import { axiosClient } from 'lib';

/**
 * 카카오 인증 코드로 로그인 요청
 * @param code 카카오에서 받은 인가 코드
 * @returns 로그인 응답 데이터
 */
export const loginWithKakao = async (code: string): Promise<LoginResponse> => {
  const response = await axiosClient.get('/auth/login/kakao', {
    params: { code },
  });

  const accessToken = response.data?.data?.tokenDto?.accessToken.replace(
    /^Bearer/,
    '',
  );
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken.trim());
  } else {
    console.error('accessToken 없음:', response.data);
  }

  return response.data;
};
