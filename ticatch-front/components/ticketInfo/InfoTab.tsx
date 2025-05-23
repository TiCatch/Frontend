import { TicketingLevel } from 'types';
import { detailContentByLevel } from '@constants/ticketDetail';
import { setListImage } from '@constants/imagePath';

interface InfoTabContentProps {
  level: TicketingLevel;
}

function InfoTabContent({ level }: InfoTabContentProps) {
  const content = detailContentByLevel[level];

  return (
    <div className="space-y-6">
      <p className="text-lg font-bold">공연 소개</p>

      <p className="mb-6 whitespace-pre-line">{content.introduction}</p>
      <div className="pt-10">
        <div className="w-full overflow-hidden rounded-lg shadow-md">
          <img
            src={setListImage[level]}
            alt="셋업리스트 이미지"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      <p className="text-lg font-bold">공연장 정보</p>
      <div className="space-y-2 rounded-lg bg-gray-50 p-4">
        <p>고양이 종합운동장</p>
        <p>주소: 경기도 고양이시 냐옹구 집사로 1234</p>
        <p>전화: 031-123-4567</p>

        <p className="pt-8">교통안내</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>지하철: 10호선 대호역 2번 출구 도보 10분</li>
          <li>
            버스: N123, 63, 25번 버스 이용 (고양이 체육관 또는 대호역 정류장
            하차)
          </li>
          <li>주차: 고양이 체육관 주차장 또는 인근 공영주차장 이용 (유료)</li>
        </ul>
      </div>
    </div>
  );
}

export default InfoTabContent;
