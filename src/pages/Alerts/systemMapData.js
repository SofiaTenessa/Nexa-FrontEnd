// Mini system map data for each alert.
// Each alert gets a self-contained subgraph with nodes, edges, and layout positions.
// Visual style matches the real Nexa system map:
//   - circle nodes for sensors (with readings)
//   - rect nodes for equipment
//   - zone boxes (dashed blue)
//   - location labels (with pin icon)
//   - black dot junctions with arrowed lines

// Node shapes: "circle" (sensors/meters), "rect" (equipment), "zone" (dashed group), "location" (label + pin)
// An "alert" flag marks the alerting node (red ring)

export const alertMiniMaps = {
  "temp-floor-2w": {
    label: "Domestic Hot Water System — Floor 2 (West)",
    nodes: [
      { id: "zone", type: "zone", label: "DHW Tank (West)", x: 180, y: 20, w: 360, h: 200 },
      { id: "temp-out", type: "circle", label: "101.8°F", icon: "thermometer", x: 260, y: 80, alert: true },
      { id: "dhw-tank", type: "rect", label: "DHW Tank (West)", icon: "device_hub", x: 260, y: 180 },
      { id: "loc", type: "location", label: "Floor 2 (West)", x: 500, y: 80 },
      { id: "flow", type: "circle", label: "0.0 gpm", icon: "water", x: 60, y: 80 },
    ],
    edges: [
      { from: "flow", to: "dhw-tank" },
      { from: "dhw-tank", to: "temp-out" },
      { from: "temp-out", to: "loc" },
    ],
  },

  "comm-floor-1w": {
    label: "Boiler Room — Floor 1 (West)",
    nodes: [
      { id: "zone", type: "zone", label: "Boiler Room Mixing", x: 120, y: 20, w: 320, h: 200 },
      { id: "temp-out", type: "circle", label: "N/A", icon: "thermometer", x: 200, y: 80, alert: true },
      { id: "mixing", type: "rect", label: "Boiler Room Mixing", icon: "device_hub", x: 200, y: 180 },
      { id: "loc", type: "location", label: "Floor 1 (West)", x: 440, y: 80 },
    ],
    edges: [
      { from: "mixing", to: "temp-out" },
      { from: "temp-out", to: "loc" },
    ],
  },

  "smart-base-station-1": {
    label: "Communication — Floor 2 (West)",
    nodes: [
      { id: "zone", type: "zone", label: "Relay 40000001 (Slot 2)", x: 120, y: 20, w: 320, h: 200 },
      { id: "base", type: "circle", label: "N/A", icon: "router", x: 200, y: 80, alert: true },
      { id: "relay", type: "rect", label: "Relay 40000001", icon: "settings_input_component", x: 200, y: 180 },
      { id: "loc", type: "location", label: "Floor 2 (West)", x: 440, y: 80 },
    ],
    edges: [
      { from: "relay", to: "base" },
      { from: "base", to: "loc" },
    ],
  },

  "sensor-30000005-leak": {
    label: "Leak Detection — Floor 2 (West)",
    nodes: [
      { id: "zone", type: "zone", label: "Leak Defense Oasis 2", x: 120, y: 20, w: 320, h: 200 },
      { id: "sensor", type: "circle", label: "Leak", icon: "water_drop", x: 200, y: 80, alert: true },
      { id: "oasis", type: "rect", label: "Leak Defense Oasis 2", icon: "device_hub", x: 200, y: 180 },
      { id: "loc", type: "location", label: "Floor 2 (West)", x: 440, y: 80 },
    ],
    edges: [
      { from: "oasis", to: "sensor" },
      { from: "sensor", to: "loc" },
    ],
  },

  "sensor-30000003-leak": {
    label: "Leak Detection — Floor 2 (West)",
    nodes: [
      { id: "zone", type: "zone", label: "Leak Defense Oasis 4", x: 120, y: 20, w: 320, h: 200 },
      { id: "sensor", type: "circle", label: "Leak", icon: "water_drop", x: 200, y: 80, alert: true },
      { id: "oasis", type: "rect", label: "Leak Defense Oasis 4", icon: "device_hub", x: 200, y: 180 },
      { id: "loc", type: "location", label: "Floor 2 (West)", x: 440, y: 80 },
    ],
    edges: [
      { from: "oasis", to: "sensor" },
      { from: "sensor", to: "loc" },
    ],
  },

  "fuel-puck-leak": {
    label: "Leak Detection — Plant 1 Pad",
    nodes: [
      { id: "zone", type: "zone", label: "Plant 1", x: 120, y: 20, w: 320, h: 200 },
      { id: "sensor", type: "circle", label: "Leak", icon: "water_drop", x: 200, y: 80, alert: true },
      { id: "plant", type: "rect", label: "Plant 1", icon: "device_hub", x: 200, y: 180 },
      { id: "loc", type: "location", label: "Plant 1 Pad", x: 440, y: 80 },
    ],
    edges: [
      { from: "plant", to: "sensor" },
      { from: "sensor", to: "loc" },
    ],
  },

  "resolved-example": {
    label: "Flow Monitoring — Floor 2 (West)",
    nodes: [
      { id: "zone", type: "zone", label: "Valve", x: 120, y: 20, w: 320, h: 200 },
      { id: "meter", type: "circle", label: "OK", icon: "radio_button_checked", x: 200, y: 80 },
      { id: "valve", type: "rect", label: "Valve", icon: "device_hub", x: 200, y: 180 },
      { id: "loc", type: "location", label: "Floor 2 (West)", x: 440, y: 80 },
    ],
    edges: [
      { from: "valve", to: "meter" },
      { from: "meter", to: "loc" },
    ],
  },
};
