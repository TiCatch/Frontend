import Image from 'next/image';
import { headerImage } from '@constants/imagePath';

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container">
      <div className="flex justify-between py-5">
        <Image src={headerImage} alt="Header" width={128} height={24} />
        <span>로그아웃</span>
      </div>
      {children}
    </div>
  );
}
