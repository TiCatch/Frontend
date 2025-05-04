'use client';

import { useActiveTicket, useUserStatus } from '@hooks';
import { usePathname, useRouter } from 'next/navigation';
import queryClient from 'providers/queryClient';
import { useEffect, useState } from 'react';
import CommonModal from './CommonModal';

const TicketingGuard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, isLoading: isUserLoading } = useUserStatus();
  const { activeTicketId, isLoading, updateTicket } = useActiveTicket(
    isLoggedIn && !isUserLoading,
  );

  const [openInvalidModal, setOpenInvalidModal] = useState(false);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);

  useEffect(() => {
    if (isLoading || isUserLoading) return;
    setOpenInvalidModal(false);
    setOpenLeaveModal(false);

    const match = pathname.match(/^\/ticket\/(\d+)/);
    const currentTicketId = match?.[1] || null;
    if (
      activeTicketId &&
      currentTicketId &&
      Number(currentTicketId) !== Number(activeTicketId)
    ) {
      setOpenInvalidModal(true);
      return;
    }

    if (!activeTicketId && currentTicketId) {
      setOpenInvalidModal(true);
    }

    const isInsideTicketPage = pathname.startsWith(`/ticket/${activeTicketId}`);
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
    setOpenLeaveModal(false);

    updateTicket(Number(activeTicketId)).then(({ status }) => {
      if (status === 200) {
        queryClient.invalidateQueries({ queryKey: ['activeTicket'] });
      }
    });

    setOpenLeaveModal(false);
  };

  const handleCancelLeave = () => {
    setOpenLeaveModal(false);
    if (activeTicketId) {
      router.push(`/ticket/${activeTicketId}`);
    }
  };

  if (isLoading || isUserLoading || !isLoggedIn) return null;

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
