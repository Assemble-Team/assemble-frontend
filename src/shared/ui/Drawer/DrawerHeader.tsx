'use client';

import { XIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '../Button';

export default function DrawerHeader({
  title,
  onClose,
}: {
  title?: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="text-lg font-bold">{title}</div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        aria-label="닫기"
        className="h-12 w-12 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-50"
      >
        <XIcon size={24} className="w-full" />
        <span className="sr-only">닫기</span>
      </Button>
    </div>
  );
}
