'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';

export function CreateGroupButton() {
  return (
    <Button
      asChild
      className="bg-brand-500 hover:bg-brand-600 shadow-brand-100 hidden gap-2 rounded-full px-6 py-3 text-xs font-black text-white shadow-lg transition-all active:scale-95 lg:flex"
    >
      <Link href={ROUTES.GROUPS.CREATE}>
        <Plus size={18} strokeWidth={3} />
        <span>모임 개설하기</span>
      </Link>
    </Button>
  );
}
