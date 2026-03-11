'use client';

import { useState, useCallback } from 'react';

interface Coords {
  latitude: number;
  longitude: number;
}

/**
 * 브라우저의 Geolocation API를 사용하여 현재 위치의 위도와 경도를 가져오는 훅입니다.
 */
export const useGeolocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPosition = useCallback((onSuccess: (coords: Coords) => void) => {
    if (!navigator.geolocation) {
      setError('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        onSuccess(coords);
        setIsLoading(false);
      },
      (error) => {
        let message = '위치 정보를 가져오는데 실패했습니다.';
        if (error.code === 1) message = '위치 정보 접근 권한이 거부되었습니다.';
        setError(message);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return { isLoading, error, getPosition };
};
