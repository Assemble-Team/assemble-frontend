'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { NavButton } from '@/shared/ui/Button';
import { Button } from '@/shared/ui/Button';
import { Lock, LogIn } from 'lucide-react';
import { SIDEBAR_MENU_ITEMS } from '../constants';
import { useUserStore } from '@/entities/user';
import { ROUTES } from '@/shared/constants/routes';
import { Dialog, DialogContent, DialogOverlay } from '@/shared/ui/Dialog';

interface MainNavItemsProps {
  collapsed?: boolean;
  onItemClick?: () => void;
}

export const MainNavItems = ({
  collapsed = false,
  onItemClick,
}: MainNavItemsProps) => {
  const router = useRouter();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleItemClick = (e: React.MouseEvent, href: string) => {
    // MY 모임 접근 시 로그인 체크
    if (href === ROUTES.GROUPS.MY && !isAuthenticated) {
      e.preventDefault();
      setShowAuthDialog(true);
      return;
    }
    
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <nav className="flex flex-col gap-2">
      {SIDEBAR_MENU_ITEMS.map((item) => (
        <NavButton
          key={item.href}
          href={item.href}
          exact={item.exact}
          variant="ghost"
          onClick={(e) => handleItemClick(e, item.href)}
          className={cn(
            'group relative flex items-center rounded-2xl font-black transition-all',
            collapsed ? 'w-13 justify-center gap-0 p-3' : 'justify-start px-5'
          )}
        >
          <div className="flex shrink-0 items-center justify-center">
            <item.icon className="size-7 stroke-[2.5px]" />
          </div>

          <span
            className={cn(
              'truncate transition-all duration-300',
              collapsed
                ? 'ml-0 w-0 opacity-0'
                : 'ml-4 w-auto text-lg opacity-100'
            )}
          >
            {item.label}
          </span>

          <div className="bg-brand-500 absolute top-3 bottom-3 left-0 w-1.5 rounded-r-full opacity-0 transition-opacity group-data-[active=true]:opacity-100" />
        </NavButton>
      ))}

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
                MY 모임 조회는 회원만 가능합니다. <br />
                지금 로그인하고 내가 가입한 모임을 확인해보세요!
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
    </nav>
  );
};
