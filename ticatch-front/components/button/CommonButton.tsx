interface ButtonProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const CommonButton: React.FC<ButtonProps> = ({
  title,
  backgroundColor = 'bg-primary',
  textColor = 'text-white',
  isDisabled = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${textColor} rounded-12 px-[48px] py-[14px] text-lg ${isDisabled ? 'cursor-not-allowed bg-gray-300' : `${backgroundColor}`}`}>
      {title}
    </button>
  );
};

export default CommonButton;
