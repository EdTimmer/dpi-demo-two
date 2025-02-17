import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import LogoThreeGroup from './LogoThreeGroup';

interface Props {
  guiy: string;
}

const LogoThreeWrapper = ({guiy}: Props) => {
  const [isFacingUser, setIsFacingUser] = useState(true);

  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  }
  const handleMouseLeave = () => {
    setIsMouseEntered(false);
  }

  const bottomLightRef = useRef<THREE.DirectionalLight | null>(null);
  const topLightRefTwo = useRef<THREE.DirectionalLight | null>(null);

  useEffect(() => {
    if (bottomLightRef.current) {
      bottomLightRef.current.lookAt(-2, -0.9, 0);
    }
    if (topLightRefTwo.current) {
      topLightRefTwo.current.lookAt(-2, 0.9, 0);
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
        <LogoThreeGroup isMouseEntered={isMouseEntered} isFacingUser={isFacingUser} setIsFacingUser={setIsFacingUser} guiy={guiy} />
        {/* <directionalLight position={[-2, 5, 5]} intensity={1} />
        <directionalLight position={[2, -5, 5]} intensity={1} /> */}
        <directionalLight ref={topLightRefTwo} position={[0, 2, 10]} intensity={0.1} />
        <directionalLight ref={bottomLightRef} position={[0, -2, 10]} intensity={0.1} />  
        <directionalLight position={[2, 3, 3]} intensity={1} />
        <directionalLight position={[-2, -3, 3]} intensity={1} />
        <directionalLight position={[-2, 3, 3]} intensity={1} />
        <directionalLight position={[2, -3, 3]} intensity={1} />
        <OrbitControls enableDamping enableZoom={false} />
      </Canvas>
    </div>        
  );
}

export default LogoThreeWrapper;