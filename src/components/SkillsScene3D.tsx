import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron } from "@react-three/drei";
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
          emissiveIntensity={0.5}
        />
      </Icosahedron>
    </Float>
  );
};

const SkillsScene3D = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const orbs = useMemo(() => [
    { position: [-4, 2, -3] as [number, number, number], color: "#00d4ff", speed: 1 },
    { position: [4, 1, -2] as [number, number, number], color: "#8b5cf6", speed: 0.8 },
    { position: [-3, -2, -2] as [number, number, number], color: "#10b981", speed: 1.2 },
    { position: [3, -3, -3] as [number, number, number], color: "#f59e0b", speed: 0.6 },
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
          {orbs.map((orb, i) => (
            <SkillOrb key={i} {...orb} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SkillsScene3D;
