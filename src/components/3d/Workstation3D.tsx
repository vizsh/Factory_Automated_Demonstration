import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Workstation } from '../../types/manufactureFlow';
import { SmokeParticles } from './SmokeParticles';

interface Workstation3DProps {
  data: Workstation;
  isSelected: boolean;
  onSelect: (ws: Workstation) => void;
  isStepDegraded: boolean;
  isStepReroute: boolean;
}

export const Workstation3D = ({
  data,
  isSelected,
  onSelect,
  isStepDegraded,
  isStepReroute
}: Workstation3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const spindleRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Status color calculation
  let statusColor = '#10b981'; // Green (On benchmark)
  let statusBadgeColor = 'bg-white/95 text-emerald-800 border-emerald-300 shadow-md';

  if (data.id === 'WS-102') {
    if (isStepDegraded) {
      statusColor = '#ef4444'; // Red (Hotspot)
      statusBadgeColor = 'bg-white/95 text-rose-800 border-rose-400 animate-pulse shadow-md';
    } else {
      statusColor = '#f59e0b'; // Yellow (Elevated)
      statusBadgeColor = 'bg-white/95 text-amber-800 border-amber-400 shadow-md';
    }
  } else if ((data.id === 'WS-105' || data.id === 'WS-108') && isStepReroute) {
    statusColor = '#0ea5e9'; // Sky Blue receiver
    statusBadgeColor = 'bg-white/95 text-sky-800 border-sky-400 animate-pulse shadow-md';
  }

  useFrame((state, delta) => {
    // Spindle rotation (unless locked)
    if (spindleRef.current && (data.id !== 'WS-102' || !isStepDegraded)) {
      spindleRef.current.rotation.z += delta * 4;
    }

    // Vibration shake on WS-102 when degraded or warning
    if (groupRef.current && data.id === 'WS-102') {
      if (isStepDegraded) {
        groupRef.current.position.y = (Math.random() - 0.5) * 0.08;
      } else {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 20) * 0.03;
      }
    }

    // Light pulse
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 6) * 0.5;
    }
  });

  const isBoiler = data.id === 'WS-102';

  return (
    <group
      ref={groupRef}
      position={data.position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(data);
      }}
    >
      {/* Ground Aura Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[2.2, 2.4, 32]} />
        <meshBasicMaterial color={statusColor} transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[2.2, 32]} />
        <meshBasicMaterial color={statusColor} transparent opacity={0.15} />
      </mesh>

      {isBoiler ? (
        /* Heavy Steam Boiler / Pressure Vessel Geometry for WS-102 - Light Slate Metallic */
        <group>
          {/* Cylindrical Main Vessel */}
          <mesh position={[0, 1.6, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[1.2, 1.2, 4.2, 24]} />
            <meshStandardMaterial
              color={isSelected ? '#64748b' : '#94a3b8'}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>

          {/* End Caps */}
          <mesh position={[-2.1, 1.6, 0]} castShadow>
            <sphereGeometry args={[1.2, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#64748b" metalness={0.6} />
          </mesh>

          {/* Support Cradles */}
          <mesh position={[-1.2, 0.4, 0]}>
            <boxGeometry args={[0.5, 0.8, 2.6]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh position={[1.2, 0.4, 0]}>
            <boxGeometry args={[0.5, 0.8, 2.6]} />
            <meshStandardMaterial color="#334155" />
          </mesh>

          {/* Exhaust Stack Flue */}
          <mesh position={[-0.8, 3.2, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 2.2, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.6} />
          </mesh>

          {/* Smoke/Steam rising from stack when warning or degraded */}
          <SmokeParticles position={[-0.8, 4.3, 0]} active={true} />
        </group>
      ) : (
        /* Heavy CNC Lathe Machine Geometry - Light Slate & Silver */
        <group>
          {/* Base Bed Frame */}
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[3.6, 1.0, 2.4]} />
            <meshStandardMaterial
              color={isSelected ? '#475569' : '#cbd5e1'}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>

          {/* Headstock Motor Housing */}
          <mesh position={[-1.2, 1.6, 0]} castShadow>
            <boxGeometry args={[1.2, 1.4, 2.2]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.3} />
          </mesh>

          {/* Transparent Protective Sliding Glass Enclosure */}
          <mesh position={[0.4, 1.8, 0]}>
            <boxGeometry args={[2.0, 1.6, 2.0]} />
            <meshPhysicalMaterial
              color="#0ea5e9"
              transmission={0.8}
              opacity={0.6}
              transparent
              roughness={0.1}
            />
          </mesh>

          {/* Internal Spindle Chuck */}
          <mesh ref={spindleRef} position={[-0.5, 1.6, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.45, 0.45, 0.3, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      )}

      {/* Top Status Light Beacon Pole */}
      <mesh position={[1.4, 2.8, 0.9]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>

      {/* Glowing Status Light Beacon */}
      <mesh position={[1.4, 3.3, 0.9]}>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 12]} />
        <meshBasicMaterial color={statusColor} />
      </mesh>

      <pointLight
        ref={lightRef}
        position={[1.4, 3.4, 0.9]}
        color={statusColor}
        distance={6}
        intensity={2.5}
      />

      {/* Overhead Badge lowered and scaled to stay cleanly in frame */}
      <Html position={[0, 2.6, 0]} center distanceFactor={30}>
        <div className="cursor-pointer transition-all duration-300">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border backdrop-blur-md font-mono text-[11px] font-bold ${statusBadgeColor}`}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }} />
            <span>{data.name.split('(')[0]} - {data.capacity}%</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
