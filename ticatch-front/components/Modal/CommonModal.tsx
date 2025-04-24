import CommonButton from '@components/button/CommonButton';
import Image from 'next/image';
import { Close } from '@mui/icons-material';

interface ModalProps {
  onClose?: () => void;
  onConfirm: () => void;
  title: string;
  subtitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  closeOnClickOutside?: boolean;
}

const CommonModal: React.FC<ModalProps> = ({
  onClose,
  onConfirm,
  title,
  subtitle,
  confirmButtonText = '확인',
  cancelButtonText = '취소',
  closeOnClickOutside = true,
}) => {
  const handleOutsideClick = () => {
    if (onClose && closeOnClickOutside) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-blackTip-0.6"
      onClick={handleOutsideClick}>
      <div
        className="flex min-h-[225px] w-[430px] flex-col gap-[14px] rounded-[24px] bg-white p-[20px]"
        onClick={(e) => e.stopPropagation()}>
        {onClose ? (
          <button
            onClick={onClose}
            className="flex h-[24px] w-[24px] items-center justify-center text-gray-800 transition-colors duration-200 hover:text-gray-500">
            <Close width={24} height={24} />
          </button>
        ) : (
          <div className="h-[24px] w-[12px]" />
        )}
        <div className="flex flex-col items-center justify-between gap-[14px] break-keep px-[24px] text-center">
          <p className="whitespace-pre-line text-xl leading-[1.4]">{title}</p>
          <p className="text-l text-gray-300">{subtitle}</p>
        </div>
        <div className="flex w-full justify-center gap-[14px] pb-[8px] pt-[12px]">
          {onClose && (
            <CommonButton
              title={cancelButtonText}
              backgroundColor="bg-white"
              textColor="text-gray-500"
              borderColor="border-gray-300"
              onClick={onClose}
            />
          )}

          <CommonButton
            title={confirmButtonText}
            textColor="text-white"
            onClick={() => {
              onConfirm();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
