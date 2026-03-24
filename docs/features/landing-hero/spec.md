# 랜딩 히어로 (Landing Hero) - Technical Specification (Spec)

## 1. 아키텍처 설계 (FSD Layering)
*   **Shared**:
    *   `ui/Button`: CTA 버튼 구현을 위한 공통 UI.
*   **Widgets**:
    *   `landing-hero/Hero`: 메인 레이아웃 및 조립.
    *   `landing-hero/HeroTitle`: 타이포그래피 및 문구 관리.
*   **Pages**:
    *   `home/ui/HomePage`: 홈 페이지의 최상단 섹션으로 포함.

## 2. UI/UX 디자인 가이드
*   **Typography**: 큰 폰트 사이즈와 볼드체를 사용하여 메인 메시지 강조.
*   **Color Palette**: 브랜드 메인 컬러를 CTA 버튼에 적용하여 클릭 유도.
*   **Responsive**: 모바일에서는 텍스트 중앙 정렬 및 이미지 크기 최적화.

## 3. 컴포넌트 설계 (Component Design)
*   **Hero**: `flex` 또는 `grid`를 사용하여 텍스트 영역과 그래픽 영역 배분.
*   **CTA Button**: `Link` 컴포넌트를 사용하여 `/groups` 경로로 클라이언트 사이드 라우팅 처리.

## 4. 성능 최적화 (Optimization)
*   **LCP (Largest Contentful Paint)**: 첫 화면의 핵심 요소이므로 이미지는 `next/image`의 `priority` 속성을 사용하여 우선 로딩.
*   **Layout Shift**: 폰트나 이미지가 로딩되기 전 공간을 미리 확보하여 레이아웃 흔들림 방지.
