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
        <meshStandardMaterial color={isStepLogistics ? "#d97706" : "#0284c7"} />
      </mesh>
    </group>
  );
};
