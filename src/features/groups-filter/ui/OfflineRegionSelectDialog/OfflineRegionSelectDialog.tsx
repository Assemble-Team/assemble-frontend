'use client';

import { useState } from 'react';
import { DialogContent, Dialog } from '@/shared/ui/Dialog';

import MyLocationButton from './MyLocationButton';
import OfflineRegionSearchBar from './OfflineRegionSearchBar';
import OfflineRegionSearchResultList from './OfflineRegionSearchResultList';
import OfflineRegionFilterHeader from './OfflineRegionFilterHeader';

interface OfflineRegionSelectDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (offlineRegion: string) => void;
}

export default function OfflineRegionSelectDialog({
  open,
  onClose,
  onSelect,
}: OfflineRegionSelectDialogProps) {
  const [query, setQuery] = useState('');
  const [address, setAddress] = useState<string | null>(null);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[3rem] p-0">
        <OfflineRegionFilterHeader onClose={onClose} />

        <div className="flex min-h-0 flex-1 flex-col p-8 pb-12">
          <div className="flex flex-col space-y-6">
            <MyLocationButton onClick={setAddress} />
            <OfflineRegionSearchBar value={query} onChange={setQuery} />
          </div>

          {query ? (
            <OfflineRegionSearchResultList
              query={query || address}
              onClickListItem={(offlineRegion) => {
                onSelect(offlineRegion);
                onClose();
              }}
            />
          ) : (
            <>추천 지역 리스트</>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
