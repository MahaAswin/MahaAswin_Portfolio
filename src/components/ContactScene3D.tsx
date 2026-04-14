import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Torus, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

const ContactRing = ({ isDark }: { isDark: boolean }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <Torus ref={ref} args={[2, 0.08, 32, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={isDark ? "#22d3ee" : "#e8601c"}
          roughness={0.1}
          metalness={0.9}
          emissive={isDark ? "#22d3ee" : "#e8601c"}
          emissiveIntensity={0.4}
        />
      </Torus>
    </Float>
  );
};

const ContactOrb = ({ isDark }: { isDark: boolean }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} floatIntensity={1}>
      <Sphere ref={ref} args={[0.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color={isDark ? "#a855f7" : "#1a1a1a"}
          roughness={0.1}
          metalness={0.7}
          distort={0.4}
          speed={3}
          transparent
          opacity={0.5}
        />
      </Sphere>
    </Float>
  );
};

const ContactScene3D = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[3, 3, 3]} intensity={1} color={isDark ? "#22d3ee" : "#e8601c"} />
          <ContactRing isDark={isDark} />
          <ContactOrb isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ContactScene3D;
