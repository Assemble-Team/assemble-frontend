# 마이페이지 (My Page) - Implementation Task List

## 1. 작업 단계 (Implementation Phases)
*   [x] **Phase 1: 인프라 및 서브 라우팅**
    *   [x] 마이페이지 기본 레이아웃(`MyPageLayout`) 및 사이드바 메뉴 구성
    *   [x] 활동/그룹/설정 서브 메뉴 경로 설정
*   [x] **Phase 2: 활동 및 그룹 목록 구현**
    *   [x] 참여 중인 모임 목록 위젯(`MyJoinedGroups`) 개발
    *   [x] 작성 글(`MyPostsPage`) 및 댓글(`MyCommentsPage`) 리스트 UI 구현
*   [x] **Phase 3: 설정 및 프로필 수정**
    *   [x] 프로필 정보 조회 및 수정 폼(`ProfileEditForm`) 구현
    *   [x] 알림 설정 토글 UI 및 로직 구현
*   [x] **Phase 4: 고도화 및 검증**
    *   [x] 비로그인 사용자 접근 제한 (Auth Guard)
    *   [x] 데이터 부재 시의 Empty State UI 적용

## 2. 세부 체크리스트 (Detailed Tasks)
### 🚀 Phase 1-2 (완료)
- [x] 메뉴 클릭 시 활성화 표시(Active State) 연동
- [x] 참여 모임 카드 레이아웃 및 데이터 연동
- [x] 탭 UI를 통한 활동 내역(글/댓글) 전환

### 🎨 Phase 3-4 (완료)
- [x] 프로필 이미지 미리보기 기능
- [x] 알림 설정 변경 시 즉시 저장 로직
- [x] 모바일 반응형 사이드바/메뉴 대응

## 3. 검증 및 테스트 계획 (Verification)
*   [x] 프로필 수정 후 헤더나 다른 페이지에 반영되는지 확인 (전역 상태 업데이트)
*   [x] 알림 설정 변경 후 페이지 새로고침 시 상태가 유지되는지 확인
*   [x] 작성한 글이 없을 때 적절한 안내 문구가 나오는지 확인
*   [x] 로그인하지 않은 상태로 `/mypage` 접속 시 리다이렉션 동작 확인
