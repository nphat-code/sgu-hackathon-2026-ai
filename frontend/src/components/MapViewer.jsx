import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function MapViewer({ nodes, activeNodeId, onSelectNode }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const polylinesRef = useRef([]);
  const hasFittedBoundsRef = useRef(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [10.7575, 106.6860],
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers & alley polylines
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};
    polylinesRef.current.forEach(p => p.remove());
    polylinesRef.current = [];

    // Auto-fit bounds ONCE on initial load so all stations and road segments are visible, without resetting user zoom on polling
    if (!hasFittedBoundsRef.current && nodes && nodes.length > 0) {
      const allPts = [];
      nodes.forEach(n => {
        allPts.push([n.lat, n.lng]);
        if (Array.isArray(n.line_coords)) {
          n.line_coords.forEach(c => allPts.push([c[1], c[0]]));
        }
      });
      const bounds = L.latLngBounds(allPts);
      map.fitBounds(bounds, { padding: [32, 32], maxZoom: 15 });
      hasFittedBoundsRef.current = true;
    }

    // Add GeoJSON LineString alley segments & custom radar markers
    nodes.forEach(node => {
      let colorClass = 'marker-normal';
      let statusColor = '#10b981'; // Emerald green (<10cm)

      if (node.scenario?.includes('accident')) {
        colorClass = 'marker-sos';
        statusColor = '#ef4444'; // Red (SOS / Slippery)
      } else if (node.scenario?.includes('flood')) {
        colorClass = 'marker-flood';
        statusColor = (node.scenario === 'real_flood_3' || node.scenario === 'real_flood_1') ? '#ef4444' : '#f59e0b';
      }

      // Draw GeoJSON LineString segment for the monitored alley
      const lineLatLngs = node.line_coords
        ? node.line_coords.map(coord => [coord[1], coord[0]])
        : [
            [node.lat - 0.0007, node.lng - 0.0011],
            [node.lat, node.lng],
            [node.lat + 0.0007, node.lng + 0.0011]
          ];

      const isSelected = node.id === activeNodeId;

      // Outer glow line
      const glowLine = L.polyline(lineLatLngs, {
        color: statusColor,
        weight: isSelected ? 12 : 9,
        opacity: isSelected ? 0.35 : 0.22,
        lineCap: 'round'
      }).addTo(map);

      // Core alley segment line
      const alleyLine = L.polyline(lineLatLngs, {
        color: statusColor,
        weight: isSelected ? 6 : 4,
        opacity: 0.95,
        dashArray: node.scenario?.includes('accident') ? '6, 6' : null,
        lineCap: 'round'
      })
        .addTo(map)
        .on('click', () => onSelectNode(node.id));

      polylinesRef.current.push(glowLine, alleyLine);

      const shortName = node.name.split('-')[0].trim();

      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div class="map-radar-pin ${colorClass} ${isSelected ? 'selected-pin' : ''}">
            <div class="pin-pulse" style="border-color: ${statusColor}"></div>
            <div class="pin-dot" style="background-color: ${statusColor}"></div>
            <div class="pin-label">${shortName}</div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const marker = L.marker([node.lat, node.lng], { icon: customIcon })
        .addTo(map)
        .bindTooltip(`<strong>${node.name}</strong>`, {
          direction: 'top',
          offset: [0, -18],
          opacity: 0.95
        })
        .on('click', () => onSelectNode(node.id));

      markersRef.current[node.id] = marker;
    });

    // Smoothly pan map to selected station when user switches stations
    if (activeNodeId && nodes && nodes.length > 0) {
      const activeNode = nodes.find(n => n.id === activeNodeId);
      if (activeNode) {
        map.panTo([activeNode.lat, activeNode.lng], { animate: true, duration: 0.6 });
      }
    }

  }, [nodes, activeNodeId, onSelectNode]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} />
    </div>
  );
}
