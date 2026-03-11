'use client';

import { Button } from '@/shared/ui/Button';
import { useUserStore } from '@/entities/user';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';

interface JoinGroupButtonProps {
  groupId: number;
  isFull: boolean;
  isRecruiting: boolean;
  isPending?: boolean;
}

export const JoinGroupButton = ({
  groupId,
  isFull,
  isRecruiting,
  isPending = false,
}: JoinGroupButtonProps) => {
  const { isAuthenticated } = useUserStore();
  const router = useRouter();

  const handleJoin = () => {
    if (!isAuthenticated) {
      alert('로그인이 필요한 서비스입니다.');
      router.push(ROUTES.AUTH.LOGIN);
      return;
    }

    // 실제 가입 로직 (API 호출) 추가 예정
    alert('가입 신청이 완료되었습니다!');
  };

  const isDisabled = !isRecruiting || isFull || isPending;
  const buttonText = !isRecruiting
    ? '모집 완료'
    : isFull
      ? '정원 초과'
      : isPending
        ? '승인 대기중'
        : '모임 신청하기';

  return (
    <Button
      size="lg"
      className="flex-1 justify-center rounded-3xl py-7 text-lg font-black"
      disabled={isDisabled}
      onClick={handleJoin}
    >
      {buttonText}
    </Button>
  );
};
