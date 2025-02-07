import CommonButton from '@components/button/CommonButton';
import Image from 'next/image';

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  subtitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

const CommonModal: React.FC<ModalProps> = ({
  onClose,
  onConfirm,
  title,
  subtitle,
  confirmButtonText = '확인',
  cancelButtonText = '취소',
}) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-blackTip-0.6">
      <div className="flex min-h-[250px] min-w-[400px] flex-col rounded-lg bg-white">
        <button className="pl-[16px] pt-[16px]" onClick={onClose}>
          <Image
            src="/icons/CloseIcon.svg"
            alt="close"
            width={24}
            height={24}
          />
        </button>
        <div className="flex flex-1 flex-col items-center justify-center p-[16px]">
          <p className="text-xl font-bold">{title}</p>
          <p className="text-gray-300">{subtitle}</p>
          <div className="flex-1"></div>
          <div className="flex w-full justify-center gap-4">
            <CommonButton
              title={cancelButtonText}
              backgroundColor="bg-white"
              textColor="text-gray-500"
              borderColor="border-gray-300"
              onClick={onClose}
            />

            <CommonButton
              title={confirmButtonText}
              textColor="text-white"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
