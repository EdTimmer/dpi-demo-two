import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useState } from 'react';
import LogoSevenGroup from './LogoSevenGroup';

const LogoSevenWrapper = () => {
  const [isFacingUser, setIsFacingUser] = useState(true);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  }
  const handleMouseLeave = () => {
    setIsMouseEntered(false);
  }
  
  return (
    <div 
      style={{ width: `300px`, height: `300px`, cursor: `pointer`}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
        <ambientLight intensity={1} />
        <LogoSevenGroup isMouseEntered={isMouseEntered} isFacingUser={isFacingUser} setIsFacingUser={setIsFacingUser} />
        {/* <directionalLight position={[0, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, 5]} intensity={1} />
        <directionalLight position={[5, -5, 5]} intensity={1} /> */}
        <OrbitControls enableDamping enableZoom={false} />
      </Canvas>
    </div>        
  );
}

export default LogoSevenWrapper;