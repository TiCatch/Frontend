'use client';

import dynamic from 'next/dynamic';
import Loading from '@app/loading';

const TicketDetailPage = dynamic(() => import('./TicketDetailPage'), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Page() {
  return <TicketDetailPage />;
}
