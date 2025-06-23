'use client';

import { useEffect, useState } from 'react';
import AdTemplate from './AdTemplate';

const MainAd = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 729);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile === null) return null; // SSR 환경에서는 렌더링하지 않음

  return isMobile ? (
    <AdTemplate width={320} height={100} unit={'DAN-uaxs3BgVT5y4N1qj'} />
  ) : (
    <AdTemplate width={728} height={90} unit={'DAN-Ld1Hz6nVIBih8LMd'} />
  );
};

export default MainAd;
