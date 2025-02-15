import { useRef } from "react";
import * as THREE from "three";

interface Props {
  position: [number, number, number];
  size: number;
  sphereMaterialProps: {
    metalness: number;
    roughness: number;
    color: string;
    opacity: number;
    emissive: string;
    emissiveIntensity: number;
  }
}

const GreenDotMetalTwo = ({ position, size, sphereMaterialProps }: Props) => {
  const greenDotMetalRef = useRef<THREE.Mesh>(null);
  
  return (
    <mesh ref={greenDotMetalRef} position={position} renderOrder={2}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        metalness={sphereMaterialProps.metalness}
        roughness={sphereMaterialProps.roughness}
        color={sphereMaterialProps.color}
        opacity={sphereMaterialProps.opacity}
        emissive={sphereMaterialProps.emissive}
        emissiveIntensity={sphereMaterialProps.emissiveIntensity}
        transparent
      />
    </mesh>
  );
};

export default GreenDotMetalTwo;