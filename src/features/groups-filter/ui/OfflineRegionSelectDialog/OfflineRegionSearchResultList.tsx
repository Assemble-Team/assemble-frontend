'use client';

import { useMemo } from 'react';

import { REGIONS } from '@/features/groups-filter/constants/regions';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';

interface OfflineRegionListProps {
  query?: string | null;
  onClickListItem: (offlineRegion: string) => void;
}

export default function OfflineRegionSearchResultList({
  query,
  onClickListItem,
}: OfflineRegionListProps) {
  const router = useRouter();
  const REGION_OPTIONS = REGIONS.flatMap((region) =>
    region.children.map((district) => ({
      region: region.name,
      district,
      label: `${region.name
        .replace('특별시', '시')
        .replace('광역시', '시')
        .replace('특별자치시', '시')
        .replace('특별자치도', '시')} ${district}`,
    }))
  );

  const filteredRegions = useMemo(() => {
    const q = query?.trim();
    if (!q) return REGION_OPTIONS;

    return REGION_OPTIONS.filter(
      (option) => option.label.includes(q) || option.region.includes(q)
    );
  }, [REGION_OPTIONS, query]);

  const handleClickListItem = (regionLabel: string) => {
    onClickListItem(regionLabel);
    router.push(`${ROUTES.GROUPS.LIST}?region=${regionLabel}`);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* TODO: 지역 리스트 / 선택 UI */}
      {query && (
        <div className="h-[400px] shrink-0 overflow-y-auto rounded-[2rem] border border-gray-100 bg-white">
          <div className="space-y-1 p-2 pb-12">
            {filteredRegions.map((region) => (
              <button
                key={`${region.region}-${region.district}`}
                className="hover:border-brand-100 hover:bg-brand-50 group flex w-full items-center justify-between rounded-2xl border border-gray-50 bg-white px-6 py-4 transition-all"
                type="button"
                onClick={() => handleClickListItem(region.label)}
              >
                <div className="flex items-center gap-3">
                  <span className="group-hover:text-brand-600 text-sm font-black text-gray-700">
                    {region.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
