export const FactoryStructure = () => {
  // Column grid positions [x, z]
  const columns = [
    [-22, -14], [-22, 0], [-22, 14],
    [-8, -14],  [-8, 14],
    [8, -14],   [8, 14],
    [22, -14],  [22, 0],  [22, 14]
  ];

  // Overhead cone lamp positions
  const lamps: [number, number, number][] = [
    [-12, 10, -6],
    [-4, 10, -6],
    [4, 10, -6],
    [12, 10, -6],
    [-8, 10, 6],
    [8, 10, 6],
    [17, 10, 0]
  ];

  return (
    <group>
      {/* Vertical Steel Structural I-Beam Columns - Light Slate Metallic */}
      {columns.map(([x, z], idx) => (
        <group key={idx} position={[x, 0, z]}>
          {/* Main vertical pillar */}
          <mesh position={[0, 6, 0]} castShadow>
            <boxGeometry args={[0.5, 12, 0.5]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Base plate */}
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[1.2, 0.4, 1.2]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Longitudinal Roof Girders (LengthwiseBeams) */}
      {[-14, 0, 14].map((z, idx) => (
        <mesh key={idx} position={[0, 12, z]} castShadow>
          <boxGeometry args={[45, 0.4, 0.4]} />
          <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}

      {/* Crosswise Overhead Trusses */}
      {[-22, -8, 8, 22].map((x, idx) => (
        <mesh key={idx} position={[x, 12, 0]} castShadow>
          <boxGeometry args={[0.4, 0.4, 28.5]} />
          <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}

      {/* Diagonal Roof Truss Support Braces */}
      {[-15, 0, 15].map((x, idx) => (
        <group key={idx} position={[x, 11.5, 0]}>
          <mesh rotation={[0, 0, Math.PI / 6]} position={[-3, 0, 0]}>
            <boxGeometry args={[6, 0.2, 0.2]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 6]} position={[3, 0, 0]}>
            <boxGeometry args={[6, 0.2, 0.2]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
        </group>
      ))}

      {/* Overhead High-Bay Industrial Lamps with Downward Spotlights */}
      {lamps.map(([lx, ly, lz], idx) => (
        <group key={idx} position={[lx, ly, lz]}>
          {/* Suspension wire */}
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
          {/* Cone Lamp Fixture */}
          <mesh position={[0, 0, 0]}>
            <coneGeometry args={[0.6, 0.6, 16, 1, true]} />
            <meshStandardMaterial color="#cbd5e1" side={2} />
          </mesh>
          {/* Glowing Bulb */}
          <mesh position={[0, -0.1, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          {/* Downward Spotlight */}
          <spotLight
            position={[0, 0, 0]}
            target-position={[lx, 0, lz]}
            angle={Math.PI / 4}
            penumbra={0.6}
            intensity={2.8}
            color="#fffbeb"
            distance={22}
          />
        </group>
      ))}

      {/* Overhead Industrial Piping System - Light Silver Pipes */}
      <mesh position={[0, 9.5, -4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 42, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Secondary Feeder Pipes */}
      {[-12, -4, 4, 12].map((x, idx) => (
        <mesh key={idx} position={[x, 7.5, -5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 4, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
};
