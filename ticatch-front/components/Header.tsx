'use client';

import { logoImage } from '@constants/imagePath';
import { useLogout, useUserStatus } from '@hooks';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Header = () => {
  const { data: isLoggedIn } = useUserStatus();
  const logout = useLogout();
  const router = useRouter();

  return (
    <header className="flex justify-between py-5">
      <Link href="/">
        <Image src={logoImage} alt="Header" width={128} height={24} />
      </Link>
      {isLoggedIn ? (
        <button onClick={logout}>로그아웃</button>
      ) : (
        <a href="/login">로그인</a>
      )}
    </header>
  );
};

export default Header;
