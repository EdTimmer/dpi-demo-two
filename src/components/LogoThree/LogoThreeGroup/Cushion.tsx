import { useTexture } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  size: number;
  scale: [number, number, number];
  cushionMaterialProps: {
    metalness: number;
    roughness: number;
    color: string;
    emissive: string;
    emissiveIntensity: number;
    opacity: number;
    envMapIntensity: number;
    envMapImages: string[];
    envMapImage: string;
  }
}

const Cushion = ({ position, rotation, size, scale, cushionMaterialProps }: Props) => {
  const shapeOneRef = useRef<THREE.Mesh>(null); 

  const texture = useTexture(cushionMaterialProps.envMapImage);
  
    const envMap = useMemo(() => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.needsUpdate = true;
      return texture;
    }, [texture]);

  return (
    <mesh ref={shapeOneRef} position={position} rotation={rotation} scale={scale} renderOrder={1}>
      <sphereGeometry args={[size, 32, 32]} />
      {/* <meshPhongMaterial
        color={cushionMaterialProps.color}
        emissive={cushionMaterialProps.emissive}
        specular={cushionMaterialProps.specular}
        shininess={cushionMaterialProps.shininess}
        opacity={cushionMaterialProps.opacity}
        emissiveIntensity={cushionMaterialProps.emissiveIntensity}
        transparent
      /> */}
      <meshStandardMaterial
        envMap={envMap} 
        envMapIntensity={cushionMaterialProps.envMapIntensity}
        metalness={cushionMaterialProps.metalness}
        roughness={cushionMaterialProps.roughness}
        opacity={cushionMaterialProps.opacity}
        color={cushionMaterialProps.color}
        emissive={cushionMaterialProps.emissive}
        emissiveIntensity={cushionMaterialProps.emissiveIntensity}
        transparent
        // wireframe={true}
      />
    </mesh>
  );
};

export default Cushion;