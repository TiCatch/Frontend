'use client';
import Image from 'next/image';
import { TERMS_OF_KAKAOPAY } from '@constants/terms';
import { useState } from 'react';
import { requestPayment } from 'api';
import { useSearchParams } from 'next/navigation';
import MainAd from '@components/Ad/MainAd';
import SideAd from '@components/Ad/SideAd';
import { useTicketingContext } from '../TicketingContext';
import { detailContentByLevel } from '@constants/ticketDetail';
import { concertImage, kakaoPayImage } from '@constants/imagePath';
import { seatPrice } from '@constants/ticketingInfo';

export default function PaymentPage() {
  const { ticketingId, level } = useTicketingContext();
  const searchParams = useSearchParams();
  const [isChecked, setIsChecked] = useState(false);

  const { title } = detailContentByLevel[level];
  const seat = searchParams.get('seat') ?? '';
  const section = seat.split(':')[0].replace('S', '');
  const price = seatPrice[section] ?? 0;

  const handlePayment = async () => {
    if (!isChecked) return;
    try {
      const { tid, next_redirect_pc_url } = await requestPayment(
        `구매좌석: ${seat}`,
        price,
      );

      localStorage.setItem('tid', tid);
      localStorage.setItem('ticketingId', ticketingId);
      localStorage.setItem('seatInfo', seat);

      window.open(next_redirect_pc_url, '_blank', 'width=500,height=700');
    } catch (error) {
      console.error('❌ 결제 요청 중 오류 발생:', error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="text-lg font-bold">결제/예매정보</div>
      <div className="flex justify-center">
        <MainAd />
      </div>
      <div className="flex min-h-0 flex-grow flex-col gap-4 md:flex-row">
        {/* 왼쪽 구역 */}
        <div className="flex w-full flex-grow flex-col gap-4 rounded bg-gray-50 p-4 shadow-md md:w-2/3">
          <div>
            <span>결제수단</span>
            <div className="mt-2 flex items-center gap-2">
              <ul className="list-inside list-disc">
                <li>카카오페이</li>
              </ul>
              <Image src={kakaoPayImage} alt="pay-img" width={30} height={30} />
            </div>
          </div>

          <div className="flex flex-grow flex-col gap-4">
            <span>예매자동의</span>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <span
                onClick={() => setIsChecked((prev) => !prev)}
                className="cursor-pointer">
                [필수] 카카오 전자금융 이용약관 동의
              </span>
            </div>
            <div className="h-0 min-h-[160px] flex-grow overflow-y-auto text-sm text-gray-600">
              <p className="whitespace-pre-wrap">{TERMS_OF_KAKAOPAY}</p>
            </div>
          </div>
        </div>

        {/* 오른쪽 구역 */}
        <div className="flex h-full min-h-0 flex-col items-center gap-4 rounded bg-gray-50 p-4 shadow-md md:w-1/3">
          <div className="text-gray-600">{title}</div>

          <div className="flex w-full justify-center">
            <div className="aspect-[3/4] w-2/3 max-w-[180px] overflow-hidden rounded">
              <img
                src={concertImage[level]}
                alt="콘서트 이미지"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="max-h-25 flex w-full justify-center overflow-hidden">
            <div className="w-[250px] max-w-full">
              <SideAd />
            </div>
          </div>

          <div className="mt-auto w-full pt-4">
            <span className="font-bold">
              총 결제금액 {price.toLocaleString()}원
            </span>
            <button
              className={`mt-4 w-full rounded-12 py-4 text-lg ${
                isChecked
                  ? 'bg-primary text-white'
                  : 'cursor-not-allowed bg-gray-300 text-gray-500'
              }`}
              disabled={!isChecked}
              onClick={handlePayment}>
              결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
