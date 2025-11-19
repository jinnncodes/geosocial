'use client';

import { useEffect, useRef } from 'react';
import type { Map, Marker } from 'leaflet';
import L from 'leaflet';
import type { User } from '@/lib/dummyusers';

interface GeoSocialMapProps {
  users: User[];
  selectedUserId: number | null;
}

const orangeIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFA500"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
const blueIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#87CEEB"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;

const orangeIcon = typeof window !== 'undefined' ? new L.Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(orangeIconSvg)}`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
}) : undefined;

const blueIcon = typeof window !== 'undefined' ? new L.Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(blueIconSvg)}`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
}) : undefined;


const GeoSocialMap = ({ users, selectedUserId }: GeoSocialMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const markersRef = useRef<Record<number, Marker>>({});

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    
    const map = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
    });
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    if (users.length > 0 && !selectedUserId) {
        const bounds = L.latLngBounds(users.map(u => [u.location.lat, u.location.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
    }

  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !blueIcon || !orangeIcon) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    users.forEach(user => {
      const isSelected = user.id === selectedUserId;
      const marker = L.marker([user.location.lat, user.location.lng], {
        icon: isSelected ? orangeIcon : blueIcon,
      })
        .addTo(map)
        .bindPopup(`<div style="font-family: Inter, sans-serif;"><b>${user.name}</b></div>`);
      
      markersRef.current[user.id] = marker;
    });

  }, [users, blueIcon, orangeIcon]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !blueIcon || !orangeIcon) return;
  
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const isSelected = Number(id) === selectedUserId;
      marker.setIcon(isSelected ? orangeIcon : blueIcon);
      if (isSelected) {
        marker.setZIndexOffset(1000);
      } else {
        marker.setZIndexOffset(0);
      }
    });
  
    const selectedUser = users.find(u => u.id === selectedUserId);
    if (selectedUser) {
      map.flyTo(
        [selectedUser.location.lat, selectedUser.location.lng],
        13,
        { animate: true, duration: 1.5 }
      );
    }
  }, [selectedUserId, users, blueIcon, orangeIcon]);

  return <div ref={mapRef} className="h-full w-full z-0 bg-muted" />;
};

export default GeoSocialMap;
