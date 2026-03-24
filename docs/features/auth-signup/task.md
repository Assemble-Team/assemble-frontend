# 회원가입 (Auth Signup) - Implementation Task List

## 1. 작업 단계 (Implementation Phases)
*   [x] **Phase 1: 인프라 및 기반 작업**
    *   [x] `authApi.signup` 인터페이스 및 핸들러 구현
    *   [x] MSW를 이용한 회원가입 API 모킹
*   [x] **Phase 2: 비즈니스 로직 및 스키마 정의**
    *   [x] Zod 기반 `signupSchema` 정의 (비밀번호 규칙, 카테고리 검증 포함)
    *   [x] 카테고리 상수(`CATEGORIES`) 및 타입 정의
*   [x] **Phase 3: UI 및 컴포넌트 개발**
    *   [x] `SignupForm` 컴포넌트 구현
    *   [x] 관심 카테고리 선택용 칩(Chip) UI 개발 및 토글 로직 연동
    *   [x] 아이콘 적용 및 폼 레이아웃 구성
*   [x] **Phase 4: 통합 및 검증**
    *   [x] 회원가입 완료 후 자동 로그인 연동
    *   [x] 성공 시 메인 화면 이동 및 실패 시 에러 핸들링
    *   [x] `SignupPage` 라우트 연결
*   [x] **Phase 5: 실제 백엔드 API 연동 및 이메일 인증**
    *   [x] `authApi.ts`: 엔드포인트 수정 (`/api/members/signup`)
    *   [x] `authApi.ts`: 이메일 인증 요청 API 추가 (`/api/members/email`)
    *   [x] `apiClient.ts`: `result` 필드 없는 응답(void) 처리 로직 보완
    *   [x] `SignupForm`: 이메일 인증 요청 버튼 UI 추가 및 기능 연동
    *   [x] `SignupForm`: 회원가입 제출 시 `confirmPassword` 필드 제외 처리
*   [x] **Phase 6: 이메일 인증번호 확인 구현**
    *   [x] `authApi.ts`: 인증번호 확인 API 추가 (`/api/members/email/check`)
    *   [x] `SignupForm`: 인증번호 입력 필드 및 '확인' 버튼 UI 구현
    *   [x] `SignupForm`: 인증번호 확인 성공 시 인증 상태 관리 (UI 피드백)
    *   [x] `SignupForm`: 이메일 인증이 완료되지 않은 경우 회원가입 제출 차단 로직

## 2. 세부 체크리스트 (Detailed Tasks)
### 🚀 Phase 6: Email Verification Check
- [x] 6자리 인증번호 입력 시에만 '확인' 버튼 활성화 로직
- [x] 인증 성공 시 이메일 입력 필드 Read-only 처리
- [x] `MEMBER4001`, `MEMBER4002` 에러 메시지 팝업 처리 (alert 활용)

## 3. 검증 및 테스트 계획 (Verification)
*   [x] 이메일 인증 요청 시 `/api/members/email` 호출 및 성공 응답 확인
*   [x] 인증번호 확인 시 `/api/members/email/check` 호출 및 결과 반영 확인
*   [x] 잘못된 인증번호 입력 시 `MEMBER4001` 에러 메시지 노출 확인
*   [x] 인증되지 않은 상태에서 회원가입 시도 시 버튼 비활성화 확인
