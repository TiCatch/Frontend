'use client';

import { useEffect } from 'react';
import { approvePayment } from 'api';

interface PaymentPageClientProps {
  pg_token: string;
}

export default function PaymentPageClient({
  pg_token,
}: PaymentPageClientProps) {
  useEffect(() => {
    if (!pg_token) return;

    const processPayment = async () => {
      try {
        await approvePayment(pg_token);

        localStorage.setItem('paymentSuccess', 'true');
        localStorage.removeItem('paymentSuccess');
        localStorage.removeItem('ticketingId');
        localStorage.removeItem('tid');
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
    <div className="h-100vdh flex items-center justify-center">
      <p className="text-lg font-bold">결제 확인 중...</p>
    </div>
  );
}
