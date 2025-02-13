'use client';
import Image from 'next/image';
import { kakaoPayImage } from '@constants/imagePath';
import { TERMS_OF_KAKAOPAY } from '@constants/terms';

export default function PaymentPage() {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="text-lg font-bold">결제/예매정보</div>
      <div className="flex flex-grow gap-4">
        {/* 왼쪽 구역 */}
        <div className="flex w-2/3 flex-col gap-4 rounded bg-gray-50 p-4 shadow-md">
          <div>
            <span>결제수단</span>
            <div className="mt-2 flex items-center gap-2">
              <ul className="list-inside list-disc">
                <li>카카오페이</li>
              </ul>
              <Image src={kakaoPayImage} alt="pay-img" width={30} height={30} />
            </div>
          </div>

          <div className="flex min-h-0 flex-grow flex-col gap-4">
            <span>예매자동의</span>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>[필수] 카카오 전자금융 이용약관 동의</span>
            </div>
            <div className="h-0 flex-grow overflow-y-auto text-sm text-gray-600">
              <p className="whitespace-pre-wrap">{TERMS_OF_KAKAOPAY}</p>
            </div>
          </div>
        </div>

        {/* 오른쪽 구역 */}
        <div className="flex w-1/3 flex-col gap-4 rounded bg-gray-50 p-4 shadow-md">
          <div className="flex justify-center text-gray-600">
            공연제목 공연제목
          </div>
          <div className="flex flex-1 items-center justify-center bg-gray-300"></div>

          <div className="mt-auto w-full">
            <span className="font-bold">총 결제금액 0원</span>
            <button className="mt-4 w-full rounded-12 bg-primary py-4 text-lg text-white">
              결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
