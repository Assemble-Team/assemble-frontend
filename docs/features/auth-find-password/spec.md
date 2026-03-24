# 비밀번호 찾기 (Auth Find Password) - Technical Specification (Spec)

## 1. 아키텍처 설계 (FSD Layering)
*   **Shared**:
    *   `ui/Input`, `InputGroup`, `FormField`, `Button`: 공통 UI 컴포넌트.
    *   `constants/routes`: `ROUTES.AUTH.LOGIN`, `ROUTES.AUTH.FIND_PASSWORD` 경로 사용.
*   **Features**:
    *   `auth/ui/FindPasswordForm`: 비밀번호 찾기 폼 및 로직.
    *   `auth/model/authSchema`: `findPasswordSchema` 정의.
*   **Pages**:
    *   `auth/find-password/ui/FindPasswordPage`: 페이지 레이아웃 구성.

## 2. 데이터 모델링 & 타입 정의 (Data Modeling)
```typescript
// src/features/auth/model/authSchema.ts
export const findPasswordSchema = z.object({
  email: z.string().email('유효한 이메일 형식이 아닙니다.'),
});

export type FindPasswordFormValues = z.infer<typeof findPasswordSchema>;
```

## 3. API 명세 (API Specification)
*   **Endpoint**: (TBD) `POST auth/find-password` (현재 미연동)
*   **Request**: `FindPasswordFormValues` (email)

## 4. 컴포넌트 설계 (Component Design)
*   **FindPasswordForm**: 
    *   `react-hook-form` + `zodResolver` 기반 폼 상태 관리.
    *   `Lucide` 아이콘 적용 (`Mail`, `ChevronLeft`).
    *   성공 시 `alert`를 통한 안내 제공.

## 5. 핵심 로직 & 알고리즘 (Key Logic)
*   이메일 형식 유효성 검사 (클라이언트 사이드).
*   `router.replace`를 통한 뒤로가기 제어 및 로그인 화면 복귀 기능.
