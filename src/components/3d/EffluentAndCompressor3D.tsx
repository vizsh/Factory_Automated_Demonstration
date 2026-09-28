import { Html } from '@react-three/drei';

export const EffluentAndCompressor3D = () => {
  return (
    <group>
      {/* 1. Effluent Treatment Plant (Right Front Cell: [14, 0, -6]) */}
      <group position={[14, 0, -6]}>
        {/* Main Circular Fluid Settling Tank */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.2, 2.2, 2.4, 32]} />
          <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* Fluid Surface inside tank */}
        <mesh position={[0, 2.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.1, 32]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            transmission={0.9}
            opacity={0.8}
            transparent
            roughness={0.1}
          />
        </mesh>

        {/* Ground Aura Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <ringGeometry args={[2.4, 2.6, 32]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.8} />
        </mesh>

        {/* Pumping Station & Pipes */}
        <mesh position={[-2.6, 0.8, 0]} castShadow>
          <boxGeometry args={[1.2, 1.6, 1.6]} />
          <meshStandardMaterial color="#334155" />
        </mesh>

        {/* Overhead Badge */}
        <Html position={[0, 3.8, 0]} center distanceFactor={18}>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-emerald-500/50 bg-emerald-950/80 text-emerald-300 font-mono text-xs font-bold shadow-xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Effluent Treatment Plant - 5%</span>
          </div>
        </Html>
      </group>

      {/* 2. Compressor House (Center Back Cell: [2, 0, 6]) */}
      <group position={[2, 0, 6]}>
        {/* Main Enclosure */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 2.4, 2.2]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Air Receiver Pressure Tank */}
        <mesh position={[2.0, 1.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.7, 0.7, 2.2, 16]} />
          <meshStandardMaterial color="#d97706" metalness={0.8} />
        </mesh>

        {/* Ground Aura Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <ringGeometry args={[2.4, 2.6, 32]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.8} />
        </mesh>

        {/* Overhead Badge */}
        <Html position={[0, 3.8, 0]} center distanceFactor={18}>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-emerald-500/50 bg-emerald-950/80 text-emerald-300 font-mono text-xs font-bold shadow-xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Compressor House - 2%</span>
          </div>
        </Html>
      </group>
    </group>
  );
};
