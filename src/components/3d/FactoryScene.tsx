import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { SystemMode, IncidentStep, Workstation } from '../../types/manufactureFlow';
import { CameraRig } from './CameraRig';
import { FactoryFloor } from './FactoryFloor';
import { FactoryStructure } from './FactoryStructure';
import { Workstation3D } from './Workstation3D';
import { Warehouse3D } from './Warehouse3D';
import { Logistics3D } from './Logistics3D';
import { EffluentAndCompressor3D } from './EffluentAndCompressor3D';
import { OfficeCabin3D } from './OfficeCabin3D';
import { AdvancedRoboticsAndCrane3D } from './AdvancedRoboticsAndCrane3D';
import { RerouteEnergyBeams } from './RerouteEnergyBeams';

interface FactorySceneProps {
  mode: SystemMode;
  currentStep: IncidentStep;
  workstations: Workstation[];
  selectedWs: Workstation | null;
  onSelectWs: (ws: Workstation) => void;
}

export const FactoryScene = ({
  mode,
  currentStep,
  workstations,
  selectedWs,
  onSelectWs
}: FactorySceneProps) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const isDegraded = currentStep.id >= 2 && currentStep.id !== 6;
  const isProcurement = currentStep.id === 3;
  const isReroute = currentStep.id >= 4;
  const isLogistics = currentStep.id >= 5;
  const isRTS = currentStep.id === 6;

  return (
    <div className="relative w-full h-full bg-[#f8fafc] overflow-hidden">
      <Canvas
        shadows
        camera={{ position: currentStep.cameraPosition, fov: isMobile ? 56 : 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#f8fafc']} />
        <fog attach="fog" args={['#f8fafc', 35, 95]} />

        {/* Studio Lighting setup */}
        <ambientLight intensity={0.95} />
        <directionalLight
          position={[25, 45, 25]}
          intensity={1.6}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 25, 0]} intensity={1.3} color="#0284c7" />

        {/* Dynamic Camera Controller */}
        <CameraRig mode={mode} currentStep={currentStep} controlsRef={controlsRef} />

        {/* Interactive Orbit Controls */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2 - 0.02}
          minDistance={4}
          maxDistance={55}
        />

        {/* Factory Concrete Floor & Safety Markings */}
        <FactoryFloor />

        {/* Overhead Steel Roof Trusses, Columns, and High-Bay Cone Lights */}
        <FactoryStructure />

        {/* Elevated Plant Operations Glass Office Cabin (Human Authority) */}
        <OfficeCabin3D isStepRTS={isRTS} />

        {/* Advanced Robotics, Overhead Gantry Crane, and AMRs */}
        <AdvancedRoboticsAndCrane3D />

        {/* Workstations Grid (Steam Boiler WS-102 & CNC Lathes) */}
        {workstations.map((ws) => (
          <Workstation3D
            key={ws.id}
            data={ws}
            isSelected={selectedWs?.id === ws.id}
            onSelect={onSelectWs}
            isStepDegraded={isDegraded && ws.id === 'WS-102'}
            isStepReroute={isReroute}
          />
        ))}

        {/* Additional Industrial Equipment (Effluent Plant & Compressor) */}
        <EffluentAndCompressor3D />

        {/* Warehouse ASRS Cell */}
        <Warehouse3D isStepProcurement={isProcurement} />

        {/* Customer Logistics Cell */}
        <Logistics3D isStepLogistics={isLogistics} />

        {/* Animated Job Rerouting Energy Streams */}
        <RerouteEnergyBeams active={isReroute} />
      </Canvas>
    </div>
  );
};
