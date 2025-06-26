'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getTicket } from 'api';
import { TicketingLevel } from 'types';
import { useParams } from 'next/navigation';
import Loading from '@app/loading';

interface TicketingContextType {
  ticketingId: string;
  level: TicketingLevel;
}

const TicketingContext = createContext<TicketingContextType | undefined>(
  undefined,
);

export const TicketingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const params = useParams<{ ticketingId: string }>();
  const [level, setLevel] = useState<TicketingLevel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      if (params.ticketingId) {
        const { data, status } = await getTicket(Number(params.ticketingId));
        if (status === 200 && data) {
          setLevel(data.ticketingLevel);
        }
      }
      setIsLoading(false);
    };

    fetchTicket();
  }, [params.ticketingId]);

  if (isLoading || !params.ticketingId || !level) return <Loading />;

  return (
    <TicketingContext.Provider
      value={{ ticketingId: params.ticketingId, level }}>
      {children}
    </TicketingContext.Provider>
  );
};

export const useTicketingContext = () => {
  const context = useContext(TicketingContext);
  if (!context) throw new Error('TicketingContext 오류');
  return context;
};
