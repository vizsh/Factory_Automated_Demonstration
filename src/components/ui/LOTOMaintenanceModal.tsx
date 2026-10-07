import { useState } from 'react';
import { Wrench, CheckSquare, Square, ShieldCheck, Unlock, Sparkles, ChevronDown, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_LOTO_ITEMS } from '../../data/scenarioData';
import type { LOTOItem } from '../../types/manufactureFlow';

interface LOTOMaintenanceModalProps {
  onCompleteRTS: () => void;
}

export const LOTOMaintenanceModal = ({ onCompleteRTS }: LOTOMaintenanceModalProps) => {
  const [items, setItems] = useState<LOTOItem[]>(INITIAL_LOTO_ITEMS);
  const [isSigned, setIsSigned] = useState(false);
  const [isExpandedMobile, setIsExpandedMobile] = useState(false);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  // Auto-complete if signed
  const handleAuthorizeSignOff = () => {
    setItems((prev) => prev.map((item) => ({ ...item, completed: true })));
    setIsSigned(true);

    // Fire celebratory confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Notify parent to restore WS-102 to OPERATIONAL
    onCompleteRTS();
  };

  return (
    <>
      {/* Collapsed Pill on Mobile (< sm) */}
      {!isExpandedMobile && (
        <button
          onClick={() => setIsExpandedMobile(true)}
          className="sm:hidden absolute right-2 top-20 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-emerald-300 text-emerald-900 text-[11px] font-bold shadow-lg active:scale-95 transition-all"
        >
          <Wrench className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-mono text-[10px]">Human RTS Sign-off</span>
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[8px] font-bold font-mono">
            {isSigned ? 'RESTORED' : 'PENDING'}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        </button>
      )}

      {/* Expanded Modal Card */}
      <div
        className={`${
          isExpandedMobile ? 'block' : 'hidden sm:block'
        } absolute right-2 sm:right-6 top-20 sm:top-24 z-20 w-[calc(100vw-16px)] sm:w-80 max-h-[calc(100vh-170px)] overflow-y-auto bg-white/95 backdrop-blur-md border border-emerald-300 rounded-2xl p-3 font-sans text-slate-800 shadow-xl shadow-emerald-100 animate-in fade-in slide-in-from-right duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wider font-mono">
            <Wrench className="w-3.5 h-3.5 text-emerald-600" />
            <span>Human RTS Sign-off</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[9px] font-bold font-mono">
              OSHA 1910.147
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
          Technician sign-off before releasing lock on <span className="text-emerald-700 font-bold font-mono">WS-102</span>:
        </div>

        {/* LOTO Checklist */}
        <div className="mt-2 space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`cursor-pointer p-2 rounded-xl border transition-all text-[10px] flex items-start gap-2 ${
                item.completed
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {item.completed ? (
                <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              )}

              <div className="flex-1">
                <div className={item.completed ? 'line-through text-emerald-800/80 font-semibold' : 'font-semibold'}>
                  {item.task}
                </div>
                <div className="text-[8px] text-slate-500 mt-0.5 font-mono">
                  Category: <span className="text-emerald-700 font-bold">{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sign-Off Authorization Button */}
        <div className="mt-3 pt-2 border-t border-slate-100">
          <button
            onClick={handleAuthorizeSignOff}
            className={`w-full py-2 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
              isSigned
                ? 'bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-100'
            }`}
          >
            {isSigned ? (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>LOCK RELEASED / RESTORED</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AUTHORIZE SIGN-OFF</span>
              </>
            )}
          </button>

          {isSigned && (
            <div className="mt-1.5 text-center text-[9px] text-emerald-700 font-bold animate-pulse flex items-center justify-center gap-1 font-mono">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Lock Released. Status: OPERATIONAL</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
