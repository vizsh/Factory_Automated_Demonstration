import { ShoppingCart, CheckCircle, Clock, DollarSign, Award } from 'lucide-react';
import { VENDORS } from '../../data/scenarioData';

export const ProcurementModalCard = () => {
  return (
    <div className="absolute right-6 top-28 bottom-24 z-20 w-80 max-h-[calc(100vh-210px)] overflow-y-auto bg-slate-950/90 backdrop-blur-md border border-purple-500/50 rounded-2xl p-3.5 font-mono text-slate-200 shadow-[0_0_25px_rgba(168,85,247,0.3)] animate-in fade-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-purple-400 font-bold text-xs uppercase tracking-wider">
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Auto Procurement</span>
        </div>
        <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 text-[9px] font-bold">
          q = 0 STOCKOUT
        </span>
      </div>

      <div className="mt-2 text-[10px] text-slate-300">
        Part <span className="text-purple-300 font-bold">BRG-10023</span> stockout in warehouse. Vendor multi-criteria evaluation:
      </div>

      {/* Vendor Ranking Table */}
      <div className="mt-2 space-y-2">
        {VENDORS.map((vendor) => (
          <div
            key={vendor.id}
            className={`p-2 rounded-xl border transition-all text-xs ${
              vendor.selected
                ? 'bg-purple-950/60 border-purple-500 text-purple-100 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-[11px]">
              <span className="text-slate-100">{vendor.name}</span>
              {vendor.selected && (
                <span className="flex items-center gap-1 px-1 py-0.2 rounded bg-purple-500 text-slate-950 text-[8px] font-extrabold">
                  <CheckCircle className="w-2.5 h-2.5" /> SELECTED (PO)
                </span>
              )}
            </div>

            <div className="mt-1.5 grid grid-cols-3 gap-1 text-[9px]">
              <div className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-purple-400" />
                <span>{vendor.leadTimeHours}h</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-2.5 h-2.5 text-emerald-400" />
                <span>${vendor.cost}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-2.5 h-2.5 text-amber-400" />
                <span>{Math.round(vendor.reliabilityScore * 100)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Issued Notice */}
      <div className="mt-2.5 p-2 rounded-xl bg-purple-900/30 border border-purple-500/40 text-[10px] text-purple-200">
        <div className="font-bold flex items-center justify-between">
          <span>PO: PR-AUTO-WS102</span>
          <span className="text-emerald-400 font-extrabold">ORDERED</span>
        </div>
        <div className="text-[9px] text-slate-300 mt-0.5">
          Delivery ETA: <span className="text-purple-300 font-bold">8.0 Hours</span> (Apex Motion)
        </div>
      </div>
    </div>
  );
};
