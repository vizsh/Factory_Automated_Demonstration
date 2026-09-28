import { Cpu, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';
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
  return (
    <aside className="absolute left-6 top-28 bottom-24 z-20 w-72 max-h-[calc(100vh-210px)] bg-slate-950/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-3 overflow-y-auto font-mono text-slate-200 shadow-2xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>Agent State Graph</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
            11 Nodes
          </span>
        </div>

        {/* Agents & Graph Execution Nodes */}
        <div className="mt-2.5 space-y-2.5">
          {AGENT_NODES.map((agentGroup, idx) => {
            const isAgentActive = agentGroup.nodes.some(n => n.stepTarget === currentStep.id);
            const isAgentPassed = agentGroup.nodes.every(n => n.stepTarget < currentStep.id);

            return (
              <div
                key={idx}
                className={`p-2 rounded-xl border transition-all duration-300 ${
                  isAgentActive
                    ? 'bg-cyan-950/50 border-cyan-500/70 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : isAgentPassed
                    ? 'bg-slate-900/40 border-slate-800/60 opacity-80'
                    : 'bg-slate-950/40 border-slate-900 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-300">
                  <span className={isAgentActive ? 'text-cyan-300' : ''}>{agentGroup.agentName}</span>
                  {isAgentPassed ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : isAgentActive ? (
                    <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  )}
                </div>

                <div className="mt-1.5 space-y-1">
                  {agentGroup.nodes.map((node) => {
                    const isNodeActive = currentStep.id === node.stepTarget;
                    const isNodePassed = currentStep.id > node.stepTarget;

                    return (
                      <div
                        key={node.id}
                        className={`flex items-center justify-between text-[9px] px-2 py-0.8 rounded transition-all ${
                          isNodeActive
                            ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-sm'
                            : isNodePassed
                            ? 'bg-slate-800/80 text-emerald-300'
                            : 'bg-slate-900/60 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-1 truncate">
                          <ArrowRight className="w-2 h-2 shrink-0" />
                          <span className="truncate">{node.label}</span>
                        </div>
                        {isNodeActive && (
                          <span className="shrink-0 px-1 py-0.1 bg-slate-950 text-cyan-300 text-[7px] rounded uppercase font-mono">
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
      <div className="mt-3 pt-2 border-t border-slate-800 text-[9px]">
        <div className="text-slate-400 mb-1 font-bold">DIGITAL ORCHESTRATION LATENCY</div>
        <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
          <div>
            <div className="text-cyan-400 font-extrabold text-xs">{currentStep.digitalLatencyMs} ms</div>
            <div className="text-slate-500 text-[8px]">ManufactureFlow</div>
          </div>
          <div className="text-right">
            <div className="text-amber-400 font-extrabold text-xs">{currentStep.standardManualHours} h</div>
            <div className="text-slate-500 text-[8px]">Standard Manual</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
