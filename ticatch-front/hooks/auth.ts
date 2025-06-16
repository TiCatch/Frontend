import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUserInfoClient,
  getUserStatusClient,
  loginWithKakao,
  logoutUser,
} from 'api';

/**
 * 로그인 여부 확인 (localStorage의 accessToken 검사)
 */
export const useAuthStatus = () => {
  return useQuery({
    queryKey: ['userStatus'],
    queryFn: getUserStatusClient,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * 로그인된 유저 정보 조회
 */
export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfoClient,
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: typeof window !== 'undefined',
  });
};

/**
 * 카카오 로그인 훅
 */
export const useLoginWithKakao = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginWithKakao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userStatus'] });
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};

/**
 * 로그아웃 훅
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userStatus'] });
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
    onError: (error) => {
      console.log('Logout failed: ', error);
    },
  });
};
