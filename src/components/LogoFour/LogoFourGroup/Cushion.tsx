import { useRef } from 'react';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
  scale: [number, number, number];
  cushionMaterialProps: {
    color: string;
    metalness: number;
    roughness: number;
    opacity: number;
  };
}

const Cushion = ({ position, rotation, size, scale, cushionMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null); 

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        metalness={cushionMaterialProps.metalness}
        roughness={cushionMaterialProps.roughness}
        opacity={cushionMaterialProps.opacity}
        color={cushionMaterialProps.color}
        transparent
      />
    </mesh>
  );
};

export default Cushion;