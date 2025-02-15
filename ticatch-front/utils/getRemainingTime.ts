export const getRemainingTime = (targetTime: number): string => {
  const now = Date.now() + 9 * 60 * 60 * 1000;
  const timeDiffMs = Math.max(0, targetTime - now);

  if (timeDiffMs === 0) return '0:00';

  const minutes = Math.floor(timeDiffMs / 1000 / 60);
  const seconds = Math.floor((timeDiffMs / 1000) % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
