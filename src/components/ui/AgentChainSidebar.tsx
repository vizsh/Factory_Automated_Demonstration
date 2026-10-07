import { useState } from 'react';
import { Cpu, CheckCircle2, RefreshCw, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import type { IncidentStep } from '../../types/manufactureFlow';

interface AgentChainSidebarProps {
  currentStep: IncidentStep;
}

interface AgentNode {
  agentName: string;
  nodes: { id: string; label: string; stepTarget: number }[];
}

const AGENT_NODES: AgentNode[] = [
  {
    agentName: '1. Failure Intelligence Agent',
    nodes: [
      { id: 'telemetry_monitor', label: 'telemetry_monitor', stepTarget: 0 },
      { id: 'failure_prediction', label: 'failure_prediction', stepTarget: 1 },
      { id: 'failure_alerting', label: 'failure_alerting', stepTarget: 1 }
    ]
  },
  {
    agentName: '2. Recovery Orchestrator Agent',
    nodes: [
      { id: 'recovery_orchestrator', label: 'recovery_orchestrator (ACID Lock)', stepTarget: 2 }
    ]
  },
  {
    agentName: '3. Resource Recovery Agent',
    nodes: [
      { id: 'resource_recovery', label: 'resource_recovery', stepTarget: 3 },
      { id: 'procurement_automation', label: 'procurement_automation', stepTarget: 3 },
      { id: 'maintenance_work_order', label: 'maintenance_work_order', stepTarget: 3 },
      { id: 'recovery_time_estimation', label: 'recovery_time_estimation', stepTarget: 3 }
    ]
  },
  {
    agentName: '4. Production Rerouting Agent',
    nodes: [
      { id: 'production_rerouting', label: 'production_rerouting (Constraint Match)', stepTarget: 4 }
    ]
  },
  {
    agentName: '5. Delivery Impact Agent',
    nodes: [
      { id: 'delivery_impact', label: 'delivery_impact (SLA Traversal)', stepTarget: 5 }
    ]
  },
  {
    agentName: '6. Stakeholder Notification Agent',
    nodes: [
      { id: 'final_stakeholder_notification', label: 'final_stakeholder_notification', stepTarget: 5 }
    ]
  }
];

export const AgentChainSidebar = ({ currentStep }: AgentChainSidebarProps) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  return (
    <>
      {/* Collapsed Floating Pill on Mobile (< lg) */}
      {!isOpenMobile && (
        <button
          onClick={() => setIsOpenMobile(true)}
          className="lg:hidden absolute left-2 top-20 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-800 text-[11px] font-bold shadow-lg shadow-slate-200/50 active:scale-95 transition-all"
        >
          <Cpu className="w-3.5 h-3.5 text-sky-600" />
          <span className="font-mono text-[10px] text-slate-700">Agent Graph</span>
          <span className="text-[8px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono font-bold">
            11 Nodes
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        </button>
      )}

      {/* Full Sidebar on Desktop or Expanded Mobile Overlay */}
      <aside
        className={`${
          isOpenMobile ? 'block' : 'hidden lg:flex'
        } absolute left-2 lg:left-6 top-20 lg:top-24 z-20 w-[calc(100vw-16px)] sm:w-80 lg:w-72 max-h-[calc(100vh-170px)] bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3 overflow-y-auto font-sans text-slate-800 shadow-xl shadow-slate-200/50 flex-col justify-between transition-all`}
      >
        <div>
          {/* Header & Mobile Close */}
          <div
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="flex items-center justify-between pb-2 border-b border-slate-100 cursor-pointer lg:cursor-default"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">
              <Cpu className="w-4 h-4 text-sky-600" />
              <span>LangGraph Agent State Graph</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-semibold">
                11 Nodes
              </span>
              <div className="lg:hidden p-0.5 rounded-full hover:bg-slate-100">
                <ChevronUp className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mt-2.5 space-y-2">
            {AGENT_NODES.map((agentGroup, idx) => {
              const isAgentActive = agentGroup.nodes.some(n => n.stepTarget === currentStep.id);
              const isAgentPassed = agentGroup.nodes.every(n => n.stepTarget < currentStep.id);

              return (
                <div
                  key={idx}
                  className={`p-2 rounded-xl border transition-all duration-300 ${
                    isAgentActive
                      ? 'bg-sky-50/90 border-sky-300 shadow-sm'
                      : isAgentPassed
                      ? 'bg-emerald-50/50 border-emerald-200/60 opacity-90'
                      : 'bg-slate-50/60 border-slate-100 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                    <span className={isAgentActive ? 'text-sky-900 font-extrabold' : ''}>{agentGroup.agentName}</span>
                    {isAgentPassed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : isAgentActive ? (
                      <RefreshCw className="w-3.5 h-3.5 text-sky-600 animate-spin" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    )}
                  </div>

                  <div className="mt-1 space-y-1 font-mono">
                    {agentGroup.nodes.map((node) => {
                      const isNodeActive = currentStep.id === node.stepTarget;
                      const isNodePassed = currentStep.id > node.stepTarget;

                      return (
                        <div
                          key={node.id}
                          className={`flex items-center justify-between text-[9px] px-2 py-0.8 rounded transition-all ${
                            isNodeActive
                              ? 'bg-slate-900 text-white font-bold shadow-sm'
                              : isNodePassed
                              ? 'bg-emerald-100/70 text-emerald-900 font-medium'
                              : 'bg-white text-slate-500 border border-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-1 truncate">
                            <ArrowRight className="w-2.5 h-2.5 shrink-0" />
                            <span className="truncate">{node.label}</span>
                          </div>
                          {isNodeActive && (
                            <span className="shrink-0 px-1 py-0.1 bg-sky-500 text-white text-[7px] rounded uppercase font-mono font-bold">
                              RUNNING
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Latency Comparison Card */}
        <div className="mt-2 pt-2 border-t border-slate-100 text-[9px]">
          <div className="text-slate-500 mb-1 font-bold font-mono">DIGITAL ORCHESTRATION LATENCY</div>
          <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-200">
            <div>
              <div className="text-sky-700 font-extrabold text-xs font-mono">{currentStep.digitalLatencyMs} ms</div>
              <div className="text-slate-500 text-[8px]">ManufactureFlow</div>
            </div>
            <div className="text-right">
              <div className="text-amber-700 font-extrabold text-xs font-mono">{currentStep.standardManualHours} h</div>
              <div className="text-slate-500 text-[8px]">Standard Manual</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
