import { XIcon } from 'lucide-react';

interface OfflineRegionFilterHeaderProps {
  onClose: () => void;
}

export default function OfflineRegionFilterHeader({
  onClose,
}: OfflineRegionFilterHeaderProps) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-gray-100 p-8">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-gray-900">
          활동 방식 및 지역
        </h2>
        <p className="mt-0.5 text-xs font-bold text-gray-400">
          만남의 방식을 선택해주세요
        </p>
      </div>

      <button
        onClick={onClose}
        aria-label="닫기"
        className="rounded-2xl bg-gray-50 p-3 text-gray-400 transition-all hover:bg-gray-100"
      >
        <XIcon size={24} />
      </button>
    </header>
  );
}
