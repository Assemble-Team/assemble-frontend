# AGENTS.md — AI 에이전트 지침서

이 파일은 이 프로젝트에서 작업하는 AI 에이전트(Antigravity 등)가 항상 자동으로 읽는 파일입니다. 코드 작성, 리뷰, 리팩토링 시 아래의 모든 가이드라인을 반드시 따르세요.

## 필수 Skills (항상 참조)

작업 시 아래 skill 가이드를 반드시 읽고 적용하세요:

- Next.js 모범 사례 → `.agents/skills/next-best-practices/SKILL.md`
- Vercel React 모범 사례 → `.agents/skills/vercel-react-best-practices/SKILL.md`

---

## 프로젝트 개요

| 항목            | 내용                            |
| --------------- | ------------------------------- |
| 프레임워크      | Next.js 16 (App Router)         |
| React           | React 19                        |
| 언어            | TypeScript                      |
| 패키지 매니저   | pnpm                            |
| 스타일링        | Tailwind CSS v4                 |
| 전역 상태       | Zustand                         |
| 서버 상태       | TanStack Query (React Query v5) |
| 폼              | React Hook Form + Zod           |
| HTTP 클라이언트 | ky                              |
| 아이콘          | lucide-react                    |
| API 모킹        | MSW v2                          |
| 코드 품질       | ESLint + Prettier               |

---

## 아키텍처 (Feature-Sliced Design)

`src/`

- `app/` # Next.js App Router (pages, layouts, 인터셉팅 라우트)
- `widgets/` # 복합 UI 블록 (예: Header, Sidebar)
- `features/` # 사용자 기능 단위 (예: 로그인, 회원가입)
- `entities/` # 비즈니스 엔티티 (예: user, group)
- `shared/` # 공통 유틸, UI 컴포넌트, 타입

### FSD 규칙

1.  **임포트 방향:** `app` → `widgets` → `features` → `entities` → `shared`
2.  **슬라이스 간 교차 임포트 금지:** 예) features끼리 서로 임포트 불가
3.  **각 슬라이스는 반드시 `index.ts` 를 통해 퍼블릭 API 제공**

---

## 렌더링 전략

### 전략 선택 기준

SEO 필요 여부가 1차 기준, 데이터 변경 주기가 2차 기준이다.

| 전략    | 조건                             | 예시 페이지                    |
| ------- | -------------------------------- | ------------------------------ |
| **SSG** | SEO 필요 + 데이터 거의 안 바뀜   | 홈페이지, 약관, 마케팅 페이지  |
| **ISR** | SEO 필요 + 주기적 갱신 필요      | 모임 리스트 (`revalidate: 60`) |
| **SSR** | SEO 필요 + 요청 시점 데이터 필요 | 개인화 피드, 검색 결과         |
| **CSR** | SEO 불필요 (인증 게이트 뒤)      | 마이페이지, 모임 관리, 설정    |

**원칙:** 인증이 필요한 페이지는 기본적으로 CSR. SSR은 SEO가 진짜 필요한 페이지에만 선택적으로 적용한다.

### TanStack Query 렌더링 전략

`useSuspenseQuery`는 렌더링 전략과 무관하다. SSR 여부는 서버 컴포넌트에서 `prefetchQuery` 호출 여부로 결정된다.

| 조합                                   | 초기 HTML         | 동작          |
| -------------------------------------- | ----------------- | ------------- |
| `prefetchQuery` O + `useSuspenseQuery` | 데이터 포함       | SSR hydration |
| `prefetchQuery` X + `useSuspenseQuery` | Suspense fallback | CSR fetch     |

---

## 인증 전략

### 토큰 저장 전략

| 토큰            | 저장 위치      | 이유                      |
| --------------- | -------------- | ------------------------- |
| `refresh_token` | httpOnly 쿠키  | XSS 방어, 서버에서만 접근 |
| `access_token`  | Zustand 메모리 | SSR 불필요, 구현 단순     |

- **localStorage 저장 금지** — XSS 취약
- 공개 페이지(홈, 모임 리스트)는 SSG/ISR이므로 토큰 불필요
- 인증 페이지는 CSR이므로 메모리 토큰으로 충분

### BFF Route Handler (3개만 구현)

1.  `/api/auth/login` → Auth 서버 호출 후 `refresh_token` 쿠키 발급 + `access_token` 반환
2.  `/api/auth/refresh` → `refresh_token` 쿠키로 `access_token` 재발급
3.  `/api/auth/logout` → `refresh_token` 쿠키 삭제

### 앱 초기화 시 silent refresh

`useEffect`에서 `/api/auth/refresh` 호출을 통해 새로고침 시에도 로그인 상태 유지.

---

## 핵심 패턴

### 1. Error Boundary 패턴 (Suspense와 세트)

`useSuspenseQuery`를 쓰는 곳엔 반드시 **`AsyncBoundary`**를 함께 배치한다. 둘 중 하나만 쓰는 것은 금지.
(프로젝트 내 `src/shared/ui/AsyncBoundary.tsx` 사용)

### 2. Query Key Factory 패턴

queryKey를 문자열로 흩어서 쓰지 않는다. 엔티티별로 팩토리를 만들어 중앙 관리한다.
팩토리는 해당 엔티티 슬라이스(`entities/`)에 위치하며, `as const`로 타입 추론을 보장한다.

### 3. ky 인터셉터 패턴 (토큰 주입 + 갱신 + 에러 처리)

`ky` 인스턴스는 `shared/api/apiClient.ts`에서 단일 인스턴스로 관리한다. 직접 `ky` import 금지.

- `beforeRequest`에서 Zustand 메모리의 `access_token`을 Authorization 헤더에 주입
- 401 발생 시 `/api/auth/refresh` 호출 후 원래 요청 1회 재시도
- refresh 실패 시 토큰 초기화 후 로그인 리다이렉트
- 에러 메시지는 `beforeError`에서 표준화 — 컴포넌트에서 별도 파싱 금지

---

## 핵심 컨벤션

### Next.js / React

- **기본적으로 Server Component 사용**, `'use client'`는 꼭 필요한 경우에만
- 이미지는 반드시 **`next/image`** 사용 (`<img>` 태그 금지)
- 폰트는 반드시 **`next/font`** 사용
- 내부 링크는 반드시 **`next/link`** 사용
- **무거운 클라이언트 컴포넌트는 `next/dynamic` 으로 코드 스플리팅**
- **Next.js 15+ Dynamic Import 규칙:** 서버 컴포넌트(Page 등)에서 `ssr: false`를 직접 사용할 수 없습니다. 반드시 별도의 클라이언트 컴포넌트 파일(`.client.tsx`)을 만들어 `dynamic` 선언을 옮긴 후, 서버 컴포넌트에서 이를 임포트하여 사용하세요.
- 병렬 라우트 슬롯에는 반드시 **`default.tsx`** 제공

### TypeScript

- **`any` 사용 금지** — `unknown` 또는 명시적 타입 사용
- 객체 타입은 `interface`보다 **`type`** 선호
- 함수 반환 타입은 명시적으로 선언

### 폼

- **React Hook Form + Zod** 스키마 검증 조합 사용
- `@hookform/resolvers/zod` 로 스키마 연결

### 상태 관리

- 전역 클라이언트 상태 → **Zustand**
- 서버 상태 → **TanStack Query** (`useEffect`에서 직접 fetch 금지)

### 스타일링

- **Tailwind CSS v4** 유틸리티 클래스 사용
- 조건부 클래스 병합은 `clsx` + `tailwind-merge` 조합의 `cn()` 유틸 사용
- 모바일 퍼스트 반응형 디자인 원칙 준수

---

## 성능 규칙 (Vercel Skills 핵심 요약)

- **데이터 워터폴 방지**: 독립적인 fetch는 `Promise.all()` 로 병렬 처리
- **`'use client'` 최소화**: 클라이언트 컴포넌트는 가능한 한 깊은 트리에 배치
- **배럴 파일 임포트 지양**: 소스 파일에서 직접 임포트
- **`React.cache()` 활용**: Server Component 내 요청별 중복 제거
- **`Suspense` 경계 활용**: 스트리밍 및 로딩 상태 처리
- **`next/dynamic` 활용**: 무거운 컴포넌트 코드 스플리팅

---

## 파일 네이밍 컨벤션

| 종류              | 규칙                     | 예시                                  |
| ----------------- | ------------------------ | ------------------------------------- |
| 컴포넌트          | PascalCase               | `LoginForm.tsx`                       |
| 훅                | camelCase + `use` 접두사 | `useAuthStore.ts`                     |
| 유틸리티          | camelCase                | `formatDate.ts`                       |
| 타입              | camelCase + `.types.ts`  | `auth.types.ts`                       |
| 퍼블릭 API        | 항상 `index.ts`          | `index.ts`                            |
| Next.js 특수 파일 | 소문자                   | `page.tsx`, `layout.tsx`, `error.tsx` |
