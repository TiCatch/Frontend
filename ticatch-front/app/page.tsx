'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HeaderDynamic from '@components/HeaderDynamic.client';
import FooterDynamic from '@components/FooterDynamic.client';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
}

const FadeUp = ({ children, delay = 0 }: FadeUpProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true, amount: 0.4 }}>
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <div className="container relative h-dvh overflow-hidden break-keep">
      <div className="flex h-dvh snap-y snap-mandatory flex-col overflow-y-scroll scroll-smooth">
        {/* 헤더 */}
        <div className="sticky top-0 z-50">
          <HeaderDynamic />
        </div>
        {/* 소개 섹션 */}
        <section className="w-full px-4 py-16 md:snap-center md:py-20">
          <div className="container mx-auto flex flex-col items-center gap-12 md:flex-row">
            <div className="md:w-1/2">
              <FadeUp>
                <h1 className="mb-6 text-2xl font-bold text-gray-700 md:text-3xl">
                  TiCatch란
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-gray-700">
                  콘서트 티켓팅을 실전처럼 연습할 수 있는 시뮬레이션
                  서비스입니다.
                  <br /> 난이도별 공연을 선택하고,
                  <br /> 좌석 오픈 → 대기열 → 빠른 클릭 → 매진의 아찔함까지{' '}
                  <br />
                  실제 예매처럼 전 과정을 그대로 재현해 드려요.
                </p>
                <Link
                  href="/ticket/level"
                  className="!rounded-button transform cursor-pointer whitespace-nowrap rounded-lg bg-[#c04cfd] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-opacity-90 hover:shadow-xl">
                  지금 연습하기
                </Link>
              </FadeUp>
            </div>
            <div className="relative md:w-1/2">
              <FadeUp delay={0.2}>
                <Image
                  src="/images/TiCatchHomeImage.jpg"
                  width={500}
                  height={400}
                  alt="티캐치 서비스 소개"
                  className="w-full rounded-xl object-cover object-top shadow-2xl"
                />
              </FadeUp>
            </div>
          </div>
          <FadeUp delay={0.4}>
            <div className="mt-16 rounded-xl border-l-4 border-sub-3 bg-white p-6 shadow-md">
              <div className="flex items-start">
                <div className="pr-5 text-sub-3">
                  <InfoIcon sx={{ fontSize: 32 }} />
                </div>
                <div className="flex flex-col">
                  <h3 className="mb-1 text-l font-bold text-sub-3">
                    💳 결제 단계까지 체험 가능
                  </h3>
                  <p className="text-gray-700">
                    연습 과정에서 사용하는 카카오페이는 모의 결제로, 실제 돈은
                    빠져나가지 않아요.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </section>
        {/* 추천 대상 섹션 */}
        <section className="py-20 md:snap-center">
          <div className="container mx-auto px-6">
            <FadeUp>
              <h2 className="mb-12 text-center text-2xl font-bold">
                <span className="text-gray-700">
                  🧑‍🎤 이런 분들께 추천 드려요.
                </span>
              </h2>
            </FadeUp>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
              {[...Array(4).keys()].map((_, idx) => (
                <FadeUp key={idx} delay={idx * 0.2}>
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 text-sub-2">
                      <CheckCircleIcon />
                    </div>
                    <p className="text-lg text-gray-700">
                      {
                        [
                          '매번 인기 콘서트 티켓팅에서 놓치는 분',
                          '예매 화면이 어떻게 나올지 몰라 긴장되는 분',
                          '클릭 타이밍, 좌석 선택, 결제까지 티켓팅 전 과정을 미리 연습하고 싶은 분',
                          '"어떤 좌석이 좋은지 잘 모르겠어요…" → 실제 좌석 배치도 기반 연습으로 공연장 감 잡기 OK!',
                        ][idx]
                      }
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
        {/* 주요 기능 섹션 */}
        <FadeUp>
          <section className="py-16 md:snap-center">
            <div className="container mx-auto px-6">
              <h2 className="mb-8 text-center text-2xl font-bold">
                <span className="text-gray-700">🛠️ 주요 기능</span>
              </h2>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {[...Array(3).keys()].map((_, idx) => {
                  const features = [
                    {
                      title: '🎯 실전급 티켓팅 시뮬레이션',
                      img: '/images/TiCatchDescription1.png',
                      bg: 'from-[#ffbe0b]',
                      desc: '실제 예매 흐름 그대로: 입장 → 좌석 선택 → 예약 완료. 긴장감, 클릭 타이밍, 매진 압박까지 리얼하게 재현합니다.',
                    },
                    {
                      title: '⏱️ 카운트다운 & 자동 오픈',
                      img: '/images/TiCatchDescription2.png',
                      bg: 'from-[#3396ff]',
                      desc: '연습 원하는 시간 설정하면 정해진 시간에 맞춰 예매 시작! 예매 전 카운트다운으로 몰입감이 높아집니다.',
                    },
                    {
                      title: '💺 좌석 선택 연습',
                      img: '/images/TiCatchDescription3.png',
                      bg: 'from-[#8cc084]',
                      desc: '실제 공연장 구조 기반의 좌석 배치도를 사용하며, 인기 좌석은 금방 매진! 실전처럼 빠르게 판단하고 클릭하는 반응 연습이 가능합니다.',
                    },
                  ];
                  return (
                    <FadeUp key={idx} delay={idx * 0.2}>
                      <div className="transform overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                        <div
                          className={`relative h-48 overflow-hidden bg-${features[idx].bg}`}>
                          <Image
                            src={features[idx].img}
                            alt={features[idx].title}
                            width={672}
                            height={512}
                            className="h-full w-full object-cover object-top"
                          />
                          <div
                            className={`absolute inset-0 bg-gradient-to-t ${features[idx].bg} opacity-40`}
                          />
                        </div>
                        <div className="min-h-[188px] p-6">
                          <h3 className="mb-3 text-l font-bold text-gray-800">
                            {features[idx].title}
                          </h3>
                          <p className="text-gray-600">{features[idx].desc}</p>
                        </div>
                      </div>
                    </FadeUp>
                  );
                })}
              </div>
            </div>
          </section>
        </FadeUp>
        {/* CTA 섹션 */}
        <section className="w-full bg-gradient-to-t from-purple-100 to-background py-20 md:snap-center">
          <FadeUp>
            <div className="container mx-auto px-6 text-center">
              <h2 className="mb-6 text-xl font-bold md:text-2xl">
                티캐치로 연습하고, <br /> 실전 티켓팅에서 진짜 팬이 되세요!
              </h2>
              <p className="mx-auto mb-10 max-w-3xl text-xl">
                지금 바로 티켓팅 연습을 시작하고 실전에서 원하는 좌석을
                확보하세요.
              </p>
              <Link
                href="/ticket/level"
                className="!rounded-button transform cursor-pointer whitespace-nowrap rounded-lg bg-[#c04cfd] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-opacity-90 hover:shadow-xl">
                지금 연습하기
              </Link>
            </div>
          </FadeUp>
        </section>
        {/* 푸터 */}
        <section className="md:snap-center">
          <FooterDynamic />
        </section>
      </div>
    </div>
  );
}
