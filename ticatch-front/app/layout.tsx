import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from 'providers';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getUserStatusServer } from 'api/auth.server';

const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/Pretendard-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'TiCatch - 티켓팅 연습 티캐치',
  description: '당신의 티켓팅 실력을 확인하세요.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['userStatus'],
    queryFn: getUserStatusServer,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body className={pretendard.variable}>
        <Providers dehydratedState={dehydratedState}>{children}</Providers>
      </body>
    </html>
  );
}
