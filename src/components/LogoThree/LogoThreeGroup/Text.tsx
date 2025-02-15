import { useEffect, useMemo, useState, useRef } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  text: string;
  size: number;
  depth: number;
  textMaterialProps: {
    envMapIntensity: number;
    color: string;
    metalness: number;
    roughness: number;
    opacity: number;
    emissive: string;
    emissiveIntensity: number;
  }
}

const Text = ({ position, rotation, text, size, depth, textMaterialProps }: Props) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [font, setFont] = useState<Font | null>(null);

  const texture = useTexture('/images/silver_7.jpg');

  const envMap = useMemo(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.needsUpdate = true;
    return texture;
  }, [texture]);

  useEffect(() => {
    const loader = new FontLoader();
    loader.load('/fonts/mediator_narrow_web_extra_bold_regular.typeface.json', (loadedFont) => {
      setFont(loadedFont);
    });
  }, []);

    // Use `useMemo` to memoize the geometry creation and avoid recreation on every render
    const textGeometry = useMemo(() => {
      if (!font) return null;
  
      const textOptions = {
        font,
        size,
        depth,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 0.1,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 5,
      };
  
      const geometry = new TextGeometry(text, textOptions);
    
      // Compute the bounding box of the text and center it
      geometry.computeBoundingBox();
      geometry.center();  // This will center the text at the origin (0, 0, 0)

      return geometry;
    }, [font]);
  
    if (!font || !textGeometry) return null;

  return (
    <mesh ref={meshRef} geometry={textGeometry} rotation={rotation} position={position} renderOrder={2}>
      <meshStandardMaterial 
        metalness={textMaterialProps.metalness}
        roughness={textMaterialProps.roughness}
        color={textMaterialProps.color}
        envMap={envMap}
        envMapIntensity={textMaterialProps.envMapIntensity}
        opacity={textMaterialProps.opacity}
        emissive={textMaterialProps.emissive}
        emissiveIntensity={textMaterialProps.emissiveIntensity}
        transparent
      />
    </mesh>
  );
};

export default Text;
