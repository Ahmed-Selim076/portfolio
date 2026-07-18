import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT_DESKTOP = 2000;
const COUNT_MOBILE = 800;

function Particles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const { positions, colors, originals } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorA = new THREE.Color("#00D4FF"); // cyan
    const colorB = new THREE.Color("#2B6CFF"); // deeper electric blue

    for (let i = 0; i < count; i++) {
      // Random point inside a sphere of radius ~5
      const r = 5 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixed = colorA.clone().lerp(colorB, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    return { positions, colors, originals: positions.slice() };
  }, [count]);

  const mouse3D = useRef(new THREE.Vector3(9999, 9999, 9999));

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Slow ambient rotation
    pointsRef.current.rotation.y += 0.0009;

    // Project mouse into the particle plane (z = 0)
    const { pointer, camera } = state;
    const vector = new THREE.Vector3(pointer.x, pointer.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    mouse3D.current.copy(camera.position).add(dir.multiplyScalar(distance));

    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const ox = originals[ix];
      const oy = originals[ix + 1];
      const oz = originals[ix + 2];

      const cx = arr[ix];
      const cy = arr[ix + 1];
      const cz = arr[ix + 2];

      const dx = cx - mouse3D.current.x;
      const dy = cy - mouse3D.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let tx = ox;
      let ty = oy;

      if (dist < 1.5) {
        const force = (1.5 - dist) / 1.5;
        tx = ox + (dx / (dist || 1)) * force * 1.2;
        ty = oy + (dy / (dist || 1)) * force * 1.2;
      }

      // Spring back toward target (lerp)
      arr[ix] += (tx - cx) * 0.08;
      arr[ix + 1] += (ty - cy) * 0.08;
      arr[ix + 2] += (oz - cz) * 0.08;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} scale={Math.min(viewport.width / 8, 1.3)}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroParticles() {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  // Fully skip Three.js on mobile per performance spec — CSS gradient
  // background is used instead (see Hero.tsx).
  if (isMobile) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      className="!absolute inset-0"
    >
      <Particles count={COUNT_DESKTOP} />
    </Canvas>
  );
}

export { COUNT_MOBILE };
