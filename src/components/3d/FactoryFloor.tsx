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
    </group>
  );
};
