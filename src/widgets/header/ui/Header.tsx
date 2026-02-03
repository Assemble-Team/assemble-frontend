import { Logo } from '@/shared/ui/Logo';

import { GroupOfflineRegionFilter } from '@/features/groups-filter/ui/GroupOfflineRegionFilter';
import { GroupSearchBar } from '@/features/groups-search/ui/GroupSearchBar';
import { SidebarTrigger } from '@/features/sidebar-toggle';
import { ROUTES } from '@/shared/constants/routes';
import { HeaderActionGroup } from './HeaderActionGroup/HeaderActionGroup';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-xl">
      <div className="mx-auto flex h-16 items-center justify-between gap-6 px-4 md:h-20 md:px-8">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Logo href={ROUTES.HOME} />
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <GroupOfflineRegionFilter />

          <GroupSearchBar />
        </div>

        <HeaderActionGroup />
      </div>
    </header>
  );
}
