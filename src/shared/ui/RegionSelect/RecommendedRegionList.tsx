'use client';

import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

const POPULAR_REGIONS = [
  '서울 강남구',
  '서울 마포구',
  '서울 성동구',
  '서울 송파구',
  '서울 용산구',
  '경기 성남시 분당구',
  '경기 수원시 영통구',
  '부산 해운대구',
];

const MAX_RECENT = 5;

interface RecommendedRegionListProps {
  onClickRegion: (region: string) => void;
}

export function RecommendedRegionList({
  onClickRegion,
}: RecommendedRegionListProps) {
  const [recentRegions, setRecentRegions] = useLocalStorage<string[]>(
    'recentRegions',
    []
  );

  const handleClick = (region: string) => {
    setRecentRegions((prev) =>
      [region, ...prev.filter((r) => r !== region)].slice(0, MAX_RECENT)
    );
    onClickRegion(region);
  };

  return (
    <div className="mt-6 space-y-6 overflow-y-auto">
      {recentRegions.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-bold text-gray-500">최근 선택</h3>
          <div className="flex flex-wrap gap-2">
            {recentRegions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => handleClick(region)}
                className="hover:border-brand-300 hover:text-brand-600 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors"
              >
                {region}
              </button>
            ))}
          </div>
        </section>
      )}

      <section>
        <h3 className="mb-3 text-sm font-bold text-gray-500">인기 지역</h3>
        <div className="flex flex-wrap gap-2">
          {POPULAR_REGIONS.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => handleClick(region)}
              className="hover:border-brand-300 hover:text-brand-600 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors"
            >
              {region}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
