import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Dodecahedron, PerspectiveCamera } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const SpinningDodecahedron = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Dodecahedron ref={meshRef} args={[4, 0]} position={[0, 0, -5]}>
        <meshBasicMaterial 
          color="#00d4ff" 
          wireframe 
          transparent 
          opacity={0.05} 
        />
      </Dodecahedron>
    </Float>
  );
};

const ContactScene3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas alpha>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <SpinningDodecahedron />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ContactScene3D;
