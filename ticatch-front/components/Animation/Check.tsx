import Lottie from 'lottie-react';
import AnalyzingLottie from 'public/Animation/check.json';

const CheckAnimation = () => {
  return (
    <Lottie
      animationData={AnalyzingLottie}
      loop={false}
      className="h-[200px] w-[200px]"
    />
  );
};

export default CheckAnimation;
