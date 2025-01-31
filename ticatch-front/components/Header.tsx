'use client';

import { logoImage } from '@constants/imagePath';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex justify-between py-5">
      <Link href="/">
        <Image src={logoImage} alt="Header" width={128} height={24} />
      </Link>
      <span>로그아웃</span>
    </header>
  );
};

export default Header;
