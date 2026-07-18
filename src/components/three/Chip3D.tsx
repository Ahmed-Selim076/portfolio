import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function Pins({ count, span, axis }: { count: number; span: number; axis: "x" | "z" }) {
  const positions = Array.from({ length: count }, (_, i) => -span / 2 + (span / (count - 1)) * i);

  return (
    <>
      {positions.map((p, i) => (
        <group key={i}>
          <mesh position={axis === "x" ? [p, -0.02, 1.5] : [1.5, -0.02, p]}>
            <boxGeometry args={axis === "x" ? [0.1, 0.05, 0.34] : [0.34, 0.05, 0.1]} />
            <meshStandardMaterial color="#c7d6e6" metalness={0.9} roughness={0.25} />
          </mesh>
          <mesh position={axis === "x" ? [p, -0.02, -1.5] : [-1.5, -0.02, p]}>
            <boxGeometry args={axis === "x" ? [0.1, 0.05, 0.34] : [0.34, 0.05, 0.1]} />
            <meshStandardMaterial color="#c7d6e6" metalness={0.9} roughness={0.25} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function ChipMesh() {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0.15, y: -0.5 });

  useFrame((state) => {
    if (!group.current) return;
    target.current.x = state.pointer.y * 0.35 + 0.1;
    target.current.y = state.pointer.x * 0.55 - 0.4;

    group.current.rotation.x += (target.current.x - group.current.rotation.x) * 0.05;
    group.current.rotation.y += (target.current.y - group.current.rotation.y) * 0.05;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.06;
  });

  return (
    <group ref={group} rotation={[0.1, -0.4, 0]}>
      {/* Substrate base */}
      <RoundedBox args={[2.9, 0.18, 2.9]} radius={0.04} smoothness={4} position={[0, -0.2, 0]}>
        <meshStandardMaterial color="#04070d" metalness={0.5} roughness={0.6} />
      </RoundedBox>

      {/* Die package */}
      <RoundedBox args={[2.2, 0.34, 2.2]} radius={0.06} smoothness={4}>
        <meshStandardMaterial
          color="#0a1424"
          emissive="#0a6cff"
          emissiveIntensity={0.25}
          metalness={0.75}
          roughness={0.28}
        />
      </RoundedBox>

      {/* Glowing edge frame */}
      <lineSegments position={[0, 0.001, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.2, 0.34, 2.2)]} />
        <lineBasicMaterial color="#3da9ff" />
      </lineSegments>

      {/* Die marking */}
      <mesh position={[0, 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.56, 4]} />
        <meshBasicMaterial color="#00d9ff" transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 0.181, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
        <ringGeometry args={[0.3, 0.34, 4]} />
        <meshBasicMaterial color="#3da9ff" transparent opacity={0.6} />
      </mesh>

      <Pins count={9} span={3.2} axis="x" />
      <Pins count={9} span={3.2} axis="z" />
    </group>
  );
}

export default function Chip3D() {
  return (
    <Canvas
      camera={{ position: [0, 3.4, 5.6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      dpr={[1, 1.5]}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} color="#bfe0ff" />
      <pointLight position={[-3, 2, -3]} intensity={18} color="#0a6cff" />
      <pointLight position={[0, 1.5, 3]} intensity={10} color="#00d9ff" />
      <ChipMesh />
    </Canvas>
  );
}
