import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SmokeParticlesProps {
  position: [number, number, number];
  active: boolean;
}

export const SmokeParticles = ({ position, active }: SmokeParticlesProps) => {
  const count = 35;
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.6;
      pos[i * 3 + 1] = Math.random() * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;

      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = Math.random() * 0.04 + 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    return [pos, vel];
  }, []);

  useFrame(() => {
    if (particlesRef.current && active) {
      const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        array[i * 3] += velocities[i * 3];
        array[i * 3 + 1] += velocities[i * 3 + 1];
        array[i * 3 + 2] += velocities[i * 3 + 2];

        // Reset particle if it drifts too high
        if (array[i * 3 + 1] > 5) {
          array[i * 3] = (Math.random() - 0.5) * 0.6;
          array[i * 3 + 1] = 0;
          array[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
        }
      }

      posAttr.needsUpdate = true;
    }
  });

  if (!active) return null;

  return (
    <group position={position}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.4}
          color="#94a3b8"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </points>
    </group>
  );
};
