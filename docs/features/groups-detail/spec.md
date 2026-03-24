# 그룹 상세 (Group Detail) - Technical Specification (Spec)

## 1. 아키텍처 설계 (FSD Layering)
*   **Entities**:
    *   `groups`: 모임 도메인 데이터 및 기초 UI.
*   **Features**:
    *   `groups-join`: 가입 신청/취소 로직 (`JoinGroupButton`).
    *   `groups-like`: 찜하기 로직 (`useToggleLike`, `LikeButton`).
*   **Widgets**:
    *   `group-board`: 게시글 목록 및 작성 폼.
    *   `group-members`: 멤버 리스트 렌더링.
    *   `group-notice`: 중요 공지 섹션.
    *   `group-schedules`: 일정 캘린더/리스트 위젯.
    *   `group-detail-sidebar`: 사이드바 요약 정보 및 액션 버튼.
*   **Pages**:
    *   `groups/detail`: 모든 위젯을 조립하는 페이지 컨테이너.

## 2. 데이터 모델링 & 타입 정의 (Data Modeling)
```typescript
// 모임 상세 정보 인터페이스
export interface GroupDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  members: Member[];
  posts: Post[];
  schedules: Schedule[];
  isLiked: boolean;
  isJoined: boolean;
}
```

## 3. 핵심 로직 & 흐름 (Flow)
*   **Dynamic Routing**: `/groups/:id` 경로를 통해 특정 모임 정보를 가져옴.
*   **Optimistic UI**: 찜하기(`LikeButton`) 클릭 시 즉각적인 UI 반영을 위해 TanStack Query의 낙관적 업데이트 기법 적용.
*   **Access Control**: 로그인 상태 및 멤버 가입 여부에 따라 게시판 작성 권한(`GroupBoardWriteForm`) 노출 여부 결정.

## 4. 컴포넌트 설계 (Component Design)
*   **Layout Composition**: 상단 헤더, 메인 컨텐츠 영역(탭 전환: 정보/게시판/일정), 우측 사이드바 구조.
*   **Tab System**: `Tabs` 컴포넌트를 사용하여 페이지 이동 없이 상세 정보 내의 컨텐츠 전환.

## 5. API 명세 및 모킹 (API & MSW)
*   `GET /api/groups/:id`: 모임 상세 정보 조회.
*   `POST /api/groups/:id/join`: 가입 신청.
*   `POST /api/groups/:id/like`: 찜하기 토글.
*   `GET /api/groups/:id/posts`: 게시글 목록 조회.
