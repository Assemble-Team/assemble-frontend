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
    pathname === ROUTES.GROUPS.POPULAR ||
    pathname === ROUTES.GROUPS.MY;

  const isMyPage = pathname.startsWith('/mypage');
  const isGroupDetailPage =
    /^\/groups\/[^\/]+/.test(pathname) && !isGroupListPage;

  const handleClick = () => {
    const isDesktop = window.innerWidth >= 1024; // lg 기준

    if (isDesktop && (isGroupListPage || isMyPage || isGroupDetailPage)) {
      // 데스크탑 + (그룹 목록, 마이페이지, 또는 그룹 상세) -> 사이드바 축소/확장
      toggleCollapsed();
    } else {
      // 모바일 또는 기타 페이지 -> Sheet(Drawer) 열기
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
