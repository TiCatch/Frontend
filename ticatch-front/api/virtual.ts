export const triggerVirtualUsers = async (
  ticketingId: string,
  level: string,
  batchIndex = 0,
) => {
  try {
    const res = await fetch(`/api/ticket/waiting/${ticketingId}/VIRTUAL`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ level, batchIndex }),
    });

    const data = await res.json();

    if (!data.done) {
      setTimeout(() => {
        triggerVirtualUsers(ticketingId, level, data.nextBatch);
      }, 1000);
    } else {
      console.log('모든 배치 완료!');
    }
  } catch (error) {
    console.error('가상 요청 시작 에러: ', error);
  }
};
