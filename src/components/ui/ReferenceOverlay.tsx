export const ReferenceOverlay = () => {
  return (
    <div className="absolute top-16 left-6 z-20 flex items-center gap-2 font-mono text-slate-200">
      {/* Title pill */}
      <div className="px-2.5 py-1 rounded-lg border border-slate-700/80 bg-slate-900/90 backdrop-blur-md text-[11px] font-semibold text-slate-200 shadow-md">
        Schematic Twin
      </div>

      {/* Legend pill */}
      <div className="flex items-center gap-2.5 px-2.5 py-1 rounded-lg border border-slate-700/80 bg-slate-900/90 backdrop-blur-md text-[11px] shadow-md">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
          <span className="text-red-400 font-bold">Hotspot</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
          <span className="text-amber-300 font-bold">Elevated</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span className="text-emerald-300 font-bold">Benchmark</span>
        </div>
      </div>
    </div>
  );
};
