'use client';

import { useState } from 'react';
import { Plus, LogIn, Lock } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';
import { useUserStore } from '@/entities/user';
import { Dialog, DialogContent, DialogOverlay } from '@/shared/ui/Dialog';

export function CreateGroupButton() {
  const router = useRouter();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowAuthDialog(true);
      return;
    }
    router.push(ROUTES.GROUPS.CREATE);
  };

  return (
    <>
      <Button
        className="bg-brand-500 hover:bg-brand-600 shadow-brand-100 hidden gap-2 rounded-full px-6 py-3 text-xs font-black text-white shadow-lg transition-all active:scale-95 lg:flex"
        onClick={handleClick}
      >
        <Plus size={18} strokeWidth={3} />
        <span>모임 개설하기</span>
      </Button>

      {/* 로그인 권장 AlertDialog UI */}
      <Dialog open={showAuthDialog} onClose={() => setShowAuthDialog(false)}>
        <DialogOverlay />
        <DialogContent className="sm:max-w-[440px] border-none bg-transparent shadow-none p-0 focus-visible:outline-none">
          <div className="mx-auto flex w-full flex-col items-center justify-center gap-8 rounded-[3rem] bg-white p-12 text-center shadow-2xl ring-1 ring-slate-100 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-brand-600">
              <Lock size={40} />
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                로그인이 필요합니다
              </h2>
              <p className="text-lg font-bold leading-relaxed text-slate-400">
                모임 개설은 회원만 가능합니다. <br />
                지금 로그인하고 나만의 모임을 만들어보세요!
              </p>
            </div>

            <div className="flex w-full gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 rounded-2xl py-6 font-black"
                onClick={() => setShowAuthDialog(false)}
              >
                닫기
              </Button>
              <Button
                className="flex-1 gap-2 rounded-2xl py-6 font-black"
                onClick={() => {
                  setShowAuthDialog(false);
                  router.push(ROUTES.AUTH.LOGIN);
                }}
              >
                <LogIn size={18} />
                로그인하기
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
