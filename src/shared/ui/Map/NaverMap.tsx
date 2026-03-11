'use client';

import { Container as MapContainer, NaverMap, Marker, useNavermaps } from 'react-naver-maps';

interface MapProps {
  location: string;
  lat?: number;
  lng?: number;
  className?: string;
}

export const Map = ({ location, lat = 37.5665, lng = 126.9780, className }: MapProps) => {
  const navermaps = useNavermaps();

  return (
    <MapContainer className={className} style={{ width: '100%', height: '100%' }}>
      <NaverMap
        defaultCenter={new navermaps.LatLng(lat, lng)}
        defaultZoom={15}
      >
        <Marker position={new navermaps.LatLng(lat, lng)} title={location} />
      </NaverMap>
    </MapContainer>
  );
};
