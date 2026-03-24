# 마이페이지 (My Page) - Technical Specification (Spec)

## 1. 아키텍처 설계 (FSD Layering)
*   **Shared**:
    *   `ui/Tabs`, `ui/Input`, `ui/Switch`: 메뉴 전환 및 폼 입력 UI.
*   **Entities**:
    *   `user/useUserStore`: 현재 로그인된 사용자 정보 및 상태 연동.
*   **Features**:
    *   `mypage/ui/ProfileEditForm`: 프로필 수정을 위한 폼 및 검증 로직.
    *   `mypage/ui/NotificationSettings`: 알림 설정 토글 인터페이스.
*   **Widgets**:
    *   `mypage-groups/ui/MyJoinedGroups`: 참여 모임 리스트 위젯.
    *   `mypage-sidebar`: 마이페이지 전용 네비게이션 바.
*   **Pages**:
    *   `mypage/ui/MyPage`: 마이페이지 메인 레이아웃 및 라우트 엔트리.

## 2. 데이터 모델링 & 타입 정의 (Data Modeling)
```typescript
// 프로필 수정 스키마 예시
export const profileSchema = z.object({
  name: z.string().min(2, '닉네임은 2자 이상이어야 합니다.'),
  bio: z.string().max(100, '소개는 100자 이내여야 합니다.').optional(),
  interests: z.array(z.string()),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
```

## 3. 컴포넌트 설계 (Component Design)
*   **서브 라우팅 시스템**: 마이페이지 내에서 `/mypage/activities`, `/mypage/groups`, `/mypage/settings`와 같이 탭/링크를 통한 경로 전환 구현.
*   **ProfileEditForm**: `react-hook-form`을 사용하며, 실시간 유효성 검사 및 서버 연동(Update API) 처리.
*   **NotificationSettings**: Zustand 또는 API와 직접 연동하여 스위치 조작 시 즉시 상태 반영.

## 4. 핵심 로직 & 흐름 (Flow)
*   **인증 보호**: 마이페이지 접속 시 사용자가 로그인되어 있지 않으면 로그인 페이지로 리다이렉션 처리.
*   **데이터 패칭**: TanStack Query를 사용하여 내 모임, 글 목록 등을 효율적으로 가져오고 캐싱 관리.

## 5. UI/UX 디자인 가이드
*   **Tabs**: 메뉴 간 이동 시 매끄러운 전환 효과.
*   **Empty State**: 가입한 모임이나 작성한 글이 없을 때 '참여할 모임 찾아보기' 버튼 등을 노출하여 행동 유도.
