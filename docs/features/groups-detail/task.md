# 그룹 상세 (Group Detail) - Implementation Task List

## 1. 작업 단계 (Implementation Phases)
*   [x] **Phase 1: 인프라 및 레이아웃**
    *   [x] 그룹 상세 페이지 기본 레이아웃 구성 (`GroupDetailPage`)
    *   [x] 탭 시스템 적용 (정보/게시판/멤버/일정)
*   [x] **Phase 2: 상호작용 기능 구현**
    *   [x] 찜하기 기능 (`LikeButton`) 및 낙관적 업데이트 적용
    *   [x] 가입 신청 및 취소 로직 (`JoinGroupButton`) 연동
*   [x] **Phase 3: 서브 위젯 개발**
    *   [x] 게시판 목록 및 작성 폼 구현 (`GroupBoard`)
    *   [x] 멤버 리스트 및 공지사항 섹션 구현
    *   [x] 일정 관리 위젯 (`GroupSchedules`) 연동
*   [x] **Phase 4: 통합 및 검증**
    *   [x] 참여 여부에 따른 UI 권한 제어 (비멤버 작성 차단 등)
    *   [x] 데이터 부재 시의 Empty State 처리

## 2. 세부 체크리스트 (Detailed Tasks)
### 🚀 Phase 1-2 (완료)
- [x] 페이지 진입 시 ID 기반 데이터 패칭 연동
- [x] 찜하기 클릭 시 하트 아이콘 상태 변화 확인
- [x] 사이드바 내 가입 상태 실시간 반영

### 🎨 Phase 3-4 (완료)
- [x] 게시판 글 작성 후 즉시 리스트 갱신
- [x] 탭 전환 시 쿼리 파라미터 연동 (새로고침 시 유지)
- [x] 모바일 반응형 사이드바(Bottom Sheet) 대응

## 3. 검증 및 테스트 계획 (Verification)
*   [x] 로그인하지 않은 상태로 가입 시도 시 로그인 유도 확인
*   [x] 가입된 멤버에게만 글쓰기 버튼이 노출되는지 확인
*   [x] 탭 간 이동 시 데이터가 끊김 없이 전환되는지 확인
*   [x] 대량의 멤버 리스트 스크롤링 성능 확인
