'use client';

import { ROUTES } from '@/shared/routes';
import { NavButton } from '@/shared/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from '@/shared/ui/Dialog';
import { useRouter } from 'next/navigation';

export default function FindPasswordModalPage() {
  const router = useRouter();

  return (
    <Dialog open={true} onClose={() => router.back()}>
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>비밀번호 찾기</DialogHeader>

        <NavButton href={ROUTES.AUTH.LOGIN} replace>
          로그인으로 돌아가기
        </NavButton>
      </DialogContent>
    </Dialog>
  );
}
