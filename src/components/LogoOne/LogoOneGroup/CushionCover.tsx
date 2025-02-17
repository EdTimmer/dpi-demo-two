import { useTexture } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
  scale: [number, number, number];
  cushionCoverMaterialProps: {
    transmission: number;
    roughness: number;
    envMapIntensity: number;
    envMapImages: string[];
    envMapImage: string;
  };
}

const CushionCover = ({ position, rotation, size, scale, cushionCoverMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null);

  const texture = useTexture(cushionCoverMaterialProps.envMapImage);

  const envMap = useMemo(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.needsUpdate = true;
    return texture;
  }, [texture]);

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhysicalMaterial
        envMap={envMap}
        transmission={cushionCoverMaterialProps.transmission}      // high transmission for translucency
        transparent={true}      
        roughness={cushionCoverMaterialProps.roughness}         // adjust as needed for a smoother surface
        envMapIntensity={cushionCoverMaterialProps.envMapIntensity}     // no environment map reflections
      />
    </mesh>
  );
};

export default CushionCover;