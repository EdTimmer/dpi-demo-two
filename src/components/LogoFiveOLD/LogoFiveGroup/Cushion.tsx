import { useMemo, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
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
  },
}

const Cushion = ({ position, rotation, size, scale, cushionMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null); 

  const texture = useLoader(THREE.TextureLoader, '/images/bw_4.jpg');

  const envMap = useMemo(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
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