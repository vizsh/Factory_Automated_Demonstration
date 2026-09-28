import type { IncidentStep, Workstation, ReroutedJob, Vendor, LOTOItem } from '../types/manufactureFlow';

export const INITIAL_WORKSTATIONS: Workstation[] = [
  {
    id: 'WS-101',
    name: 'CNC Lathe Standard',
    type: 'CNC-TURN',
    line: 'L-01',
    status: 'OPERATIONAL',
    capacity: 72,
    position: [-10, 0, -6],
    telemetry: { timestamp: 'NOW', vibration: 1.2, temperature: 48, current: 14, pressure: 5.0 },
    activeJobs: ['J0988', 'J0989']
  },
  {
    id: 'WS-102',
    name: 'CNC Lathe Alpha (Compromised)',
    type: 'CNC-TURN',
    line: 'L-03',
    status: 'WARNING',
    capacity: 62,
    position: [-4, 0, -6],
    telemetry: { timestamp: 'CRITICAL', vibration: 4.2, temperature: 79.0, current: 22.0, pressure: 5.2 },
    activeJobs: ['J1001', 'J1002', 'J1003']
  },
  {
    id: 'WS-103',
    name: 'Lathe Beta (High Load)',
    type: 'CNC-TURN',
    line: 'L-03',
    status: 'OPERATIONAL',
    capacity: 88,
    position: [2, 0, -6],
    telemetry: { timestamp: 'NOW', vibration: 1.8, temperature: 55, current: 16, pressure: 6.1 },
    activeJobs: ['J0990', 'J0991']
  },
  {
    id: 'WS-104',
    name: 'Milling Station A',
    type: 'CNC-MILL',
    line: 'L-02',
    status: 'OPERATIONAL',
    capacity: 45,
    position: [8, 0, -6],
    telemetry: { timestamp: 'NOW', vibration: 0.9, temperature: 42, current: 12, pressure: 4.8 },
    activeJobs: ['J1004']
  },
  {
    id: 'WS-105',
    name: 'Lathe Delta (Receiver A)',
    type: 'CNC-TURN',
    line: 'L-04',
    status: 'OPERATIONAL',
    capacity: 38,
    position: [-7, 0, 6],
    telemetry: { timestamp: 'NOW', vibration: 1.1, temperature: 44, current: 13, pressure: 5.5 },
    activeJobs: ['J1008']
  },
  {
    id: 'WS-106',
    name: 'Milling Station B',
    type: 'CNC-MILL',
    line: 'L-02',
    status: 'OPERATIONAL',
    capacity: 50,
    position: [-1, 0, 6],
    telemetry: { timestamp: 'NOW', vibration: 1.3, temperature: 46, current: 15, pressure: 5.1 },
    activeJobs: ['J1009']
  },
  {
    id: 'WS-108',
    name: 'Arm Beta (Receiver B)',
    type: 'CNC-TURN',
    line: 'L-04',
    status: 'OPERATIONAL',
    capacity: 44,
    position: [5, 0, 6],
    telemetry: { timestamp: 'NOW', vibration: 1.0, temperature: 43, current: 13, pressure: 5.3 },
    activeJobs: ['J1010']
  }
];

export const INITIAL_REROUTED_JOBS: ReroutedJob[] = [
  {
    id: 'J1001',
    name: 'Operation CNC-TURN / Precision Spindle Shaft',
    tooling: 'TL-XA',
    requiredSkill: 'CNC-L2',
    loadDelta: 16,
    originalMachine: 'WS-102',
    targetMachine: 'WS-105',
    status: 'PENDING'
  },
  {
    id: 'J1002',
    name: 'Operation CNC-TURN / Aerospace Valve Body',
    tooling: 'TL-XA',
    requiredSkill: 'CNC-L2',
    loadDelta: 14,
    originalMachine: 'WS-102',
    targetMachine: 'WS-108',
    status: 'PENDING'
  },
  {
    id: 'J1003',
    name: 'Operation CNC-TURN / High-Pressure Flange',
    tooling: 'TL-XA',
    requiredSkill: 'CNC-L2',
    loadDelta: 12,
    originalMachine: 'WS-102',
    targetMachine: 'WS-105',
    status: 'PENDING'
  }
];

export const VENDORS: Vendor[] = [
  {
    id: 'V-01',
    name: 'Apex Motion',
    leadTimeHours: 8,
    cost: 4250,
    reliabilityScore: 0.96,
    selected: true
  },
  {
    id: 'V-02',
    name: 'Orbit Industrial',
    leadTimeHours: 12,
    cost: 3900,
    reliabilityScore: 0.89,
    selected: false
  },
  {
    id: 'V-03',
    name: 'Global Supply Standard',
    leadTimeHours: 48,
    cost: 2100,
    reliabilityScore: 0.82,
    selected: false
  }
];

export const INITIAL_LOTO_ITEMS: LOTOItem[] = [
  { id: 'LOTO-1', task: 'Main 480V Electrical Disconnect Locked & Tagged', completed: false, category: 'ELECTRICAL' },
  { id: 'LOTO-2', task: 'Pneumatic Pressure Line Depressurized to 0 Bar', completed: false, category: 'PNEUMATIC' },
  { id: 'LOTO-3', task: 'Kinetic Spindle Mechanical Brake Engaged', completed: false, category: 'KINETIC' },
  { id: 'LOTO-4', task: 'Spindle Bearing Assembly BRG-10023 Replaced', completed: false, category: 'MECHANICAL' },
  { id: 'LOTO-5', task: 'Supervised 15-Minute Vibration Test Cycle Signed', completed: false, category: 'MECHANICAL' }
];

export const INCIDENT_STEPS: IncidentStep[] = [
  {
    id: 0,
    actTitle: 'Act 0: Continuous Telemetry & Factory Baseline',
    shortLabel: 'Factory Baseline',
    agentName: 'Failure Intelligence Agent',
    graphNode: 'telemetry_monitor',
    targetCell: 'FACTORY_OVERVIEW',
    cameraPosition: [0, 22, 28],
    cameraTarget: [0, 0, 0],
    narration: 'Plant operating under nominal conditions across 7 active cells. Continuous vibration & thermal telemetry streams into the event bus.',
    detailedInsight: 'Supervisory Control and Data Acquisition (SCADA) monitoring active. All cells operating within normal thresholds.',
    digitalLatencyMs: 12,
    standardManualHours: 0
  },
  {
    id: 1,
    actTitle: 'Act 1: Sensor Anomaly & Failure Prediction',
    shortLabel: 'Anomaly Detect',
    agentName: 'Failure Intelligence Agent',
    graphNode: 'telemetry_monitor → failure_prediction',
    targetCell: 'WS-102',
    cameraPosition: [-4, 13, 10],
    cameraTarget: [-4, 1, -6],
    narration: 'Vibration spike (4.2 mm/s > 3.0 mm/s) & Thermal escalation (79°C) detected on CNC Lathe WS-102. Machine pulses yellow warning.',
    detailedInsight: 'Diagnostic provider calculates Spindle Bearing Degradation (BRG-10023). Estimated Time-to-Failure (TTF): 18.0 Hours. Failure Probability: 92%.',
    digitalLatencyMs: 85,
    standardManualHours: 4
  },
  {
    id: 2,
    actTitle: 'Act 2: Risk Guardrails & ACID Asset Quarantine',
    shortLabel: 'Quarantine Lock',
    agentName: 'Recovery Orchestrator Agent',
    graphNode: 'recovery_orchestrator',
    targetCell: 'WS-102',
    cameraPosition: [-4, 11, 8],
    cameraTarget: [-4, 1, -6],
    narration: 'Deterministic safety guardrail evaluated: (Prob ≥ 85% AND TTF ≤ 24h). Immediate ACID lock placed on WS-102 to halt new batch releases.',
    detailedInsight: 'Workstation status transitioned to DEGRADED_SHUTDOWN. Active jobs J1001, J1002, J1003 frozen from further processing.',
    digitalLatencyMs: 140,
    standardManualHours: 12
  },
  {
    id: 3,
    actTitle: 'Act 3: Inventory Stockout & Autonomous Procurement',
    shortLabel: 'Auto Procurement',
    agentName: 'Resource Recovery Agent',
    graphNode: 'resource_recovery → procurement_automation',
    targetCell: 'WAREHOUSE',
    cameraPosition: [14, 15, 18],
    cameraTarget: [17, 2, 0],
    narration: 'Warehouse stock check for BRG-10023 returns q = 0 (Stockout). Automated Procurement Agent queries pre-approved vendors.',
    detailedInsight: 'Multi-criteria optimization selects Apex Motion (Lead Time: 8h, Cost: $4,250, Rel: 96%). Purchase Order PR-AUTO-WS102 issued automatically.',
    digitalLatencyMs: 230,
    standardManualHours: 24
  },
  {
    id: 4,
    actTitle: 'Act 4: Constraint-Satisfaction Production Rerouting',
    shortLabel: 'Job Rerouting',
    agentName: 'Production Rerouting Agent',
    graphNode: 'production_rerouting',
    targetCell: 'REROUTE',
    cameraPosition: [0, 18, 16],
    cameraTarget: [0, 0, 0],
    narration: 'Active jobs evaluated against alternative workstations. Energy vectors route J1001 & J1003 to Lathe WS-105, and J1002 to Arm WS-108.',
    detailedInsight: 'WS-103 rejected (capacity overflow: 88% + 14% > 100%). WS-105 load increases to 66%, WS-108 load increases to 58%. Zero line starvation.',
    digitalLatencyMs: 340,
    standardManualHours: 42
  },
  {
    id: 5,
    actTitle: 'Act 5: Delivery SLA Impact & Customer Visibility',
    shortLabel: 'Logistics SLA',
    agentName: 'Delivery Impact Agent',
    graphNode: 'delivery_impact → final_stakeholder_notifications',
    targetCell: 'LOGISTICS',
    cameraPosition: [-14, 15, 18],
    cameraTarget: [-17, 2, 0],
    narration: 'Delivery margin calculated across order lineages. Order SO-8841 projected delay: +85 min (AT_RISK). Logistics dashboard updated.',
    detailedInsight: 'Total digital coordination completed in 420 ms. Human notification dispatched to Schedulers, Logistics, and Plant Manager outboxes.',
    digitalLatencyMs: 420,
    standardManualHours: 60
  },
  {
    id: 6,
    actTitle: 'Act 6: Human Return-to-Service (RTS) Authority Sign-Off',
    shortLabel: 'Plant Manager RTS',
    agentName: 'Maintenance Execution Service',
    graphNode: 'maintenance_execution (Plant Operations Cabin)',
    targetCell: 'PLANT_MANAGER_OFFICE',
    cameraPosition: [0, 13, -7],
    cameraTarget: [0, 6.5, -18],
    narration: 'In the Elevated Plant Operations Control Cabin overlooking the shop floor, the Maintenance Authority inspects physical LOTO logs and authorizes the Return-to-Service (RTS) sign-off.',
    detailedInsight: 'Human-in-the-Loop boundary enforced. Non-invertible state machine releases lock only after verified human physical restoration.',
    digitalLatencyMs: 480,
    standardManualHours: 60
  }
];
