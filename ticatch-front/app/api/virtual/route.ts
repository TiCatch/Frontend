import { NextResponse } from "next/server";
import axiosClient from "@/lib/axiosClient";

export const runtime = "nodejs"; // Node.js 환경에서 실행

let isSimulationRunning = true;

export async function GET() {
  const serverStartTime = new Date(Date.now() + 5000); // 현재 시간 + 5초
  const now = new Date();
  const delay = serverStartTime.getTime() - now.getTime();

  console.log(`serverStartTime: ${serverStartTime}`);
  console.log(`현재 시간: ${now}`);
  console.log(`딜레이(ms): ${delay}`);

  if (delay > 0) {
    console.log(`Waiting for ${delay}ms before starting...`);
    setTimeout(() => {
      console.log("Simulation started!");
      startTicketing();
    }, delay);
  } else {
    console.log("Start time already passed, starting immediately.");
    startTicketing();
  }

  return NextResponse.json({ message: "Simulation scheduled successfully." });
}

export async function POST() {
  console.log("Simulation stopped!");
  isSimulationRunning = false; // 실행 중단 플래그 설정
  return NextResponse.json({ message: "Simulation stopped successfully." });
}

const startTicketing = async () => {
  console.log("Starting ticketing simulation...");

  const userCount = 10000;
  const batchSize = 100;
  // const intervalMs = 1; // 1ms 간격

  for (let i = 0; i < userCount; i += batchSize) {
    if (!isSimulationRunning) {
      console.log("Simulation has been stopped!");
      break; // 중단 플래그가 설정되면 루프 중지
    }
    const batch = Array.from({ length: batchSize }, (_, index) => i + index);
    await Promise.all(
      batch.map(async (id) => {
        const requestTime = new Date();
        const response = await axiosClient.get("/");
        console.log(
          `유저 ${
            id + 1
          } 요청, 요청 시간 : ${requestTime.toISOString()} ${requestTime.getTime()}ms, ${
            response.data
          }`
        ); // -> post 요청
      })
    );
    console.log(`배치 ${i / batchSize + 1}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};
