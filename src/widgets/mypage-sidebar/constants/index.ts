import { Home, Users, History, Settings, LucideIcon } from 'lucide-react';
import { ROUTES } from '@/shared/constants/routes';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: '홈',
    href: ROUTES.MYPAGE.HOME,
    icon: Home,
    exact: true,
  },
  {
    label: '모임',
    href: ROUTES.MYPAGE.GROUPS.LIKED,
    icon: Users,
  },
  {
    label: '활동내역',
    href: ROUTES.MYPAGE.ACTIVITIES.POSTS,
    icon: History,
  },
  {
    label: '설정',
    href: ROUTES.MYPAGE.SETTINGS.PROFILE,
    icon: Settings,
  },
];
