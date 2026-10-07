import { useState } from 'react';
import { ShoppingCart, CheckCircle, Clock, DollarSign, Award, ChevronDown, X } from 'lucide-react';
import { VENDORS } from '../../data/scenarioData';

export const ProcurementModalCard = () => {
  const [isExpandedMobile, setIsExpandedMobile] = useState(false);

  return (
    <>
      {/* Collapsed Pill on Mobile (< sm) */}
      {!isExpandedMobile && (
        <button
          onClick={() => setIsExpandedMobile(true)}
          className="sm:hidden absolute right-2 top-20 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-purple-200 text-purple-900 text-[11px] font-bold shadow-lg active:scale-95 transition-all"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-purple-600" />
          <span className="font-mono text-[10px]">Auto Procurement</span>
          <span className="px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-800 text-[8px] font-bold font-mono">
            PO ISSUED
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        </button>
      )}

      {/* Expanded Modal Card */}
      <div
        className={`${
          isExpandedMobile ? 'block' : 'hidden sm:block'
        } absolute right-2 sm:right-6 top-20 sm:top-24 z-20 w-[calc(100vw-16px)] sm:w-80 max-h-[calc(100vh-170px)] overflow-y-auto bg-white/95 backdrop-blur-md border border-purple-200 rounded-2xl p-3 font-sans text-slate-800 shadow-xl shadow-purple-100 animate-in fade-in slide-in-from-right duration-300`}
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-purple-800 font-bold text-xs uppercase tracking-wider font-mono">
            <ShoppingCart className="w-3.5 h-3.5 text-purple-600" />
            <span>Auto Procurement</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 text-[9px] font-bold font-mono">
              q = 0 STOCKOUT
            </span>
            <button
              onClick={() => setIsExpandedMobile(false)}
              className="sm:hidden p-1 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-2 text-[10px] text-slate-600">
          Part <span className="text-purple-900 font-bold font-mono">BRG-10023</span> stockout in warehouse. Vendor multi-criteria evaluation:
        </div>

        {/* Vendor Ranking Table */}
        <div className="mt-2 space-y-1.5">
          {VENDORS.map((vendor) => (
            <div
              key={vendor.id}
              className={`p-2 rounded-xl border transition-all text-xs ${
                vendor.selected
                  ? 'bg-purple-50/90 border-purple-300 text-purple-900 shadow-sm font-medium'
                  : 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between font-bold text-[11px]">
                <span className="text-slate-900">{vendor.name}</span>
                {vendor.selected && (
                  <span className="flex items-center gap-1 px-1.5 py-0.2 rounded bg-purple-600 text-white text-[8px] font-extrabold font-mono">
                    <CheckCircle className="w-2.5 h-2.5" /> SELECTED (PO)
                  </span>
                )}
              </div>

              <div className="mt-1 grid grid-cols-3 gap-1 text-[9px] font-mono">
                <div className="flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5 text-purple-600" />
                  <span>{vendor.leadTimeHours}h</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <DollarSign className="w-2.5 h-2.5 text-emerald-600" />
                  <span>${vendor.cost}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <Award className="w-2.5 h-2.5 text-amber-600" />
                  <span>{Math.round(vendor.reliabilityScore * 100)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Issued Notice */}
        <div className="mt-2.5 p-2 rounded-xl bg-purple-100/70 border border-purple-200 text-[10px] text-purple-900 font-mono">
          <div className="font-bold flex items-center justify-between">
            <span>PO: PR-AUTO-WS102</span>
            <span className="text-emerald-700 font-extrabold">ORDERED</span>
          </div>
          <div className="text-[9px] text-purple-800 mt-0.5">
            Delivery ETA: <span className="font-bold">8.0 Hours</span> (Apex Motion)
          </div>
        </div>
      </div>
    </>
  );
};
