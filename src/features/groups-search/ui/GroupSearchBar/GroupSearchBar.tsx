'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

import { Button } from '@/shared/ui/Button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/InputGroup';
import { ROUTES } from '@/shared/constants/routes';

export default function GroupSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 기존 URL의 검색어를 초기값으로 사용
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
      <InputGroup className="h-11 w-96">
        <InputGroupInput
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="어떤 모임을 찾으시나요?"
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
