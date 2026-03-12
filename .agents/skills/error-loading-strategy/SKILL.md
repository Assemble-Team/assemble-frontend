# Error & Loading Strategy Skill

이 스킬은 프로젝트의 로딩 상태와 에러 처리 전략을 정의합니다. 에이전트는 사용자가 중단 없는 앱 경험을 하도록 적절한 경계를 설정해야 합니다.

## 1. 로딩 처리 전략 (Suspense)
- **페이지 단위**: Next.js의 `loading.tsx`를 활용하여 페이지 전환 시 로딩 상태를 제공합니다.
- **컴포넌트 단위**: 비동기 데이터가 필요한 특정 영역은 `Suspense`로 감싸고 `fallback` UI(Skeleton UI 등)를 제공합니다.
- **스트리밍**: 서버 컴포넌트의 장점을 살려 가능한 한 스트리밍 방식으로 데이터를 점진적으로 렌더링합니다.

## 2. 에러 처리 전략 (Error Boundary)
- **AsyncBoundary 활용**: 프로젝트 내 `src/shared/ui/AsyncBoundary.tsx`를 사용하여 로딩(`Suspense`)과 에러(`ErrorBoundary`)를 한꺼번에 처리합니다.
- **복구 메커니즘**: 에러 발생 시 사용자에게 재시도(`reset`) 버튼을 제공하여 페이지 새로고침 없이 문제를 해결하도록 유도합니다.
- **Global Error**: 최상위 `error.tsx`는 예상치 못한 치명적 오류만 처리하고, 기능 단위 에러는 `AsyncBoundary`를 통해 지역적으로 처리합니다.

## 3. 선언적 처리 가이드라인
- `if (isLoading)` 또는 `if (error)`와 같은 명령적 코드를 지양합니다.
- 대신 `useSuspenseQuery`를 사용하여 비즈니스 로직에만 집중하고, 로딩과 에러는 선언적으로 경계(`Boundary`)에 맡깁니다.
