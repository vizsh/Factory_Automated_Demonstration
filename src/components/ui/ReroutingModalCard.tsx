import { GitPullRequest, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { INITIAL_REROUTED_JOBS } from '../../data/scenarioData';

export const ReroutingModalCard = () => {
  return (
    <div className="absolute right-2 sm:right-6 top-24 z-20 w-[calc(100vw-16px)] sm:w-80 max-h-[calc(100vh-200px)] overflow-y-auto bg-white/95 backdrop-blur-md border border-sky-200 rounded-2xl p-3 font-sans text-slate-800 shadow-xl shadow-sky-100 animate-in fade-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5 text-sky-800 font-bold text-xs uppercase tracking-wider font-mono">
          <GitPullRequest className="w-3.5 h-3.5 text-sky-600" />
          <span>Job Rerouting Matrix</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 text-[9px] font-bold font-mono">
          RP-AUTO-WS102
        </span>
      </div>

      <div className="mt-2 text-[10px] text-slate-600">
        Re-allocating in-flight jobs from <span className="text-rose-600 font-bold font-mono">WS-102</span> across qualified candidate machines:
      </div>

      {/* Rerouted Jobs List */}
      <div className="mt-2 space-y-1.5 text-xs font-mono">
        {INITIAL_REROUTED_JOBS.map((job) => (
          <div
            key={job.id}
            className="p-2 rounded-xl border bg-sky-50/60 border-sky-200 text-slate-800"
          >
            <div className="flex items-center justify-between font-bold text-[10px]">
              <span className="text-sky-900">{job.id}: {job.name.split('/')[1]}</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-sky-200/80 text-sky-900 font-extrabold">
                +{job.loadDelta}%
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between text-[10px] bg-white p-1 rounded-lg border border-slate-200">
              <div className="text-rose-600 font-bold">{job.originalMachine}</div>
              <ArrowRight className="w-3 h-3 text-sky-600 animate-pulse" />
              <div className="text-emerald-700 font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{job.targetMachine}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Capacity Constraint Rejection Notice */}
      <div className="mt-2.5 p-2 rounded-xl bg-amber-50 border border-amber-200 text-[9px] text-amber-900 font-sans">
        <div className="flex items-center gap-1 font-bold mb-0.5 font-mono">
          <ShieldAlert className="w-3 h-3 text-amber-600" />
          <span>Hard Capacity Ceiling</span>
        </div>
        <div>
          Lathe WS-103 rejected (88% + 14% = 102% &gt; 100% capacity limit).
        </div>
      </div>
    </div>
  );
};
