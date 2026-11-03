import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function MapViewer({ nodes, activeNodeId, onSelectNode }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const polylinesRef = useRef([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [10.7578, 106.6823],
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

    // Clear old markers & alley polylines
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};
    polylinesRef.current.forEach(p => p.remove());
    polylinesRef.current = [];

    // Auto-fit bounds so all stations and alley segments are visible simultaneously
    if (nodes && nodes.length > 0) {
      const bounds = L.latLngBounds(nodes.map(n => [n.lat, n.lng]));
      map.fitBounds(bounds, { padding: [38, 38], maxZoom: 15 });
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
        .bindTooltip(`<strong>${node.name}</strong><br/><span style="color:#64748b;font-size:0.75rem">${node.device} • Tuyến hẻm GeoJSON</span>`, {
          direction: 'top',
          offset: [0, -18],
          opacity: 0.95
        })
        .on('click', () => onSelectNode(node.id));

      markersRef.current[node.id] = marker;
    });

  }, [nodes, activeNodeId, onSelectNode]);

  // Pan smoothly to selected node
  useEffect(() => {
    if (!mapInstanceRef.current || !activeNodeId) return;
    const selected = nodes.find(n => n.id === activeNodeId);
    if (selected) {
      mapInstanceRef.current.panTo([selected.lat, selected.lng], {
        animate: true,
        duration: 0.6
      });
    }
  }, [activeNodeId, nodes]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} />
      <div className="map-badge-overlay">
        <span>WEBGIS TUYẾN HẺM GEOJSON • ĐỔI MÀU THỜI GIAN THỰC</span>
      </div>
    </div>
  );
}
