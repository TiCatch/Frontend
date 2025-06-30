'use client';

import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Header'), {
  ssr: false,
  loading: () => <div className="bg-white/70 h-[60px]" />,
});

export default function HeaderDynamic() {
  return <Header />;
}
