import Image from 'next/image';
import Link from 'next/link';
import { logoImage } from '@constants/imagePath';

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container">
      <div className="flex justify-between py-5">
        <Link href="/">
          <Image
            src={logoImage}
            alt="Header"
            width={128}
            height={24}
            className="cursor-pointer"
          />
        </Link>
        <span>로그아웃</span>
      </div>
      {children}
    </div>
  );
}
