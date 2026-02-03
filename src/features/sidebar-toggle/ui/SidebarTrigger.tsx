'use client';

import { ROUTES } from '@/shared/constants/routes';
import { useSidebarStore } from '@/shared/model/sidebar';
import { Button } from '@/shared/ui/Button';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function SidebarTrigger() {
  const pathname = usePathname();
  const { toggle, toggleCollapsed } = useSidebarStore();

  const isGroupListPage =
    pathname === ROUTES.GROUPS.LIST ||
    ROUTES.GROUPS.POPULAR ||
    ROUTES.GROUPS.MY;

  const handleClick = () => {
    const isDesktop = window.innerWidth >= 1024; // lg 기준

    if (isGroupListPage && isDesktop) {
      // 리스트 페이지 + 데스크탑 -> 축소/확장만 수행
      toggleCollapsed();
    } else {
      // 그 외 모든 상황 (모바일 또는 상세 페이지) -> 시트 형식
      toggle();
    }
  };

  return (
    <Button
      onClick={handleClick}
      aria-label="메뉴 토글"
      size="icon"
      variant="ghost"
    >
      <Menu className="size-7 stroke-[2.5px]" />
    </Button>
  );
}
