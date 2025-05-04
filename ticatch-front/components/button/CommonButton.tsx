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
      className={`relative flex h-[46px] min-w-[160px] items-center justify-center whitespace-nowrap ${textColor} border ${borderColor} text-m rounded-[8px] px-[32px] py-[14px] ${isDisabled && 'cursor-not-allowed'} btn-hover-overlay overflow-hidden ${backgroundColor}`}>
      {title}
    </button>
  );
};

export default CommonButton;
