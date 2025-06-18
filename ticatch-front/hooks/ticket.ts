import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createTicket,
  fetchActiveTicket,
  successTicket,
  updateTicket as updateTicketApi,
} from 'api';
import queryClient from 'providers/queryClient';
import { TicketingLevel } from 'types';

export const useActiveTicket = (enabled?: boolean) => {
  const { data: activeTicket, isLoading } = useQuery({
    queryKey: ['activeTicket'],
    queryFn: fetchActiveTicket,
    enabled,
    retry: false,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: true,
  });

  const createTicketMutation = useMutation({
    mutationFn: async ({
      level,
      startTime,
    }: {
      level: TicketingLevel;
      startTime: number;
    }) => {
      return createTicket(level, startTime);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['activeTicket'], data.data);
    },
  });

  const updateTicketMutation = useMutation({
    mutationFn: async (ticketingId: number) => {
      return updateTicketApi(ticketingId);
    },
    onSuccess: () => {
      queryClient.setQueryData(['activeTicket'], null);
      queryClient.invalidateQueries({ queryKey: ['activeTicket'] });
    },
  });

  const successTicketMutation = useMutation({
    mutationFn: async ({
      ticketingId,
      seatInfo,
    }: {
      ticketingId: number;
      seatInfo: string;
    }) => {
      return successTicket(ticketingId, seatInfo);
    },
    onSuccess: () => {
      queryClient.setQueryData(['activeTicket'], null);
      queryClient.invalidateQueries({ queryKey: ['activeTicket'] });
    },
  });

  return {
    activeTicketId: activeTicket?.ticketingId || null,
    activeTicket,
    isLoading,
    createTicket: createTicketMutation.mutateAsync,
    updateTicket: updateTicketMutation.mutateAsync,
    successTicket: successTicketMutation.mutateAsync,
  };
};
