import { useRef } from 'react';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
  scale: [number, number, number];
  cushionCoverMaterialProps: {
    color: string;
    opacity: number;
  },
}

const CushionCover = ({ position, rotation, size, scale, cushionCoverMaterialProps: cushionMaterialProps }: Props) => {
  const shapeFiveRef = useRef<THREE.Mesh>(null); 

  return (
    <mesh ref={shapeFiveRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial 
        color={cushionMaterialProps.color} 
        transparent 
        opacity={cushionMaterialProps.opacity} 
        side={THREE.BackSide} 
      />
    </mesh>
  );
};

export default CushionCover;