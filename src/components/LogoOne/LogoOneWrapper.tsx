import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import LogoOneGroup from './LogoOneGroup';

const LogoOneWrapper = () => {
  const [isFacingUser, setIsFacingUser] = useState(true);

  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  }
  const handleMouseLeave = () => {
    setIsMouseEntered(false);
  }

  const leftLightRef = useRef<THREE.DirectionalLight | null>(null);
  const leftLightRefTwo = useRef<THREE.DirectionalLight | null>(null);

  useEffect(() => {
    if (leftLightRef.current) {
      leftLightRef.current.lookAt(-1, -0.9, 0);
    }
    if (leftLightRefTwo.current) {
      leftLightRefTwo.current.lookAt(-1, -0.9, 0);
    }
  }, []);

  return (
    <div 
      style={{ width: `300px`, height: `300px`, cursor: `pointer`}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
        <ambientLight intensity={1} />
        <LogoOneGroup isMouseEntered={isMouseEntered} isFacingUser={isFacingUser} setIsFacingUser={setIsFacingUser} />
        <directionalLight position={[-2, 5, 5]} intensity={1} />
        <OrbitControls enableDamping enableZoom={false} />
      </Canvas>
    </div>        
  );
}

export default LogoOneWrapper;