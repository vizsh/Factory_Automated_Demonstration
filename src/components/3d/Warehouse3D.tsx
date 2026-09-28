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

      <Html position={[0, 5.5, 0]} center distanceFactor={18}>
        <div
          className={`p-3 rounded-xl border backdrop-blur-md transition-all duration-500 font-mono shadow-xl ${
            isStepProcurement
              ? 'bg-purple-50/95 border-purple-300 text-purple-900 shadow-[0_0_25px_rgba(168,85,247,0.3)] animate-bounce'
              : 'bg-white/95 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex items-center justify-between gap-2 text-xs font-bold">
            <span>BIN-A4: BRG-10023</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] ${
                isStepProcurement ? 'bg-rose-100 text-rose-700 font-extrabold' : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {isStepProcurement ? 'STOCKOUT (q = 0)' : 'STOCK: q = 4'}
            </span>
          </div>

          <div className="text-[10px] text-slate-500 mt-1">
            Part: Precision Spindle Roller Bearing
          </div>

          {isStepProcurement && (
            <div className="mt-2 text-[10px] text-purple-900 bg-purple-100/80 p-2 rounded-lg border border-purple-200 font-sans">
              <div className="font-bold font-mono">AUTO PO CREATED: PR-AUTO-WS102</div>
              <div>Vendor: Apex Motion (Lead: 8h)</div>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};
