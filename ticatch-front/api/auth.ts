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

/**
 * JWT 토큰 디코딩딩
 * @param token JWT 토큰
 * @returns 디코딩된 페이로드
 */
const decodeToken = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.log('JWT 디코딩 실패: ', error);
    return null;
  }
};

/**
 * JWT 만료 여부 확인
 * @param token JWT 토큰
 * @returns 만료 여부 (true: 만료됨, false: 유효함함)
 */
export const isTokenExpired = (token: string): boolean => {
  if (!token) return true; // 없으면 만료된 것으로 간주
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};
