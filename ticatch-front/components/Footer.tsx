'use client';

import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import MainAd from './Ad/MainAd';

const Footer = () => {
  const pathname = usePathname();
  const isTicketingPage = pathname.includes('/ticketing');

  if (isTicketingPage) return null;

  return (
    <footer className="relative text-sm text-white">
      <div className="flex w-full justify-center bg-transparent">
        <MainAd />
      </div>
      <div className="bg-[#1c2531]">
        <div className="container grid grid-cols-1 gap-8 px-6 py-10 md:grid-cols-4">
          <div>
            <h2 className="mb-2 text-lg font-bold">TiCatch</h2>
            <p className="mb-4 text-gray-400">최고의 공연 예매 연습 서비스</p>
            <div className="flex gap-3 text-xl text-gray-400">
              {/* 추후연결 */}
              <FaInstagram />
              <FaYoutube />
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-base font-semibold">고객센터</h3>
            <p className="text-gray-300">010-9986-3051</p>
            <p className="text-gray-400">평일 10:00~18:00</p>
            <p className="text-gray-400">주말 및 공휴일 휴무</p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-semibold">서비스 소개</h3>
            <p className="text-gray-400">대표: 오유정</p>
            <p className="text-gray-400">팀원: 이기태, 권현수, 송준우</p>
            <a
              href="https://github.com/TiCatch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 underline hover:text-white">
              github.com/TiCatch
            </a>
          </div>
          <div>
            <h3 className="mb-2 text-base font-semibold">후원하기</h3>
            <p className="text-gray-400">
              서비스가 마음에 드셨다면 커피 한 잔 사주세요 ☕
            </p>
            <a
              href="https://buymeacoffee.com/ticatch"
              className="text-sm text-yellow-300 underline">
              Buy me a coffee →
            </a>
          </div>

          {/* <div>
          <h3 className="mb-2 text-base font-semibold">바로가기</h3>
          <ul className="space-y-1 text-gray-400">
            <li>
              <a href="/about" className="hover:underline">
                회사소개
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                이용약관
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">
                개인정보처리방침
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:underline">
                자주 묻는 질문
              </a>
            </li>
          </ul>
        </div> */}
        </div>

        <div className="flex items-center justify-between border-t border-gray-700 px-6 py-4 text-xs text-gray-500">
          <p>© 2025 TiCatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
