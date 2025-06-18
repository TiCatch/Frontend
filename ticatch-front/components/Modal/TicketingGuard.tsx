'use client';

import { useActiveTicket, useAuthStatus } from '@hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CommonModal from './CommonModal';

const TicketingGuard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: isLoggedIn, isLoading: isAuthLoading } = useAuthStatus();
  const { activeTicketId, isLoading, updateTicket } = useActiveTicket(
    isLoggedIn && !isAuthLoading,
  );

  const [openInvalidModal, setOpenInvalidModal] = useState(false);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);

  useEffect(() => {
    if (isLoading || isAuthLoading) return;
    setOpenInvalidModal(false);
    setOpenLeaveModal(false);

    const match = pathname.match(/^\/ticket\/(\d+)/);
    const currentTicketId = match?.[1] || null;
    if (
      currentTicketId &&
      ((activeTicketId && Number(currentTicketId) !== Number(activeTicketId)) ||
        !activeTicketId)
    ) {
      setOpenInvalidModal(true);
      return;
    }

    const isInsideTicketPage =
      pathname.startsWith(`/ticket/${activeTicketId}`) ||
      pathname.startsWith('/order/pay/completed');
    if (activeTicketId && !isInsideTicketPage) {
      setOpenLeaveModal(true);
      return;
    }
  }, [pathname, isLoading]);

  const handleInvalidTicketRedirect = () => {
    setOpenInvalidModal(false);
    if (activeTicketId) {
      router.replace(`/ticket/${activeTicketId}`);
    } else {
      router.replace('/');
    }
  };

  const handleConfirmLeave = () => {
    updateTicket(Number(activeTicketId));
    setOpenLeaveModal(false);
  };

  const handleCancelLeave = () => {
    setOpenLeaveModal(false);
    if (activeTicketId) {
      router.push(`/ticket/${activeTicketId}`);
    }
  };

  if (isLoading || isAuthLoading || !isLoggedIn) return null;

  if (openInvalidModal) {
    return (
      <CommonModal
        onConfirm={handleInvalidTicketRedirect}
        title="유효하지 않은 티켓팅입니다."
      />
    );
  }

  return (
    <>
      {openLeaveModal && (
        <CommonModal
          onClose={handleCancelLeave}
          onConfirm={handleConfirmLeave}
          title="다른 페이지로 이동하면 티켓팅이 취소됩니다."
          subtitle="정말로 페이지를 나가시겠습니까?"
          confirmButtonText="나가기"
        />
      )}
    </>
  );
};

export default TicketingGuard;
