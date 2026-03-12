# Performance & Core Web Vitals Skill

이 스킬은 프로젝트의 성능 최적화와 사용자 경험 지표(Core Web Vitals)를 관리하기 위한 가이드라인을 정의합니다. 에이전트는 작성한 코드가 성능에 미치는 영향을 최소화해야 합니다.

## 1. LCP (Largest Contentful Paint) 최적화
- **이미지 우선순위**: 뷰포트 내에 처음에 나타나는 이미지(LCP 후보)는 `next/image`의 `priority` 속성을 반드시 사용합니다.
- **이미지 최적화**: 모든 이미지는 `next/image`를 사용하고 적절한 `sizes` 속성을 제공하여 최적의 파일 크기로 렌더링합니다.

## 2. CLS (Cumulative Layout Shift) 방지
- **크기 지정**: 이미지는 반드시 고정된 `width`, `height` 또는 `aspect-ratio`를 가져야 합니다.
- **동적 콘텐츠**: 광고나 동적 리스트가 나타날 자리는 미리 최소 높이(min-height)를 확보하여 레이아웃 밀림을 방지합니다.

## 3. INP (Interaction to Next Paint) 개선
- **무거운 작업 분리**: 렌더링을 방해하는 무거운 자바스크립트 로직은 `requestIdleCallback`을 사용하거나 Web Worker로 분리합니다.
- **Dynamic Import**: 첫 렌더링에 필요하지 않은 모달이나 무거운 컴포넌트는 `next/dynamic`을 사용하여 번들 사이즈를 줄이고 인터랙션 반응 속도를 높입니다.

## 4. 번들 사이즈 및 렌더링 최적화
- **바닐라 CSS 우선**: 가능한 한 인라인 스타일이나 무거운 스타일 라이브러리 대신 Tailwind CSS v4를 활용하여 런타임 오버헤드를 최소화합니다.
- **불필요한 리렌더링 방지**: `useMemo`, `useCallback`을 적절히 사용하여 의도치 않은 하위 컴포넌트의 리렌더링을 제어합니다.

## 5. 에이전트 자가 검토 체크리스트
- [ ] 뷰포트 내 메인 이미지에 `priority`가 설정되었는가?
- [ ] 모든 이미지와 동적 요소가 레이아웃 시프트를 유발하지 않는가?
- [ ] 첫 화면에 불필요한 라이브러리가 로드되고 있지는 않은가?
