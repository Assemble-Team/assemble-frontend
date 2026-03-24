# 그룹 목록 및 검색 (Group List & Search) - Implementation Task List

## 1. 작업 단계 (Implementation Phases)
*   [x] **Phase 1: 인프라 및 기반 작업**
    *   [x] URL 쿼리 파라미터 제어를 위한 전용 훅(`useGroupListFilter`) 구현
    *   [x] 필터 타입 및 상수 정의 (카테고리, 레벨 등)
*   [x] **Phase 2: 개별 필터 기능 구현**
    *   [x] 카테고리 탭 필터 구현 (`GroupCategoryFilter`)
    *   [x] 레벨, 상태, 정렬 필터 컴포넌트 구현
    *   [x] 검색바 컴포넌트 구현 및 검색어 연동
*   [x] **Phase 3: 목록 위젯 조립 및 연동**
    *   [x] `GroupListWidget`에서 모든 필터와 리스트 결과 조합
    *   [x] 비동기 데이터 로딩 처리를 위한 `AsyncBoundary` 적용
*   [x] **Phase 4: 고도화 및 검증**
    *   [x] 필터 초기화 기능 추가
    *   [x] 모바일 대응 (가로 스크롤, 반응형 레이아웃)

## 2. 세부 체크리스트 (Detailed Tasks)
### 🚀 Phase 1-2 (완료)
- [x] `useSearchParams`를 이용한 다중 선택(`toggle`) 로직 테스트
- [x] 카테고리 탭 선택 시 URL 즉시 업데이트 확인
- [x] 필터 리셋 시 모든 쿼리 파라미터 초기화 여부 확인

### 🎨 Phase 3-4 (완료)
- [x] 스켈레톤 UI 그리드 레이아웃 구성
- [x] 검색 결과가 없을 때의 UI(Empty State) 대응
- [x] 오프라인 지역 선택 다이얼로그 연동 (구현 중 혹은 완료)

## 3. 검증 및 테스트 계획 (Verification)
*   [x] URL에 필터를 직접 입력했을 때 리스트가 올바르게 필터링되는지 확인 (공유 기능 테스트)
*   [x] 뒤로가기 클릭 시 이전 필터 상태로 복구되는지 확인
*   [x] 대량의 데이터 로딩 시 스켈레톤 UI 노출 여부 확인
*   [x] 검색어 입력 시 관련 결과만 출력되는지 확인
