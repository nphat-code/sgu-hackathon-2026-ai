import React from 'react';
import { MapPin } from 'lucide-react';

export default function StationTabs({ nodes, activeNodeId, onSelectNode, activeNode }) {
  return (
    <div className="camera-toolbar">
      <div className="node-selector-tabs">
        {nodes.map(node => {
          const isAlert = node.status === 'alert' ||
            node.scenario === 'real_flood_1' ||
            node.scenario === 'real_flood_3' ||
            node.scenario === 'real_accident_1';
          return (
            <button
              key={node.id}
              className={`node-tab-btn ${node.id === activeNodeId ? 'active' : ''}`}
              onClick={() => onSelectNode(node.id)}
              title={node.name}
            >
              <MapPin size={13} />
              <span>{node.name.split('-')[0].trim()}</span>
              <span className={`tab-dot ${isAlert ? 'red' : 'amber'}`} />
            </button>
          );
        })}
      </div>

      <div className="camera-node-meta">
        <span className="camera-meta-street">{activeNode.street_segment || activeNode.name}</span>
      </div>
    </div>
  );
}

