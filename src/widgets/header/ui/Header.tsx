'use client';

import { Suspense, useState } from 'react';
import { Logo } from '@/shared/ui/Logo';
import { GroupSearchBar } from '@/features/groups-search';
import { SidebarTrigger } from '@/features/sidebar-toggle';
import { ROUTES } from '@/shared/constants/routes';
import { HeaderActionGroup } from './HeaderActionGroup/HeaderActionGroup';
import { GroupOfflineRegionFilter } from '@/features/groups-filter/ui/GroupOfflineRegionFilter';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 어플리케이션의 공통 헤더 컴포넌트입니다.
 * 데스크탑에서는 검색바가 항상 노출되며, 모바일에서는 HeaderActionGroup 내의
 * 검색 아이콘을 클릭하여 검색 모드로 전환할 수 있습니다.
 */
export default function Header() {
  const [isSearchMode, setIsSearchMode] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <AnimatePresence mode="wait">
          {!isSearchMode ? (
            <motion.div
              key="default-header"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="flex w-full items-center justify-between"
            >
              {/* 왼쪽 영역: 내비게이션 트리거 및 로고 */}
              <div className="flex items-center gap-2 md:gap-4">
                <SidebarTrigger />
                <Logo href={ROUTES.HOME} />
              </div>

              {/* 중앙 영역: 데스크탑 전용 필터 및 검색바 */}
              <div className="hidden items-center gap-4 lg:flex">
                <Suspense fallback={<div className="h-10 w-24 animate-pulse rounded-full bg-slate-50" />}>
                  <GroupOfflineRegionFilter />
                </Suspense>
                <GroupSearchBar />
              </div>

              {/* 오른쪽 영역: 사용자 액션 그룹 (모바일 검색 버튼 포함) */}
              <div className="flex items-center gap-2">
                <Suspense
                  fallback={
                    <div className="h-10 w-32 animate-pulse rounded-2xl bg-slate-50" />
                  }
                >
                  <HeaderActionGroup
                    onSearchClick={() => setIsSearchMode(true)}
                  />
                </Suspense>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="search-header"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex w-full items-center gap-2 lg:hidden"
            >
              {/* 모바일 검색 모드 UI */}
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="shrink-0">
                  <Suspense fallback={<div className="h-10 w-24 animate-pulse rounded-full bg-slate-50" />}>
                    <GroupOfflineRegionFilter />
                  </Suspense>
                </div>
                <div className="min-w-0 flex-1">
                  <GroupSearchBar autoFocus />
                </div>
              </div>

              {/* 모드 해제 버튼 */}
              <button
                onClick={() => setIsSearchMode(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
