'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { approvePayment } from 'api';

export default function PaymentPageClient() {
  const searchParams = useSearchParams();
  const pg_token = searchParams.get('pg_token');
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!pg_token || !accessToken) return;

    const ticketingId = localStorage.getItem('ticketingId');
    const seatInfo = localStorage.getItem('seatInfo');

    const processPayment = async () => {
      try {
        console.log(ticketingId, seatInfo);
        console.log('✅ 결제 완료! pg_token:', pg_token);
        await approvePayment(pg_token);

        // window.opener.opener.location.href = '/ticket/complete';
        // window.close();
        // window.opener.close();
      } catch (error) {
        console.error('❌ 결제 승인 실패:', error);
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
