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
    <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-11/12 max-w-4xl bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3.5 shadow-xl shadow-slate-200/60 font-sans text-slate-800">
      {/* Step Pills Navigation */}
      <div className="flex items-center justify-between gap-1.5 mb-2.5 overflow-x-auto pb-1 scrollbar-none">
        {steps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(idx)}
              className={`flex-1 min-w-[105px] px-2.5 py-1.5 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md font-bold'
                  : isPassed
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-medium'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="text-[9px] uppercase tracking-wider font-mono opacity-80">
                Act {idx}
              </div>
              <div className="text-[10px] truncate font-semibold">{step.shortLabel}</div>
            </button>
          );
        })}
      </div>

      {/* Playback Controls & Progress Bar */}
      <div className="flex items-center justify-between gap-4 pt-1.5 border-t border-slate-100">
        <div className="flex items-center gap-2">
          {/* Step Back */}
          <button
            onClick={() => onSelectStep(Math.max(0, currentStepIndex - 1))}
            disabled={currentStepIndex === 0}
            className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 text-slate-700"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play / Pause */}
          <button
            onClick={onTogglePlay}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-sky-400" /> : <Play className="w-4 h-4 text-sky-400" />}
            <span>{isPlaying ? 'Pause Tour' : 'Play Tour'}</span>
          </button>

          {/* Step Forward */}
          <button
            onClick={() => onSelectStep(Math.min(steps.length - 1, currentStepIndex + 1))}
            disabled={currentStepIndex === steps.length - 1}
            className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 text-slate-700"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Speed Toggle */}
          <button
            onClick={onToggleSpeed}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-xs font-mono font-semibold"
          >
            <FastForward className="w-3 h-3 text-sky-600" />
            <span>{playbackSpeed}x Speed</span>
          </button>
        </div>

        {/* Current Active Step Title */}
        <div className="text-right text-xs font-sans truncate hidden md:block">
          <span className="text-sky-700 font-bold font-mono">Act {currentStepIndex}: </span>
          <span className="text-slate-800 font-medium">{steps[currentStepIndex].actTitle}</span>
        </div>
      </div>
    </footer>
  );
};
