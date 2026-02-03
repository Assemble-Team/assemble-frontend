import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean; // 모바일/일반 페이지 시트 Open 여부
  isCollapsed: boolean; // 홈 페이지 데스크탑 사이드바 축소 여부
  open: () => void;
  close: () => void;
  toggle: () => void;
  toggleCollapsed: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  isCollapsed: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
