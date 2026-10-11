import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function MapViewer({ nodes, activeNodeId, onSelectNode }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center near SGU An Duong Vuong, District 5, HCMC
      const map = L.map(mapContainerRef.current, {
        center: [10.7585, 106.6820],
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    // Add nodes as custom radar markers
    nodes.forEach(node => {
      let colorClass = 'marker-normal';
      let statusColor = '#34d399'; // green

      if (node.scenario === 'accident') {
        colorClass = 'marker-sos';
        statusColor = '#f43f5e'; // red
      } else if (node.scenario === 'flood') {
        colorClass = 'marker-flood';
        statusColor = '#fbbf24'; // amber
      }

      const isSelected = node.id === activeNodeId;

      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div class="map-radar-pin ${colorClass} ${isSelected ? 'selected-pin' : ''}">
            <div class="pin-pulse" style="border-color: ${statusColor}"></div>
            <div class="pin-dot" style="background-color: ${statusColor}"></div>
            <div class="pin-label">${node.name.split('(')[0]}</div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const marker = L.marker([node.lat, node.lng], { icon: customIcon })
        .addTo(map)
        .on('click', () => onSelectNode(node.id));

      markersRef.current[node.id] = marker;
    });

  }, [nodes, activeNodeId, onSelectNode]);

  // Pan to selected node
  useEffect(() => {
    if (!mapInstanceRef.current || !activeNodeId) return;
    const selected = nodes.find(n => n.id === activeNodeId);
    if (selected) {
      mapInstanceRef.current.panTo([selected.lat, selected.lng], {
        animate: true,
        duration: 0.8
      });
    }
  }, [activeNodeId, nodes]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} />
      <div className="map-badge-overlay">
        <span>BẢN ĐỒ AN TOÀN ĐÔ THỊ Q.5 (KHU VỰC SGU)</span>
      </div>
    </div>
  );
}
