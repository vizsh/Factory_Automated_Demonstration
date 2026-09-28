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

  // Status color calculation matching reference image
  let statusColor = '#10b981'; // Green (On benchmark)
  let statusBadgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';

  if (data.id === 'WS-102') {
    if (isStepDegraded) {
      statusColor = '#ef4444'; // Red (Hotspot)
      statusBadgeColor = 'bg-red-500/30 text-red-300 border-red-500/80 animate-pulse';
    } else {
      statusColor = '#f59e0b'; // Yellow (Elevated)
      statusBadgeColor = 'bg-amber-500/30 text-amber-300 border-amber-500/80';
    }
  } else if ((data.id === 'WS-105' || data.id === 'WS-108') && isStepReroute) {
    statusColor = '#00f0ff'; // Cyan receiver
    statusBadgeColor = 'bg-cyan-500/30 text-cyan-300 border-cyan-400 animate-pulse';
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

  const isBoiler = data.id === 'WS-102'; // Render WS-102 as heavy steam boiler / reactor unit

  return (
    <group
      ref={groupRef}
      position={data.position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(data);
      }}
    >
      {/* Ground Aura Ring matching reference screenshot */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[2.2, 2.4, 32]} />
        <meshBasicMaterial color={statusColor} transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[2.2, 32]} />
        <meshBasicMaterial color={statusColor} transparent opacity={0.15} />
      </mesh>

      {isBoiler ? (
        /* Heavy Steam Boiler / Pressure Vessel Geometry for WS-102 */
        <group>
          {/* Cylindrical Main Vessel */}
          <mesh position={[0, 1.6, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[1.2, 1.2, 4.2, 24]} />
            <meshStandardMaterial
              color={isSelected ? '#475569' : '#334155'}
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>

          {/* End Caps */}
          <mesh position={[-2.1, 1.6, 0]} castShadow>
            <sphereGeometry args={[1.2, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>

          {/* Support Cradles */}
          <mesh position={[-1.2, 0.4, 0]}>
            <boxGeometry args={[0.5, 0.8, 2.6]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[1.2, 0.4, 0]}>
            <boxGeometry args={[0.5, 0.8, 2.6]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>

          {/* Exhaust Stack Flue */}
          <mesh position={[-0.8, 3.2, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 2.2, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} />
          </mesh>

          {/* Smoke/Steam rising from stack when warning or degraded */}
          <SmokeParticles position={[-0.8, 4.3, 0]} active={true} />
        </group>
      ) : (
        /* Heavy CNC Lathe Machine Geometry */
        <group>
          {/* Base Bed Frame */}
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[3.6, 1.0, 2.4]} />
            <meshStandardMaterial
              color={isSelected ? '#1e293b' : '#0f172a'}
              metalness={0.7}
              roughness={0.4}
            />
          </mesh>

          {/* Headstock Motor Housing */}
          <mesh position={[-1.2, 1.6, 0]} castShadow>
            <boxGeometry args={[1.2, 1.4, 2.2]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Transparent Protective Sliding Glass Enclosure */}
          <mesh position={[0.4, 1.8, 0]}>
            <boxGeometry args={[2.0, 1.6, 2.0]} />
            <meshPhysicalMaterial
              color="#0ea5e9"
              transmission={0.85}
              opacity={0.6}
              transparent
              roughness={0.1}
            />
          </mesh>

          {/* Internal Spindle Chuck */}
          <mesh ref={spindleRef} position={[-0.5, 1.6, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.45, 0.45, 0.3, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      )}

      {/* Top Status Light Beacon Pole */}
      <mesh position={[1.4, 2.8, 0.9]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#475569" />
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

      {/* Overhead Badge Overhead matching reference screenshot */}
      <Html position={[0, 4.3, 0]} center distanceFactor={18}>
        <div className="cursor-pointer transition-all duration-300">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border backdrop-blur-md font-mono text-xs font-bold shadow-xl ${statusBadgeColor}`}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }} />
            <span>{data.name.split('(')[0]} - {data.capacity}%</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
