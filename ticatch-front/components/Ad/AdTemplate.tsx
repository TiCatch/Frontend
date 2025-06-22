'use client';

import { useEffect, useRef } from 'react';

const AdTemplate = ({
  width,
  height,
  unit,
}: {
  width: number;
  height: number;
  unit: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const adRef = useRef<boolean>(false);

  useEffect(() => {
    if (adRef.current || !containerRef.current) return;

    const ins = document.createElement('ins');
    const script = document.createElement('script');

    ins.className = 'kakao_ad_area';
    ins.style.display = 'block';
    ins.style.textAlign = 'center';

    ins.setAttribute('data-ad-width', `${width}`);
    ins.setAttribute('data-ad-height', `${height}`);
    ins.setAttribute('data-ad-unit', `${unit}`);

    script.async = true;
    script.type = 'text/javascript';
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';

    containerRef.current.appendChild(ins);
    containerRef.current.appendChild(script);

    adRef.current = true;
  }, []);

  return (
    <div
      ref={containerRef}
      className="ad-container w-full"
      style={{ width: width, height: height, maxWidth: width }}>
      <aside className="aside__kakaoAdFit"></aside>
    </div>
  );
};

export default AdTemplate;
