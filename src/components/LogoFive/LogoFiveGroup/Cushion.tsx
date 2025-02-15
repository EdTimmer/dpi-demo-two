import { useMemo, useRef } from 'react';
import { useTexture } from '@react-three/drei';
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
    envMapIntensity: number;
    emissive: string;
    emissiveIntensity: number;
    envMapImages: string[];
    envMapImage: string;
  },
}

const Cushion = ({ position, rotation, size, scale, cushionMaterialProps }: Props) => {
  const shapeFiveRef = useRef<THREE.Mesh>(null); 

  const texture = useTexture(cushionMaterialProps.envMapImage);

  const envMap = useMemo(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.needsUpdate = true;
    return texture;
  }, [texture]);

  return (
    <mesh ref={shapeFiveRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
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