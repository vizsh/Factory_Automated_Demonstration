import { Info, Sparkles } from 'lucide-react';
import type { IncidentStep } from '../../types/manufactureFlow';

interface NarrationBannerProps {
  currentStep: IncidentStep;
}

export const NarrationBanner = ({ currentStep }: NarrationBannerProps) => {
  return (
    <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 w-11/12 max-w-xl bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-2.5 font-sans text-slate-800 shadow-md shadow-slate-200/50 text-center transition-all duration-300">
      <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-sky-800 uppercase tracking-wider mb-0.5 font-mono">
        <Sparkles className="w-3 h-3 text-sky-600 animate-pulse" />
        <span>{currentStep.actTitle}</span>
      </div>

      <p className="text-[11px] text-slate-700 leading-snug max-w-lg mx-auto font-medium">
        "{currentStep.narration}"
      </p>

      <div className="mt-1 flex items-center justify-center gap-2 text-[9px] text-slate-500 font-mono">
        <span className="flex items-center gap-1">
          <Info className="w-2.5 h-2.5 text-sky-600" />
          <span>Agent: <strong className="text-sky-800">{currentStep.agentName}</strong></span>
        </span>
        <span>|</span>
        <span>Node: <strong className="text-slate-800">{currentStep.graphNode}</strong></span>
      </div>
    </div>
  );
};
