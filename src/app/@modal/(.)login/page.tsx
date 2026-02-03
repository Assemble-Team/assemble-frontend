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

export default function LoginModalPage() {
  const router = useRouter();

  return (
    <Dialog open={true} onClose={() => router.back()}>
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>로그인</DialogHeader>

        <NavButton href={ROUTES.AUTH.FIND_PASSWORD} replace>
          비밀번호 찾기
        </NavButton>
        <NavButton href={ROUTES.AUTH.SIGNUP} replace>
          회원가입
        </NavButton>
      </DialogContent>
    </Dialog>
  );
}
