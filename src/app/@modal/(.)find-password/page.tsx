'use client';

import { useRouter } from 'next/navigation';
import { FindPasswordForm } from '@/features/auth';
import { Dialog, DialogContent, DialogOverlay } from '@/shared/ui/Dialog';

/**
 * [Parallel Route] 비밀번호 찾기 모달 인터셉팅 라우트
 */
export default function FindPasswordPageModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogOverlay />
      <DialogContent className="sm:max-w-[440px] border-none bg-transparent shadow-none p-0 focus-visible:outline-none">
        <div className="mx-auto w-full rounded-[3rem] bg-white p-10 shadow-2xl ring-1 ring-slate-100 animate-in fade-in zoom-in-95 duration-300">
          <FindPasswordForm onSuccess={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
