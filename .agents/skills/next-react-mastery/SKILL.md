# Next.js 16 & React 19 Mastery Skill

이 스킬은 React 19와 Next.js 16의 최신 기능을 활용하여 현대적이고 성능이 뛰어난 프론트엔드 애플리케이션을 구축하기 위한 고급 가이드라인을 정의합니다.

## 1. Server Components & Client Boundaries
- **RSC 우선 원칙**: 모든 컴포넌트는 기본적으로 **Server Component**로 작성합니다. `'use client'`는 인터랙션(상태, 훅, 이벤트)이 필요한 말단 컴포넌트에만 선언합니다.
- **데이터 전달**: 서버에서 클라이언트로 데이터를 넘길 때 반드시 직렬화 가능한 데이터만 전달하며, 복잡한 비즈니스 로직은 서버에서 미리 처리하여 결과값만 넘깁니다.

## 2. React 19 - `use` 훅 & 캐싱
- **`use` 훅**: 비동기 데이터(Promise)나 컨텍스트를 조건부로 읽어올 때 `useEffect` 대신 `use` 훅을 사용합니다.
- **`React.cache()`**: 동일한 요청(Request-level)에서 중복된 데이터 패칭을 방지하기 위해 서버 측에서 `cache` 함수를 적극 활용합니다.

## 3. Server Actions & Mutation
- **데이터 변경**: 데이터 수정(POST, PUT, DELETE)은 가능한 한 **Server Actions**를 통해 수행하며, 클라이언트의 `useActionState` 또는 `useFormStatus`와 연동하여 로딩/성공 상태를 관리합니다.
- **낙관적 업데이트 (Optimistic UI)**: 사용자의 입력에 즉각 반응하기 위해 `useOptimistic` 훅을 활용하여 사용자 경험을 극대화합니다.

## 4. 에이전트 자동 수행 규칙
- 비동기 로직 작성 시 `useEffect`를 사용하기 전, 서버 컴포넌트나 `use` 훅으로 대체 가능한지 검토합니다.
- `app/` 라우트 핸들러보다는 Server Actions를 우선적으로 고려하여 타입 안정성과 DX를 높입니다.
