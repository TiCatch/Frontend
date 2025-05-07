'use client';

import { useEffect } from 'react';
import { approvePayment } from 'api';
import { useActiveTicket, useUserStatus } from '@hooks';

interface PaymentPageClientProps {
  pg_token: string;
}

export default function PaymentPageClient({
  pg_token,
}: PaymentPageClientProps) {
  const { isLoggedIn, isLoading: isUserLoading } = useUserStatus();
  const { successTicket } = useActiveTicket(isLoggedIn && !isUserLoading);
  useEffect(() => {
    if (!pg_token) return;
    const ticketingId = Number(localStorage.getItem('ticketingId'));
    const seatInfo = localStorage.getItem('seatInfo') as string;

    const processPayment = async () => {
      try {
        await approvePayment(pg_token);
        await successTicket({ ticketingId, seatInfo });

        localStorage.setItem('paymentSuccess', 'true');
        localStorage.removeItem('paymentSuccess');
        localStorage.removeItem('ticketingId');
        localStorage.removeItem('seatInfo');
        window.close();
        window.opener.close();
      } catch (error) {
        console.error(error);
      }
    };

    processPayment();
  }, [pg_token]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg font-bold">결제 확인 중...</p>
    </div>
  );
}
