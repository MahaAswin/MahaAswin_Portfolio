import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Torus, Sphere } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

const SkillOrb = ({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
    }
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Icosahedron ref={ref} args={[0.3, 1]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          wireframe
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Icosahedron>
    </Float>
  );
};

const SkillsScene3D = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const orbs = useMemo(() => [
    { position: [-3, 2, -2] as [number, number, number], color: isDark ? "#22d3ee" : "#e8601c", speed: 1 },
    { position: [3.5, 1, -1] as [number, number, number], color: isDark ? "#a855f7" : "#1a1a1a", speed: 0.8 },
    { position: [-2.5, -1.5, -1.5] as [number, number, number], color: isDark ? "#3b82f6" : "#c05621", speed: 1.2 },
    { position: [2, -2, -2] as [number, number, number], color: isDark ? "#22d3ee" : "#e8601c", speed: 0.6 },
  ], [isDark]);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} intensity={1} color={isDark ? "#22d3ee" : "#e8601c"} />
          {orbs.map((orb, i) => (
            <SkillOrb key={i} {...orb} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SkillsScene3D;
