# [Feature Name] - Technical Specification (Spec)

## 1. 아키텍처 설계 (FSD Layering)
(참조: `fsd-architecture`, `advanced-fsd-clean` 스킬)
*   **Shared**: (UI, Lib, API 등 공통 요소)
*   **Entities**: (도메인 데이터 모델 및 Public API(`index.ts`) 정의)
*   **Features**: (사용자 상호작용 및 독립적 기능 슬라이스)
*   **Widgets**: (복합 슬라이스 조합 UI 블록)
*   **Pages**: (Next.js 라우트 기반 구성)

## 2. 데이터 모델링 & 타입 정의 (Data Modeling)
(참조: `api-strategy` 스킬 - 3-Tier Structure)
```typescript
// DTO (Server Side)
interface FeatureDTO { ... }

// Frontend Model (UI Side)
interface FeatureModel { ... }
```

## 3. API 명세 (API Specification)
(참조: `api-mocking-strategy` 스킬)
*   **Endpoint**: `GET /api/v1/...`
*   **MSW Handler**: `src/shared/api/mock/handlers.ts` 내 모킹 정의
*   **Query Key Factory**: `entities/[slice]/model/queryKeys.ts`

## 4. 컴포넌트 & 상태 설계 (Component Design)
(참조: `state-management`, `advanced-zustand`, `advanced-tanstack-query` 스킬)
*   **Server State**: TanStack Query (staleTime, gcTime 설정)
*   **Global/Local State**: Zustand (Slice 패턴)
*   **Form**: React Hook Form + Zod (참조: `form-validation-strategy`)

## 5. 렌더링 & 인증 전략 (Rendering & Auth)
(참조: `rendering-auth`, `next-best-practices` 스킬)
*   **Rendering**: (SSG | ISR | SSR | CSR) 선택 및 근거
*   **Auth**: 세션 및 토큰 접근 권한 확인

## 6. 보안 및 성능 (Security & Performance)
(참조: `security-privacy`, `performance-cwv`, `vercel-react-best-practices` 스킬)
*   **Security**: 민감 정보 노출 방지, XSS 방어 (`dangerouslySetInnerHTML` 금지)
*   **LCP/CLS**: 이미지 `priority` 속성 및 `aspect-ratio` 고정
*   **Optimization**: `memo`, `useMemo`, `useCallback` 전략적 사용

## 7. 인터랙션 및 애니메이션 (UX)
(참조: `animation-strategy`, `asset-management` 스킬)
*   **Interaction**: `framer-motion` 적용 범위 및 효과
*   **Assets**: `Lucide` 아이콘 및 `next/image` 최적화
