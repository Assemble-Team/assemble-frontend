# 로그인 (Auth Login) - Technical Specification (Spec)

## 1. 아키텍처 설계 (FSD Layering)
*   **Shared**: 
    *   `api/apiClient`: `ky` 기반 HTTP 통신. (Header에서 AccessToken 추출 및 저장 로직 필요)
    *   `ui/Button`, `InputGroup`, `FormField`: 공통 UI 컴포넌트.
*   **Entities**: 
    *   `user/useUserStore`: 사용자 세션 정보 관리 (`login`, `logout` 액션).
*   **Features**: 
    *   `auth/ui/LoginForm`: 로그인 폼 컴포넌트.
    *   `auth/model/authSchema`: `loginSchema`, `LoginFormValues` 정의.
    *   `auth/api/loginApi`: 로그인 (`login`) API 함수.
    *   `auth/api/useLoginMutation`: 로그인 프로세스 관리 Tanstack Query Hook.

## 2. 데이터 모델링 & 타입 정의 (Data Modeling)
```typescript
// src/features/auth/model/authSchema.ts
export const loginSchema = z.object({
  email: z.string().email('유효한 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// src/features/auth/api/loginApi.ts
export interface LoginResult {
  memberId: number;
  refreshToken: string;
  createdAt: string;
  accessToken: string; // Header에서 추출하여 합쳐진 데이터
}
```

## 3. API 명세 (API Specification)
### 3.1 로그인
*   **Endpoint**: `POST /api/auth/login`
*   **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
*   **Response Header**:
    *   `authorization`: `Bearer {accessToken}`
*   **Response Body (Success)**:
    ```json
    {
      "isSuccess": true,
      "code": "COMMON200",
      "message": "요청이 성공했습니다.",
      "result": {
        "memberId": 1,
        "refreshToken": "eyJhbGciOiJIUzI1NiJ9...",
        "createdAt": "2026-01-20T18:45:54.8199099"
      },
      "timestamp": "2026-01-20T18:45:54.8207955"
    }
    ```

### 3.2 토큰 재발급 (Reissue)
*   **Endpoint**: `POST /api/auth/reissue`
*   **Request Body**:
    ```json
    {
      "refreshToken": "string"
    }
    ```
*   **Response Header**:
    *   `authorization`: `Bearer {newAccessToken}`
*   **Response Body (Success)**:
    ```json
    {
      "isSuccess": true,
      "code": "COMMON200",
      "message": "요청이 성공했습니다.",
      "result": {},
      "timestamp": "2026-02-28T11:03:37.432Z"
    }
    ```

### 3.3 로그아웃 (Logout)
*   **Endpoint**: `POST /api/auth/logout`
*   **Request Body**: `void`
*   **Response Body (Success)**: `ApiResponse<void>`

### 3.4 회원 탈퇴 (Withdrawal)
*   **Endpoint**: `DELETE /api/auth/me`
*   **Request Body**: `void`
*   **Response Body (Success)**: `ApiResponse<void>`

### 3.5 에러 코드
*   **MEMBER4004**: 존재하지 않는 이메일 주소입니다.
*   **MEMBER4005**: 일치하지 않는 비밀번호입니다.
*   **MEMBER4007**: 존재하지 않는 리프레시 토큰입니다.

## 4. 핵심 로직 (Key Logic)
*   **Token Reissue Flow**:
    1. AccessToken 만료 시 (401 에러), `apiClient` 인터셉터에서 재발급 요청 트리거.
    2. 로컬 스토리지/쿠키의 `refreshToken`을 담아 `POST /api/auth/reissue` 호출.
    3. 응답 헤더의 `authorization`에서 새 `accessToken` 추출 및 갱신.
    4. 실패 시 (MEMBER4007 등) 강제 로그아웃 처리.
