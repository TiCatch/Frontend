'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { approvePayment } from 'api';

export default function PaymentPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pg_token = searchParams.get('pg_token');
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!pg_token || !accessToken) return;

    const ticketingId = localStorage.getItem('ticketingId');
    const seatInfo = localStorage.getItem('seatInfo');

    const processPayment = async () => {
      try {
        await approvePayment(pg_token);
        localStorage.setItem('paymentSuccess', 'true');
        localStorage.removeItem('paymentSuccess');
        window.close();
        window.opener.close();
      } catch (error) {
        console.error(error);
      }
    };

    processPayment();
  }, [pg_token, accessToken]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg font-bold">결제 확인 중...</p>
    </div>
  );
}
