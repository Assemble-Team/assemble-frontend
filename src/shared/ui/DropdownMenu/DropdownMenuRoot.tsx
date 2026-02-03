'use client';

import React, { useState, createContext, useContext, useCallback } from 'react';

interface DropdownMenuContextType {
  isOpen: boolean;
  triggerRect: DOMRect | null;
  // 상태 변경 함수 대신 명확한 액션 함수 정의
  toggleDropdownMenu: () => void;
  closeDropdownMenu: () => void;
  updateTriggerRect: (rect: DOMRect | null) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | null>(null);

export function useDropdownMenu() {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error(
      'DropdownMenu 서브 컴포넌트는 반드시 <DropdownMenuRoot /> 내부에서 사용되어야 합니다.'
    );
  }

  return context;
}

export default function DropdownMenuRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  const toggleDropdownMenu = () => setIsOpen((prev) => !prev);
  const closeDropdownMenu = () => setIsOpen(false);
  const updateTriggerRect = useCallback((rect: DOMRect | null) => {
    setTriggerRect(rect);
  }, []);

  return (
    <DropdownMenuContext.Provider
      value={{
        isOpen,
        triggerRect,
        toggleDropdownMenu,
        closeDropdownMenu,
        updateTriggerRect,
      }}
    >
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  );
}
