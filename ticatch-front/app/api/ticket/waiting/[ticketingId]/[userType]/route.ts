import { NextResponse, NextRequest } from 'next/server';
import { axiosClient } from 'lib/axiosClient';
import { TicketingLevel } from 'types';

export async function POST(req: NextRequest, context: any) {
  const params = (await context.params) as Record<string, string>;

  if (!params?.ticketingId || !params?.userType) {
    return NextResponse.json(
      { error: '티켓팅 아이디나 유저 타입이 존재하지 않습니다.' },
      { status: 400 },
    );
  }

  const { ticketingId, userType } = params;

  const body = await req.json();
  const { level, batchIndex = 0 } = body;

  if (!level) {
    return NextResponse.json(
      { error: '레벨이 존재하지 않습니다.' },
      { status: 400 },
    );
  }

  const nextBatch = await startTicketing(
    ticketingId,
    userType,
    level,
    batchIndex,
  );

  return NextResponse.json(nextBatch);
}

const startTicketing = async (
  ticketingId: string,
  userType: string,
  level: TicketingLevel,
  batchIndex: number,
) => {
  console.log(`Batch ${batchIndex}`);

  let userCount: number;
  let initialBatchSize: number;
  const minBatchSize = 1;

  switch (level) {
    case 'EASY':
      userCount = 150;
      initialBatchSize = 20;
      break;
    case 'NORMAL':
      userCount = 500;
      initialBatchSize = 70;
      break;
    case 'HARD':
      userCount = 800;
      initialBatchSize = 100;
      break;
    default:
      console.error('유효하지 않은 레벨입니다.');
      return { done: true };
  }

  const k = 0.7;
  const batchSize = Math.max(
    Math.round(initialBatchSize * Math.exp(-k * batchIndex)),
    minBatchSize,
  );

  const batchStartIndex = batchIndex * batchSize;
  if (batchStartIndex >= userCount) {
    return { done: true };
  }

  const batch = Array.from(
    { length: Math.min(batchSize, userCount - batchStartIndex) },
    (_, index) => batchStartIndex + index,
  );

  console.log(`Batch ${batchIndex} 실행 중 (Size: ${batch.length})`);

  const responses = await Promise.allSettled(
    batch.map(async (id) => {
      try {
        const response = await axiosClient.get(
          `/ticket/waiting/${ticketingId}/${userType}`,
        );

        if (Number(response?.data?.statusCode) === 442) {
          console.log('442 응답 수신: ', response?.data?.messages);
          throw new Error('STOP_PROCESS');
        }

        console.log(`요청 성공 - ID: ${id}, 응답:`, response?.data?.data);
        return response?.data;
      } catch (error) {
        if ((error as Error).message === 'STOP_PROCESS') {
          throw error;
        }
        return null;
      }
    }),
  );

  const has442Error = responses.some(
    (res) =>
      res.status === 'rejected' && res.reason?.message === 'STOP_PROCESS',
  );

  if (has442Error) {
    return { done: true };
  }

  return {
    nextBatch: batchIndex + 1,
    ticketingId,
    userType,
    level,
    done: false,
  };
};
