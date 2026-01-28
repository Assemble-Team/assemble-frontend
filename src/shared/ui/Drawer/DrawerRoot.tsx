'use client';

import { createPortal } from 'react-dom';
import { ReactNode, useEffect } from 'react';

export interface DrawerRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function DrawerRoot({
  isOpen,
  onClose,
  children,
}: DrawerRootProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <div
        className="animate-in fade-in absolute inset-0 bg-black/40 backdrop-blur-sm duration-300"
        onClick={onClose}
      />
      {children}
    </div>,
    document.body
  );
}
