import { Html } from '@react-three/drei';

export const FactoryFloor = () => {
  return (
    <group>
      {/* Light studio metallic main floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[70, 50]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Grid pattern overlay */}
      <gridHelper args={[70, 70, '#94a3b8', '#e2e8f0']} position={[0, 0.01, 0]} />

      {/* Zone 1: Machining Line L-03 (Top Row) Boundary */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3, 0.02, -6]}>
        <planeGeometry args={[26, 7]} />
        <meshBasicMaterial color="#0284c7" wireframe opacity={0.3} transparent />
      </mesh>

      {/* Zone 2: Receiver Line L-04 (Bottom Row) Boundary */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1, 0.02, 6]}>
        <planeGeometry args={[20, 7]} />
        <meshBasicMaterial color="#2563eb" wireframe opacity={0.3} transparent />
      </mesh>

      {/* Zone 3: ASRS Warehouse Storage Area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[17, 0.02, 0]}>
        <planeGeometry args={[12, 18]} />
        <meshBasicMaterial color="#9333ea" wireframe opacity={0.3} transparent />
      </mesh>

      {/* Zone 4: Logistics & Dispatch Cell */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-17, 0.02, 0]}>
        <planeGeometry args={[12, 18]} />
        <meshBasicMaterial color="#d97706" wireframe opacity={0.3} transparent />
      </mesh>

      {/* Cell Holographic Overhead Labels */}
      <Html position={[-3, 3, -9.5]} center distanceFactor={20}>
        <div className="px-2.5 py-1 rounded-md border border-sky-300 bg-white/90 text-[11px] font-mono text-sky-800 font-bold tracking-wider whitespace-nowrap shadow-md shadow-sky-100 backdrop-blur-sm">
          MACHINING LINE L-03 / PRIMARY PRODUCTION
        </div>
      </Html>

      <Html position={[-1, 3, 9.5]} center distanceFactor={20}>
        <div className="px-2.5 py-1 rounded-md border border-blue-300 bg-white/90 text-[11px] font-mono text-blue-800 font-bold tracking-wider whitespace-nowrap shadow-md shadow-blue-100 backdrop-blur-sm">
          QUALIFIED LINE L-04 / REROUTE CELL
        </div>
      </Html>

      <Html position={[17, 3.5, -9]} center distanceFactor={20}>
        <div className="px-2.5 py-1 rounded-md border border-purple-300 bg-white/90 text-[11px] font-mono text-purple-800 font-bold tracking-wider whitespace-nowrap shadow-md shadow-purple-100 backdrop-blur-sm">
          ASRS AUTOMATED WAREHOUSE
        </div>
      </Html>

      <Html position={[-17, 3.5, -9]} center distanceFactor={20}>
        <div className="px-2.5 py-1 rounded-md border border-amber-300 bg-white/90 text-[11px] font-mono text-amber-800 font-bold tracking-wider whitespace-nowrap shadow-md shadow-amber-100 backdrop-blur-sm">
          DISPATCH & LOGISTICS CELL
        </div>
      </Html>
    </group>
  );
};
