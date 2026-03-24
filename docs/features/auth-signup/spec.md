# 회원가입 (Auth Signup) - Technical Specification (Spec)

## 1. 아키텍처 설계 (FSD Layering)
*   **Shared**:
    *   `api/apiClient`: `ky` 기반 HTTP 통신. (Response 자동 `result` 추출)
    *   `ui/Input`, `InputGroup`, `FormField`, `Button`: 공통 UI 컴포넌트.
*   **Entities**:
    *   `user/useUserStore`: 회원가입 성공 후 세션 유지 (`login` 액션).
*   **Features**:
    *   `auth/ui/SignupForm`: 회원가입 폼 및 비즈니스 로직 (이메일 인증 버튼 포함).
    *   `auth/model/authSchema`: `signupSchema`, `CATEGORIES`, `SignupRequest` 정의.
    *   `auth/api/signupApi`: 회원가입 플로우 API 함수 (이메일 인증 포함).
    *   `auth/api/loginApi`: 로그인/인증 세션 관련 API 함수.
    *   `auth/api/useSignupMutations`: 회원가입 플로우 Tanstack Query Hooks.
*   **Pages**:
    *   `auth/signup/ui/SignupPage`: 회원가입 페이지 컨테이너.

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

/**
 * 백엔드 전송용 타입 (confirmPassword 제외)
 */
export type SignupRequest = Omit<SignupFormValues, 'confirmPassword'>;

export interface SignupResult {
  id: number;
  createdAt: string;
}
```

## 3. API 명세 (API Specification)
### 3.1 이메일 인증 요청
*   **Endpoint**: `POST /api/members/email`
*   **Request**: `{ email: string }`
*   **Response**: `ApiResponse<void>`
    *   성공 시 `code: "COMMON200"`

### 3.2 이메일 인증번호 확인
*   **Endpoint**: `POST /api/members/email/check`
*   **Request**: `{ email: string, code: string }`
*   **Response**: `ApiResponse<void>`
    *   성공 시 `code: "COMMON200"`
    *   실패 시 `MEMBER4001` (잘못된 코드), `MEMBER4002` (이미 존재하는 이메일)

### 3.3 회원가입
*   **Endpoint**: `POST /api/members/signup`
*   **Request**: `SignupRequest`
*   **Response**: `ApiResponse<SignupResult>`
    *   성공 시 `result` 필드에 `{ id: number, createdAt: string }` 포함.

## 4. 핵심 로직 (Key Logic)
*   **Email Verification Flow**:
    1.  사용자가 이메일 입력 후 '인증' 버튼 클릭. (`requestEmailVerification` 호출)
    2.  성공 시 인증번호 입력 필드 노출.
    3.  인증번호(6자리) 입력 후 '확인' 버튼 클릭. (`verifyEmailCode` 호출)
    4.  성공 시 인증 완료 상태로 변경(이메일 필드 비활성화 권장)하고 회원가입 버튼 활성화 조건 충족.
*   **Form Data Transformation**: `SignupForm` 제출 시 `signupSchema`를 통해 검증된 데이터에서 `confirmPassword`를 제거하여 `authApi.signup`에 전달.

## 5. 컴포넌트 설계 (Component Design)
*   **SignupForm**: 
    *   이메일 입력 필드 옆에 '인증' 버튼 배치.
    *   인증 요청 성공 후, 하단에 인증번호 입력 필드와 '확인' 버튼이 동적으로 렌더링됨.
    *   인증이 완료되면 해당 영역은 '인증 완료' 메시지로 대체되거나 체크 아이콘으로 표시됨.
