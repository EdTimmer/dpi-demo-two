import { useRef } from 'react';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
  scale: [number, number, number];
}

const CushionCover = ({ position, rotation, size, scale }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null); 

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      {/* <meshBasicMaterial 
        color='#fff' 
        transparent 
        opacity={0.3} 
        side={THREE.BackSide} 
      /> */}
      <meshPhysicalMaterial
        transmission={0.99}      // high transmission for translucency
        transparent={true}      
        roughness={0}         // adjust as needed for a smoother surface
        envMapIntensity={0}     // no environment map reflections
      />
    </mesh>
  );
};

export default CushionCover;