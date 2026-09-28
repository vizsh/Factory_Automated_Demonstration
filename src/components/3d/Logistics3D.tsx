import { Html } from '@react-three/drei';

interface Logistics3DProps {
  isStepLogistics: boolean;
}

export const Logistics3D = ({ isStepLogistics }: Logistics3DProps) => {
  return (
    <group position={[-17, 0, 0]}>
      {/* Freight Delivery Truck Body */}
      <group position={[0, 1.5, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[4, 2.5, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.4} roughness={0.3} />
        </mesh>

        {/* Truck Cabin */}
        <mesh position={[0, 0.2, 4.8]} castShadow>
          <boxGeometry args={[3.8, 2.0, 2.2]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* SLA Signboard */}
      <mesh position={[0, 4.5, 0]}>
        <boxGeometry args={[6, 2, 0.2]} />
        <meshStandardMaterial color="#0284c7" />
      </mesh>

      <Html position={[0, 5.0, 0]} center distanceFactor={18}>
        <div
          className={`p-3 rounded-xl border backdrop-blur-md transition-all duration-500 font-mono shadow-xl ${
            isStepLogistics
              ? 'bg-amber-50/95 border-amber-300 text-amber-900 shadow-[0_0_25px_rgba(245,158,11,0.3)]'
              : 'bg-white/95 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex items-center justify-between gap-2 text-xs font-bold">
            <span>DISPATCH SLA MONITOR</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] ${
                isStepLogistics ? 'bg-amber-100 text-amber-800 font-bold' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {isStepLogistics ? 'SO-8841: DELAYED (+85m)' : 'ALL ON TIME'}
            </span>
          </div>

          <div className="text-[10px] text-slate-500 mt-1">
            Margin: M_s = t_commit - t_ship_proj
          </div>

          {isStepLogistics && (
            <div className="mt-2 text-[10px] text-amber-900 bg-amber-100/80 p-2 rounded-lg border border-amber-200 font-sans">
              <div className="font-bold">SO-8841 (Jobs J1001, J1002): +85m Delay</div>
              <div>SO-8848 (Job J1003): +210m (ON TIME)</div>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};
