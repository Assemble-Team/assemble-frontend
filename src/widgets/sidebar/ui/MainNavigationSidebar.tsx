'use client';

import { useSidebarStore } from '@/shared/model/sidebar';
import { cn } from '@/shared/lib/utils';

import { Drawer } from '@/shared/ui/Drawer';
import DrawerBody from '@/shared/ui/Drawer/DrawerBody';
import DrawerContent from '@/shared/ui/Drawer/DrawerContent';
import DrawerHeader from '@/shared/ui/Drawer/DrawerHeader';
import { Logo } from '@/shared/ui/Logo';
import { NoSSR } from '@/shared/ui/NoSSR/NoSSR';
import { MainNavItems } from './MainNavItems';

export function MainNavigationSidebar() {
  const { isCollapsed, isOpen, close } = useSidebarStore();

  return (
    <NoSSR>
      {/* 데스크탑 사이드바 (Aside) */}
      <aside
        className={cn(
          'sticky top-0 hidden h-[calc(100vh-64px)] flex-col transition-all duration-300 lg:flex',
          isCollapsed ? 'w-13' : 'w-64'
        )}
      >
        <MainNavItems collapsed={isCollapsed} />
      </aside>

      {/* 모바일 사이드바 (Sheet/Drawer) */}
      <Drawer isOpen={isOpen} onClose={close}>
        <DrawerContent side="left">
          <DrawerHeader title={<Logo />} onClose={close} />
          <DrawerBody className="px-4 py-8">
            <MainNavItems onItemClick={close} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </NoSSR>
  );
}
