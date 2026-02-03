'use client';

import RegionFilterDialogTriggerButton from './OfflineRegionFilterDialogTriggerButton';
import { OfflineRegionSelectDialog } from '../OfflineRegionSelectDialog';
import { useState } from 'react';

export default function GroupOfflineRegionFilter() {
  const [offlineRegionValue, setOfflineRegionValue] = useState('');
  const [isRegionFilterDialogOpen, setIsRegionFilterDialogOpen] =
    useState(false);

  const toggleDialog = () => {
    setIsRegionFilterDialogOpen((prev) => !prev);
  };

  const closeDialog = () => {
    setIsRegionFilterDialogOpen(false);
  };

  return (
    <div className="flex w-fit items-center rounded-full border border-gray-200 bg-gray-100">
      <RegionFilterDialogTriggerButton
        onClick={toggleDialog}
        offlineRegionLabel={offlineRegionValue}
      />

      <OfflineRegionSelectDialog
        open={isRegionFilterDialogOpen}
        onClose={closeDialog}
        onSelect={(offlineRegion) => {
          setOfflineRegionValue(offlineRegion);
        }}
      />
    </div>
  );
}
