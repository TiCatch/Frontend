'use client';

import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Header'), {
  ssr: false,
  loading: () => <div className="h-[60px] bg-background" />,
});

export default function HeaderDynamic() {
  return <Header />;
}
