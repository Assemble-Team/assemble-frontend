# Advanced FSD & Clean Architecture Skill

이 스킬은 FSD(Feature-Sliced Design) 아키텍처를 대규모 프로젝트에 맞게 운영하기 위한 고급 가이드라인을 정의합니다. 에이전트는 레이어 간의 결합도를 낮추고 모듈의 독립성을 유지해야 합니다.

## 1. Shared Layer Bloat 관리
- **공통 컴포넌트 분리**: 모든 것을 `shared/ui`에 넣지 않습니다. 특정 도메인(User, Group)에 한정된 UI 컴포넌트는 반드시 해당 `entities/`에 배치합니다.
- **Shared 세분화**: `shared/` 레이어 내에서도 `api/`, `lib/`, `hooks/`, `ui/`, `types/` 등으로 역할을 명확히 구분합니다.

## 2. Cross-cutting Concerns (횡단 관심사) 처리
- **인증, 로깅, 전역 에러**: 여러 레이어에 걸쳐 있는 기능은 가급적 상위 레이어(`app/` 또는 `_pages/`)에서 설정하거나, `shared/` 레이어의 인터페이스를 통해 하위 레이어에서 사용하도록 설계합니다.

## 3. Public API 준수 (Public API Enforcement)
- **Public API (`index.ts`)**: 모든 슬라이스는 반드시 `index.ts`를 통해 외부에 노출할 요소만 내보내야 합니다. 슬라이스 내부의 상세 구현 파일에 직접 접근하는 것은 금지합니다.
- **순환 참조 방지**: 슬라이스 간의 순환 참조는 엄격히 금지됩니다. (A feature imports B feature, B feature imports A feature - 금지)

## 4. 슬라이스 간 결합도 낮추기
- **제어 역전 (IoC)**: 한 기능이 다른 기능에 의존해야 하는 경우, 상위 레이어에서 함수나 컴포넌트를 주입(Render Props, Children)받는 방식을 사용하여 결합도를 낮춥니다.

## 5. 에이전트 자가 검토 체크리스트
- [ ] 슬라이스 외부에서 내부 상세 파일에 직접 접근하고 있지 않은가?
- [ ] 레이어 간의 결합도가 지나치게 높지는 않은가?
- [ ] `shared/` 레이어에 도메인 지식이 포함된 코드가 있는가?
- [ ] 레이어 상하 관계를 위반(하위가 상위 참조)하고 있지는 않은가?
