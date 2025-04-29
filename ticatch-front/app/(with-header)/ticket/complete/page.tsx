'use client';

import dynamic from 'next/dynamic';

const CheckAnimation = dynamic(() => import('@components/Animation/Check'), {
  ssr: false,
  loading: () => <div className="h-[200px] w-[200px]" />,
});

export default function CompletePage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden text-center">
      <CheckAnimation />
      <h1 className="mt-6 text-2xl font-bold">티켓 예매가 완료되었습니다.</h1>
      <p className="mt-2">자세한 정보는 '마이페이지'에서 확인이 가능합니다.</p>
    </div>
  );
}
