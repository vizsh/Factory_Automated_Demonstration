import { useState } from 'react';
import { Wrench, CheckSquare, Square, ShieldCheck, Unlock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_LOTO_ITEMS } from '../../data/scenarioData';
import type { LOTOItem } from '../../types/manufactureFlow';

interface LOTOMaintenanceModalProps {
  onCompleteRTS: () => void;
}

export const LOTOMaintenanceModal = ({ onCompleteRTS }: LOTOMaintenanceModalProps) => {
  const [items, setItems] = useState<LOTOItem[]>(INITIAL_LOTO_ITEMS);
  const [isSigned, setIsSigned] = useState(false);

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
    <div className="absolute right-6 top-28 bottom-24 z-20 w-80 max-h-[calc(100vh-210px)] overflow-y-auto bg-slate-950/95 backdrop-blur-md border border-emerald-500/60 rounded-2xl p-3.5 font-mono text-slate-200 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-in fade-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <Wrench className="w-3.5 h-3.5" />
          <span>Human RTS Sign-off</span>
        </div>
        <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold">
          OSHA 1910.147
        </span>
      </div>

      <div className="mt-2 text-[10px] text-slate-300">
        Technician sign-off before releasing lock on <span className="text-emerald-400 font-bold">WS-102</span>:
      </div>

      {/* LOTO Checklist */}
      <div className="mt-2 space-y-1.5 max-h-48 overflow-y-auto pr-1">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`cursor-pointer p-2 rounded-xl border transition-all text-[10px] flex items-start gap-2 ${
              item.completed
                ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {item.completed ? (
              <CheckSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <div className={item.completed ? 'line-through text-emerald-300/80 font-semibold' : 'font-semibold'}>
                {item.task}
              </div>
              <div className="text-[8px] text-slate-400 mt-0.5">
                Category: <span className="text-emerald-400 font-bold">{item.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sign-Off Authorization Button */}
      <div className="mt-3 pt-2 border-t border-slate-800">
        <button
          onClick={handleAuthorizeSignOff}
          className={`w-full py-2 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg ${
            isSigned
              ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
              : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
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
          <div className="mt-1.5 text-center text-[9px] text-emerald-400 font-bold animate-pulse flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Lock Released. Status: OPERATIONAL</span>
          </div>
        )}
      </div>
    </div>
  );
};
