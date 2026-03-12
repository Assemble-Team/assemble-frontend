'use client';

import { useRouter } from 'next/navigation';
import { LoginForm } from '@/features/auth';
import { Dialog, DialogContent, DialogOverlay } from '@/shared/ui/Dialog';

/**
 * [Parallel Route] 로그인 모달 인터셉팅 라우트
 * - 앱 전체 레이아웃에서 모달 슬롯을 관리하므로, 어떤 페이지에서도 배경 위에 모달을 띄울 수 있습니다.
 */
export default function LoginPageModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogOverlay />
      <DialogContent className="sm:max-w-[440px] border-none bg-transparent shadow-none p-0 focus-visible:outline-none">
        <div className="mx-auto w-full rounded-[3rem] bg-white p-10 shadow-2xl ring-1 ring-slate-100 animate-in fade-in zoom-in-95 duration-300">
          <LoginForm onSuccess={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
