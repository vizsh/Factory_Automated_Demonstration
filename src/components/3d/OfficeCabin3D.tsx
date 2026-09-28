import { Html } from '@react-three/drei';

interface OfficeCabin3DProps {
  isStepRTS: boolean;
}

export const OfficeCabin3D = ({ isStepRTS }: OfficeCabin3DProps) => {
  return (
    <group position={[0, 6, -18]}>
      {/* Mezzanine Elevated Support Structure */}
      <mesh position={[0, -3, 0]} castShadow receiveShadow>
        <boxGeometry args={[14, 6, 8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Main Office Cabin Floor */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[13.8, 0.1, 7.8]} />
        <meshStandardMaterial color="#334155" roughness={0.2} />
      </mesh>

      {/* Transparent Glass Walls Overlooking Factory Floor */}
      {/* Front Glass Facing Factory */}
      <mesh position={[0, 2.0, 3.8]}>
        <planeGeometry args={[13.6, 3.8]} />
        <meshPhysicalMaterial
          color="#38bdf8"
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
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      ))}

      {/* Executive Desk & Multi-Monitor Workstation */}
      <group position={[0, 0.1, 1.0]}>
        {/* Desk Surface */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[4.2, 0.12, 1.8]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} />
        </mesh>

        {/* Desk Legs */}
        <mesh position={[-1.9, 0.6, 0]}>
          <boxGeometry args={[0.2, 1.2, 1.6]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[1.9, 0.6, 0]}>
          <boxGeometry args={[0.2, 1.2, 1.6]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>

        {/* Multi-Monitor Command Display Center */}
        {[-1.2, 0, 1.2].map((x, i) => (
          <group key={i} position={[x, 1.8, -0.2]} rotation={[0, (i - 1) * -0.2, 0]}>
            {/* Monitor Frame */}
            <mesh castShadow>
              <boxGeometry args={[1.1, 0.7, 0.05]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
            {/* Screen glowing displaying SCADA/ManufactureFlow HUD */}
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
          {/* Chair Backrest */}
          <mesh position={[0, 1.3, -0.35]}>
            <boxGeometry args={[0.7, 0.9, 0.1]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>

        {/* 3D Plant Manager Avatar Standing at Desk */}
        <group position={[0.8, 0.1, -0.6]}>
          {/* Legs */}
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 1.2, 12]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          {/* Torso / Executive Suit */}
          <mesh position={[0, 1.6, 0]}>
            <boxGeometry args={[0.6, 0.8, 0.3]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          {/* Head */}
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

      {/* Overhead Glass Cabin Label */}
      <Html position={[0, 4.2, 3.8]} center distanceFactor={18}>
        <div
          className={`p-2.5 rounded-xl border backdrop-blur-md font-mono text-xs font-bold transition-all shadow-2xl ${
            isStepRTS
              ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.5)] animate-bounce'
              : 'bg-slate-900/90 border-slate-700 text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>PLANT OPERATIONS CABIN / HUMAN AUTHORITY</span>
          </div>
          <div className="text-[10px] text-slate-400 font-sans mt-0.5">
            {isStepRTS
              ? 'Human Sign-off Authorized: Allocation Lock Released'
              : 'Plant Manager & Maintenance Supervisor Control Desk'}
          </div>
        </div>
      </Html>
    </group>
  );
};
