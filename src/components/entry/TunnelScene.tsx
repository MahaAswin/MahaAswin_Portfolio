import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RING_COUNT = 25;
const TUNNEL_LENGTH = 50;

export const TunnelScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    return Array.from({ length: RING_COUNT }).map((_, i) => ({
      z: -(i * (TUNNEL_LENGTH / RING_COUNT)),
      rotation: (Math.PI / 3) * i,
      color: i % 2 === 0 ? "#8b5cf6" : "#3b82f6", // Purple/Blue mix
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        // Move rings towards the camera
        child.position.z += 0.5; // Speed of the tunnel
        
        // Loop rings back to the start when they pass the camera
        if (child.position.z > 5) {
          child.position.z = -TUNNEL_LENGTH + 5;
        }

        // Add some "organic" movement
        child.rotation.z += 0.01;
        child.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.05);
      });
      
      // Rotate the whole tunnel slightly
      groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, 0, ring.z]} rotation={[0, 0, ring.rotation]}>
          <ringGeometry args={[2.5, 2.7, 6]} /> {/* Hexagonal shape (6 segments) */}
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
          
          {/* Outer glow ring */}
          <mesh scale={[1.1, 1.1, 1]}>
            <ringGeometry args={[2.7, 2.8, 6]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        </mesh>
      ))}

      {/* Speed Lines / Particles in the tunnel */}
      <SpeedLines />

      {/* Tunnel Lighting */}
      <pointLight position={[0, 0, -10]} intensity={5} color="#3b82f6" />
      <ambientLight intensity={0.2} />
    </group>
  );
};

const SpeedLines = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = -Math.random() * TUNNEL_LENGTH;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 2] += 2; // Warp speed for lines
        if (positions[i * 3 + 2] > 5) {
          positions[i * 3 + 2] = -TUNNEL_LENGTH;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.03}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
