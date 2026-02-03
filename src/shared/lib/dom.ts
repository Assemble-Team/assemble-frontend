/**
 * 트리거 요소의 위치를 기반으로 팝업 요소의 좌표를 계산합니다.
 * Tooltip, Popover, Dropdown 등에 공통으로 사용할 수 있습니다.
 */
export const calculateFloatingPosition = (
  triggerRect: DOMRect,
  viewportWidth: number
) => {
  const OFFSET = 8; // 트리거와 요소 사이의 수직 간격
  const SAFE_MARGIN = 8; // 화면 끝 최소 여백
  const MIN_ELEMENT_WIDTH = 160; // 요소의 최소 너비 가정치
  const EDGE_THRESHOLD = 10; // 화면 끝 감지 임계점

  // 1. 기본 Y축 위치 (트리거 바로 아래)
  const yPos = triggerRect.bottom + OFFSET;

  // 2. 기본 X축 위치 (트리거의 오른쪽 끝에 맞춤)
  let xPos = triggerRect.right;
  let xTranslation = '-100%'; // 오른쪽 정렬(내부로 밀기)

  // 3. 우측 화면 밖으로 나가는 경우 보정
  if (viewportWidth && xPos > viewportWidth - EDGE_THRESHOLD) {
    xPos = viewportWidth - SAFE_MARGIN;
    xTranslation = '-100%';
  }

  // 4. 좌측 화면 밖으로 나가는 경우 보정 (왼쪽 정렬로 변경)
  if (xPos < MIN_ELEMENT_WIDTH) {
    xPos = triggerRect.left;
    xTranslation = '0%';
  }

  return { xPos, yPos, xTranslation };
};
