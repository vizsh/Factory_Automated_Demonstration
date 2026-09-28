import { GitPullRequest, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { INITIAL_REROUTED_JOBS } from '../../data/scenarioData';

export const ReroutingModalCard = () => {
  return (
    <div className="absolute right-6 top-28 bottom-24 z-20 w-80 max-h-[calc(100vh-210px)] overflow-y-auto bg-slate-950/90 backdrop-blur-md border border-cyan-500/50 rounded-2xl p-3.5 font-mono text-slate-200 shadow-[0_0_25px_rgba(6,182,212,0.3)] animate-in fade-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs uppercase tracking-wider">
          <GitPullRequest className="w-3.5 h-3.5" />
          <span>Job Rerouting Matrix</span>
        </div>
        <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[9px] font-bold">
          RP-AUTO-WS102
        </span>
      </div>

      <div className="mt-2 text-[10px] text-slate-300">
        Re-allocating in-flight jobs from <span className="text-red-400 font-bold">WS-102</span> across qualified candidate machines:
      </div>

      {/* Rerouted Jobs List */}
      <div className="mt-2 space-y-1.5 text-xs">
        {INITIAL_REROUTED_JOBS.map((job) => (
          <div
            key={job.id}
            className="p-2 rounded-xl border bg-slate-900/80 border-cyan-500/30 text-slate-200"
          >
            <div className="flex items-center justify-between font-bold text-[11px]">
              <span className="text-cyan-300">{job.id}: {job.name.split('/')[1]}</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                +{job.loadDelta}%
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between text-[10px] bg-slate-950 p-1.5 rounded-lg border border-slate-800">
              <div className="text-red-400 font-bold">{job.originalMachine}</div>
              <ArrowRight className="w-3 h-3 text-cyan-400 animate-pulse" />
              <div className="text-emerald-400 font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{job.targetMachine}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Capacity Constraint Rejection Notice */}
      <div className="mt-2.5 p-2 rounded-xl bg-slate-900 border border-amber-500/40 text-[9px] text-amber-300">
        <div className="flex items-center gap-1 font-bold mb-0.5">
          <ShieldAlert className="w-3 h-3 text-amber-400" />
          <span>Hard Capacity Ceiling</span>
        </div>
        <div>
          Lathe WS-103 rejected (88% + 14% = 102% &gt; 100% capacity limit).
        </div>
      </div>
    </div>
  );
};
