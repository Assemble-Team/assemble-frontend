'use client';

import { ChevronDownIcon, MapPinIcon } from 'lucide-react';

import { Button } from '@/shared/ui/Button';

interface OfflineRegionFilterDialogTriggerButtonProps {
  onClick?: () => void;
  offlineRegionLabel: string;
}
export default function OfflineRegionFilterDialogTriggerButton({
  onClick,
  offlineRegionLabel,
}: OfflineRegionFilterDialogTriggerButtonProps) {
  return (
    <Button variant="ghost" type="button" onClick={onClick}>
      <MapPinIcon className="size-4" />
      <span className="text-xs font-black whitespace-nowrap">
        {offlineRegionLabel || '전체 지역'}
      </span>
      <ChevronDownIcon className="size-4" />
    </Button>
  );
}
