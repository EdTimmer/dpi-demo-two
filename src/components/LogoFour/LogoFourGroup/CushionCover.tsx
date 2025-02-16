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
  const shapeOneRef = useRef<THREE.Mesh>(null); 

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      {/* <meshBasicMaterial 
        color={cushionMaterialProps.color} 
        transparent 
        opacity={cushionMaterialProps.opacity} 
        side={THREE.BackSide} 
      /> */}
      {/* <meshPhysicalMaterial
        transmission={0.99}      // high transmission for translucency
        transparent={true}      
        roughness={0}         // adjust as needed for a smoother surface
        envMapIntensity={0}     // no environment map reflections
        // opacity={0}
      /> */}
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