import { useState } from "react";
import styles from "./MiniSystemMap.module.css";
import { alertMiniMaps } from "../systemMapData";

const CIRCLE_R = 36;

function CircleNode({ node }) {
  const isAlert = node.alert;
  return (
    <g>
      {/* Outer alert ring */}
      {isAlert && (
        <circle
          cx={node.x}
          cy={node.y}
          r={CIRCLE_R + 4}
          fill="none"
          stroke="#d32f2f"
          strokeWidth="2"
          strokeOpacity="0.4"
        />
      )}
      {/* Main circle */}
      <circle
        cx={node.x}
        cy={node.y}
        r={CIRCLE_R}
        fill={isAlert ? "#fce4ec" : "#e8e8e8"}
        stroke={isAlert ? "#d32f2f" : "#ccc"}
        strokeWidth={isAlert ? "2" : "1.5"}
      />
      {/* Icon */}
      <foreignObject
        x={node.x - 12}
        y={node.y - 20}
        width="24"
        height="24"
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: 20,
            color: isAlert ? "#d32f2f" : "#555",
            display: "block",
            textAlign: "center",
            fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
          }}
        >
          {node.icon}
        </span>
      </foreignObject>
      {/* Reading label */}
      <text
        x={node.x}
        y={node.y + 16}
        textAnchor="middle"
        fill={isAlert ? "#d32f2f" : "#333"}
        fontSize="12"
        fontWeight="600"
        fontFamily="Inter, Arial, sans-serif"
      >
        {node.label}
      </text>
    </g>
  );
}

function RectNode({ node }) {
  const w = 160;
  const h = 34;
  return (
    <g>
      <rect
        x={node.x - w / 2}
        y={node.y - h / 2}
        width={w}
        height={h}
        rx="4"
        fill="#fff"
        stroke="#bbb"
        strokeWidth="1.5"
      />
      <text
        x={node.x}
        y={node.y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#333"
        fontSize="12"
        fontWeight="500"
        fontFamily="Inter, Arial, sans-serif"
      >
        {node.label.length > 22 ? node.label.slice(0, 20) + "…" : node.label}
      </text>
      {/* Equipment icon */}
      <foreignObject
        x={node.x + 60}
        y={node.y - 10}
        width="20"
        height="20"
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: 16,
            color: "#777",
            fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
          }}
        >
          build
        </span>
      </foreignObject>
    </g>
  );
}

function LocationNode({ node }) {
  return (
    <g>
      <rect
        x={node.x - 80}
        y={node.y - 14}
        width={160}
        height={28}
        rx="4"
        fill="#eef3fb"
        stroke="#c5d5ef"
        strokeWidth="1"
      />
      <text
        x={node.x + 8}
        y={node.y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#1f4f98"
        fontSize="12"
        fontWeight="600"
        fontFamily="Inter, Arial, sans-serif"
      >
        {node.label}
      </text>
      <foreignObject
        x={node.x + 52}
        y={node.y - 10}
        width="20"
        height="20"
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: 16,
            color: "#1976d2",
            fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
          }}
        >
          location_on
        </span>
      </foreignObject>
    </g>
  );
}

function ZoneBox({ node }) {
  return (
    <g>
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        rx="4"
        fill="rgba(232, 240, 254, 0.35)"
        stroke="#a8c4e6"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />
      <text
        x={node.x + node.w / 2}
        y={node.y + node.h - 8}
        textAnchor="middle"
        fill="#7a9ec7"
        fontSize="11"
        fontFamily="Inter, Arial, sans-serif"
      >
        {node.label}
      </text>
    </g>
  );
}

function getNodeCenter(node) {
  if (node.type === "zone") return { x: node.x + node.w / 2, y: node.y + node.h / 2 };
  return { x: node.x, y: node.y };
}

function Edge({ fromNode, toNode }) {
  const from = getNodeCenter(fromNode);
  const to = getNodeCenter(toNode);

  // Calculate offset from center to edge of node
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx);

  let startX = from.x;
  let startY = from.y;
  let endX = to.x;
  let endY = to.y;

  // Offset start point from circle/rect edge
  if (fromNode.type === "circle") {
    startX += Math.cos(angle) * (CIRCLE_R + 2);
    startY += Math.sin(angle) * (CIRCLE_R + 2);
  } else if (fromNode.type === "rect") {
    startX += Math.cos(angle) * 82;
    startY += Math.sin(angle) * 19;
  }

  // Offset end point
  if (toNode.type === "circle") {
    endX -= Math.cos(angle) * (CIRCLE_R + 2);
    endY -= Math.sin(angle) * (CIRCLE_R + 2);
  } else if (toNode.type === "rect") {
    endX -= Math.cos(angle) * 82;
    endY -= Math.sin(angle) * 19;
  } else if (toNode.type === "location") {
    endX -= Math.cos(angle) * 82;
    endY -= Math.sin(angle) * 16;
  }

  return (
    <g>
      {/* Junction dot at start */}
      <circle cx={startX} cy={startY} r="4" fill="#333" />
      {/* Line */}
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="#333"
        strokeWidth="1.5"
        markerEnd="url(#miniArrow)"
      />
    </g>
  );
}

export default function MiniSystemMap({ alert }) {
  const [expanded, setExpanded] = useState(false);
  const mapData = alertMiniMaps[alert.id];

  if (!mapData) return null;

  const nodeMap = {};
  mapData.nodes.forEach((n) => { nodeMap[n.id] = n; });

  const zones = mapData.nodes.filter((n) => n.type === "zone");
  const nonZones = mapData.nodes.filter((n) => n.type !== "zone");

  return (
    <div className={styles.container}>
      <button className={styles.toggle} onClick={() => setExpanded(!expanded)}>
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
          {expanded ? "expand_less" : "map"}
        </span>
        <span>{expanded ? "Hide System Map" : "View System Map"}</span>
        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#999" }}>
          {expanded ? "expand_less" : "chevron_right"}
        </span>
      </button>

      {expanded && (
        <>
          <div className={styles.mapLabel}>{mapData.label}</div>
          <div className={styles.mapWrapper}>
            <svg
              className={styles.svg}
              viewBox="0 0 580 240"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <marker
                  id="miniArrow"
                  markerWidth="8"
                  markerHeight="6"
                  refX="7"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="#333" />
                </marker>
              </defs>

              {zones.map((node) => (
                <ZoneBox key={node.id} node={node} />
              ))}

              {mapData.edges.map((edge, i) => {
                const fromNode = nodeMap[edge.from];
                const toNode = nodeMap[edge.to];
                if (!fromNode || !toNode) return null;
                return <Edge key={i} fromNode={fromNode} toNode={toNode} />;
              })}

              {nonZones.map((node) => {
                if (node.type === "circle") return <CircleNode key={node.id} node={node} />;
                if (node.type === "rect") return <RectNode key={node.id} node={node} />;
                if (node.type === "location") return <LocationNode key={node.id} node={node} />;
                return null;
              })}
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
