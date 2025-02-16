import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import LogoThreeGroupOLD from './LogoThreeGroupOLD';

// This component is rendered inside the Canvas,
// so it's safe to use R3F hooks like useThree here.
const SceneContent = ({
  isFacingUser,
  isMouseEntered,
  setIsFacingUser,
}: {
  isFacingUser: boolean;
  isMouseEntered: boolean;
  setIsFacingUser: (value: boolean) => void;
}) => {
  // const bottomLightRef = useRef<THREE.DirectionalLight>(null!);
  // const topLightRef = useRef<THREE.DirectionalLight>(null!);

  // useEffect(() => {
  //   if (bottomLightRef.current) {
  //     bottomLightRef.current.lookAt(-2, -0.9, 0);
  //   }
  //   if (topLightRef.current) {
  //     topLightRef.current.lookAt(-2, 0.9, 0);
  //   }
  // }, []);

  return (
    <>
      <PerspectiveCamera makeDefault fov={20} position={[0, 0, 20]} />
      <ambientLight intensity={1} />
      <LogoThreeGroupOLD
        isMouseEntered={isMouseEntered}
        isFacingUser={isFacingUser}
        setIsFacingUser={setIsFacingUser}
      />
        <directionalLight position={[-2, 5, 5]} intensity={1} />
        <directionalLight position={[2, -5, 5]} intensity={1} />
      <OrbitControls enableDamping enableZoom={false} />
    </>
  );
};

export default SceneContent;