import Input from '@/shared/ui/Input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/InputGroup';
import { SearchIcon } from 'lucide-react';

interface OfflineRegionSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function OfflineRegionSearchBar({
  value,
  onChange,
}: OfflineRegionSearchBarProps) {
  return (
    <InputGroup className="group h-12">
      <InputGroupAddon align="inline-start">
        <SearchIcon className="group-focus-within:text-brand-500 size-5 text-gray-400" />
      </InputGroupAddon>

      <InputGroupInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="지역명 검색 (예: 강남구, 분당, 부산...)"
      />
    </InputGroup>
  );
}
