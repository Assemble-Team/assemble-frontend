import { Tabs } from '@/shared/ui/Tabs';
import { ROUTES } from '@/shared/constants/routes';

const CATEGORIES = [
  { label: '전체', value: 'all' },
  { label: '스터디', value: 'study' },
  { label: '운동', value: 'exercise' },
  { label: '프로젝트', value: 'project' },
  { label: '취미', value: 'hobby' },
  { label: '문화/예술', value: 'culture_art' },
] as const;

export const GroupCategoryFilter = () => {
  const tabs = CATEGORIES.map((cat) => ({
    label: cat.label,
    value: cat.value,
    href:
      cat.value === 'all'
        ? ROUTES.GROUPS.LIST
        : `${ROUTES.GROUPS.LIST}?category=${cat.value}`,
  }));

  return (
    <div className="no-scrollbar overflow-x-auto">
      <Tabs items={tabs} searchParamKey="category" className="border-none" />
    </div>
  );
};
