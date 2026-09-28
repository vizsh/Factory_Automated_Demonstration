export const ReferenceOverlay = () => {
  return (
    <div className="absolute top-16 left-6 z-20 flex items-center gap-2 font-mono text-slate-800">
      {/* Title pill */}
      <div className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white/95 backdrop-blur-md text-xs font-semibold text-slate-800 shadow-sm">
        Schematic Twin · sector-typical layout
      </div>

      {/* Legend pill */}
      <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg border border-slate-200 bg-white/95 backdrop-blur-md text-xs shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" />
          <span className="text-red-700 font-bold">Hotspot</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
          <span className="text-amber-700 font-bold">Elevated</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          <span className="text-emerald-700 font-bold">Benchmark</span>
        </div>
      </div>
    </div>
  );
};
