# 로그인 (Auth Login) - Technical Specification (Spec)

## 1. 아키텍처 설계 (FSD Layering)
*   **Shared**: 
    *   `api/apiClient`: `ky` 기반 HTTP 통신.
    *   `ui/Button`, `InputGroup`, `FormField`: 공통 UI 컴포넌트.
    *   `model/auth/store`: `accessToken` 관리.
*   **Entities**: 
    *   `user/useUserStore`: 사용자 세션 정보 관리 (`login`, `logout` 액션).
*   **Features**: 
    *   `auth/ui/LoginForm`: 로그인 폼 컴포넌트 (비즈니스 로직 포함).
    *   `auth/model/authSchema`: Zod 기반 유효성 검사 규칙.
    *   `auth/api/authApi`: 로그인/회원가입 API 호출 함수.
*   **Pages**: 
    *   `auth/login/ui/LoginPage`: 로그인 페이지 컨테이너.

## 2. 데이터 모델링 & 타입 정의 (Data Modeling)
```typescript
// src/features/auth/model/authSchema.ts
export const loginSchema = z.object({
  email: z.string().email('유효한 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// src/features/auth/api/authApi.ts
export interface LoginResult {
  accessToken: string;
  id: number;
}
```

## 3. API 명세 (API Specification)
*   **Endpoint**: `POST auth/login`
*   **Request**: `LoginFormValues`
*   **Response**: `LoginResult`
*   **Mocking (MSW)**: `src/features/auth/api/msw/handlers.ts`에서 핸들링.

## 4. 컴포넌트 설계 (Component Design)
*   **LoginForm**: `react-hook-form`과 `zodResolver`를 사용하여 폼 상태 관리 및 검증 수행.
*   **인증 흐름**: 
    1. `authApi.login` 호출
    2. 성공 시 `useUserStore.login` 액션 실행 (사용자 정보 저장)
    3. `router.replace(ROUTES.HOME)` 호출로 페이지 이동.

## 5. 핵심 로직 & 알고리즘 (Key Logic)
*   `ApiError` 처리를 통한 사용자 친화적 에러 메시지 노출.
*   `isSubmitting` 상태를 통한 중복 제출 방지.
