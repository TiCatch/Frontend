'use client';

import { fetchSVG } from '@utils/fetchSVG';
import { useEffect, useState } from 'react';

const TotalSeats = ({
  setSelectedSection,
}: {
  setSelectedSection: (value: string | null) => void;
}) => {
  const [totalSVG, setTotalSVG] = useState<string | null>(null);

  useEffect(() => {
    const loadSvg = async () => {
      const svg = await fetchSVG(
        'https://ticatch-content.s3.ap-southeast-2.amazonaws.com/seat-img/TOTAL.svg',
      );
      setTotalSVG(svg);
    };

    loadSvg();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as SVGElement;
    const targetClass = target.getAttribute('class');

    if (target.tagName === 'path' && targetClass !== 'STAGE') {
      setSelectedSection(targetClass);
    }
  };

  const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as SVGElement;
    const targetClass = target.getAttribute('class');

    if (target.tagName === 'path' && targetClass !== 'STAGE') {
      target.style.opacity = '0.5';
      target.style.cursor = 'pointer';
    }
  };

  const handleMouseOut = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as SVGElement;
    const targetClass = target.getAttribute('class');
    if (target.tagName === 'path' && targetClass !== 'STAGE') {
      target.style.opacity = '1';
    }
  };

  return (
    <div
      className="h-full"
      dangerouslySetInnerHTML={{ __html: totalSVG || '' }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
    />
  );
};

export default TotalSeats;
