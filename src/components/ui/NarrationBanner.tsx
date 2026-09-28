import { Info, Sparkles } from 'lucide-react';
import type { IncidentStep } from '../../types/manufactureFlow';

interface NarrationBannerProps {
  currentStep: IncidentStep;
}

export const NarrationBanner = ({ currentStep }: NarrationBannerProps) => {
  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 w-auto max-w-lg bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full px-4 py-1.5 font-sans text-slate-800 shadow-md shadow-slate-200/50 text-center transition-all duration-300">
      <div className="flex items-center justify-center gap-2 text-xs">
        <span className="flex items-center gap-1 font-mono font-bold text-sky-700 uppercase shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
          <span>Act {currentStep.id}</span>
        </span>
        <span className="text-slate-300">|</span>
        <p className="text-[11px] text-slate-700 font-medium truncate">
          {currentStep.narration}
        </p>
        <span className="text-slate-300">|</span>
        <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500 shrink-0">
          <Info className="w-3 h-3 text-sky-600" />
          <strong className="text-sky-800">{currentStep.agentName.split(' ')[0]}</strong>
        </span>
      </div>
    </div>
  );
};
