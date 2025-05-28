interface ButtonProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  isDisabled?: boolean;
  onClick?: () => void;
  icon?: React.JSX.Element;
  type?: string;
}

const CommonButton: React.FC<ButtonProps> = ({
  title,
  backgroundColor = 'bg-primary',
  textColor = 'text-white',
  isDisabled = false,
  onClick,
  borderColor = 'border-transparent',
  icon,
  type = 'medium',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`relative flex h-[46px] ${type === 'small' ? 'min-w-[66px]' : 'min-w-[160px]'} items-center justify-center whitespace-nowrap ${textColor} border ${borderColor} rounded-[8px] ${type === 'small' ? 'px-[14px]' : 'px-[32px]'} py-[14px] text-m ${isDisabled && 'cursor-not-allowed'} btn-hover-overlay overflow-hidden ${backgroundColor} gap-2`}>
      {icon}
      {title}
    </button>
  );
};

export default CommonButton;
