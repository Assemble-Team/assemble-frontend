'use client';

import { useCallback } from 'react';
import { findMatchingRegion } from '@/shared/lib/region';

/**
 * 네이버 지도 API를 사용하여 위도/경도 좌표를 프로젝트 표준 주소 상수로 변환하는 훅입니다.
 */
export const useReverseGeocoding = () => {
  const convertCoordsToAddress = useCallback(
    (lat: number, lng: number): Promise<string> => {
      return new Promise((resolve, reject) => {
        if (!window.naver || !window.naver.maps || !window.naver.maps.Service) {
          reject(new Error('네이버 지도 SDK가 로드되지 않았습니다.'));
          return;
        }

        window.naver.maps.Service.reverseGeocode(
          {
            coords: new window.naver.maps.LatLng(lat, lng),
            orders: [
              window.naver.maps.Service.OrderType.ADDR,
              window.naver.maps.Service.OrderType.ROAD_ADDR,
            ].join(','),
          },
          (status: any, response: any) => {
            if (status !== window.naver.maps.Service.Status.OK) {
              reject(new Error('주소 변환에 실패했습니다.'));
              return;
            }

            // v2 API 응답 구조에 맞게 수정
            const items = response.v2.results;
            if (items.length === 0) {
              reject(new Error('현재 위치의 주소 정보를 찾을 수 없습니다.'));
              return;
            }

            const region = items[0].region;
            const area1 = region.area1.name; // 시/도 (예: 서울특별시)
            const area2 = region.area2.name; // 구/군 (예: 강남구)
            
            // 프로젝트 표준 상수로 변환 매칭
            const matchedRegion = findMatchingRegion(area1, area2);
            
            if (!matchedRegion) {
              reject(new Error('현재 위치는 지원하지 않는 지역입니다.'));
              return;
            }
            
            resolve(matchedRegion);
          }
        );
      });
    },
    []
  );

  return { convertCoordsToAddress };
};

// 전역 타입 선언
declare global {
  interface Window {
    naver: any;
  }
}
