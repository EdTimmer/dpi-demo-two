import { Canvas } from '@react-three/fiber';
import { useState } from 'react';

import SceneContent from './SceneContent';

const LogoThreeWrapperOLD = () => {
  const [isFacingUser, setIsFacingUser] = useState(true);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseEnter = () => setIsMouseEntered(true);
  const handleMouseLeave = () => setIsMouseEntered(false);

  return (
    <div
      style={{ width: '300px', height: '300px', cursor: 'pointer' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas gl={{ antialias: true }}>
        <SceneContent
          isMouseEntered={isMouseEntered}
          isFacingUser={isFacingUser}
          setIsFacingUser={setIsFacingUser}
        />
      </Canvas>
    </div>
  );
};

export default LogoThreeWrapperOLD;