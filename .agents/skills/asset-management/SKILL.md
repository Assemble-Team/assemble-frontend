# Asset Management Skill

이 스킬은 프로젝트의 아이콘(Icon) 및 이미지 에셋(Asset) 관리 전략을 정의합니다. `lucide-react`와 `next/image`를 효율적으로 활용하는 가이드라인입니다.

## 1. 아이콘 사용 규칙 (Lucide React)
- **일관된 규격**: 일반적인 UI 아이콘은 `size={20}` 또는 `size={24}`를 기본으로 하며, 굵기는 `strokeWidth={2}`로 통일합니다.
- **색상 적용**: `className`을 통해 Tailwind CSS 텍스트 색상을 주입합니다. (예: `text-gray-500`, `text-primary`)
- **아이콘 컴포넌트화**: 자주 사용하는 아이콘 조합이나 특정 UI 테마 아이콘은 `shared/ui` 내에 작은 컴포넌트로 분리하여 재사용합니다.

## 2. 이미지 에셋 관리 (Public Folder)
- **폴더 구조**: `public/images/` 내에 도메인별로 하위 폴더를 만들어 관리합니다. (예: `groups/`, `users/`, `logos/`)
- **포맷 최적화**: 가능한 한 `webp` 또는 `svg` 포맷을 사용하며, 원본 이미지가 너무 크지 않도록 최적화합니다.
- **Next/Image 활용**: 모든 이미지는 반드시 `next/image`를 사용하여 Lazy Loading, WebP 변환, 누적 레이아웃 이동(CLS) 방지 혜택을 받습니다.

## 3. SVG 직접 사용 규칙
- 정적 이미지인 경우 `public/`에 두고 `next/image`로 불러옵니다.
- 동적으로 색상이나 스타일을 바꿔야 하는 경우에만 `shared/ui` 내에 리액트 컴포넌트로 만들어 `currentColor` 등을 적용합니다.

## 4. 에이전트 자동 수행 규칙
- 새로운 기능 개발 시 적절한 의미를 가진 아이콘을 `lucide-react`에서 골라 적용합니다.
- 이미지 파일 추가 시, 적절한 경로에 배치하고 `alt` 텍스트를 반드시 제공합니다.
