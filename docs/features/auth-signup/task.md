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

## 2. 세부 체크리스트 (Detailed Tasks)
### 🚀 Phase 1-2 (완료)
- [x] 비밀번호 확인 일치 검증 로직 구현
- [x] 최소 1개 카테고리 필수 선택 규칙 적용
- [x] API 성공/실패 응답 모의 데이터 구성

### 🎨 Phase 3-4 (완료)
- [x] Lucide 아이콘 적용 (User, Mail, Lock)
- [x] 카테고리 선택 시 실시간 색상 변화 및 상태 업데이트
- [x] `router.replace`를 이용한 히스토리 관리 (뒤로가기 방지)

## 3. 검증 및 테스트 계획 (Verification)
*   [x] 비밀번호 확인이 다를 때 에러 메시지 노출 여부 확인
*   [x] 카테고리 미선택 시 제출 차단 및 경고 확인
*   [x] 정상 가입 후 별도 로그인 없이 홈 화면 진입 확인
*   [x] 모킹된 에러 상황(예: 이미 존재하는 이메일) 대응 확인
