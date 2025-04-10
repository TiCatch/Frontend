import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserStatusClient, loginWithKakao, logoutUser } from 'api';
import { useEffect, useState } from 'react';

/**
 * 로그인 상태 확인 (localStorage)
 */
export const useUserStatus = () => {
  const [isClient, setIsClient] = useState(false);

  // hydration 이후에만 쿼리 실행
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userStatus'],
    queryFn: getUserStatusClient,
    staleTime: 1000 * 60 * 5,
    enabled: isClient,
  });

  return {
    userStatus: data,
    isLoggedIn: !!data,
    isLoading,
    isError,
  };
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
