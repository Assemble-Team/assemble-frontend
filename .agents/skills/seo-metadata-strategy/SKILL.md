# SEO & Metadata Strategy Skill

이 스킬은 프로젝트의 검색 엔진 최적화(SEO)와 메타데이터 관리 전략을 정의합니다. Next.js App Router의 Metadata API를 활용한 가이드라인입니다.

## 1. 정적 메타데이터 관리
- **루트 설정**: `src/app/layout.tsx`에서 전체 앱의 기본 `title`, `description`, `viewport`, `icons` 등을 설정합니다.
- **템플릿 사용**: `title: { default: 'Assemble', template: '%s | Assemble' }`와 같이 템플릿을 사용하여 페이지별 제목이 자동으로 구성되게 합니다.

## 2. 동적 메타데이터 생성 (`generateMetadata`)
- **원칙**: 게시물 상세, 모임 상세 등 동적 경로(`[id]`)에서는 반드시 `generateMetadata` 함수를 export하여 개별 SEO 정보를 제공합니다.
- **데이터 패칭**: 서버 컴포넌트 내에서 `generateMetadata`와 실제 렌더링을 위한 데이터 패칭이 겹칠 경우, Next.js의 캐싱 메커니즘(`fetch`의 중복 제거)을 활용합니다.

## 3. SNS 및 공유 최적화 (Open Graph)
- **OG 이미지**: `og:image`, `twitter:image`를 포함하여 링크 공유 시 썸네일이 올바르게 나타나게 합니다.
- **정적/동적 생성**: `opengraph-image.tsx`를 사용하여 동적으로 OG 이미지를 생성하는 것을 고려합니다.

## 4. 시맨틱 태그 및 시각적 위계
- 모든 페이지는 반드시 하나의 `h1` 태그를 가져야 하며, SEO 가중치를 고려하여 논리적인 위계(h2~h6)로 구성합니다.
- 모든 이미지는 적절한 `alt` 속성을 가져야 합니다.

## 5. 에이전트 자가 검토 체크리스트
- [ ] 새 페이지 생성 시 적절한 제목과 설명이 메타데이터에 포함되었는가?
- [ ] 동적 페이지에서 `generateMetadata`를 통해 상세 정보가 반영되는가?
- [ ] 구조화된 데이터(JSON-LD)가 필요한 경우 포함되었는가?
