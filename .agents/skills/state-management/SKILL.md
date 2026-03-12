# State Management Skill

이 스킬은 프로젝트의 상태 관리(State Management) 전략을 정의하며, 에이전트가 어떤 상태를 어디에 저장할지 판단하는 기준을 제공합니다.

## 1. 상태 분류 및 도구 선택
상태의 성격에 따라 적합한 도구를 사용합니다.

- **서버 상태 (Server State)**: **TanStack Query** (`useQuery`, `useMutation`)
  - 서버로부터 가져온 데이터, 캐싱, 동기화가 필요한 모든 데이터.
- **전역 클라이언트 상태 (Global State)**: **Zustand**
  - 여러 컴포넌트나 페이지에서 공유해야 하는 UI 상태 (예: 사이드바 개폐 여부, 현재 로그인 유저 정보).
- **지역 상태 (Local State)**: **useState**, **useReducer**
  - 특정 컴포넌트 내부에서만 쓰이는 간단한 상태 (예: 폼 입력값, 아코디언 열림 여부).

## 2. Zustand 사용 규칙
- **Slice 패턴**: 하나의 거대한 스토어 대신 기능 단위로 Slice를 나누어 관리합니다.
- **Selector 사용**: 필요한 상태만 구독하도록 셀렉터를 활용합니다. (예: `const isOpen = useSidebarStore(s => s.isOpen)`)
- **Actions 정의**: 상태 변경 로직(Setter)은 스토어 내부에 정의하여 외부에서 직접 상태를 수정하지 않게 합니다.

## 3. TanStack Query 사용 규칙
- **선언적 데이터 패칭**: `useSuspenseQuery`를 우선적으로 사용하여 Suspense를 통한 로딩 처리를 유도합니다.
- **Mutation 처리**: 데이터 변경 후 관련 쿼리를 무효화(`invalidateQueries`)하여 최신 데이터를 유지합니다.
- **Custom Hook화**: API 호출 로직은 항상 커스텀 훅으로 만들어 `entities/` 또는 `features/` 레이어에 배치합니다.
