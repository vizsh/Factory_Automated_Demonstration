import { Activity, Flame, Zap, Gauge, Lock, AlertTriangle } from 'lucide-react';
import type { Workstation, IncidentStep } from '../../types/manufactureFlow';

interface TelemetryHUDProps {
  workstation: Workstation;
  currentStep: IncidentStep;
}

export const TelemetryHUD = ({ workstation, currentStep }: TelemetryHUDProps) => {
  const isCompromised = workstation.id === 'WS-102';
  const isLocked = currentStep.id >= 2 && currentStep.id !== 6;

  return (
    <div className="absolute right-6 top-28 bottom-24 z-20 w-80 max-h-[calc(100vh-210px)] overflow-y-auto bg-slate-950/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-3.5 font-mono text-slate-200 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            {workstation.name}
          </div>
          <div className="text-[10px] text-slate-400">ID: {workstation.id} | Line: {workstation.line}</div>
        </div>

        <span
          className={`px-2 py-0.5 rounded text-[9px] font-bold ${
            isLocked
              ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse'
              : isCompromised
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
          }`}
        >
          {isLocked ? 'LOCKED (ACID)' : workstation.status}
        </span>
      </div>

      {/* Sensor Parameters Matrix */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        {/* Vibration */}
        <div
          className={`p-2 rounded-xl border ${
            isCompromised && workstation.telemetry.vibration > 3.0
              ? 'bg-red-950/40 border-red-500/60 text-red-300'
              : 'bg-slate-900/60 border-slate-800 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-1 text-[9px] text-slate-400">
            <Activity className="w-3 h-3 text-red-400" />
            <span>Vibration</span>
          </div>
          <div className="text-sm font-extrabold mt-0.5">
            {workstation.telemetry.vibration} <span className="text-[9px]">mm/s</span>
          </div>
          <div className="text-[8px] text-slate-500">Max: 3.0</div>
        </div>

        {/* Temperature */}
        <div
          className={`p-2 rounded-xl border ${
            isCompromised && workstation.telemetry.temperature > 75.0
              ? 'bg-amber-950/40 border-amber-500/60 text-amber-300'
              : 'bg-slate-900/60 border-slate-800 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-1 text-[9px] text-slate-400">
            <Flame className="w-3 h-3 text-amber-400" />
            <span>Temperature</span>
          </div>
          <div className="text-sm font-extrabold mt-0.5">
            {workstation.telemetry.temperature} <span className="text-[9px]">°C</span>
          </div>
          <div className="text-[8px] text-slate-500">Max: 75°C</div>
        </div>

        {/* Current */}
        <div className="p-2 rounded-xl border bg-slate-900/60 border-slate-800 text-slate-300">
          <div className="flex items-center gap-1 text-[9px] text-slate-400">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span>Current</span>
          </div>
          <div className="text-sm font-extrabold mt-0.5">
            {workstation.telemetry.current} <span className="text-[9px]">A</span>
          </div>
          <div className="text-[8px] text-slate-500">Max: 20A</div>
        </div>

        {/* Pressure */}
        <div className="p-2 rounded-xl border bg-slate-900/60 border-slate-800 text-slate-300">
          <div className="flex items-center gap-1 text-[9px] text-slate-400">
            <Gauge className="w-3 h-3 text-blue-400" />
            <span>Pressure</span>
          </div>
          <div className="text-sm font-extrabold mt-0.5">
            {workstation.telemetry.pressure} <span className="text-[9px]">bar</span>
          </div>
          <div className="text-[8px] text-slate-500 font-mono">2.5-8.5</div>
        </div>
      </div>

      {/* Diagnostic Insight Card (If WS-102) */}
      {isCompromised && (
        <div className="mt-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <div className="flex items-center justify-between text-amber-400 font-bold mb-1">
            <div className="flex items-center gap-1 text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Root Cause Diagnosis</span>
            </div>
            <span className="text-[9px] text-slate-400">Prob: 92%</span>
          </div>
          <div className="text-slate-200 font-semibold text-[11px]">Spindle Bearing Degradation</div>
          <div className="text-[9px] text-slate-400 mt-0.5">Required Part: BRG-10023</div>
          <div className="text-[9px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Time-To-Failure (TTF):</span>
            <span className="text-red-400 font-bold">18.0 Hours</span>
          </div>
        </div>
      )}

      {/* Lock status banner */}
      {isLocked && (
        <div className="mt-2.5 p-2 rounded-xl bg-red-950/60 border border-red-500/50 flex items-center gap-1.5 text-[11px] text-red-300 font-bold">
          <Lock className="w-3.5 h-3.5 text-red-400 shrink-0" />
          <span>ACID Lock: ACTIVE</span>
        </div>
      )}
    </div>
  );
};
