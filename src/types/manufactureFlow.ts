export type SystemMode = 'CINEMATIC' | 'FREE_ROAM';

export type WorkstationStatus = 
  | 'OPERATIONAL'
  | 'WARNING'
  | 'DEGRADED_SHUTDOWN'
  | 'REROUTE_RECEIVER'
  | 'REPAIRED';

export interface TelemetryReading {
  timestamp: string;
  vibration: number; // mm/s (crit: 3.0)
  temperature: number; // °C (crit: 75.0)
  current: number; // A (crit: 20.0)
  pressure: number; // bar (nominal: 2.5-8.5)
}

export interface Workstation {
  id: string;
  name: string;
  type: string;
  line: string;
  status: WorkstationStatus;
  capacity: number; // percentage load 0-100
  position: [number, number, number];
  telemetry: TelemetryReading;
  activeJobs: string[];
}

export interface ReroutedJob {
  id: string;
  name: string;
  tooling: string;
  requiredSkill: string;
  loadDelta: number;
  originalMachine: string;
  targetMachine: string;
  status: 'PENDING' | 'REASSIGNED' | 'INELIGIBLE';
}

export interface Vendor {
  id: string;
  name: string;
  leadTimeHours: number;
  cost: number;
  reliabilityScore: number;
  selected: boolean;
}

export type RTSStage = 
  | 'PLANNED'
  | 'IN_PROGRESS'
  | 'REPAIRED'
  | 'TESTING'
  | 'RTS_VALIDATED';

export interface LOTOItem {
  id: string;
  task: string;
  completed: boolean;
  category: 'ELECTRICAL' | 'PNEUMATIC' | 'KINETIC' | 'MECHANICAL';
}

export interface IncidentStep {
  id: number;
  actTitle: string;
  shortLabel: string;
  agentName: string;
  graphNode: string;
  targetCell: 'FACTORY_OVERVIEW' | 'WS-102' | 'WAREHOUSE' | 'REROUTE' | 'LOGISTICS' | 'RTS' | 'PLANT_MANAGER_OFFICE';
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  narration: string;
  detailedInsight: string;
  digitalLatencyMs: number;
  standardManualHours: number;
}
