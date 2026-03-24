# 비밀번호 찾기 (Auth Find Password) - Implementation Task List

## 1. 작업 단계 (Implementation Phases)
*   [x] **Phase 1: 인프라 및 기반 작업**
    *   [x] `findPasswordSchema` 유효성 검사 규칙 정의
*   [x] **Phase 2: UI 및 컴포넌트 개발**
    *   [x] `FindPasswordForm` 컴포넌트 구현
    *   [x] 아이콘 및 공통 UI 컴포넌트 적용
    *   [x] 로그인 화면으로 이동하는 네비게이션 처리
*   [x] **Phase 3: 통합 및 검증**
    *   [x] 이메일 발송 안내 문구 표시 로직 구현
    *   [x] `FindPasswordPage` 페이지 구성 및 라우트 연결

## 2. 세부 체크리스트 (Detailed Tasks)
### 🚀 Phase 1-2 (완료)
- [x] 이메일 유효성 검사 규칙 적용
- [x] 제출 시 로딩 상태 처리(`isSubmitting`)
- [x] ChevronLeft 아이콘을 포함한 뒤로가기 링크 구현

### 🎨 Phase 3 (완료)
- [x] 재설정 이메일 발송 안내 문구(Alert) 처리
- [x] 로그인 링크의 `replace` 옵션 설정 (히스토리 방지)

## 3. 검증 및 테스트 계획 (Verification)
*   [x] 유효하지 않은 이메일 형식 입력 시 에러 표시 확인
*   [x] 로그인 링크 클릭 시 로그인 화면으로 복귀 확인
*   [x] 제출 버튼 클릭 시 알림 메시지 노출 확인
