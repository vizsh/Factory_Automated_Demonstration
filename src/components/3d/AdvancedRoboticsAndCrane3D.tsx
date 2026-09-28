import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const AdvancedRoboticsAndCrane3D = () => {
  const craneRef = useRef<THREE.Group>(null);
  const amr1Ref = useRef<THREE.Group>(null);
  const amr2Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Overhead Crane horizontal movement along shop floor
    if (craneRef.current) {
      craneRef.current.position.x = Math.sin(t * 0.4) * 12;
    }

    // AMR 1 driving back and forth between Warehouse [17] and Line [-4]
    if (amr1Ref.current) {
      amr1Ref.current.position.x = Math.cos(t * 0.6) * 10 + 5;
    }

    // AMR 2 driving along front line
    if (amr2Ref.current) {
      amr2Ref.current.position.x = Math.sin(t * 0.5) * 8 - 4;
    }
  });

  return (
    <group>
      {/* 1. OVERHEAD HEAVY GANTRY CRANE SYSTEM */}
      {/* Crane Gantry Beam spanning crosswise across roof */}
      <group ref={craneRef} position={[0, 11.2, 0]}>
        {/* Main Double Girder Beam */}
        <mesh position={[0, 0, -2]}>
          <boxGeometry args={[1.5, 0.6, 28]} />
          <meshStandardMaterial color="#d97706" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Crane Carriage Trolley */}
        <mesh position={[0, -0.4, 0]} castShadow>
          <boxGeometry args={[1.8, 0.6, 1.8]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>

        {/* Steel Hoist Cable */}
        <mesh position={[0, -3.2, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 5, 8]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>

        {/* Heavy Industrial Lifting Hook Block */}
        <mesh position={[0, -5.8, 0]} castShadow>
          <boxGeometry args={[0.8, 0.6, 0.8]} />
          <meshStandardMaterial color="#eab308" metalness={0.8} />
        </mesh>
      </group>

      {/* 2. AUTONOMOUS MOBILE ROBOTS (AMRs / AGVs) */}
      {/* AMR Robot 1 */}
      <group ref={amr1Ref} position={[5, 0.3, 0]}>
        {/* AMR Body Chassis */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.6, 0.4, 1.2]} />
          <meshStandardMaterial color="#0ea5e9" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Yellow Safety Warning Light */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 12]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
        {/* Pallet with Component Part Box */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.2, 0.5, 0.9]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.5} />
        </mesh>
      </group>

      {/* AMR Robot 2 */}
      <group ref={amr2Ref} position={[-4, 0.3, 6]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.6, 0.4, 1.2]} />
          <meshStandardMaterial color="#10b981" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 12]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.2, 0.5, 0.9]} />
          <meshStandardMaterial color="#64748b" roughness={0.5} />
        </mesh>
      </group>

      {/* 3. MULTI-JOINTED ROBOTIC ARM WORKSTATION LOADER */}
      <group position={[-1, 0, -6]}>
        {/* Base Pillar */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.5, 1.2, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Lower Arm */}
        <mesh position={[0, 1.8, 0.4]} rotation={[0.4, 0, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 1.6, 12]} />
          <meshStandardMaterial color="#eab308" metalness={0.8} />
        </mesh>
        {/* Upper Arm Gripper */}
        <mesh position={[0, 2.5, 1.2]} rotation={[-0.8, 0, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 1.4, 12]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      </group>
    </group>
  );
};
