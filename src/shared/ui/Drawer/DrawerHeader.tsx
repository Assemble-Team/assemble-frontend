'use client';

import { XIcon } from 'lucide-react';
import { ReactNode } from 'react';

export default function DrawerHeader({
  title,
  onClose,
}: {
  title?: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="flex h-16 items-center justify-between border-b px-4">
      <div className="text-lg font-bold">{title}</div>
      <button
        onClick={onClose}
        className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-50"
      >
        <XIcon size={24} />
      </button>
    </div>
  );
}
