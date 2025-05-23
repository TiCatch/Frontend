function GuideTabContent() {
  return (
    <div className="space-y-6">
      <p className="text-lg font-bold">관람 안내</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>공연 시작 1시간 전부터 입장 대기 및 굿즈 구매가 가능합니다.</li>
        <li>입장은 공연 시작 30분 전부터 순차적으로 진행됩니다.</li>
        <li>8세 미만의 아동은 안전상의 이유로 입장이 제한됩니다.</li>
        <li>스탠딩 구역은 현장 스태프의 안내에 따라 질서 있게 이용해주세요.</li>
        <li>
          응원봉, 슬로건, 핸드메이드 플래카드 등은 타 관객의 시야를 가리지 않는
          선에서 자유롭게 사용 가능합니다.
        </li>
      </ul>
      <p className="text-lg font-bold">좌석 등급 및 가격</p>
      <table className="w-full border-collapse border border-gray-200 text-center [&>tbody>tr>td]:border [&>thead>tr>th]:border [&_td]:border-gray-200 [&_th]:border-gray-200">
        <thead className="bg-blue-50">
          <tr>
            <th>좌석 등급</th>
            <th>가격</th>
            <th>위치</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A,E 구역</td>
            <td>120,000원</td>
            <td>1층 앞</td>
          </tr>
          <tr>
            <td>B,C,D 구역</td>
            <td>100,000원</td>
            <td>1층 측면, 중앙</td>
          </tr>
          <tr>
            <td>1~15 구역</td>
            <td>80,000원</td>
            <td>2층 전체</td>
          </tr>
          <tr>
            <td>24~43 구역</td>
            <td>60,000원</td>
            <td>3층 전체</td>
          </tr>
        </tbody>
      </table>

      <div className="space-y-6">
        <p className="text-lg font-bold">할인 정보</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>장애인 및 국가유공자: 50% 할인 (본인 및 동반 1인)</li>
          <li>65세 이상 노인: 30% 할인 (본인만)</li>
          <li>학생 할인: 20% 할인 (초/중/고/대학생, 학생증 지참 필수)</li>
          <li>단체 할인: 20명 이상 동일 등급 좌석 예매 시 20% 할인</li>
        </ul>
      </div>
    </div>
  );
}

export default GuideTabContent;
