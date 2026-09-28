import { Html } from '@react-three/drei';

interface Warehouse3DProps {
  isStepProcurement: boolean;
}

export const Warehouse3D = ({ isStepProcurement }: Warehouse3DProps) => {
  return (
    <group position={[17, 0, 0]}>
      {/* High-density Storage Rack Structure */}
      <mesh position={[0, 4, 0]} castShadow>
        <boxGeometry args={[8, 8, 12]} />
        <meshStandardMaterial color="#cbd5e1" wireframe />
      </mesh>

      {/* Racks metal beams */}
      {[-3, 0, 3].map((z, idx) => (
        <mesh key={idx} position={[0, 4, z]}>
          <boxGeometry args={[7.8, 0.2, 0.4]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      ))}

      {/* Warehouse Crates Stack */}
      {[-2, 2].map((x, i) =>
        [-4, -1, 2, 4].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 1 + (j % 3) * 1.5, z]} castShadow>
            <boxGeometry args={[1.8, 1.2, 1.8]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.4} />
          </mesh>
        ))
      )}

      {/* Highlighted Critical Part Bin BRG-10023 */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[2.2, 1.5, 2.2]} />
        <meshStandardMaterial
          color={isStepProcurement ? '#a855f7' : '#cbd5e1'}
          emissive={isStepProcurement ? '#9333ea' : '#000000'}
          emissiveIntensity={isStepProcurement ? 0.6 : 0}
        />
      </mesh>

      {/* Pulsing Light Beacon for Stockout */}
      {isStepProcurement && (
        <pointLight position={[0, 3.5, 0]} color="#a855f7" distance={8} intensity={3} />
      )}

      <Html position={[0, 3.2, 0]} center distanceFactor={60} transform={false}>
        <div className="pointer-events-none select-none">
          <div
            className={`px-2 py-1 rounded-md border backdrop-blur-md font-mono text-[10px] font-bold shadow-md whitespace-nowrap ${
              isStepProcurement
                ? 'bg-purple-50 text-purple-900 border-purple-300'
                : 'bg-white text-slate-800 border-slate-200'
            }`}
          >
            <span>BIN-A4: BRG-10023 ({isStepProcurement ? 'STOCKOUT q=0' : 'STOCK q=4'})</span>
          </div>
        </div>
      </Html>
    </group>
  );
};
