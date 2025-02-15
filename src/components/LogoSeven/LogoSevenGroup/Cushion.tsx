import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

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
    envMapIntensity: number;
    emissive: string;
    emissiveIntensity: number;
    envMapImages: string[];
    envMapImage: string;
  },
}

const Cushion = ({ position, rotation, size, scale, cushionMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null); 

  // Load and cache the texture using Drei's useTexture
  const texture = useTexture(cushionMaterialProps.envMapImage);

  // Memoize the environment map setup to ensure correct settings
  const envMap = useMemo(() => {
    // Set the texture mapping to an equirectangular reflection map
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // Ensure the texture updates its properties
    texture.needsUpdate = true;
    return texture;
  }, [texture]);

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        envMap={envMap}
        metalness={cushionMaterialProps.metalness}
        roughness={cushionMaterialProps.roughness}
        opacity={cushionMaterialProps.opacity}
        envMapIntensity={cushionMaterialProps.envMapIntensity}
        color={cushionMaterialProps.color}
        emissive={cushionMaterialProps.emissive}
        emissiveIntensity={cushionMaterialProps.emissiveIntensity}
        transparent
      />
    </mesh>
  );
};

export default Cushion;