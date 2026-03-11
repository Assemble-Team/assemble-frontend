'use client';

import { useState } from 'react';
import { OfflineRegionSelectDialog } from './OfflineRegionSelectDialog';

interface RegionSelectButtonProps {
  value?: string;
  onSelect: (region: string) => void;
}

export function RegionSelectButton({
  value,
  onSelect,
}: RegionSelectButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border p-4 text-left text-gray-500"
      >
        {value || '지역을 선택해주세요'}
      </button>

      <OfflineRegionSelectDialog
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(region) => {
          onSelect(region);
          setOpen(false);
        }}
      />
    </>
  );
}
