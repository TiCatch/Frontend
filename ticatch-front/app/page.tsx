import Image from 'next/image';
import Link from 'next/link';
import { logoImage } from '@constants/imagePath';
import HeaderDynamic from '@components/HeaderDynamic.client';

export default function Home() {
  return (
    <div className="relative">
      <div className="container absolute left-1/2 top-0 z-[1] w-[100%] -translate-x-1/2">
        <HeaderDynamic />
      </div>
      <div className="relative flex h-dvh flex-col items-center justify-center gap-[72px] overflow-hidden">
        {/* 로고 이미지 */}
        <div className="relative h-[64px] w-[343px]">
          <Image src={logoImage} alt="TiCatch" fill className="object-cover" />
        </div>

        {/* 티켓팅 이동 버튼 */}
        <Link href="/ticket/level" className="group relative">
          <div className="relative z-[3] mb-[16px] h-[96px] w-[96px] overflow-hidden rounded-[16px] bg-purple-500 shadow-inner duration-500 group-hover:scale-105 group-hover:bg-purple-100">
            {/* 질감 효과 */}
            <div className="via-white/20 absolute h-[36px] w-[300px] rotate-[-45deg] animate-shine bg-gradient-to-b from-transparent to-transparent"></div>
          </div>
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-[4] translate-x-[-50%] translate-y-[calc(50%+56px)] animate-show-text whitespace-nowrap text-xl text-gray-400 opacity-0 transition-all duration-[1500ms] group-hover:text-white group-hover:opacity-[100%]">
            좌석을 클릭하세요!
          </div>

          {/* 배경 확산 효과 */}
          <div className="pointer-events-none absolute inset-0 z-[1]">
            <div className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-purple-700 opacity-0 transition-all delay-[500ms] duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[15] group-hover:opacity-100" />
            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-purple-700 opacity-0 transition-all delay-[300ms] duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[16] group-hover:opacity-70" />
            <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-purple-700 opacity-0 transition-all delay-[100ms] duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[17] group-hover:opacity-50" />
          </div>
        </Link>
      </div>
    </div>
  );
}
