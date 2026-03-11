'use client';

import { useParams } from 'next/navigation';
import { useSidebarStore } from '@/shared/model/sidebar';
import { cn } from '@/shared/lib/utils';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from '@/shared/ui/Drawer';
import { Logo } from '@/shared/ui/Logo';
import { NoSSR } from '@/shared/ui/NoSSR/NoSSR';
import { GroupDetailNavItems } from './GroupDetailNavItems';

export function GroupDetailSidebar() {
  const params = useParams();
  const groupId = params.id as string;
  const { isCollapsed, isOpen, close } = useSidebarStore();

  if (!groupId) return null;

  return (
    <NoSSR>
      {/* 데스크탑 사이드바 (Aside) */}
      <aside
        className={cn(
          'sticky top-16 hidden h-[calc(100vh-64px)] flex-col transition-all duration-300 md:top-20 md:h-[calc(100vh-80px)] lg:flex',
          isCollapsed ? 'w-13' : 'w-64'
        )}
      >
        <GroupDetailNavItems groupId={groupId} collapsed={isCollapsed} />
      </aside>

      {/* 모바일 사이드바 (Sheet/Drawer) */}
      <Drawer isOpen={isOpen} onClose={close}>
        <DrawerContent side="left">
          <DrawerHeader title={<Logo />} onClose={close} />
          <DrawerBody className="px-4 py-8">
            <GroupDetailNavItems groupId={groupId} onItemClick={close} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </NoSSR>
  );
}
