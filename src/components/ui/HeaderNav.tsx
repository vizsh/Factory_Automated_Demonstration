import { RotateCcw, Cpu, ShieldCheck, Video, Compass } from 'lucide-react';
import type { SystemMode, IncidentStep } from '../../types/manufactureFlow';

interface HeaderNavProps {
  mode: SystemMode;
  onToggleMode: (mode: SystemMode) => void;
  currentStep: IncidentStep;
  onReset: () => void;
}

export const HeaderNav = ({
  mode,
  onToggleMode,
  onReset
}: HeaderNavProps) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-3.5 bg-white/90 backdrop-blur-md border-b border-slate-200/80 text-slate-800 shadow-sm">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900 font-mono text-white font-extrabold text-sm shadow-md">
          MO
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-sm font-bold tracking-tight text-slate-900 uppercase">
              Machine Overwatch
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-100 border border-slate-200 text-slate-700 font-semibold tracking-wide">
              CONTROLLED DEMO
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-sans">
            Autonomous Manufacturing Resilience Control Plane
          </p>
        </div>
      </div>

      {/* Mode Controls */}
      <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
        <button
          onClick={() => onToggleMode('CINEMATIC')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            mode === 'CINEMATIC'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200 font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Video className="w-3.5 h-3.5 text-sky-600" />
          <span>Auto-Pilot Tour</span>
          {mode === 'CINEMATIC' && (
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping ml-1" />
          )}
        </button>

        <button
          onClick={() => onToggleMode('FREE_ROAM')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            mode === 'FREE_ROAM'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200 font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-slate-600" />
          <span>3D Free-Roam</span>
        </button>
      </div>

      {/* System Status Indicators */}
      <div className="hidden lg:flex items-center gap-5 text-xs font-mono text-slate-600">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-sky-600" />
          <span>LangGraph State Engine</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>ACID Locking Enabled</span>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-sm transition-all"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Demo</span>
      </button>
    </header>
  );
};
