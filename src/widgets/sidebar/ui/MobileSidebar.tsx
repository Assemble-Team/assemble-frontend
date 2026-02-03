'use client';

import { ROUTES } from '@/shared/constants/routes';

import { useSidebarStore } from '@/shared/model/sidebar';
import { NavButton } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';
import DrawerBody from '@/shared/ui/Drawer/DrawerBody';
import DrawerContent from '@/shared/ui/Drawer/DrawerContent';
import DrawerHeader from '@/shared/ui/Drawer/DrawerHeader';
import { Logo } from '@/shared/ui/Logo';
import { NoSSR } from '@/shared/ui/NoSSR/NoSSR';
import { CompassIcon, FlameIcon, LayersIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function MobileSidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebarStore();
  const isGroupListPage = pathname === '/groups';

  return (
    <NoSSR>
      {/* // 1. 홈페이지면 모바일(lg 미만)에서만 작동 
      // 2. 홈페이지가 아니면 모든
      환경에서 시트 형식으로 작동 */}
      <div className={isGroupListPage ? 'lg:hidden' : ''}>
        <Drawer isOpen={isOpen} onClose={close}>
          <DrawerContent side="left">
            <DrawerHeader title={<Logo />} onClose={close}></DrawerHeader>
            <DrawerBody className="flex h-full flex-col px-4 py-8">
              <nav className="flex-1 space-y-2">
                <NavButton
                  href={ROUTES.GROUPS.LIST}
                  exact
                  variant="ghost"
                  className="group hover:text-brand-500 data-[active=true]:bg-brand-50 data-[active=true]:text-brand-600 relative flex h-14 w-full items-center gap-4 rounded-2xl px-5 text-sm font-black text-gray-400 transition-all hover:bg-gray-50 data-[active=true]:shadow-sm"
                >
                  <div className="flex w-6 shrink-0 justify-center">
                    <CompassIcon size={24} strokeWidth={2.5} />
                  </div>
                  <span className="truncate">탐색</span>
                  {/* 모바일에서도 활성화 표시 바를 유지하거나 생략 가능 */}
                  <div className="bg-brand-500 absolute top-3 bottom-3 left-0 w-1.5 rounded-r-full opacity-0 group-data-[active=true]:opacity-100" />
                </NavButton>

                <NavButton
                  href={ROUTES.GROUPS.POPULAR}
                  variant="ghost"
                  className="group hover:text-brand-500 data-[active=true]:bg-brand-50 data-[active=true]:text-brand-600 relative flex h-14 w-full items-center gap-4 rounded-2xl px-5 text-sm font-black text-gray-400 transition-all hover:bg-gray-50 data-[active=true]:shadow-sm"
                >
                  <div className="flex w-6 shrink-0 justify-center">
                    <FlameIcon size={24} strokeWidth={2.5} />
                  </div>
                  <span className="truncate">인기 모임</span>
                  <div className="bg-brand-500 absolute top-3 bottom-3 left-0 w-1.5 rounded-r-full opacity-0 group-data-[active=true]:opacity-100" />
                </NavButton>

                <NavButton
                  href={ROUTES.GROUPS.MY}
                  variant="ghost"
                  className="group hover:text-brand-500 data-[active=true]:bg-brand-50 data-[active=true]:text-brand-600 relative flex h-14 w-full items-center gap-4 rounded-2xl px-5 text-sm font-black text-gray-400 transition-all hover:bg-gray-50 data-[active=true]:shadow-sm"
                >
                  <div className="flex w-6 shrink-0 justify-center">
                    <LayersIcon size={24} strokeWidth={2.5} />
                  </div>
                  <span className="truncate">MY 모임</span>
                  <div className="bg-brand-500 absolute top-3 bottom-3 left-0 w-1.5 rounded-r-full opacity-0 group-data-[active=true]:opacity-100" />
                </NavButton>
              </nav>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </NoSSR>
  );
}
