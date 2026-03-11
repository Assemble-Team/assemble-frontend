'use client';

import { Button } from '@/shared/ui/Button';
import { OfflineRegionSelectDialog } from '@/shared/ui/RegionSelect';

import { useState } from 'react';
import { ChevronDownIcon, MapPinIcon } from 'lucide-react';
import { useGroupListFilter } from '../lib/hooks/useGroupListFilter';

export function GroupOfflineRegionFilter() {
  const { selectedValues, updateFilter } = useGroupListFilter('region');

  const currentRegion = selectedValues[0] ?? '';

  const [isRegionFilterDialogOpen, setIsRegionFilterDialogOpen] =
    useState(false);

  const toggleDialog = () => {
    setIsRegionFilterDialogOpen((prev) => !prev);
  };

  const closeDialog = () => {
    setIsRegionFilterDialogOpen(false);
  };

  const handleSelect = (offlineRegion: string) => {
    updateFilter(offlineRegion, 'replace');
    closeDialog();
  };

  return (
    <div className="flex w-fit items-center rounded-full border border-gray-200 bg-gray-100">
      <Button variant="ghost" type="button" onClick={toggleDialog}>
        <MapPinIcon className="size-4" />
        <span className="text-xs font-black whitespace-nowrap">
          {currentRegion || '전체 지역'}
        </span>
        <ChevronDownIcon className="size-4" />
      </Button>

      <OfflineRegionSelectDialog
        open={isRegionFilterDialogOpen}
        onClose={closeDialog}
        onSelect={handleSelect}
      />
    </div>
  );
}
