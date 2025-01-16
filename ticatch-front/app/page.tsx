"use client";

export default function Home() {
  const handleTrigger = async () => {
    try {
      const res = await fetch("/api/virtual", { method: "GET" });
      const data = await res.json();
      console.log(data.message); // 'Simulation scheduled successfully.'
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleStop = async () => {
    try {
      const res = await fetch("/api/virtual", { method: "POST" });
      const data = await res.json();
      console.log(data.message); // 'Simulation stopped successfully.'
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <button onClick={handleTrigger}>가보자</button>
      <button onClick={handleStop}>멈추자</button>
    </div>
  )
}
