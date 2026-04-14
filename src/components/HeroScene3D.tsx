import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

const GlowingSphere = ({ isDark }: { isDark: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1.8, 64, 64]} position={[2.5, 0, 0]}>
        <MeshDistortMaterial
          color={isDark ? "#22d3ee" : "#e8601c"}
          roughness={0.1}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.7}
        />
      </Sphere>
    </Float>
  );
};

const FloatingTorus = ({ isDark }: { isDark: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <Torus ref={meshRef} args={[0.8, 0.25, 32, 64]} position={[-3, 1.5, -2]}>
        <meshStandardMaterial
          color={isDark ? "#a855f7" : "#1a1a1a"}
          roughness={0.2}
          metalness={0.9}
          emissive={isDark ? "#a855f7" : "#e8601c"}
          emissiveIntensity={0.3}
        />
      </Torus>
    </Float>
  );
};

const FloatingIcosahedron = ({ isDark }: { isDark: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
      <Icosahedron ref={meshRef} args={[0.6, 1]} position={[-2, -1.8, -1]}>
        <meshStandardMaterial
          color={isDark ? "#3b82f6" : "#c05621"}
          roughness={0.15}
          metalness={0.85}
          wireframe
        />
      </Icosahedron>
    </Float>
  );
};

const OrbitingParticles = ({ isDark }: { isDark: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyanColor = new THREE.Color(isDark ? "#22d3ee" : "#e8601c");
    const purpleColor = new THREE.Color(isDark ? "#a855f7" : "#1a1a1a");

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 3;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const c = Math.random() > 0.5 ? cyanColor : purpleColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [isDark]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

const GlassBox = ({ isDark }: { isDark: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef} position={[3.5, -1.5, -1.5]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshPhysicalMaterial
          color={isDark ? "#22d3ee" : "#e8601c"}
          roughness={0.05}
          metalness={0.1}
          transmission={0.9}
          thickness={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
};

const HeroScene3D = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={isDark ? 0.3 : 0.5} />
          <pointLight
            position={[5, 5, 5]}
            intensity={isDark ? 1.5 : 1}
            color={isDark ? "#22d3ee" : "#e8601c"}
          />
          <pointLight
            position={[-5, -3, 3]}
            intensity={isDark ? 0.8 : 0.5}
            color={isDark ? "#a855f7" : "#c05621"}
          />
          <directionalLight position={[0, 5, 5]} intensity={0.5} />

          <GlowingSphere isDark={isDark} />
          <FloatingTorus isDark={isDark} />
          <FloatingIcosahedron isDark={isDark} />
          <OrbitingParticles isDark={isDark} />
          <GlassBox isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene3D;
