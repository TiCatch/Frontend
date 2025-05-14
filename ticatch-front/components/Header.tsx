'use client';

import { useEffect, useState } from 'react';
import ConfirmationNumberSharpIcon from '@mui/icons-material/ConfirmationNumberSharp';
import { logoImage } from '@constants/imagePath';
import { useLogout, useUserStatus } from '@hooks';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const { isLoggedIn } = useUserStatus();
  const logout = useLogout();

  return (
    <header className="sticky top-0 z-[10] flex bg-background py-5 text-s backdrop-opacity-80">
      <Link href="/">
        <Image
          src={logoImage}
          alt="Header"
          width={128}
          height={24}
          className={pathname === '/' ? 'invisible' : 'visible'}
        />
      </Link>
      <div className="flex grow justify-end">
        {isLoggedIn ? (
          <div className="flex gap-[36px]">
            <button
              onClick={() => logout.mutate()}
              className="transition-color duration-[200ms] hover:text-purple-500">
              로그아웃
            </button>
            {pathname !== '/myPage' && (
              <Link
                href="/myPage"
                className="transition-color relative flex items-center gap-[4px] fill-purple-600 text-purple-600 duration-[200ms] hover:fill-purple-700 hover:text-purple-700">
                <ConfirmationNumberSharpIcon />
              </Link>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="transition-color duration-[200ms] hover:text-purple-500">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
