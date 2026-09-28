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
    <div className="absolute right-2 sm:right-6 top-24 z-20 w-[calc(100vw-16px)] sm:w-80 max-h-[calc(100vh-200px)] overflow-y-auto bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3 font-sans text-slate-800 shadow-xl shadow-slate-200/50">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <div className="text-xs font-bold text-sky-800 uppercase tracking-wider font-mono">
            {workstation.name}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">ID: {workstation.id} | Line: {workstation.line}</div>
        </div>

        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
            isLocked
              ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse'
              : isCompromised
              ? 'bg-amber-100 text-amber-800 border border-amber-300'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          }`}
        >
          {isLocked ? 'LOCKED (ACID)' : workstation.status}
        </span>
      </div>

      {/* Sensor Parameters Matrix */}
      <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-xs">
        {/* Vibration */}
        <div
          className={`p-2 rounded-xl border ${
            isCompromised && workstation.telemetry.vibration > 3.0
              ? 'bg-rose-50 border-rose-200 text-rose-900'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex items-center gap-1 text-[9px] text-slate-500">
            <Activity className="w-3 h-3 text-rose-600" />
            <span>Vibration</span>
          </div>
          <div className="text-sm font-extrabold mt-0.5 font-mono">
            {workstation.telemetry.vibration} <span className="text-[9px]">mm/s</span>
          </div>
          <div className="text-[8px] text-slate-500 font-mono">Max: 3.0</div>
        </div>

        {/* Temperature */}
        <div
          className={`p-2 rounded-xl border ${
            isCompromised && workstation.telemetry.temperature > 75.0
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex items-center gap-1 text-[9px] text-slate-500">
            <Flame className="w-3 h-3 text-amber-600" />
            <span>Temperature</span>
          </div>
          <div className="text-sm font-extrabold mt-0.5 font-mono">
            {workstation.telemetry.temperature} <span className="text-[9px]">°C</span>
          </div>
          <div className="text-[8px] text-slate-500 font-mono">Max: 75°C</div>
        </div>

        {/* Current */}
        <div className="p-2 rounded-xl border bg-slate-50 border-slate-200 text-slate-800">
          <div className="flex items-center gap-1 text-[9px] text-slate-500">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>Current</span>
          </div>
          <div className="text-sm font-extrabold mt-0.5 font-mono">
            {workstation.telemetry.current} <span className="text-[9px]">A</span>
          </div>
          <div className="text-[8px] text-slate-500 font-mono">Max: 20A</div>
        </div>

        {/* Pressure */}
        <div className="p-2 rounded-xl border bg-slate-50 border-slate-200 text-slate-800">
          <div className="flex items-center gap-1 text-[9px] text-slate-500">
            <Gauge className="w-3 h-3 text-sky-600" />
            <span>Pressure</span>
          </div>
          <div className="text-sm font-extrabold mt-0.5 font-mono">
            {workstation.telemetry.pressure} <span className="text-[9px]">bar</span>
          </div>
          <div className="text-[8px] text-slate-500 font-mono">2.5-8.5</div>
        </div>
      </div>

      {/* Diagnostic Insight Card (If WS-102) */}
      {isCompromised && (
        <div className="mt-2.5 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs">
          <div className="flex items-center justify-between text-amber-900 font-bold mb-1 font-mono">
            <div className="flex items-center gap-1 text-[10px]">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              <span>Root Cause Diagnosis</span>
            </div>
            <span className="text-[9px] text-amber-700">Prob: 92%</span>
          </div>
          <div className="text-slate-900 font-bold text-[11px]">Spindle Bearing Degradation</div>
          <div className="text-[9px] text-slate-600 mt-0.5 font-mono">Required Part: BRG-10023</div>
          <div className="text-[9px] text-slate-700 mt-1 flex items-center justify-between font-mono">
            <span>Time-To-Failure (TTF):</span>
            <span className="text-rose-700 font-extrabold">18.0 Hours</span>
          </div>
        </div>
      )}

      {/* Lock status banner */}
      {isLocked && (
        <div className="mt-2.5 p-2 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-900 font-bold">
          <Lock className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span>ACID Lock: ACTIVE</span>
        </div>
      )}
    </div>
  );
};
