'use client';
import Header from '@components/Header';
import { usePathname } from 'next/navigation';

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isTicketingPage = pathname.includes('/ticketing');
  return (
    <div className="container">
      {!isTicketingPage && <Header />}
      {children}
    </div>
  );
}
