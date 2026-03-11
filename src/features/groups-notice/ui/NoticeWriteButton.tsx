'use client';

import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/shared/ui/Button';
import { PenLine } from 'lucide-react';

interface NoticeWriteButtonProps {
  myRole: 'LEADING' | 'MEMBER' | 'GUEST';
}

export const NoticeWriteButton = ({ myRole }: NoticeWriteButtonProps) => {
  const router = useRouter();
  const { id } = useParams();

  const handleClick = () => {
    if (myRole !== 'LEADING') {
      alert('공지사항은 모임 방장만 작성할 수 있습니다.');
      return;
    }
    router.push(`/groups/${id}/notice/create`);
  };

  return (
    <Button
      variant="outline"
      className="border-brand-200 text-brand-600 hover:bg-brand-50 gap-2 rounded-full font-black"
      onClick={handleClick}
    >
      <PenLine size={18} />
      공지 작성하기
    </Button>
  );
};
