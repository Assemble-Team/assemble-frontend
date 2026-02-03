import { GroupOfflineRegionFilter } from '@/features/groups-filter/ui/GroupOfflineRegionFilter';

import HeroTitle from './HeroTitle';
import { GroupSearchBar } from '@/features/groups-search/ui/GroupSearchBar';

export default function Hero() {
  return (
    <div className="animate-in fade-in zoom-in-95 flex min-h-[85vh] flex-col items-center justify-center gap-y-12 duration-1000">
      <HeroTitle />

      <div className="flex gap-x-2 md:gap-x-4">
        <GroupOfflineRegionFilter />
        <GroupSearchBar />
      </div>
    </div>
  );
}
