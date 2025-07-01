export const levelAttribute = {
  EASY: {
    backgroundColor: 'bg-sub-4',
    levelText: '하',
  },
  NORMAL: {
    backgroundColor: 'bg-sub-3',
    levelText: '중',
  },
  HARD: {
    backgroundColor: 'bg-primary',
    levelText: '상',
  },
};

export const tabs = [
  { key: 'info', label: '상세정보' },
  { key: 'guide', label: '관람안내' },
  { key: 'reserve', label: '예매안내' },
];

export const seatPrice: { [key: string]: number } = {
  A: 120000,
  E: 120000,
  B: 100000,
  C: 100000,
  D: 100000,

  ...Object.fromEntries(
    Array.from({ length: 15 }, (_, i) => [`${i + 1}`, 80000]),
  ),

  ...Object.fromEntries(
    Array.from({ length: 20 }, (_, i) => [`${i + 24}`, 60000]),
  ),
};
