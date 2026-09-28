import { Html } from '@react-three/drei';

interface OfficeCabin3DProps {
  isStepRTS: boolean;
}

export const OfficeCabin3D = ({ isStepRTS }: OfficeCabin3DProps) => {
  return (
    <group position={[0, 6, -18]}>
      {/* Mezzanine Elevated Support Structure - Light Slate Metallic */}
      <mesh position={[0, -3, 0]} castShadow receiveShadow>
        <boxGeometry args={[14, 6, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Main Office Cabin Floor */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[13.8, 0.1, 7.8]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} />
      </mesh>

      {/* Transparent Glass Walls Overlooking Factory Floor */}
      <mesh position={[0, 2.0, 3.8]}>
        <planeGeometry args={[13.6, 3.8]} />
        <meshPhysicalMaterial
          color="#0ea5e9"
          transmission={0.85}
          opacity={0.6}
          transparent
          roughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Steel Framing around glass */}
      {[-6.8, 0, 6.8].map((x, idx) => (
        <mesh key={idx} position={[x, 2.0, 3.82]}>
          <boxGeometry args={[0.2, 3.8, 0.1]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      ))}

      {/* Executive Desk & Multi-Monitor Workstation */}
      <group position={[0, 0.1, 1.0]}>
        {/* Desk Surface */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[4.2, 0.12, 1.8]} />
          <meshStandardMaterial color="#475569" roughness={0.3} />
        </mesh>

        {/* Desk Legs */}
        <mesh position={[-1.9, 0.6, 0]}>
          <boxGeometry args={[0.2, 1.2, 1.6]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        <mesh position={[1.9, 0.6, 0]}>
          <boxGeometry args={[0.2, 1.2, 1.6]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>

        {/* Multi-Monitor Command Display Center */}
        {[-1.2, 0, 1.2].map((x, i) => (
          <group key={i} position={[x, 1.8, -0.2]} rotation={[0, (i - 1) * -0.2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[1.1, 0.7, 0.05]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0, 0.03]}>
              <planeGeometry args={[1.05, 0.65]} />
              <meshBasicMaterial color={isStepRTS ? '#10b981' : '#0ea5e9'} />
            </mesh>
          </group>
        ))}

        {/* Ergonomic Office Chair */}
        <group position={[0, 0.1, -1.2]}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          <mesh position={[0, 1.3, -0.35]}>
            <boxGeometry args={[0.7, 0.9, 0.1]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
        </group>

        {/* 3D Plant Manager Avatar Standing at Desk */}
        <group position={[0.8, 0.1, -0.6]}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 1.2, 12]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          <mesh position={[0, 1.6, 0]}>
            <boxGeometry args={[0.6, 0.8, 0.3]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 2.2, 0]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color="#f87171" />
          </mesh>
        </group>
      </group>

      {/* Interior Warm Desk Spotlight */}
      <spotLight
        position={[0, 3.5, 1.0]}
        target-position={[0, 1.2, 1.0]}
        angle={Math.PI / 3}
        intensity={3}
        color={isStepRTS ? '#34d399' : '#fef08a'}
        distance={10}
      />

      {/* Overhead Glass Cabin Label - Clean Light Card */}
      <Html position={[0, 4.2, 3.8]} center distanceFactor={18}>
        <div
          className={`p-2.5 rounded-xl border backdrop-blur-md font-mono text-xs font-bold transition-all shadow-xl ${
            isStepRTS
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-bounce'
              : 'bg-white/95 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>PLANT OPERATIONS CABIN / HUMAN AUTHORITY</span>
          </div>
          <div className="text-[10px] text-slate-600 font-sans mt-0.5">
            {isStepRTS
              ? 'Human Sign-off Authorized: Allocation Lock Released'
              : 'Plant Manager & Maintenance Supervisor Control Desk'}
          </div>
        </div>
      </Html>
    </group>
  );
};
