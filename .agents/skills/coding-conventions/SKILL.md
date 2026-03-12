# Coding Conventions Skill

이 스킬은 프로젝트의 코딩 스타일, 네이밍, 라이브러리 활용 등 공통 코딩 규약을 정의합니다.

## 1. 프론트엔드 설계 원칙
- **SRP (Single Responsibility Principle)**: 컴포넌트와 함수는 단일 책임을 준수합니다.
- **Declarative UI**: 로직과 UI를 분리하며 불필요한 `useEffect`를 지양합니다.
- **A11y**: 시맨틱 태그를 활용하여 웹 접근성을 고려합니다.
- **Type Safety**: 런타임과 컴파일 타임 모두에서 타입 안정성을 확보합니다.

## 2. 핵심 컨벤션
- **Next.js/React**:
  - `<img>` 태그 대신 `next/image` 사용.
  - 외부 링크가 아닌 경우 `next/link` 사용.
  - 무거운 클라이언트 컴포넌트는 `next/dynamic`으로 코드 스플리팅.
- **TypeScript**:
  - `any` 사용 금지, `unknown` 또는 명시적 타입 선언.
  - 객체 타입은 `interface`보다 `type` 선호.
- **상태 관리**:
  - 클라이언트 전역 상태: `Zustand`.
  - 서버 상태: `TanStack Query`.

## 3. 스타일링 (Tailwind CSS v4)
- 유틸리티 클래스 기반 설계.
- 조건부 클래스 병합은 `cn()` 유틸(`clsx` + `tailwind-merge`) 사용.
- 모바일 퍼스트 반응형 디자인 원칙 준수.

## 4. 파일 네이밍
- **컴포넌트**: PascalCase (예: `LoginForm.tsx`)
- **훅**: camelCase + `use` 접두사 (예: `useAuthStore.ts`)
- **유틸/타입**: camelCase (예: `formatDate.ts`, `auth.types.ts`)
- **Next.js 특수 파일**: 소문자 (예: `page.tsx`, `layout.tsx`)
