'use client';

import { NavigationIcon, Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button';
import { useGeolocation } from '@/shared/hooks/useGeolocation';
import { useReverseGeocoding } from '@/shared/hooks/useReverseGeocoding';
import { useState } from 'react';

interface MyLocationButtonProps {
  onSuccess?: (address: string) => void;
  onError?: (message: string) => void;
}

/**
 * 네이버 지도 API를 사용하여 실제 내 위치 주소를 가져오는 버튼입니다.
 */
export function MyLocationButton({ onSuccess, onError }: MyLocationButtonProps) {
  const { isLoading: isLocating, getPosition } = useGeolocation();
  const { convertCoordsToAddress } = useReverseGeocoding();
  const [isConverting, setIsConverting] = useState(false);

  const isLoading = isLocating || isConverting;

  const handleGetLocation = () => {
    getPosition(async (coords) => {
      try {
        setIsConverting(true);
        const address = await convertCoordsToAddress(coords.latitude, coords.longitude);
        onSuccess?.(address);
      } catch (err: any) {
        onError?.(err.message || '주소 변환에 실패했습니다.');
      } finally {
        setIsConverting(false);
      }
    });
  };

  return (
    <Button
      onClick={handleGetLocation}
      disabled={isLoading}
      className={cn(
        'flex w-full items-center justify-center gap-3 py-6',
        'bg-brand-50 text-brand-600 border-brand-100 rounded-3xl border',
        'hover:bg-brand-100 transition-all active:scale-[0.98]',
        'group disabled:opacity-70 disabled:cursor-not-allowed'
      )}
    >
      {isLoading ? (
        <Loader2 size={24} className="animate-spin" />
      ) : (
        <NavigationIcon size={24} className="fill-current" />
      )}
      <span className="text-base font-black">
        {isLoading ? '위치를 확인하는 중...' : '현재 내 위치 사용하기'}
      </span>
    </Button>
  );
}
