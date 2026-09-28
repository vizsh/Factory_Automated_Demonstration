import { Play, Pause, SkipBack, SkipForward, FastForward } from 'lucide-react';
import type { IncidentStep } from '../../types/manufactureFlow';

interface TimelineScrubberProps {
  steps: IncidentStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  playbackSpeed: number;
  onToggleSpeed: () => void;
}

export const TimelineScrubber = ({
  steps,
  currentStepIndex,
  onSelectStep,
  isPlaying,
  onTogglePlay,
  playbackSpeed,
  onToggleSpeed
}: TimelineScrubberProps) => {
  return (
    <footer className="fixed md:absolute bottom-2 sm:bottom-3 left-2 right-2 md:left-1/2 md:-translate-x-1/2 z-30 w-[calc(100vw-16px)] md:w-11/12 md:max-w-3xl mx-auto bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-1.5 sm:p-2.5 shadow-xl shadow-slate-200/50 font-sans text-slate-800 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]">
      {/* Step Pills Navigation - Touch Scrollable on Mobile */}
      <div className="flex items-center gap-1 mb-1 overflow-x-auto pb-1 scrollbar-none touch-pan-x w-full">
        {steps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(idx)}
              className={`shrink-0 px-2 py-0.8 rounded-md border text-left transition-all ${
                isActive
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm font-bold'
                  : isPassed
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-medium'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="text-[7px] sm:text-[8px] uppercase tracking-wider font-mono opacity-80 leading-none">
                Act {idx}
              </div>
              <div className="text-[9px] sm:text-[10px] whitespace-nowrap font-semibold leading-tight">{step.shortLabel}</div>
            </button>
          );
        })}
      </div>

      {/* Playback Controls & Active Step Label */}
      <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-100">
        <div className="flex items-center gap-1">
          {/* Step Back */}
          <button
            onClick={() => onSelectStep(Math.max(0, currentStepIndex - 1))}
            disabled={currentStepIndex === 0}
            className="p-1 rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 text-slate-700"
          >
            <SkipBack className="w-3 h-3" />
          </button>

          {/* Play / Pause */}
          <button
            onClick={onTogglePlay}
            className="flex items-center gap-1 px-2.5 py-0.8 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] sm:text-[11px] shadow-sm transition-all"
          >
            {isPlaying ? <Pause className="w-3 h-3 text-sky-400" /> : <Play className="w-3 h-3 text-sky-400" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          {/* Step Forward */}
          <button
            onClick={() => onSelectStep(Math.min(steps.length - 1, currentStepIndex + 1))}
            disabled={currentStepIndex === steps.length - 1}
            className="p-1 rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 text-slate-700"
          >
            <SkipForward className="w-3 h-3" />
          </button>

          {/* Speed Toggle */}
          <button
            onClick={onToggleSpeed}
            className="flex items-center gap-0.5 px-1.5 py-0.8 rounded-md border border-slate-200 bg-slate-50 text-slate-700 text-[9px] font-mono font-semibold"
          >
            <FastForward className="w-2.5 h-2.5 text-sky-600" />
            <span>{playbackSpeed}x</span>
          </button>
        </div>

        {/* Current Active Step Title */}
        <div className="text-right text-[9px] sm:text-[10px] font-sans truncate max-w-[120px] sm:max-w-none">
          <span className="text-sky-700 font-bold font-mono">Act {currentStepIndex}: </span>
          <span className="text-slate-800 font-medium truncate">{steps[currentStepIndex].shortLabel}</span>
        </div>
      </div>
    </footer>
  );
};
