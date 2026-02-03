import { ROUTES } from '@/shared/constants/routes';
import { CompassIcon, FlameIcon, LayersIcon } from 'lucide-react';

export const SIDEBAR_MENU_ITEMS = [
  {
    href: ROUTES.GROUPS.LIST,
    label: '탐색',
    icon: CompassIcon,
    exact: true,
  },
  {
    href: ROUTES.GROUPS.POPULAR,
    label: '인기 모임',
    icon: FlameIcon,
    exact: false,
  },
  {
    href: ROUTES.GROUPS.MY,
    label: 'MY 모임',
    icon: LayersIcon,
    exact: false,
  },
] as const;
