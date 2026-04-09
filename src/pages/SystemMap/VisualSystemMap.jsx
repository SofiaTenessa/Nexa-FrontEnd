import { useMemo } from "react";
import {
  Background,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import styles from "./VisualSystemMap.module.css";

function SensorNode({ data }) {
  return (
    <div
      className={`${styles.sensorNode} ${data.alert ? styles.sensorAlert : ""}`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className={styles.handle}
        style={{ opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className={styles.handle}
        style={{ opacity: 0 }}
      />
      <Handle
        type="target"
        position={Position.Top}
        className={styles.handle}
        style={{ opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className={styles.handle}
        style={{ opacity: 0 }}
      />

      <span className="material-symbols-outlined" aria-hidden="true">
        {data.icon || "device_thermostat"}
      </span>

      <div className={styles.sensorValue}>{data.value}</div>
    </div>
  );
}

function EquipmentNode({ data }) {
  return (
    <div className={styles.equipmentNode}>
      <Handle
        type="target"
        position={Position.Left}
        className={styles.handle}
        style={{ opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className={styles.handle}
        style={{ opacity: 0 }}
      />
      <Handle
        type="target"
        position={Position.Top}
        className={styles.handle}
        style={{ opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className={styles.handle}
        style={{ opacity: 0 }}
      />

      <div className={styles.equipmentHeader}>
        <div className={styles.equipmentTitle}>{data.title}</div>
        {data.icon ? (
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
            style={{ fontSize: 16 }}
          >
            {data.icon}
          </span>
        ) : null}
      </div>

      {data.details?.length ? (
        <div className={styles.equipmentDetails}>
          {data.details.map((detail, index) => (
            <div className={styles.detailRow} key={`${data.title}-${index}`}>
              <span
                className={styles.detailDot}
                style={{ backgroundColor: detail.color || "#67c26f" }}
              />
              <span className={styles.detailText}>{detail.label}</span>

              {detail.setpoint ? (
                <span className={styles.detailSetpoint}>{detail.setpoint}</span>
              ) : null}

              {detail.value ? (
                <span className={styles.detailValue}>{detail.value}</span>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function GroupNode({ data }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px dashed #9e9e9e",
        background: data.fill || "rgba(255,255,255,0.18)",
        position: "relative",
      }}
    >
      <div
        className={styles.groupLabel}
        style={{
          position: "absolute",
          bottom: 6,
          left: 8,
        }}
      >
        {data.label}
      </div>
    </div>
  );
}

function JunctionNode() {
  return (
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#111",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        className={styles.handle}
        style={{ opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className={styles.handle}
        style={{ opacity: 0 }}
      />
      <Handle
        type="target"
        position={Position.Top}
        className={styles.handle}
        style={{ opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className={styles.handle}
        style={{ opacity: 0 }}
      />
    </div>
  );
}

const nodeTypes = {
  sensor: SensorNode,
  equipment: EquipmentNode,
  group: GroupNode,
  junction: JunctionNode,
};

export default function VisualSystemMap() {
  const nodes = useMemo(
    () => [
      {
        id: "vacation-hq",
        type: "group",
        position: { x: 20, y: 20 },
        style: { width: 1720, height: 640 },
        data: { label: "Vacation Oasis HQ", fill: "rgba(236, 237, 243, 0.7)" },
      },

      {
        id: "west-room",
        type: "group",
        position: { x: 170, y: 60 },
        parentId: "vacation-hq",
        extent: "parent",
        style: { width: 720, height: 560 },
        data: {
          label: "West Wing Mechanical Room",
          fill: "rgba(255,255,255,0.15)",
        },
      },

      {
        id: "plant-pad",
        type: "group",
        position: { x: 110, y: 160 },
        parentId: "west-room",
        extent: "parent",
        style: { width: 300, height: 330 },
        data: { label: "Plant 1 Pad", fill: "rgba(230, 233, 241, 0.55)" },
      },

      {
        id: "floor-3",
        type: "group",
        position: { x: 900, y: 75 },
        parentId: "vacation-hq",
        extent: "parent",
        style: { width: 780, height: 115 },
        data: { label: "Floor 3 (West)", fill: "rgba(255,255,255,0.18)" },
      },

      {
        id: "floor-2",
        type: "group",
        position: { x: 900, y: 215 },
        parentId: "vacation-hq",
        extent: "parent",
        style: { width: 780, height: 165 },
        data: { label: "Floor 2 (West)", fill: "rgba(255,255,255,0.18)" },
      },

      {
        id: "electrical-208",
        type: "group",
        position: { x: 420, y: 18 },
        parentId: "floor-2",
        extent: "parent",
        style: { width: 130, height: 125 },
        data: {
          label: "Electrical Closet - 208",
          fill: "rgba(255,255,255,0.08)",
        },
      },

      {
        id: "floor-1",
        type: "group",
        position: { x: 900, y: 405 },
        parentId: "vacation-hq",
        extent: "parent",
        style: { width: 650, height: 120 },
        data: { label: "Floor 1 (West)", fill: "rgba(255,255,255,0.18)" },
      },

      {
        id: "left-temp",
        type: "sensor",
        position: { x: 40, y: 245 },
        parentId: "vacation-hq",
        extent: "parent",
        data: { icon: "device_thermostat", value: "47.7°F" },
      },
      {
        id: "top-flow",
        type: "sensor",
        position: { x: 150, y: 70 },
        parentId: "west-room",
        extent: "parent",
        data: { icon: "water_drop", value: "39.3 gpm" },
      },
      {
        id: "bottom-pressure",
        type: "sensor",
        position: { x: 500, y: 480 },
        parentId: "west-room",
        extent: "parent",
        data: { icon: "speed", value: "109.3 psi" },
      },

      {
        id: "water-heater-1",
        type: "equipment",
        position: { x: 15, y: 25 },
        parentId: "plant-pad",
        extent: "parent",
        data: {
          title: "Water Heater 1 West",
          icon: "local_fire_department",
          details: [
            { label: "78°F", setpoint: "Setpoint", value: "155°F" },
            { label: "89°F" },
          ],
        },
      },
      {
        id: "water-heater-2",
        type: "equipment",
        position: { x: 15, y: 145 },
        parentId: "plant-pad",
        extent: "parent",
        data: {
          title: "Water Heater 2 West",
          icon: "local_fire_department",
          details: [
            { label: "115°F", setpoint: "Setpoint", value: "159°F" },
            { label: "N/A" },
          ],
        },
      },
      {
        id: "plant-leak",
        type: "sensor",
        position: { x: 190, y: 240 },
        parentId: "plant-pad",
        extent: "parent",
        data: { icon: "water_drop", value: "N/A", alert: true },
      },
      {
        id: "water-tank",
        type: "equipment",
        position: { x: 265, y: 175 },
        parentId: "west-room",
        extent: "parent",
        data: {
          title: "Water Tank (West)",
          icon: "device_hub",
          details: [],
        },
      },
      {
        id: "boiler-mixing",
        type: "equipment",
        position: { x: 425, y: 18 },
        parentId: "west-room",
        extent: "parent",
        data: {
          title: "Boiler Room Mixing",
          icon: "plumbing",
          details: [
            { label: "50°F", setpoint: "Setpoint", value: "72°F" },
            { label: "160°F", value: "120°F" },
          ],
        },
      },

      {
        id: "j-left-mid",
        type: "junction",
        position: { x: 180, y: 278 },
        parentId: "west-room",
        extent: "parent",
        data: {},
      },
      {
        id: "j-left-split-top",
        type: "junction",
        position: { x: 214, y: 278 },
        parentId: "west-room",
        extent: "parent",
        data: {},
      },
      {
        id: "j-left-split-mid",
        type: "junction",
        position: { x: 214, y: 420 },
        parentId: "west-room",
        extent: "parent",
        data: {},
      },
      {
        id: "j-left-split-bottom",
        type: "junction",
        position: { x: 214, y: 590 },
        parentId: "west-room",
        extent: "parent",
        data: {},
      },
      {
        id: "j-center-top",
        type: "junction",
        position: { x: 865, y: 135 },
        parentId: "vacation-hq",
        extent: "parent",
        data: {},
      },
      {
        id: "j-center-mid",
        type: "junction",
        position: { x: 865, y: 287 },
        parentId: "vacation-hq",
        extent: "parent",
        data: {},
      },
      {
        id: "j-center-low",
        type: "junction",
        position: { x: 865, y: 448 },
        parentId: "vacation-hq",
        extent: "parent",
        data: {},
      },
      {
        id: "j-bottom-return-left",
        type: "junction",
        position: { x: 746, y: 590 },
        parentId: "vacation-hq",
        extent: "parent",
        data: {},
      },
      {
        id: "j-right-top",
        type: "junction",
        position: { x: 1712, y: 141 },
        parentId: "vacation-hq",
        extent: "parent",
        data: {},
      },
      {
        id: "j-right-mid",
        type: "junction",
        position: { x: 1712, y: 287 },
        parentId: "vacation-hq",
        extent: "parent",
        data: {},
      },
      {
        id: "j-right-bottom",
        type: "junction",
        position: { x: 1712, y: 590 },
        parentId: "vacation-hq",
        extent: "parent",
        data: {},
      },

      {
        id: "oasis-2",
        type: "equipment",
        position: { x: 15, y: 5 },
        parentId: "floor-3",
        extent: "parent",
        data: {
          title: "Leak Defense Oasis 2",
          icon: "lock",
          details: [
            { label: "122°F", setpoint: "Valve State", value: "Leak Detected" },
            { label: "64°F", setpoint: "Open", value: "Leak Detected" },
          ],
        },
      },
      {
        id: "floor3-temp-1",
        type: "sensor",
        position: { x: 290, y: 20 },
        parentId: "floor-3",
        extent: "parent",
        data: { icon: "device_thermostat", value: "124.1°F" },
      },
      {
        id: "floor3-temp-2",
        type: "sensor",
        position: { x: 430, y: 20 },
        parentId: "floor-3",
        extent: "parent",
        data: { icon: "device_thermostat", value: "120.9°F" },
      },
      {
        id: "floor3-flow",
        type: "sensor",
        position: { x: 695, y: 20 },
        parentId: "floor-3",
        extent: "parent",
        data: { icon: "water_drop", value: "3.1 gpm" },
      },

      {
        id: "oasis-4",
        type: "equipment",
        position: { x: 15, y: 48 },
        parentId: "floor-2",
        extent: "parent",
        data: {
          title: "Leak Defense Oasis 4",
          icon: "lock",
          details: [
            { label: "126°F", setpoint: "Valve State", value: "Leak Detected" },
            { label: "64°F", setpoint: "Open", value: "Leak Detected" },
          ],
        },
      },
      {
        id: "floor2-temp-1",
        type: "sensor",
        position: { x: 290, y: 53 },
        parentId: "floor-2",
        extent: "parent",
        data: { icon: "device_thermostat", value: "124.8°F" },
      },
      {
        id: "closet-leak",
        type: "sensor",
        position: { x: 455, y: 48 },
        parentId: "floor-2",
        extent: "parent",
        data: { icon: "water_drop", value: "N/A", alert: true },
      },
      {
        id: "floor2-temp-2",
        type: "sensor",
        position: { x: 590, y: 53 },
        parentId: "floor-2",
        extent: "parent",
        data: { icon: "device_thermostat", value: "102.2°F", alert: true },
      },
      {
        id: "floor2-flow",
        type: "sensor",
        position: { x: 695, y: 53 },
        parentId: "floor-2",
        extent: "parent",
        data: { icon: "water_drop", value: "19.0 gpm" },
      },

      {
        id: "floor1-temp-1",
        type: "sensor",
        position: { x: 280, y: 38 },
        parentId: "floor-1",
        extent: "parent",
        data: { icon: "device_thermostat", value: "125.6°F" },
      },
      {
        id: "floor1-temp-2",
        type: "sensor",
        position: { x: 575, y: 38 },
        parentId: "floor-1",
        extent: "parent",
        data: { icon: "device_thermostat", value: "120.9°F", alert: true },
      },
    ],
    []
  );

  const edges = useMemo(
    () => [
      { id: "e1", source: "left-temp", target: "j-left-mid", type: "smoothstep" },
      { id: "e2", source: "j-left-mid", target: "top-flow", type: "smoothstep" },
      { id: "e3", source: "j-left-mid", target: "j-left-split-top", type: "smoothstep" },
      { id: "e4", source: "j-left-split-top", target: "water-heater-1", type: "smoothstep" },
      { id: "e5", source: "j-left-split-top", target: "j-left-split-mid", type: "smoothstep" },
      { id: "e6", source: "j-left-split-mid", target: "water-heater-2", type: "smoothstep" },
      { id: "e7", source: "j-left-split-mid", target: "j-left-split-bottom", type: "smoothstep" },
      { id: "e8", source: "water-heater-1", target: "water-tank", type: "smoothstep" },
      { id: "e9", source: "water-heater-2", target: "water-tank", type: "smoothstep" },
      { id: "e10", source: "water-tank", target: "boiler-mixing", type: "smoothstep" },
      { id: "e11", source: "top-flow", target: "boiler-mixing", type: "smoothstep" },
      { id: "e12", source: "boiler-mixing", target: "j-center-top", type: "smoothstep" },
      { id: "e13", source: "j-center-top", target: "oasis-2", type: "smoothstep" },
      { id: "e14", source: "j-center-top", target: "j-center-mid", type: "smoothstep" },
      { id: "e15", source: "j-center-mid", target: "oasis-4", type: "smoothstep" },
      { id: "e16", source: "j-center-mid", target: "j-center-low", type: "smoothstep" },
      { id: "e17", source: "j-center-low", target: "floor1-temp-1", type: "smoothstep" },
      { id: "e18", source: "oasis-2", target: "floor3-temp-1", type: "smoothstep" },
      { id: "e19", source: "floor3-temp-1", target: "floor3-temp-2", type: "smoothstep" },
      { id: "e20", source: "floor3-temp-2", target: "floor3-flow", type: "smoothstep" },
      { id: "e21", source: "floor3-flow", target: "j-right-top", type: "smoothstep" },
      { id: "e22", source: "oasis-4", target: "floor2-temp-1", type: "smoothstep" },
      {
        id: "e23",
        source: "floor2-temp-1",
        target: "closet-leak",
        type: "smoothstep",
        style: { stroke: "#e57373", strokeWidth: 2 },
      },
      {
        id: "e24",
        source: "closet-leak",
        target: "floor2-temp-2",
        type: "smoothstep",
        style: { stroke: "#e57373", strokeWidth: 2 },
      },
      {
        id: "e25",
        source: "floor2-temp-2",
        target: "floor2-flow",
        type: "smoothstep",
        style: { stroke: "#e57373", strokeWidth: 2 },
      },
      { id: "e26", source: "floor2-flow", target: "j-right-mid", type: "smoothstep" },
      {
        id: "e27",
        source: "floor1-temp-1",
        target: "floor1-temp-2",
        type: "smoothstep",
        style: { stroke: "#e57373", strokeWidth: 2 },
      },
      {
        id: "e28",
        source: "floor1-temp-2",
        target: "j-right-bottom",
        type: "smoothstep",
        style: { stroke: "#e57373", strokeWidth: 2 },
      },
      { id: "e29", source: "j-left-split-bottom", target: "bottom-pressure", type: "smoothstep" },
      { id: "e30", source: "bottom-pressure", target: "j-bottom-return-left", type: "smoothstep" },
      { id: "e31", source: "j-bottom-return-left", target: "j-right-bottom", type: "smoothstep" },
      { id: "e32", source: "j-right-top", target: "j-right-mid", type: "smoothstep" },
      { id: "e33", source: "j-right-mid", target: "j-right-bottom", type: "smoothstep" },
    ],
    []
  );

  return (
    <div className={styles.flowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.08 }}
        minZoom={0.35}
        maxZoom={1.8}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        zoomOnScroll
        zoomOnPinch
        zoomOnDoubleClick={false}
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: false,
          style: {
            stroke: "#6f6f6f",
            strokeWidth: 1.5,
          },
        }}
      >
        <Background gap={8} size={1} />
        <Controls showInteractive={false} />
        <MiniMap pannable zoomable />
      </ReactFlow>
    </div>
  );
}