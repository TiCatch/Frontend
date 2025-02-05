import CommonButton from '@components/button/CommonButton';
import Image from 'next/image';

interface CancelModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const CancelModal: React.FC<CancelModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="z-1 fixed inset-0 flex items-center justify-center bg-blackTip-0.6">
      <div className="flex h-[250px] w-[400px] flex-col rounded-lg bg-white">
        <button className="pl-[16px] pt-[16px]" onClick={onClose}>
          <Image
            src="/icons/CloseIcon.svg"
            alt="close"
            width={24}
            height={24}
          />
        </button>
        <div className="flex flex-1 flex-col items-center justify-center p-[16px]">
          <p className="text-xl font-bold">
            예약하신 티켓팅을 취소하시겠습니까?
          </p>
          <p className="text-gray-300">취소한 티켓팅은 되돌릴 수 없습니다.</p>
          <div className="flex-1"></div>
          <div className="flex w-full justify-center gap-4">
            <CommonButton
              title="닫기"
              backgroundColor="bg-white"
              textColor="text-gray-500"
              borderColor="border-gray-300"
              onClick={onClose}
            />
            <CommonButton
              title="취소하기"
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

export default CancelModal;
