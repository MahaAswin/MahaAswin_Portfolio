import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Tetrahedron, Box, Icosahedron, PerspectiveCamera } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

interface ShapeProps {
  type: "tetrahedron" | "cube" | "icosahedron";
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}

const Shape = ({ type, position, color, size = 1, speed = 1 }: ShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={0.5}>
      {type === "tetrahedron" && (
        <Tetrahedron ref={meshRef} args={[size, 0]} position={position}>
          <meshPhysicalMaterial 
            color={color} 
            thickness={2} 
            roughness={0} 
            transmission={0.9} 
            ior={1.5} 
            reflectivity={0.5}
            transparent
            opacity={0.3}
          />
        </Tetrahedron>
      )}
      {type === "cube" && (
        <Box ref={meshRef} args={[size, size, size]} position={position}>
          <meshPhysicalMaterial 
            color={color} 
            thickness={2} 
            roughness={0} 
            transmission={0.9} 
            ior={1.5} 
            reflectivity={0.5}
            transparent
            opacity={0.3}
          />
        </Box>
      )}
      {type === "icosahedron" && (
        <Icosahedron ref={meshRef} args={[size, 0]} position={position}>
          <meshPhysicalMaterial 
            color={color} 
            thickness={2} 
            roughness={0} 
            transmission={0.9} 
            ior={1.5} 
            reflectivity={0.5}
            transparent
            opacity={0.3}
          />
        </Icosahedron>
      )}
    </Float>
  );
};

const HeroScene3D = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Reverted Palette: Golden Yellow, Amber, Orange
  const shapes = [
    { type: "tetrahedron" as const, position: [3, 2, -2] as [number, number, number], color: "#FFC107", size: 1.2, speed: 1 }, 
    { type: "cube" as const, position: [-4, -2, -3] as [number, number, number], color: "#FF9800", size: 0.8, speed: 0.8 }, 
    { type: "icosahedron" as const, position: [2, -3, -1] as [number, number, number], color: "#FFB300", size: 1.5, speed: 1.2 }, 
    { type: "tetrahedron" as const, position: [-2, 3, -4] as [number, number, number], color: "#FFC107", size: 0.6, speed: 1.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <fog attach="fog" args={["#02050d", 5, 15]} />
          
          {shapes.map((shape, i) => (
            <Shape key={i} {...shape} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene3D;
