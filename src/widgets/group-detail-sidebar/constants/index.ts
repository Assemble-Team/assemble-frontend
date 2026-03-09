import {
  Home,
  Bell,
  Layers,
  Calendar,
  MessageCircle,
  Users,
  Settings,
  LucideIcon,
} from 'lucide-react';
import { ROUTES } from '@/shared/constants/routes';

export interface GroupNavTabItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
}

export const getGroupDetailNavItems = (groupId: string): GroupNavTabItem[] => [
  {
    id: 'home',
    label: '홈',
    href: ROUTES.GROUPS.DETAIL(groupId),
    icon: Home,
    exact: true,
  },
  {
    id: 'notice',
    label: '공지',
    href: `${ROUTES.GROUPS.DETAIL(groupId)}/notice`,
    icon: Bell,
  },
  {
    id: 'board',
    label: '게시판',
    href: `${ROUTES.GROUPS.DETAIL(groupId)}/board`,
    icon: Layers,
  },
  {
    id: 'schedules',
    label: '일정',
    href: `${ROUTES.GROUPS.DETAIL(groupId)}/schedules`,
    icon: Calendar,
  },
  {
    id: 'chat',
    label: '그룹 채팅',
    href: `${ROUTES.GROUPS.DETAIL(groupId)}/chat`,
    icon: MessageCircle,
  },
  {
    id: 'members',
    label: '멤버',
    href: `${ROUTES.GROUPS.DETAIL(groupId)}/members`,
    icon: Users,
  },
  {
    id: 'manage',
    label: '관리',
    href: `${ROUTES.GROUPS.DETAIL(groupId)}/manage`,
    icon: Settings,
  },
];
