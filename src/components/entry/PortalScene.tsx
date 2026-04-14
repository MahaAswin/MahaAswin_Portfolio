import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export const PortalScene = ({ isActive }: { isActive: boolean }) => {
  const portalRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (portalRef.current) {
      portalRef.current.rotation.z = t * 0.1;
      portalRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
      ringRef.current.rotation.y = Math.cos(t * 0.2) * 0.1;
    }

    if (coreRef.current && isActive) {
      coreRef.current.scale.setScalar(1 + Math.sin(t * 10) * 0.05);
    }
  });

  const particles = useMemo(() => {
    const pos = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  return (
    <group ref={portalRef}>
      {/* Portal Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#00f2ff"
          emissive="#00f2ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Interior Energy Glimmer */}
      <mesh ref={coreRef}>
        <circleGeometry args={[1.9, 64]} />
        <MeshDistortMaterial
          color="#0066cc"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#0099ff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Secondary Ring for Detail */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[2.05, 0.01, 12, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>

      {/* Floating Particles */}
      <Points positions={particles}>
        <PointMaterial
          transparent
          color="#00f2ff"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Ambiance Lighting */}
      <pointLight position={[0, 0, 2]} intensity={2} color="#00f2ff" />
      <pointLight position={[0, 0, -2]} intensity={1} color="#6600ff" />
    </group>
  );
};
