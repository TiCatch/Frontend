export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
      <p className="mt-4 text-base text-gray-600">로딩 중입니다...</p>
    </div>
  );
}
