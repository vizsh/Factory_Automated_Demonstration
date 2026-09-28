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
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-3 md:px-6 py-2 bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-800 shadow-sm h-12 md:h-14">
      {/* Brand Identity */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-lg bg-slate-900 font-mono text-white font-extrabold text-[11px] md:text-xs shadow-sm">
          MO
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-heading text-xs font-bold tracking-tight text-slate-900 uppercase">
              Machine Overwatch
            </h1>
            <span className="hidden sm:inline-block px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-slate-100 border border-slate-200 text-slate-600 font-semibold">
              DEMO
            </span>
          </div>
          <p className="hidden md:block text-[10px] text-slate-500 font-sans">
            Autonomous Manufacturing Resilience Control Plane
          </p>
        </div>
      </div>

      {/* Mode Controls */}
      <div className="flex items-center gap-1 bg-slate-100/90 p-0.5 md:p-1 rounded-lg border border-slate-200 shrink-0">
        <button
          onClick={() => onToggleMode('CINEMATIC')}
          className={`flex items-center gap-1 px-2 md:px-2.5 py-1 rounded-md text-[10px] md:text-[11px] font-medium transition-all ${
            mode === 'CINEMATIC'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Video className="w-3 h-3 text-sky-600 shrink-0" />
          <span>Tour</span>
          {mode === 'CINEMATIC' && (
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping ml-0.5" />
          )}
        </button>

        <button
          onClick={() => onToggleMode('FREE_ROAM')}
          className={`flex items-center gap-1 px-2 md:px-2.5 py-1 rounded-md text-[10px] md:text-[11px] font-medium transition-all ${
            mode === 'FREE_ROAM'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Compass className="w-3 h-3 text-slate-600 shrink-0" />
          <span>3D Orbit</span>
        </button>
      </div>

      {/* System Status Indicators (Desktop only) */}
      <div className="hidden xl:flex items-center gap-4 text-[11px] font-mono text-slate-600 shrink-0">
        <div className="flex items-center gap-1">
          <Cpu className="w-3.5 h-3.5 text-sky-600" />
          <span>LangGraph Engine</span>
        </div>
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>ACID Locking</span>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="flex items-center gap-1 px-2 md:px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[10px] md:text-[11px] font-medium shadow-sm transition-all shrink-0"
      >
        <RotateCcw className="w-3 h-3" />
        <span className="hidden sm:inline">Reset</span>
      </button>
    </header>
  );
};
