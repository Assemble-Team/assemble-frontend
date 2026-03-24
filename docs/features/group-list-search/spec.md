# 그룹 목록 및 검색 (Group List & Search) - Technical Specification (Spec)

## 1. 아키텍처 설계 (FSD Layering)
*   **Shared**:
    *   `ui/Tabs`, `ui/AsyncBoundary`: 공통 UI 및 비동기 처리 컴포넌트.
*   **Entities**:
    *   `groups/ui/GroupList`: 실제 모임 카드들의 리스트 렌더링.
*   **Features**:
    *   `groups-filter/ui`: 개별 필터 UI 컴포넌트들 (`GroupCategoryFilter`, `GroupLevelFilter` 등).
    *   `groups-filter/lib/hooks/useGroupListFilter`: `URLSearchParams`를 제어하는 커스텀 훅.
    *   `groups-search/ui/GroupSearchBar`: 검색바 컴포넌트.
*   **Widgets**:
    *   `group-list/ui/GroupListWidget`: 필터와 리스트를 조립하여 최종 화면 구성.

## 2. 데이터 모델링 & 타입 정의 (Data Modeling)
```typescript
// src/features/groups-filter/model/types.ts (예시)
export type GroupFilterKey = 'category' | 'status' | 'level' | 'sort' | 'region';

export interface GroupFilterValues {
  category: string;
  status: 'recruiting' | 'ended' | 'all';
  level: 'beginner' | 'intermediate' | 'advanced';
  sort: 'latest' | 'popular' | 'deadline';
  region: string[];
}
```

## 3. 핵심 로직: URL 동기화 (Routing Strategy)
*   `useGroupListFilter` 훅은 `next/navigation`의 `useSearchParams`를 래핑하여 사용.
*   필터 변경 시 `router.push`를 사용하여 URL 쿼리 파라미터를 업데이트 (`scroll: false` 옵션으로 스크롤 유지).
*   다중 선택(`toggle`)과 단일 선택(`replace`) 모드를 모두 지원하여 유연한 필터링 환경 구축.

## 4. 컴포넌트 설계 (Component Design)
*   **GroupListWidget**: 
    *   `AsyncBoundary`를 사용하여 비동기 데이터 로딩(`GroupList`) 중 스켈레톤 노출.
    *   검색어 존재 시 `GroupSearchResultHeader`를 동적으로 렌더링.
*   **GroupCategoryFilter**: 
    *   공통 `Tabs` 컴포넌트를 사용하여 URL 기반 탭 UI 구현.

## 5. 성능 및 최적화 (Optimization)
*   필터 변경 시마다 전체 페이지 리로드 대신 클라이언트 사이드 라우팅 적용.
*   스켈레톤 UI를 통한 초기 로딩 시 사용자 이탈 방지.
