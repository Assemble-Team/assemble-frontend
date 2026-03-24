# 로그인 (Auth Login) - Implementation Task List

## 1. 작업 단계 (Implementation Phases)
*   [x] **Phase 1: 인프라 및 기반 작업**
    *   [x] 공통 API 클라이언트(`apiClient`) 및 에러 클래스(`ApiError`) 정의
    *   [x] 로그인 API 핸들러(`authApi`) 및 MSW 모킹 구현
*   [x] **Phase 2: 비즈니스 로직 및 스키마 정의**
    *   [x] Zod를 이용한 `loginSchema` 정의
    *   [x] 전역 상태 스토어(`useUserStore`, `useAuthStore`) 구축
*   [x] **Phase 3: UI 및 컴포넌트 개발**
    *   [x] 공통 UI 컴포넌트(`Button`, `InputGroup`, `FormField`) 개발
    *   [x] `LoginForm` 컴포넌트 구현 (React Hook Form 연동)
*   [x] **Phase 4: 통합 및 검증**
    *   [x] 로그인 성공/실패 시나리오 대응 (라우팅, 알림)
    *   [x] `LoginPage` 최종 조립 및 라우트 설정

## 2. 세부 체크리스트 (Detailed Tasks)
### 🚀 Phase 1-2 (완료)
- [x] API 인터페이스 및 타입 선언
- [x] Zod 스키마 검증 로직 테스트
- [x] Zustand 스토어 액션 구현

### 🎨 Phase 3-4 (완료)
- [x] 이메일/비밀번호 입력 폼 레이아웃
- [x] 제출 시 로딩 상태 표시
- [x] 회원가입 및 비밀번호 찾기 링크 연결

## 3. 검증 및 테스트 계획 (Verification)
*   [x] 유효하지 않은 이메일 형식 입력 시 에러 표시 확인
*   [x] 빈 비밀번호 입력 시 에러 표시 확인
*   [x] 로그인 성공 시 메인 화면으로 이동 여부 확인
*   [x] API 오류 발생 시 경고창(Alert) 노출 확인
