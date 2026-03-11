import { REGIONS } from '@/shared/constants/regions';

/**
 * 네이버 API 등에서 받은 시/도, 구/군 명칭을 프로젝트 표준 REGIONS 상수의 명칭으로 변환합니다.
 */
export const findMatchingRegion = (area1: string, area2: string): string | null => {
  // 1. 시/도 매칭 (예: "서울" -> "서울특별시", "경기" -> "경기도")
  const targetRegion = REGIONS.find((r) => 
    r.name.includes(area1) || area1.includes(r.name.substring(0, 2))
  );

  if (!targetRegion) return null;

  // 2. 구/군 매칭 (예: "강남구" -> "강남구")
  // 상세 주소가 있는 경우 (예: 경기도 수원시 장안구)를 위해 includes 사용
  const targetDistrict = targetRegion.children.find((child) => 
    child.includes(area2) || area2.includes(child)
  );

  if (!targetDistrict) {
    // 구 매칭 실패 시 시/도 이름이라도 반환 (세종시 등 대응)
    return targetRegion.name;
  }

  // 최종 형태 반환: "서울특별시 강남구" 형태가 아닌 상수 리스트에 있는 개별 구 이름 반환
  // (현재 프로젝트 필터가 '강남구' 처럼 구 단위로 관리되는지, '서울 강남구' 형태인지 확인 필요)
  // 대부분의 지역 필터는 "시/도 + 구/군" 조합을 사용하므로 아래와 같이 조합
  return `${targetRegion.name} ${targetDistrict}`;
};
