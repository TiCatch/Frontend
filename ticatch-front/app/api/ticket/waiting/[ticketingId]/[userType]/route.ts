import { NextResponse } from 'next/server';
import { axiosClient } from 'lib/axiosClient';
import { TicketingLevel } from 'types';

export const runtime = 'nodejs';

export async function POST(
  req: Request,
  context: { params: { ticketingId: string; userType: string } },
) {
  const params = await context.params;
  if (!params) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  }

  const { ticketingId, userType } = params;

  if (!ticketingId || !userType) {
    return NextResponse.json(
      { error: 'Missing ticketingId or userType' },
      { status: 400 },
    );
  }

  try {
    const body = await req.json();
    const { level } = body;

    if (!level) {
      return NextResponse.json({ error: 'Missing level' }, { status: 400 });
    }
    startTicketing(ticketingId, userType, level);

    return NextResponse.json({
      message: `Simulation started successfully for level: ${level}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 },
    );
  }
}

const startTicketing = async (
  ticketingId: string,
  userType: string,
  level: TicketingLevel,
) => {
  console.log('Start simulation');

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
      return NextResponse.json({ error: 'Invalid level' }, { status: 400 });
  }

  let k = 0.7;
  let time = 0;

  for (let i = 0; i < userCount; ) {
    let batchSize = Math.max(
      Math.round(initialBatchSize * Math.exp(-k * time)),
      minBatchSize,
    );

    const batch = Array.from(
      { length: Math.min(batchSize, userCount - i) },
      (_, index) => i + index,
    );
    i += batch.length;
    time += 1;

    await Promise.all(
      batch.map(async (id) => {
        try {
          const response = await axiosClient.get(
            `/ticket/waiting/${ticketingId}/${userType}`,
          );
          console.log('id:', id, response?.data?.data);
        } catch (error) {
          console.log(error);
        }
      }),
    );

    console.log(`배치 ${i / batchSize + 1}완료 (Batch Size: ${batchSize})`);

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  console.log('모두 완료~');
};
