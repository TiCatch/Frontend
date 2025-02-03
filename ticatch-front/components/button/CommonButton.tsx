interface ButtonProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const CommonButton: React.FC<ButtonProps> = ({
  title,
  backgroundColor = 'bg-primary',
  textColor = 'text-white',
  isDisabled = false,
  onClick,
  borderColor = 'border-transparent',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`min-w-[160px] whitespace-nowrap ${textColor} border ${borderColor} rounded-12 px-[48px] py-[14px] text-lg ${isDisabled && 'cursor-not-allowed'} ${backgroundColor}`}>
      {title}
    </button>
  );
};

export default CommonButton;
