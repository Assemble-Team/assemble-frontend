'use client';

import { NavigationIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button';

interface MyLocationButtonProps {
  onClick?: (address: string | null) => void;
}

export default function MyLocationButton({ onClick }: MyLocationButtonProps) {
  // const { isLoading: isLocating, handleGetLocation } = useGeolocation();
  // const { convertCoordsToAddress, isConverting } = useReverseGeocoding();

  // const handleClick = () => {
  //   handleGetLocation(async (coords) => {
  //     const address = await convertCoordsToAddress(
  //       coords.latitude,
  //       coords.longitude
  //     );
  //     onClick?.(address);
  //   });
  // };

  return (
    <Button
      // 기존 Button의 스타일을 덮어쓰거나 추가하기 위해 className 사용
      className={cn(
        'flex w-full items-center justify-center gap-3',
        'bg-brand-50 text-brand-600 border-brand-100 rounded-3xl border',
        'hover:bg-brand-100 transition-all active:scale-95',
        'group disabled:opacity-70'
      )}
    >
      <NavigationIcon
        size={24}
        className="fill-current" // SVG 색상을 text-brand-600에 맞춤
      />
      <span className="text-base font-black">
        {/* {totalLoading ? '위치 찾는 중...' : '내 주변 지역으로 찾기'} */}
      </span>
    </Button>
  );
}
