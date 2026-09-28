import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RerouteEnergyBeamsProps {
  active: boolean;
}

export const RerouteEnergyBeams = ({ active }: RerouteEnergyBeamsProps) => {
  const lineRef1 = useRef<THREE.Line>(null);
  const lineRef2 = useRef<THREE.Line>(null);

  // Path 1: WS-102 [-4, 1, -6] -> WS-105 [-7, 1, 6]
  // Path 2: WS-102 [-4, 1, -6] -> WS-108 [5, 1, 6]
  const curve1 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-4, 2, -6),
    new THREE.Vector3(-8, 5, 0),
    new THREE.Vector3(-7, 2, 6)
  ]);

  const curve2 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-4, 2, -6),
    new THREE.Vector3(1, 6, 0),
    new THREE.Vector3(5, 2, 6)
  ]);

  const points1 = curve1.getPoints(50);
  const points2 = curve2.getPoints(50);

  const geom1 = new THREE.BufferGeometry().setFromPoints(points1);
  const geom2 = new THREE.BufferGeometry().setFromPoints(points2);

  useFrame((state) => {
    if (lineRef1.current && lineRef2.current && active) {
      // Pulse animation
      const mat1 = lineRef1.current.material as THREE.LineDashedMaterial & { dashOffset: number };
      const mat2 = lineRef2.current.material as THREE.LineDashedMaterial & { dashOffset: number };
      mat1.dashOffset = -state.clock.elapsedTime * 4;
      mat2.dashOffset = -state.clock.elapsedTime * 4;
    }
  });

  if (!active) return null;

  return (
    <group>
      {/* Path 1: WS-102 to WS-105 */}
      {/* @ts-expect-error Three line JSX type */}
      <line ref={lineRef1} geometry={geom1}>
        <lineDashedMaterial
          color="#00f0ff"
          dashSize={0.5}
          gapSize={0.2}
          linewidth={3}
          transparent
          opacity={0.9}
        />
      </line>

      {/* Path 2: WS-102 to WS-108 */}
      {/* @ts-expect-error Three line JSX type */}
      <line ref={lineRef2} geometry={geom2}>
        <lineDashedMaterial
          color="#38bdf8"
          dashSize={0.5}
          gapSize={0.2}
          linewidth={3}
          transparent
          opacity={0.9}
        />
      </line>

      {/* Ambient point lights on beam midpoint */}
      <pointLight position={[-8, 5, 0]} color="#00f0ff" intensity={4} distance={10} />
      <pointLight position={[1, 6, 0]} color="#38bdf8" intensity={4} distance={10} />
    </group>
  );
};
