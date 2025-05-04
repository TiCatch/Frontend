import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createTicket,
  fetchActiveTicket,
  updateTicket as updateTicketApi,
} from 'api';
import { TicketingLevel } from 'types';

export const useActiveTicket = (enabled: boolean) => {
  const { data: activeTicket, isLoading } = useQuery({
    queryKey: ['activeTicket'],
    queryFn: fetchActiveTicket,
    enabled,
    retry: false,
    staleTime: 1000 * 60,
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
  });

  const updateTicketMutation = useMutation({
    mutationFn: async (ticketingId: number) => {
      return updateTicketApi(ticketingId);
    },
  });

  return {
    activeTicketId: activeTicket?.ticketingId || null,
    activeTicket,
    isLoading,
    createTicket: createTicketMutation.mutateAsync,
    updateTicket: updateTicketMutation.mutateAsync,
  };
};
