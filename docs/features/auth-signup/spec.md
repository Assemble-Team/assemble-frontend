# 회원가입 (Auth Signup) - Technical Specification (Spec)

## 1. 아키텍처 설계 (FSD Layering)
*   **Shared**:
    *   `ui/Input`, `InputGroup`, `FormField`, `Button`: 공통 UI 컴포넌트.
    *   `lib/utils`: `cn` (클래스 합성 함수).
*   **Entities**:
    *   `user/useUserStore`: 회원가입 성공 후 자동 로그인 및 세션 유지 (`login` 액션).
*   **Features**:
    *   `auth/ui/SignupForm`: 회원가입 폼 및 비즈니스 로직.
    *   `auth/model/authSchema`: `signupSchema` 및 `CATEGORIES` 상수 정의.
    *   `auth/api/authApi`: `authApi.signup` (POST /auth/signup) 호출 함수.
*   **Pages**:
    *   `auth/signup/ui/SignupPage`: 회원가입 페이지 레이아웃 및 폼 렌더링.

## 2. 데이터 모델링 & 타입 정의 (Data Modeling)
```typescript
// src/features/auth/model/authSchema.ts
export const CATEGORIES = ['STUDY', 'EXERCISE', 'PROJECT', 'HOBBY', 'CULTURE_ART'] as const;

export const signupSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
  email: z.string().email('유효한 이메일 형식이 아닙니다.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.').regex(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, '비밀번호는 영문과 숫자를 포함해야 합니다.'),
  confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  categories: z.array(z.enum(CATEGORIES)).min(1, '최소 1개의 관심 카테고리를 선택해주세요.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
});

export type SignupFormValues = z.infer<typeof signupSchema>;
```

## 3. API 명세 (API Specification)
*   **Endpoint**: `POST auth/signup`
*   **Request**: `SignupFormValues` (name, email, password, categories)
*   **Response**: `SignupResult` { id: number, createdAt: string }

## 4. 컴포넌트 설계 (Component Design)
*   **SignupForm**: 
    *   `react-hook-form` + `zodResolver` 기반 상태 관리.
    *   `selectedCategories` 관찰(watch)을 통한 토글 버튼 UI 연동.
    *   `toggleCategory`: 관심사 리스트 상태를 `setValue`로 제어.
*   **자동 로그인 흐름**:
    1. `authApi.signup` 성공 응답 수신.
    2. `useUserStore.login` 호출 (id, email, name 저장).
    3. `router.replace(ROUTES.HOME)`.

## 5. 핵심 로직 & 알고리즘 (Key Logic)
*   비밀번호 확인 일치(`refine`) 필터링.
*   칩(Chip) 기반 멀티 선택 로직 (배열 관리).
