import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserStatusClient, loginWithKakao, logoutUser } from 'api';

/**
 * 로그인 상태 확인 (localStorage)
 */
export const useUserStatus = () => {
  return useQuery({
    queryKey: ['userStatus'],
    queryFn: getUserStatusClient,
    staleTime: 1000 * 60 * 5,
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
    },
    onError: (error) => {
      console.log('Logout failed: ', error);
    },
  });
};
