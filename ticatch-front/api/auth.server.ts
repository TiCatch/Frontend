'use server';

import { cookies } from 'next/headers';

/**
 * 서버 단에서 로그인 상태 확인 (cookies의 refreshToken 여부로 판단)
 * @returns 로그인 여부
 */
export const getUserStatusServer = async () => {
  const cookieStore = cookies();
  return (await cookieStore).has('refresh-token');
};
