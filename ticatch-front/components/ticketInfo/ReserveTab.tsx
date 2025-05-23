import { kakaoPayImage } from '@constants/imagePath';
import Image from 'next/image';

function ReserveTabContent() {
  return (
    <div className="space-y-6">
      <p className="text-lg font-bold">예매 안내</p>
      <ul className="list-disc space-y-2 pl-5">
        <li className="text-primary">
          본 예매는 티켓팅 연습을 위한 TiCatch의 가상 예매이며, 어떠한 실제
          결제나 요금 부과가 일어나지 않습니다.
        </li>
        <li>예매는 티켓팅 생성 후 30분 간 가능합니다.</li>
        <li>인터넷, 모바일 앱 예매가 가능합니다.</li>
        <li>예매 후 발송되는 결제 완료 문자를 확인해주세요.</li>
        <li>공연 당일 매표소에서 신분증 제시 후 티켓 수령 가능합니다.</li>
      </ul>
      <p className="text-lg font-bold">취소 및 환불 규정</p>
      <table className="w-full border-collapse border border-gray-200 text-center [&>tbody>tr>td]:border [&>thead>tr>th]:border [&_td]:border-gray-200 [&_th]:border-gray-200">
        <thead className="bg-blue-50">
          <tr>
            <th>취소 시점</th>
            <th>환불 비율</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>공연일 10일 전까지</td>
            <td>100% 환불</td>
          </tr>
          <tr>
            <td>공연일 7일 전까지</td>
            <td>80% 환불</td>
          </tr>
          <tr>
            <td>공연일 3일 전까지</td>
            <td>50% 환불</td>
          </tr>
          <tr>
            <td>공연일 전일 및 당일</td>
            <td>환불 불가</td>
          </tr>
        </tbody>
      </table>

      <p className="text-lg font-bold">결제 방법</p>

      <div className="flex items-center gap-2">
        <ul className="list-disc pl-5">
          <li>카카오페이</li>
        </ul>
        <Image src={kakaoPayImage} alt="pay-img" width={30} height={30} />
      </div>
    </div>
  );
}

export default ReserveTabContent;
