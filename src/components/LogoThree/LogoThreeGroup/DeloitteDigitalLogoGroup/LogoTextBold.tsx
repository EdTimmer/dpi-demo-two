import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

interface Props {
  position: [number, number, number];
  rotation: THREE.Euler;
  text: string;
  textBoldMaterialProps: {
    color: string;
    metalness: number;
    roughness: number;
    opacity: number;
    emissive: string;
    emissiveIntensity: number;
  },
}

const LogoTextBold = ({ position, rotation, text, textBoldMaterialProps }: Props) => {
  const [font, setFont] = useState<Font | null>(null);

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
        size: 1.6,
        depth: 0.8,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 0.1,
        bevelSize: 0.1,
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
    <mesh geometry={textGeometry} rotation={rotation} position={position} renderOrder={2}>
      <meshStandardMaterial 
        metalness={textBoldMaterialProps.metalness}
        roughness={textBoldMaterialProps.roughness}
        color={textBoldMaterialProps.color}
        opacity={textBoldMaterialProps.opacity}
        emissive={textBoldMaterialProps.emissive}
        emissiveIntensity={textBoldMaterialProps.emissiveIntensity}
        transparent
      />
    </mesh>
  );
};

export default LogoTextBold;
