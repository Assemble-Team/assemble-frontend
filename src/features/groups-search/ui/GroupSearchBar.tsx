'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

import { Button } from '@/shared/ui/Button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/InputGroup';
import { ROUTES } from '@/shared/constants/routes';

interface GroupSearchBarProps {
  autoFocus?: boolean;
}

// 실제 검색 로직을 담당하는 내부 컴포넌트
function GroupSearchBarInner({ autoFocus }: GroupSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('query') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }

    router.push(`${ROUTES.GROUPS.LIST}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <InputGroup className="h-11 lg:w-96 w-full">
        <InputGroupInput
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="어떤 모임을 찾으시나요?"
          autoFocus={autoFocus}
        />
        <InputGroupAddon align="inline-end">
          <Button type="submit" size="xs">
            <SearchIcon size={16} strokeWidth={3} />
            <span className="hidden sm:inline">검색</span>
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}

// 외부로 수출되는 메인 컴포넌트 (Suspense 래퍼)
export function GroupSearchBar(props: GroupSearchBarProps) {
  return (
    <Suspense
      // fallback 디자인은 헤더 레이아웃을 해치지 않게 빈 상자나 스켈레톤을 넣어주세요
      fallback={
        <div className="h-11 lg:w-96 w-full animate-pulse rounded-lg bg-gray-100" />
      }
    >
      <GroupSearchBarInner {...props} />
    </Suspense>
  );
}
