import Lottie from 'lottie-react';
import AnalyzingLottie from 'public/Animation/count.json';

const CheckAnimation = () => {
  return (
    <Lottie
      animationData={AnalyzingLottie}
      loop={true}
      className="h-[140px] w-[200px]"
    />
  );
};

export default CheckAnimation;
