'use client';

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
  const isTicketingPage = pathname.includes('/ticketing');

  if (isTicketingPage) return null;

  return (
    <header className="relative sticky top-0 z-[5] min-w-[320px] overflow-hidden backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 bg-[var(--background)] opacity-70" />
      <div className="container relative z-10 flex px-[16px] py-5 text-s md:px-[32px]">
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
      </div>
    </header>
  );
};

export default Header;
