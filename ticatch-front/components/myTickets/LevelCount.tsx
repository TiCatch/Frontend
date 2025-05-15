const LevelCount = ({
  cnt,
  level,
  color,
}: {
  cnt: string;
  level: string;
  color: string;
}) => {
  return (
    <div className="ml-[40px] flex flex-col items-center">
      <div className={`mb-[8px] text-xl text-${color}`}>{cnt}</div>
      <div className="align-center break-keep text-center text-2xs">
        난이도 {level}
      </div>
    </div>
  );
};

export default LevelCount;
