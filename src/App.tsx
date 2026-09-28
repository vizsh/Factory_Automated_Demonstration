import { useState, useEffect } from 'react';
import type { SystemMode, Workstation } from './types/manufactureFlow';
import { INCIDENT_STEPS, INITIAL_WORKSTATIONS } from './data/scenarioData';
import { FactoryScene } from './components/3d/FactoryScene';
import { HeaderNav } from './components/ui/HeaderNav';
import { AgentChainSidebar } from './components/ui/AgentChainSidebar';
import { TimelineScrubber } from './components/ui/TimelineScrubber';
import { TelemetryHUD } from './components/ui/TelemetryHUD';
import { ProcurementModalCard } from './components/ui/ProcurementModalCard';
import { ReroutingModalCard } from './components/ui/ReroutingModalCard';
import { LOTOMaintenanceModal } from './components/ui/LOTOMaintenanceModal';
import { NarrationBanner } from './components/ui/NarrationBanner';
import { ReferenceOverlay } from './components/ui/ReferenceOverlay';

export function App() {
  const [mode, setMode] = useState<SystemMode>('CINEMATIC');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [workstations, setWorkstations] = useState<Workstation[]>(INITIAL_WORKSTATIONS);
  const [selectedWs, setSelectedWs] = useState<Workstation | null>(INITIAL_WORKSTATIONS[1]); // WS-102

  const currentStep = INCIDENT_STEPS[currentStepIndex];

  // Auto-play timer for Cinematic Mode
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying && mode === 'CINEMATIC') {
      timer = setTimeout(() => {
        setCurrentStepIndex((prev) => (prev + 1) % INCIDENT_STEPS.length);
      }, 8000 / playbackSpeed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, mode, currentStepIndex, playbackSpeed]);

  // Reset handler
  const handleReset = () => {
    setWorkstations(INITIAL_WORKSTATIONS);
    setCurrentStepIndex(0);
    setIsPlaying(true);
    setSelectedWs(INITIAL_WORKSTATIONS[1]);
  };

  // Complete RTS Sign-Off
  const handleCompleteRTS = () => {
    setWorkstations((prev) =>
      prev.map((ws) =>
        ws.id === 'WS-102'
          ? {
              ...ws,
              status: 'OPERATIONAL',
              telemetry: { ...ws.telemetry, vibration: 1.1, temperature: 44.0 }
            }
          : ws
      )
    );
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-50 font-sans select-none text-slate-900">
      {/* Top Header Navigation */}
      <HeaderNav
        mode={mode}
        onToggleMode={setMode}
        currentStep={currentStep}
        onReset={handleReset}
      />

      {/* Reference Badges & Orbit Hint Overlay */}
      <ReferenceOverlay />

      {/* Top-Center Narration Banner */}
      <NarrationBanner currentStep={currentStep} />

      {/* Left Agent State Graph Sidebar */}
      <AgentChainSidebar currentStep={currentStep} />

      {/* Contextual Modal Overlays based on active Act Step */}
      {(currentStep.id === 0 || currentStep.id === 1 || currentStep.id === 2) && selectedWs && (
        <TelemetryHUD workstation={selectedWs} currentStep={currentStep} />
      )}

      {currentStep.id === 3 && <ProcurementModalCard />}

      {currentStep.id === 4 && <ReroutingModalCard />}

      {currentStep.id === 6 && (
        <LOTOMaintenanceModal onCompleteRTS={handleCompleteRTS} />
      )}

      {/* Main 3D Canvas Scene */}
      <FactoryScene
        mode={mode}
        currentStep={currentStep}
        workstations={workstations}
        selectedWs={selectedWs}
        onSelectWs={setSelectedWs}
      />

      {/* Bottom Timeline Scrubber */}
      <TimelineScrubber
        steps={INCIDENT_STEPS}
        currentStepIndex={currentStepIndex}
        onSelectStep={(idx) => {
          setCurrentStepIndex(idx);
          if (idx === 1 || idx === 2) {
            setSelectedWs(workstations.find((w) => w.id === 'WS-102') || null);
          }
        }}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        playbackSpeed={playbackSpeed}
        onToggleSpeed={() => setPlaybackSpeed(playbackSpeed === 1 ? 2 : 1)}
      />
    </div>
  );
}

export default App;
