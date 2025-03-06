'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { approvePayment, successTicket } from 'api';

export default function PaymentPageClient() {
  const searchParams = useSearchParams();
  const pg_token = searchParams.get('pg_token');

  useEffect(() => {
    if (!pg_token) return;

    const ticketingId = localStorage.getItem('ticketingId');
    const seatInfo = localStorage.getItem('seatInfo') as string;

    const processPayment = async () => {
      try {
        await approvePayment(pg_token);
        await successTicket(Number(ticketingId), seatInfo);

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
